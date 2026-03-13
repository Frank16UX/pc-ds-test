import React from 'react';
import ReactDOM from 'react-dom';
import { Toast } from './Toast';
import { subscribe, getToasts, toast as toastApi } from './toastState';
import type { ToastData } from './toastState';
import styles from './Toast.module.scss';

export interface ToasterProps {
    /** Maximum number of visible toasts */
    maxVisible?: number;
    /** Default auto-dismiss duration in ms */
    defaultDuration?: number;
    /** Gap between toasts when expanded (px) */
    gap?: number;
}

const COLLAPSED_OFFSET = 10; // px offset upward per stacked toast
const COLLAPSED_SCALE_STEP = 0.05; // scale reduction per stacked toast

export const Toaster: React.FC<ToasterProps> = ({
    maxVisible = 3,
    defaultDuration = 5000,
    gap = 8,
}) => {
    const toasts = React.useSyncExternalStore(subscribe, getToasts, getToasts);

    const [exitingIds, setExitingIds] = React.useState<Set<string>>(new Set());
    const [exitingToasts, setExitingToasts] = React.useState<Map<string, ToastData>>(new Map());
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [toastHeights, setToastHeights] = React.useState<Map<string, number>>(new Map());

    const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
    const remainingRef = React.useRef<Map<string, { remaining: number; timestamp: number }>>(
        new Map()
    );
    const isPausedRef = React.useRef(false);

    // Measure toast heights for accurate expanded positioning
    const measureToast = React.useCallback((id: string, el: HTMLDivElement | null) => {
        if (el) {
            const height = el.getBoundingClientRect().height;
            setToastHeights((prev) => {
                if (prev.get(id) === height) return prev;
                const next = new Map(prev);
                next.set(id, height);
                return next;
            });
        }
    }, []);

    // Auto-dismiss timers
    React.useEffect(() => {
        toasts.forEach((toastData) => {
            const duration = toastData.duration ?? defaultDuration;
            if (duration === Infinity) return;
            if (timersRef.current.has(toastData.id)) return;
            if (isPausedRef.current) {
                if (!remainingRef.current.has(toastData.id)) {
                    remainingRef.current.set(toastData.id, {
                        remaining: duration,
                        timestamp: Date.now(),
                    });
                }
                return;
            }
            startTimer(toastData.id, duration);
        });
    }, [toasts, defaultDuration]);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer));
            timersRef.current.clear();
        };
    }, []);

    // Clean up height entries for removed toasts
    React.useEffect(() => {
        const activeIds = new Set(toasts.map((t) => t.id));
        setToastHeights((prev) => {
            let changed = false;
            const next = new Map(prev);
            for (const id of next.keys()) {
                if (!activeIds.has(id) && !exitingIds.has(id)) {
                    next.delete(id);
                    changed = true;
                }
            }
            return changed ? next : prev;
        });
    }, [toasts, exitingIds]);

    function startTimer(id: string, duration: number) {
        clearTimer(id);
        remainingRef.current.set(id, { remaining: duration, timestamp: Date.now() });
        const timer = setTimeout(() => handleDismiss(id), duration);
        timersRef.current.set(id, timer);
    }

    function clearTimer(id: string) {
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }
        remainingRef.current.delete(id);
    }

    function handleDismiss(id: string) {
        const toastData = toasts.find((t) => t.id === id);

        setExitingIds((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });

        if (toastData) {
            setExitingToasts((prev) => {
                const next = new Map(prev);
                next.set(id, toastData);
                return next;
            });
        }

        clearTimer(id);

        setTimeout(() => {
            toastApi.dismiss(id);
            setExitingIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
            setExitingToasts((prev) => {
                const next = new Map(prev);
                next.delete(id);
                return next;
            });
        }, 300);
    }

    function pauseTimers() {
        isPausedRef.current = true;
        setIsExpanded(true);
        timersRef.current.forEach((timer, id) => {
            clearTimeout(timer);
            const info = remainingRef.current.get(id);
            if (info) {
                const elapsed = Date.now() - info.timestamp;
                remainingRef.current.set(id, {
                    remaining: Math.max(0, info.remaining - elapsed),
                    timestamp: Date.now(),
                });
            }
        });
        timersRef.current.clear();
    }

    function resumeTimers() {
        isPausedRef.current = false;
        setIsExpanded(false);
        remainingRef.current.forEach((info, id) => {
            if (info.remaining > 0 && info.remaining !== Infinity) {
                startTimer(id, info.remaining);
            }
        });
    }

    // Combine active + exiting, deduplicate
    const allToasts = [...toasts];
    exitingToasts.forEach((toastData, id) => {
        if (!allToasts.find((t) => t.id === id)) {
            allToasts.push(toastData);
        }
    });
    allToasts.sort((a, b) => a.createdAt - b.createdAt);

    // Most recent toasts, reversed so newest = index 0 (front of stack)
    const visibleToasts = allToasts.slice(-maxVisible).reverse();

    if (visibleToasts.length === 0) return null;

    // Calculate expanded offsets (cumulative heights going upward)
    const expandedOffsets: number[] = [];
    let cumulativeOffset = 0;
    for (let i = 0; i < visibleToasts.length; i++) {
        expandedOffsets.push(cumulativeOffset);
        const h = toastHeights.get(visibleToasts[i].id) ?? 56;
        cumulativeOffset += h + gap;
    }

    // Calculate total height needed for the stack container
    const frontHeight = toastHeights.get(visibleToasts[0]?.id) ?? 56;
    const totalCollapsedHeight = frontHeight + (visibleToasts.length - 1) * COLLAPSED_OFFSET;
    const totalExpandedHeight = cumulativeOffset - gap;
    const stackHeight = isExpanded ? totalExpandedHeight : totalCollapsedHeight;

    return ReactDOM.createPortal(
        <div
            className={styles.toaster}
            onMouseEnter={pauseTimers}
            onMouseLeave={resumeTimers}
        >
            <div
                className={styles['toast-stack']}
                style={{ height: stackHeight }}
            >
                {visibleToasts.map((toastData, index) => {
                    const isExiting = exitingIds.has(toastData.id);

                    // Collapsed: older toasts peek ABOVE the front toast
                    const collapsedY = -(index * COLLAPSED_OFFSET);
                    const collapsedScale = 1 - index * COLLAPSED_SCALE_STEP;

                    // Expanded: toasts spread out upward
                    const expandedY = -(expandedOffsets[index]);

                    const translateY = isExpanded ? expandedY : collapsedY;
                    const scale = isExpanded ? 1 : collapsedScale;
                    const zIndex = visibleToasts.length - index;

                    const opacity = (!isExpanded && index > 0)
                        ? Math.max(0, 1 - index * 0.08)
                        : 1;

                    const transform = `translateY(${translateY}px) scale(${scale})`;

                    const wrapperClasses = [
                        styles['toast-wrapper'],
                        isExiting ? styles['wrapper-exiting'] : '',
                    ].filter(Boolean).join(' ');

                    const toastDuration = toastData.duration ?? defaultDuration;

                    return (
                        <div
                            key={toastData.id}
                            className={wrapperClasses}
                            style={{ zIndex, transform, opacity }}
                        >
                            <Toast
                                ref={(el) => measureToast(toastData.id, el)}
                                id={toastData.id}
                                status={toastData.status}
                                message={toastData.message}
                                description={toastData.description}
                                icon={toastData.icon}
                                action={toastData.action}
                                onClose={handleDismiss}
                                animationState="visible"
                                duration={toastDuration}
                            />
                        </div>
                    );
                })}
            </div>
        </div>,
        document.body
    );
};

Toaster.displayName = 'Toaster';
