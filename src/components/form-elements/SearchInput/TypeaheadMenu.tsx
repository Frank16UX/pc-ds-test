import React from 'react';
import styles from './SearchInput.module.scss';

export interface TypeaheadMenuProps {
    /**
     * Section label (e.g., "RECENT SEARCHES", "SEARCH SUGGESTIONS").
     */
    sectionLabel?: string;

    /**
     * Whether to show the "No results for this search" message.
     * @default false
     */
    noResults?: boolean;

    /**
     * Whether to show loading skeleton placeholders.
     * @default false
     */
    isLoading?: boolean;

    /**
     * Number of skeleton rows to display when loading.
     * @default 6
     */
    skeletonCount?: number;

    /**
     * Children (PredictiveResultsItem elements).
     */
    children?: React.ReactNode;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const TypeaheadMenu = React.forwardRef<HTMLDivElement, TypeaheadMenuProps>(
    (
        {
            sectionLabel,
            noResults = false,
            isLoading = false,
            skeletonCount = 6,
            children,
            className,
        },
        ref
    ) => {
        const menuClasses = [styles['menu-container'], className]
            .filter(Boolean)
            .join(' ');

        return (
            <div ref={ref} className={menuClasses} role="listbox">
                <div className={styles['menu-spacer-top']} />
                <div className={styles['menu-content']}>
                    <div className={styles['menu-items']}>
                        {sectionLabel && (
                            <div className={styles['section-divider']}>
                                <div className={styles['section-divider-content']}>
                                    <span className={styles['section-label']}>
                                        {sectionLabel}
                                    </span>
                                </div>
                            </div>
                        )}
                        {isLoading ? (
                            Array.from({ length: skeletonCount }).map((_, i) => (
                                <div key={i} className={styles['skeleton-row']}>
                                    <div className={styles['skeleton-line']} />
                                </div>
                            ))
                        ) : noResults ? (
                            <div className={styles['no-results']}>
                                No results for this search
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

TypeaheadMenu.displayName = 'TypeaheadMenu';
