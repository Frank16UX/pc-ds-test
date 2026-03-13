import React from 'react';
import {
    Checkbox as AriaCheckbox,
    CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'children'> {
    /**
     * The surface context where the checkbox is placed.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * Whether the checkbox is in an error state.
     * @default false
     */
    error?: boolean;

    /**
     * Error message text displayed when error is true.
     */
    errorText?: string;

    /**
     * The label text displayed next to the checkbox.
     */
    label: string;

    /**
     * Additional text displayed below the label.
     */
    helperText?: string;

    /**
     * Whether to show the required indicator (*).
     * @default false
     */
    required?: boolean;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
    (
        {
            surface = 'default',
            error = false,
            errorText,
            label,
            helperText,
            required = false,
            className,
            isDisabled,
            isIndeterminate,
            ...props
        },
        ref
    ) => {
        const checkboxClasses = [
            styles.checkbox,
            surface === 'inverted' ? styles['surface-inverted'] : '',
            error ? styles.error : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const helperId = helperText ? `${props.id || 'cb'}-helper` : undefined;
        const errorId = error && errorText ? `${props.id || 'cb'}-error` : undefined;
        const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

        return (
            <AriaCheckbox
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                isIndeterminate={isIndeterminate}
                className={checkboxClasses}
                aria-invalid={error || undefined}
                aria-describedby={describedBy}
                aria-required={required || undefined}
            >
                {({ isSelected, isIndeterminate: isIndet }) => (
                    <>
                        <div className={styles.control}>
                            <div className={styles.box}>
                                {isIndet ? (
                                    <img
                                        src="/icons/base/minus.svg"
                                        alt=""
                                        className={styles['check-icon']}
                                    />
                                ) : isSelected ? (
                                    <img
                                        src="/icons/base/check.svg"
                                        alt=""
                                        className={styles['check-icon']}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.content}>
                            <span className={styles.label}>
                                {label}
                                {required && <span className={styles.required}>*</span>}
                            </span>
                            {helperText && (
                                <span id={helperId} className={styles['helper-text']}>
                                    {helperText}
                                </span>
                            )}
                            {error && errorText && (
                                <span id={errorId} className={styles['error-row']}>
                                    <img
                                        src="/icons/helper-icons/error.svg"
                                        alt=""
                                        className={styles['error-icon']}
                                    />
                                    <span className={styles['error-text']}>{errorText}</span>
                                </span>
                            )}
                        </div>
                    </>
                )}
            </AriaCheckbox>
        );
    }
);

Checkbox.displayName = 'Checkbox';
