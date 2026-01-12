import React from 'react';
import { Link as AriaLink, LinkProps as AriaLinkProps } from 'react-aria-components';
import styles from './TextLink.module.scss';

export interface TextLinkProps extends AriaLinkProps {
    /**
     * The size of the text link.
     * @default 'sm'
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /**
     * The surface context where the text link is placed.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * If true, displays the default chevron-right icon on the right side of the link text.
     * @default true
     */
    iconTrailing?: boolean;

    /**
     * Custom icon to display on the right side. Requires iconTrailing to be true.
     * @default chevron-right
     */
    iconTrailingSwap?: React.ReactNode;

    /**
     * Additional CSS class names.
     */
    className?: string;

    /**
     * Link content.
     */
    children?: React.ReactNode;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
    (
        {
            size = 'sm',
            surface = 'default',
            iconTrailing = true,
            iconTrailingSwap,
            className,
            children,
            isDisabled,
            ...props
        },
        ref
    ) => {
        const linkClasses = [
            styles.textLink,
            styles[`size-${size}`],
            surface === 'inverted' ? styles['surface-inverted'] : '',
            className
        ]
            .filter(Boolean)
            .join(' ');

        // Default chevron-right icon
        const ChevronRightIcon = () => (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29289 5.29295C9.68342 4.90243 10.3164 4.90243 10.707 5.29295L16.707 11.293C17.0975 11.6835 17.0975 12.3165 16.707 12.707L10.707 18.707C10.3164 19.0975 9.68342 19.0975 9.29289 18.707C8.90237 18.3165 8.90237 17.6835 9.29289 17.293L14.5859 12L9.29289 6.70702C8.90237 6.31649 8.90237 5.68348 9.29289 5.29295Z" fill="currentColor" />
            </svg>
        );

        // Determine trailing icon
        const trailingIconElement = iconTrailing ? (iconTrailingSwap || <ChevronRightIcon />) : null;

        return (
            <AriaLink
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                className={linkClasses}
            >
                <span className={styles.label}>{children}</span>
                {trailingIconElement && <span className={styles.icon}>{trailingIconElement}</span>}
            </AriaLink>
        );
    }
);

TextLink.displayName = 'TextLink';
