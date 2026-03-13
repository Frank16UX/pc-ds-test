import React from 'react';
import {
    Breadcrumbs as AriaBreadcrumbs,
    Breadcrumb as AriaBreadcrumb,
    Link as AriaLink,
} from 'react-aria-components';
import styles from './Breadcrumb.module.scss';

export interface BreadcrumbItemDef {
    /** The text label for the breadcrumb link. */
    label: string;
    /** URL for the breadcrumb link. Omit for the current page. */
    href?: string;
}

export interface BreadcrumbProps {
    /**
     * Array of breadcrumb items. The last item is treated as the current page.
     */
    items: BreadcrumbItemDef[];

    /**
     * If true, displays a "Back" button before the breadcrumb trail.
     * @default true
     */
    showBack?: boolean;

    /**
     * Callback when the Back button is clicked.
     */
    onBack?: () => void;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
    ({ items, showBack = true, onBack, className }, ref) => {
        const containerClasses = [styles.breadcrumb, className]
            .filter(Boolean)
            .join(' ');

        return (
            <nav ref={ref} className={containerClasses} aria-label="Breadcrumb">
                <div className={styles.wrapper}>
                    {showBack && (
                        <>
                            <button
                                type="button"
                                className={styles['back-button']}
                                onClick={onBack}
                            >
                                <span
                                    className={styles['back-icon']}
                                    aria-hidden="true"
                                />
                                <span className={styles['back-label']}>Back</span>
                                <span
                                    className={styles['back-target-area']}
                                    aria-hidden="true"
                                />
                            </button>
                            <span
                                className={styles.divider}
                                aria-hidden="true"
                            />
                        </>
                    )}
                    <AriaBreadcrumbs className={styles.links}>
                        {items.map((item, index) => {
                            const isCurrent = index === items.length - 1;
                            return (
                                <AriaBreadcrumb
                                    key={index}
                                    className={styles['crumb-item']}
                                >
                                    {!isCurrent && (
                                        <>
                                            <AriaLink
                                                href={item.href}
                                                className={styles['crumb-link']}
                                            >
                                                {item.label}
                                            </AriaLink>
                                            <span
                                                className={styles.separator}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                    {isCurrent && (
                                        <span className={styles['crumb-current']}>
                                            {item.label}
                                        </span>
                                    )}
                                </AriaBreadcrumb>
                            );
                        })}
                    </AriaBreadcrumbs>
                </div>
            </nav>
        );
    }
);

Breadcrumb.displayName = 'Breadcrumb';
