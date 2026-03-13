import type React from 'react';

export type ToastStatus = 'action' | 'info' | 'success' | 'warning' | 'error' | 'loading';

export interface ToastData {
    id: string;
    status: ToastStatus;
    message: string;
    description?: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
    onDismiss?: (id: string) => void;
    icon?: React.ReactNode;
    createdAt: number;
}

export type ToastOptions = Omit<ToastData, 'id' | 'status' | 'message' | 'createdAt'>;

type Subscriber = (toasts: ToastData[]) => void;

let counter = 0;
const toastsMap = new Map<string, ToastData>();
const listeners = new Set<Subscriber>();
let cachedSnapshot: ToastData[] = [];

function generateId(): string {
    counter += 1;
    return `toast-${counter}`;
}

function notify(): void {
    cachedSnapshot = Array.from(toastsMap.values()).sort(
        (a, b) => a.createdAt - b.createdAt
    );
    listeners.forEach((listener) => listener(cachedSnapshot));
}

function addToast(status: ToastStatus, message: string, opts?: ToastOptions): string {
    const id = generateId();
    const toastData: ToastData = {
        id,
        status,
        message,
        createdAt: Date.now(),
        ...opts,
        duration: opts?.duration ?? (status === 'loading' ? Infinity : 5000),
    };
    toastsMap.set(id, toastData);
    notify();
    return id;
}

function updateToast(id: string, updates: Partial<ToastData>): void {
    const existing = toastsMap.get(id);
    if (existing) {
        toastsMap.set(id, { ...existing, ...updates });
        notify();
    }
}

function dismissToast(id: string): void {
    const existing = toastsMap.get(id);
    if (existing) {
        toastsMap.delete(id);
        existing.onDismiss?.(id);
        notify();
    }
}

function dismissAll(): void {
    toastsMap.forEach((toastData) => {
        toastData.onDismiss?.(toastData.id);
    });
    toastsMap.clear();
    notify();
}

export function subscribe(callback: Subscriber): () => void {
    listeners.add(callback);
    return () => {
        listeners.delete(callback);
    };
}

export function getToasts(): ToastData[] {
    return cachedSnapshot;
}

type ToastFunction = {
    (message: string, opts?: ToastOptions): string;
    success: (message: string, opts?: ToastOptions) => string;
    error: (message: string, opts?: ToastOptions) => string;
    warning: (message: string, opts?: ToastOptions) => string;
    info: (message: string, opts?: ToastOptions) => string;
    loading: (message: string, opts?: ToastOptions) => string;
    promise: <T>(
        promise: Promise<T>,
        msgs: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
        opts?: ToastOptions
    ) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
};

export const toast: ToastFunction = Object.assign(
    (message: string, opts?: ToastOptions): string => addToast('action', message, opts),
    {
        success: (message: string, opts?: ToastOptions): string =>
            addToast('success', message, opts),
        error: (message: string, opts?: ToastOptions): string =>
            addToast('error', message, opts),
        warning: (message: string, opts?: ToastOptions): string =>
            addToast('warning', message, opts),
        info: (message: string, opts?: ToastOptions): string =>
            addToast('info', message, opts),
        loading: (message: string, opts?: ToastOptions): string =>
            addToast('loading', message, opts),
        promise: <T>(
            promise: Promise<T>,
            msgs: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
            opts?: ToastOptions
        ): string => {
            const id = addToast('loading', msgs.loading, opts);
            promise
                .then((data) => {
                    const message = typeof msgs.success === 'function' ? msgs.success(data) : msgs.success;
                    updateToast(id, { status: 'success', message, duration: 5000 });
                })
                .catch((err: unknown) => {
                    const message = typeof msgs.error === 'function' ? msgs.error(err) : msgs.error;
                    updateToast(id, { status: 'error', message, duration: 5000 });
                });
            return id;
        },
        dismiss: dismissToast,
        dismissAll,
    }
);
