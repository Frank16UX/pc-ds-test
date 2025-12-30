import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import styles from './Button.module.scss';

export interface ButtonProps extends AriaButtonProps {
    /**
     * The visual kind/hierarchy of the button.
     * @default 'primary'
     */
    kind?: 'primary' | 'secondary' | 'tertiary' | 'destructive';

    /**
     * The size of the button.
     * @default 'lg'
     */
    size?: 'sm' | 'lg';

    /**
     * The surface context where the button is placed.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * If true, button expands to fill the width of its container.
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Whether the button is in a loading state.
     */
    isLoading?: boolean;

    /**
     * Whether the button is in a success state.
     */
    success?: boolean;

    /**
     * Whether the success state persists or auto-transitions back to default.
     * Only applies when success=true.
     * @default false
     */
    successStaysActive?: boolean;

    /**
     * Custom label to display during success state.
     * Only applies when success=true.
     */
    successLabel?: string;

    /**
     * Duration in milliseconds before auto-transitioning from success state.
     * Only applies when success=true and successStaysActive=false.
     * @default 2000
     * @minimum 2000
     */
    successDuration?: number;

    /**
     * If true, displays the default circle icon on the left side of the button text.
     */
    iconLeading?: boolean;

    /**
     * Custom icon to display on the left side. Requires iconLeading to be true.
     * @default 'circle'
     */
    iconLeadingSwap?: React.ReactNode;

    /**
     * If true, displays the default chevron-right icon on the right side of the button text.
     */
    iconTrailing?: boolean;

    /**
     * Custom icon to display on the right side. Requires iconTrailing to be true.
     * @default 'chevron-right'
     */
    iconTrailingSwap?: React.ReactNode;

    /**
     * Optional flag indicator (country/region) displayed after trailing icon.
     */
    flag?: React.ReactNode;

    /**
     * Additional CSS class names.
     */
    className?: string;

    /**
     * Button content.
     */
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            kind = 'primary',
            size = 'lg',
            surface = 'default',
            fullWidth = false,
            isLoading,
            success,
            successStaysActive = false,
            successLabel,
            successDuration = 2000,
            iconLeading = false,
            iconLeadingSwap,
            iconTrailing = false,
            iconTrailingSwap,
            flag,
            className,
            children,
            isDisabled,
            ...props
        },
        ref
    ) => {
        const [showSuccess, setShowSuccess] = React.useState(false);

        // Handle success state auto-transition
        React.useEffect(() => {
            if (success && !successStaysActive) {
                setShowSuccess(true);
                const duration = Math.max(successDuration, 2000); // Enforce minimum 2s
                const timer = setTimeout(() => {
                    setShowSuccess(false);
                }, duration);
                return () => clearTimeout(timer);
            } else if (success) {
                setShowSuccess(true);
            } else {
                setShowSuccess(false);
            }
        }, [success, successStaysActive, successDuration]);

        const isSuccessState = success && showSuccess;

        const buttonClasses = [
            styles.button,
            styles[kind],
            styles[`size-${size}`],
            surface === 'inverted' ? styles['surface-inverted'] : '',
            fullWidth ? styles['full-width'] : '',
            className
        ]
            .filter(Boolean)
            .join(' ');

        // Determine which loader to use based on kind and surface
        const getLoaderPath = () => {
            if (kind === 'destructive') {
                return '/icons/animated-icons/loader-white.lottie';
            } else if (kind === 'primary' && surface === 'inverted') {
                return '/icons/animated-icons/loader-teal.lottie';
            } else if (kind === 'primary') {
                return '/icons/animated-icons/loader-black.lottie';
            } else if (surface === 'inverted') {
                return '/icons/animated-icons/loader-white.lottie';
            } else {
                return '/icons/animated-icons/loader-teal.lottie';
            }
        };

        // Default icons
        const CircleIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="currentColor" />
            </svg>
        );

        const ChevronRightIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29289 5.29295C9.68342 4.90243 10.3164 4.90243 10.707 5.29295L16.707 11.293C17.0975 11.6835 17.0975 12.3165 16.707 12.707L10.707 18.707C10.3164 19.0975 9.68342 19.0975 9.29289 18.707C8.90237 18.3165 8.90237 17.6835 9.29289 17.293L14.5859 12L9.29289 6.70702C8.90237 6.31649 8.90237 5.68348 9.29289 5.29295Z" fill="currentColor" />
            </svg>
        );

        const CheckIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z" fill="currentColor" />
            </svg>
        );

        // Determine which icons to show
        let leadingIconElement = iconLeading ? (iconLeadingSwap || <CircleIcon />) : null;
        let trailingIconElement = iconTrailing ? (iconTrailingSwap || <ChevronRightIcon />) : null;

        // Handle flag element - support both ReactNode and string country codes
        // Flag is disabled when iconTrailing is true or both icons are enabled
        const shouldShowFlag = flag && !iconTrailing;
        let flagElement: React.ReactNode = null;
        if (shouldShowFlag) {
            if (typeof flag === 'string' && flag !== 'none') {
                flagElement = <img src={`/icons/Flags/${flag}.svg`} alt={flag} style={{ width: '100%', height: '100%' }} />;
            } else if (typeof flag !== 'string') {
                flagElement = flag;
            }
        }

        // Override icons when success state is active
        if (isSuccessState) {
            leadingIconElement = <CheckIcon />;
            trailingIconElement = null;
        }

        // Determine button text
        const buttonText = isSuccessState && successLabel ? successLabel : children;

        return (
            <AriaButton
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                className={buttonClasses}
                data-success={isSuccessState || undefined}
                data-loading={isLoading || undefined}
                aria-busy={isLoading || undefined}
            >
                {isLoading && (
                    <div className={styles.loader} aria-label="Loading">
                        <DotLottieReact
                            src={getLoaderPath()}
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                )}
                <span className={styles['button-content']} style={{ opacity: isLoading ? 0 : 1 }}>
                    {leadingIconElement && <span className={styles.icon}>{leadingIconElement}</span>}
                    {buttonText}
                    {trailingIconElement && <span className={styles.icon}>{trailingIconElement}</span>}
                    {shouldShowFlag && <span className={styles.flag}>{flagElement}</span>}
                </span>
            </AriaButton>
        );
    }
);

Button.displayName = 'Button';
