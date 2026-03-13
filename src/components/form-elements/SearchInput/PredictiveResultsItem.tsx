import React from 'react';
import styles from './SearchInput.module.scss';

export interface PredictiveResultsItemProps {
    /**
     * Primary text for the result item.
     */
    primaryText: string;

    /**
     * Supporting/secondary text (e.g., category name).
     */
    supportingText?: string;

    /**
     * Whether this is a recent search item (shows history icon + delete button).
     * @default false
     */
    isRecentSearch?: boolean;

    /**
     * Bold portion of the text (for search suggestion highlighting).
     * When provided, primaryText becomes the non-bold continuation.
     */
    highlightText?: string;

    /**
     * Leading icon element (overrides default history icon).
     */
    leadingIcon?: React.ReactNode;

    /**
     * Callback when the delete/remove button is clicked (for recent searches).
     */
    onRemove?: () => void;

    /**
     * Callback when the item is clicked.
     */
    onSelect?: () => void;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const PredictiveResultsItem = React.forwardRef<HTMLDivElement, PredictiveResultsItemProps>(
    (
        {
            primaryText,
            supportingText,
            isRecentSearch = false,
            highlightText,
            leadingIcon,
            onRemove,
            onSelect,
            className,
        },
        ref
    ) => {
        const itemClasses = [styles['result-item'], className]
            .filter(Boolean)
            .join(' ');

        return (
            <div
                ref={ref}
                className={itemClasses}
                role="option"
                tabIndex={0}
                onClick={onSelect}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect?.();
                    }
                }}
            >
                {isRecentSearch && !leadingIcon && (
                    <span className={styles['history-icon']} aria-hidden="true" />
                )}
                {leadingIcon && (
                    <span className={styles['result-leading-icon']}>
                        {leadingIcon}
                    </span>
                )}
                <div className={styles['result-text']}>
                    <div className={styles['result-primary-row']}>
                        {highlightText ? (
                            <>
                                <span className={styles['result-highlight']}>
                                    {highlightText}
                                </span>
                                <span className={styles['result-continuation']}>
                                    {primaryText}
                                </span>
                            </>
                        ) : (
                            <span className={styles['result-primary']}>
                                {primaryText}
                            </span>
                        )}
                    </div>
                    {supportingText && (
                        <span className={styles['result-supporting']}>
                            {supportingText}
                        </span>
                    )}
                </div>
                {isRecentSearch && onRemove && (
                    <button
                        type="button"
                        className={styles['remove-button']}
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        aria-label={`Remove ${primaryText}`}
                    >
                        <span className={styles['remove-icon']} aria-hidden="true" />
                    </button>
                )}
            </div>
        );
    }
);

PredictiveResultsItem.displayName = 'PredictiveResultsItem';
