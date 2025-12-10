import React from 'react';
import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import styles from './Button.module.scss';

// Declare dotlottie-player web component
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'dotlottie-player': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    autoplay?: boolean;
                    loop?: boolean;
                    style?: React.CSSProperties;
                },
                HTMLElement
            >;
        }
    }
}

export interface ButtonProps extends AriaButtonProps {
    /**
     * The visual hierarchy of the button.
     * @default 'primary'
     */
    hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'destructive';

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
     * Whether the button is in a loading state.
     */
    isLoading?: boolean;

    /**
     * Whether the button is in a success state.
     */
    isSuccess?: boolean;

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
            hierarchy = 'primary',
            size = 'lg',
            surface = 'default',
            isLoading,
            isSuccess,
            iconLeading = false,
            iconLeadingSwap,
            iconTrailing = false,
            iconTrailingSwap,
            className,
            children,
            isDisabled,
            ...props
        },
        ref
    ) => {
        const buttonClasses = [
            styles.button,
            styles[hierarchy],
            styles[`size-${size}`],
            surface === 'inverted' ? styles['surface-inverted'] : '',
            className
        ]
            .filter(Boolean)
            .join(' ');

        // Determine which loader to use based on hierarchy and surface
        const getLoaderPath = () => {
            if (hierarchy === 'primary' || hierarchy === 'destructive') {
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
                <path d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="currentColor"/>
            </svg>
        );

        const ChevronRightIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29289 5.29295C9.68342 4.90243 10.3164 4.90243 10.707 5.29295L16.707 11.293C17.0975 11.6835 17.0975 12.3165 16.707 12.707L10.707 18.707C10.3164 19.0975 9.68342 19.0975 9.29289 18.707C8.90237 18.3165 8.90237 17.6835 9.29289 17.293L14.5859 12L9.29289 6.70702C8.90237 6.31649 8.90237 5.68348 9.29289 5.29295Z" fill="currentColor"/>
            </svg>
        );

        const CheckIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z" fill="currentColor"/>
            </svg>
        );

        // Determine which icons to show
        let leadingIconElement = iconLeading ? (iconLeadingSwap || <CircleIcon />) : null;
        let trailingIconElement = iconTrailing ? (iconTrailingSwap || <ChevronRightIcon />) : null;

        // Override icons when success state is active
        if (isSuccess) {
            leadingIconElement = <CheckIcon />;
            trailingIconElement = null;
        }

        return (
            <AriaButton
                {...props}
                ref={ref}
                isDisabled={isDisabled || isLoading}
                className={buttonClasses}
                data-loading={isLoading || undefined}
                data-success={isSuccess || undefined}
            >
                {isLoading && (
                    <div className={styles.loader}>
                        {React.createElement('dotlottie-player', {
                            src: getLoaderPath(),
                            autoplay: true,
                            loop: true,
                            style: { width: '100%', height: '100%' }
                        })}
                    </div>
                )}
                <span className={styles['button-content']}>
                    {leadingIconElement && <span className={styles.icon}>{leadingIconElement}</span>}
                    {children}
                    {trailingIconElement && <span className={styles.icon}>{trailingIconElement}</span>}
                </span>
            </AriaButton>
        );
    }
);

Button.displayName = 'Button';
