import React from 'react';
import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import styles from './IconButton.module.scss';

export interface IconButtonProps extends AriaButtonProps {
    /**
     * The size of the icon button.
     * - sm: 32x32px, no border
     * - md: 40x40px, 1px border
     * - lg: 48x48px, 1px border
     * - xl: 72x72px, 2px border
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /**
     * The icon to display in the button.
     * Can be an SVG element, img element, or any React node.
     */
    icon: React.ReactNode;

    /**
     * Whether to show the item counter next to the icon.
     * When true, the button width expands to accommodate the counter.
     * - If showIndicator is true: displays itemCount with accent color
     * - If showIndicator is false: displays "0" with tertiary color
     * @default false
     */
    showCounter?: boolean;

    /**
     * The count to display when showCounter is true and showIndicator is true.
     * Only applies when items have been added (e.g., cart items, favorites).
     * @default 1
     */
    itemCount?: number | string;

    /**
     * Whether there are items added (e.g., items in cart, saved favorites).
     * - When true with showCounter: shows itemCount with accent color, no dot
     * - When true without showCounter: shows dot indicator
     * - When false with showCounter: shows "0" with tertiary color
     * @default false
     */
    showIndicator?: boolean;

    /**
     * Accessible label for the button.
     * Required since icon buttons have no visible text.
     */
    'aria-label': string;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            size = 'md',
            icon,
            showCounter = false,
            itemCount = 1,
            showIndicator = false,
            className,
            isDisabled,
            ...props
        },
        ref
    ) => {
        const buttonClasses = [
            styles.iconButton,
            styles[`size-${size}`],
            showCounter ? styles.withCounter : '',
            className
        ]
            .filter(Boolean)
            .join(' ');

        // Determine what to show in counter and its style
        // showCounter=true + showIndicator=true: show itemCount with accent color
        // showCounter=true + showIndicator=false: show "0" with tertiary color
        const displayCount = showCounter && showIndicator ? itemCount : 0;

        // Only show dot indicator when showIndicator=true AND showCounter=false
        const shouldShowDotIndicator = showIndicator && !showCounter;

        return (
            <AriaButton
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                className={buttonClasses}
            >
                <span className={styles.icon}>{icon}</span>

                {showCounter && (
                    <span
                        className={styles.counter}
                        data-has-indicator={showIndicator || undefined}
                    >
                        {displayCount}
                    </span>
                )}

                {shouldShowDotIndicator && (
                    <span className={styles.indicator} />
                )}
            </AriaButton>
        );
    }
);

IconButton.displayName = 'IconButton';
