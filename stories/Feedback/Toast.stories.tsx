import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toast } from '../../src/components/feedback/Toast/Toast';
import { Toaster } from '../../src/components/feedback/Toast/Toaster';
import { toast } from '../../src/components/feedback/Toast/toastState';
import type { ToastStatus } from '../../src/components/feedback/Toast/toastState';

// Icon picker — same pattern as Badge
const iconModulePaths = Object.keys(import.meta.glob('/assets/icons/custom/*.svg'));
const baseIconPaths = Object.keys(import.meta.glob('/assets/icons/base/*.svg'));

const StoryMaskIcon = ({ src }: { src: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    React.useLayoutEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        el.style.setProperty('mask-image', `url(${src})`);
        el.style.setProperty('mask-repeat', 'no-repeat');
        el.style.setProperty('mask-position', 'center');
        el.style.setProperty('mask-size', 'contain');
        el.style.setProperty('-webkit-mask-image', `url(${src})`);
        el.style.setProperty('-webkit-mask-repeat', 'no-repeat');
        el.style.setProperty('-webkit-mask-position', 'center');
        el.style.setProperty('-webkit-mask-size', 'contain');
    }, [src]);
    return (
        <span
            ref={ref}
            aria-hidden="true"
            style={{ display: 'block', width: '100%', height: '100%', backgroundColor: 'currentColor' }}
        />
    );
};

const iconOptions: Record<string, React.ReactNode> = {};
[...iconModulePaths, ...baseIconPaths].forEach((path) => {
    const iconName = path.split('/').pop()?.replace('.svg', '') || '';
    const iconUrl = path.replace('/assets', '');
    iconOptions[iconName] = <StoryMaskIcon src={iconUrl} />;
});
const iconNames = Object.keys(iconOptions).sort();

// --- Individual Toast component story (visual reference) ---

const meta: Meta<typeof Toast> = {
    title: 'Components/Feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        status: {
            control: 'select',
            options: ['action', 'info', 'success', 'warning', 'error', 'loading'] as ToastStatus[],
            description: 'The status variant of the toast.',
        },
        message: {
            control: 'text',
            description: 'Primary message text.',
        },
        description: {
            control: 'text',
            description: 'Optional secondary description text.',
        },
        animationState: {
            control: 'select',
            options: ['entering', 'visible', 'exiting'],
        },
        icon: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            description: 'Custom leading icon (only used when status=\'action\')',
            if: { arg: 'status', eq: 'action' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Static display of individual Toast component
export const Default: Story = {
    args: {
        id: 'preview',
        status: 'action',
        message: 'Short message triggered by user action.',
        animationState: 'visible',
    },
};

export const Informative: Story = {
    args: {
        id: 'preview-info',
        status: 'info',
        message: 'Your session will expire in 5 minutes.',
        animationState: 'visible',
    },
};

export const Success: Story = {
    args: {
        id: 'preview-success',
        status: 'success',
        message: 'Order placed successfully!',
        animationState: 'visible',
    },
};

export const Warning: Story = {
    args: {
        id: 'preview-warning',
        status: 'warning',
        message: 'Low inventory — only 3 left.',
        animationState: 'visible',
    },
};

export const Error: Story = {
    args: {
        id: 'preview-error',
        status: 'error',
        message: 'Payment failed. Please try again.',
        animationState: 'visible',
    },
};

export const Loading: Story = {
    args: {
        id: 'preview-loading',
        status: 'loading',
        message: 'Processing your order...',
        animationState: 'visible',
    },
};

// --- All Variants side by side ---

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toast id="v-action" status="action" message="Short message triggered by user action." animationState="visible" onClose={() => {}} />
            <Toast id="v-info" status="info" message="Your session will expire in 5 minutes." animationState="visible" onClose={() => {}} />
            <Toast id="v-success" status="success" message="Order placed successfully!" animationState="visible" onClose={() => {}} />
            <Toast id="v-warning" status="warning" message="Low inventory — only 3 left." animationState="visible" onClose={() => {}} />
            <Toast id="v-error" status="error" message="Payment failed. Please try again." animationState="visible" onClose={() => {}} />
            <Toast id="v-loading" status="loading" message="Processing your order..." animationState="visible" onClose={() => {}} />
        </div>
    ),
};

// --- Interactive Toaster demos ---

const ToasterButton = ({ label, onClick, color }: { label: string; onClick: () => void; color: string }) => (
    <button
        onClick={onClick}
        type="button"
        style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid ' + color,
            background: 'transparent',
            color: color,
            cursor: 'pointer',
            fontFamily: 'Lexend, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
        }}
    >
        {label}
    </button>
);

export const InteractiveDemo: Story = {
    render: () => {
        return (
            <>
                <Toaster />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <ToasterButton
                        label="Action Feedback"
                        color="#0f3d42"
                        onClick={() => toast('Item added to your cart.')}
                    />
                    <ToasterButton
                        label="Info"
                        color="#1c78cc"
                        onClick={() => toast.info('Your session will expire in 5 minutes.')}
                    />
                    <ToasterButton
                        label="Success"
                        color="#298538"
                        onClick={() => toast.success('Order placed successfully!')}
                    />
                    <ToasterButton
                        label="Warning"
                        color="#c74f00"
                        onClick={() => toast.warning('Low inventory — only 3 left.')}
                    />
                    <ToasterButton
                        label="Error"
                        color="#cc1700"
                        onClick={() => toast.error('Payment failed. Please try again.')}
                    />
                    <ToasterButton
                        label="Loading"
                        color="#00adad"
                        onClick={() => toast.loading('Processing your order...', { duration: 5000 })}
                    />
                </div>
            </>
        );
    },
};

export const WithAction: Story = {
    render: () => (
        <>
            <Toaster />
            <ToasterButton
                label="Show Toast with Action"
                color="#0f3d42"
                onClick={() =>
                    toast('Item removed from cart.', {
                        action: {
                            label: 'Undo',
                            onClick: () => toast.success('Item restored!'),
                        },
                    })
                }
            />
        </>
    ),
};

export const WithDescription: Story = {
    render: () => (
        <>
            <Toaster />
            <ToasterButton
                label="Show Toast with Description"
                color="#0f3d42"
                onClick={() =>
                    toast.success('Order confirmed', {
                        description: 'Your order #12345 has been placed and will arrive in 3-5 business days.',
                    })
                }
            />
        </>
    ),
};

export const PromiseBased: Story = {
    render: () => {
        const simulateAsync = () => {
            const promise = new Promise<string>((resolve) => {
                setTimeout(() => resolve('Done!'), 2500);
            });
            toast.promise(promise, {
                loading: 'Saving changes...',
                success: 'Changes saved successfully!',
                error: 'Failed to save changes.',
            });
        };

        return (
            <>
                <Toaster />
                <ToasterButton label="Trigger Promise Toast" color="#00adad" onClick={simulateAsync} />
            </>
        );
    },
};

export const Stacking: Story = {
    render: () => {
        let count = 0;
        const statuses: ToastStatus[] = ['action', 'info', 'success', 'warning', 'error'];
        const messages = [
            'First notification',
            'Second notification',
            'Third notification',
            'Fourth notification',
            'Fifth notification',
        ];

        const triggerMultiple = () => {
            const idx = count % statuses.length;
            const status = statuses[idx];
            const msg = messages[idx];
            count++;

            switch (status) {
                case 'info':
                    toast.info(msg);
                    break;
                case 'success':
                    toast.success(msg);
                    break;
                case 'warning':
                    toast.warning(msg);
                    break;
                case 'error':
                    toast.error(msg);
                    break;
                default:
                    toast(msg);
            }
        };

        return (
            <>
                <Toaster maxVisible={3} />
                <div style={{ display: 'flex', gap: '12px' }}>
                    <ToasterButton label="Add Toast" color="#0f3d42" onClick={triggerMultiple} />
                    <ToasterButton label="Clear All" color="#cc1700" onClick={() => toast.dismissAll()} />
                </div>
            </>
        );
    },
};
