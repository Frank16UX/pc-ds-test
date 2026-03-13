import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { ToastStatus } from './toastState';
import styles from './Toast.module.scss';

export interface ToastProps {
    /** Unique identifier for this toast */
    id: string;
    /** The status variant that determines icon and color */
    status: ToastStatus;
    /** Primary message text */
    message: string;
    /** Optional secondary description text */
    description?: string;
    /** Custom leading icon (only used when status='action') */
    icon?: React.ReactNode;
    /** Optional action button config */
    action?: { label: string; onClick: () => void };
    /** Callback when close/dismiss is triggered */
    onClose?: (id: string) => void;
    /** Animation state for enter/exit transitions */
    animationState?: 'entering' | 'visible' | 'exiting';
    /** Duration in ms for auto-dismiss and progress bar animation (default: 5000) */
    duration?: number;
    /** Additional CSS class names */
    className?: string;
}

// Inline SVG icons matching assets/icons/base/ path data
const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5811_184092)">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.3335 8.00002C15.3335 12.0501 12.0502 15.3334 8.00014 15.3334C3.95005 15.3334 0.666809 12.0501 0.666809 8.00002C0.666809 3.94993 3.95005 0.666687 8.00014 0.666687C12.0502 0.666687 15.3335 3.94993 15.3335 8.00002ZM7.33348 8.00002V10.6667C7.33348 11.0349 7.63195 11.3334 8.00014 11.3334C8.36833 11.3334 8.66681 11.0349 8.66681 10.6667V8.00002C8.66681 7.63183 8.36833 7.33335 8.00014 7.33335C7.63195 7.33335 7.33348 7.63183 7.33348 8.00002ZM8.67332 5.33335C8.67332 4.96516 8.37484 4.66669 8.00665 4.66669H8.00014C7.63195 4.66669 7.33348 4.96516 7.33348 5.33335C7.33348 5.70154 7.63195 6.00002 8.00014 6.00002H8.00665C8.37484 6.00002 8.67332 5.70154 8.67332 5.33335Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_5811_184092">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const SuccessIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5811_184090)">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 0.666992C12.0501 0.666992 15.333 3.94992 15.333 8C15.333 12.0501 12.0501 15.333 8 15.333C3.94998 15.3329 0.666992 12.05 0.666992 8C0.667003 3.94997 3.94999 0.667077 8 0.666992ZM11.7754 5.05762C11.5314 4.81395 11.1356 4.81387 10.8916 5.05762L6.75 9.19922L5.10938 7.55762C4.86532 7.31357 4.46869 7.31362 4.22461 7.55762C3.98053 7.80169 3.98054 8.1983 4.22461 8.44238L6.30859 10.5254C6.4257 10.6424 6.58448 10.7079 6.75 10.708C6.91569 10.708 7.07522 10.6426 7.19238 10.5254L11.7754 5.94238C12.0194 5.69834 12.0193 5.30168 11.7754 5.05762Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_5811_184090">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 1.26465C8.34341 1.26473 8.68117 1.35405 8.98046 1.52246C9.24259 1.67004 9.46806 1.87436 9.63964 2.12012L9.70995 2.22754L9.71191 2.23047L15.3584 11.6572L15.3633 11.667C15.5379 11.9694 15.6308 12.312 15.6318 12.6611C15.6328 13.0103 15.542 13.3539 15.3691 13.6572C15.1962 13.9605 14.9464 14.2136 14.6455 14.3906C14.3447 14.5675 14.0023 14.6632 13.6533 14.667H2.34667C1.99771 14.6632 1.65531 14.5675 1.35448 14.3906C1.0536 14.2136 0.80378 13.9605 0.630852 13.6572C0.457965 13.3539 0.3672 13.0103 0.368156 12.6611C0.36916 12.312 0.462134 11.9694 0.636711 11.667L0.641594 11.6572L6.28808 2.23047L6.28905 2.22754C6.46724 1.93378 6.71921 1.69109 7.01855 1.52246C7.31792 1.35393 7.65645 1.26473 7.99999 1.26465ZM7.99999 10.666C7.63191 10.666 7.33318 10.965 7.333 11.333C7.333 11.7012 7.63181 12 7.99999 12H8.00683C8.37494 11.9999 8.67284 11.7011 8.67284 11.333C8.67267 10.965 8.37483 10.6661 8.00683 10.666H7.99999ZM7.99999 5.33301C7.63181 5.33301 7.333 5.63181 7.333 6V8.66699C7.33318 9.03503 7.63191 9.333 7.99999 9.33301C8.36807 9.33301 8.66681 9.03503 8.66698 8.66699V6C8.66698 5.63181 8.36818 5.33301 7.99999 5.33301Z" fill="currentColor"/>
    </svg>
);

const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5811_184091)">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.66683 7.99998C0.66683 3.94989 3.95008 0.666645 8.00016 0.666645C12.0503 0.666646 15.3335 3.94989 15.3335 7.99998C15.3335 12.0501 12.0503 15.3333 8.00016 15.3333C3.95007 15.3333 0.666829 12.0501 0.66683 7.99998ZM8.66683 7.99998L8.66683 5.33331C8.66683 4.96512 8.36835 4.66665 8.00016 4.66665C7.63197 4.66665 7.3335 4.96512 7.3335 5.33331L7.3335 7.99998C7.3335 8.36817 7.63197 8.66665 8.00016 8.66665C8.36835 8.66665 8.66683 8.36817 8.66683 7.99998ZM7.32699 10.6666C7.32699 11.0348 7.62546 11.3333 7.99365 11.3333L8.00016 11.3333C8.36835 11.3333 8.66683 11.0348 8.66683 10.6666C8.66683 10.2985 8.36835 9.99998 8.00016 9.99998L7.99365 9.99998C7.62546 9.99998 7.32699 10.2985 7.32699 10.6666Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_5811_184091">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const CircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="currentColor" />
    </svg>
);

const STATUS_ICONS: Record<ToastStatus, React.FC | null> = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    action: CircleIcon,
    loading: null, // handled separately with Lottie/spinner
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    (
        {
            id,
            status,
            message,
            description,
            icon,
            action,
            onClose,
            animationState = 'visible',
            duration = 5000,
            className,
        },
        ref
    ) => {
        const toastClasses = [
            styles.toast,
            styles[status],
            styles[animationState],
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const renderIcon = () => {
            if (status === 'loading') {
                return (
                    <span className={styles['status-icon']}>
                        <DotLottieReact
                            src="/icons/animated-icons/loader-white.lottie"
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                        />
                    </span>
                );
            }

            if (status === 'action' && icon) {
                return <span className={styles['status-icon']}>{icon}</span>;
            }

            const IconComponent = STATUS_ICONS[status];
            if (IconComponent) {
                return (
                    <span className={styles['status-icon']}>
                        <IconComponent />
                    </span>
                );
            }

            return null;
        };

        const handleActionClick = () => {
            action?.onClick();
            onClose?.(id);
        };

        return (
            <div
                ref={ref}
                className={toastClasses}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                aria-busy={status === 'loading' || undefined}
            >
                <div className={styles['toast-content']}>
                    {renderIcon()}
                    <div className={styles['message-area']}>
                        <span className={styles.message}>{message}</span>
                        {description && (
                            <span className={styles.description}>{description}</span>
                        )}
                    </div>
                    {action && (
                        <button
                            className={styles['action-button']}
                            onClick={handleActionClick}
                            type="button"
                        >
                            {action.label}
                        </button>
                    )}
                    {onClose && (
                        <button
                            className={styles['close-button']}
                            onClick={() => onClose(id)}
                            type="button"
                            aria-label="Close notification"
                        >
                            Close
                        </button>
                    )}
                </div>
                {status === 'loading' && (
                    <div
                        className={styles['progress-bar']}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className={styles['progress-fill']}
                            style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
                        />
                    </div>
                )}
            </div>
        );
    }
);

Toast.displayName = 'Toast';
