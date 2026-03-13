import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
    /**
     * Controls height, padding, typography, and icon sizing.
     * @default 'md'
     */
    size?: 'md' | 'sm';

    /**
     * Color scheme for light or dark backgrounds.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * If true, displays only the icon without label text.
     * @default false
     */
    iconOnly?: boolean;

    /**
     * The text content displayed in the badge.
     * @default 'Badge Label'
     */
    label?: string;

    /**
     * If true, displays an icon before the label text.
     * @default true
     */
    leadingIcon?: boolean;

    /**
     * Custom icon to replace the default guarantee icon.
     */
    swapLeadingIcon?: React.ReactNode;

    /**
     * Additional CSS class names.
     */
    className?: string;

    /**
     * Accessible label. Required when iconOnly is true.
     */
    'aria-label'?: string;
}

const DefaultIcon = ({ className }: { className?: string }) => (
    <span className={className} aria-hidden="true" />
);

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            size = 'md',
            surface = 'default',
            iconOnly = false,
            label = 'Badge Label',
            leadingIcon = true,
            swapLeadingIcon,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const badgeClasses = [
            styles.badge,
            styles[`size-${size}`],
            surface === 'inverted' ? styles['surface-inverted'] : '',
            iconOnly ? styles['icon-only'] : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <span
                ref={ref}
                className={badgeClasses}
                aria-label={iconOnly ? ariaLabel || label : undefined}
                role={iconOnly ? 'img' : undefined}
            >
                {surface === 'inverted' && (
                    <span className={styles['bg-overlay']} aria-hidden="true" />
                )}
                {leadingIcon && (
                    <span className={styles['leading-icon-wrapper']}>
                        {swapLeadingIcon || <DefaultIcon className={styles['default-icon']} />}
                    </span>
                )}
                {!iconOnly && <span className={styles.label}>{label}</span>}
            </span>
        );
    }
);

Badge.displayName = 'Badge';
