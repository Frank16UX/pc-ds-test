import React from 'react';
import {
    Radio as AriaRadio,
    RadioProps as AriaRadioProps,
} from 'react-aria-components';
import styles from './RadioButton.module.scss';

export interface RadioButtonProps extends Omit<AriaRadioProps, 'children'> {
    /**
     * The background surface type.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * Whether the radio button is in an error state.
     * @default false
     */
    error?: boolean;

    /**
     * Error message displayed when error is true.
     */
    errorText?: string;

    /**
     * The main label text.
     */
    label: string;

    /**
     * Supporting text displayed below the label.
     */
    supportingText?: string;

    /**
     * Whether to display the required asterisk (*).
     * @default false
     */
    required?: boolean;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export { RadioGroup } from 'react-aria-components';
export type { RadioGroupProps } from 'react-aria-components';

export const RadioButton = React.forwardRef<HTMLLabelElement, RadioButtonProps>(
    (
        {
            surface = 'default',
            error = false,
            errorText,
            label,
            supportingText,
            required = false,
            className,
            isDisabled,
            ...props
        },
        ref
    ) => {
        const radioClasses = [
            styles.radio,
            surface === 'inverted' ? styles['surface-inverted'] : '',
            error ? styles.error : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const supportingId = supportingText ? `${props.id || props.value || 'rb'}-supporting` : undefined;
        const errorId = error && errorText ? `${props.id || props.value || 'rb'}-error` : undefined;
        const describedBy = [supportingId, errorId].filter(Boolean).join(' ') || undefined;

        return (
            <AriaRadio
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                className={radioClasses}
                aria-describedby={describedBy}
            >
                {({ isSelected }) => (
                    <>
                        <div className={styles.control}>
                            <div className={styles.circle}>
                                {isSelected && <div className={styles.dot} />}
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles['text-block']}>
                                <span className={styles['label-row']}>
                                    <span className={styles.label}>{label}</span>
                                    {required && <span className={styles.required}>*</span>}
                                </span>
                                {supportingText && (
                                    <span id={supportingId} className={styles['supporting-text']}>
                                        {supportingText}
                                    </span>
                                )}
                            </div>
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
            </AriaRadio>
        );
    }
);

RadioButton.displayName = 'RadioButton';
