import React, { useState } from 'react';
import {
    TextField,
    TextFieldProps,
    Label,
    TextArea as AriaTextArea,
    Text,
} from 'react-aria-components';
import styles from './TextArea.module.scss';

export interface TextAreaProps extends Omit<TextFieldProps, 'children'> {
    /**
     * The label text displayed above the text area.
     */
    label?: string;

    /**
     * Whether to show the label.
     * @default true
     */
    labeled?: boolean;

    /**
     * Placeholder text shown when text area is empty.
     */
    placeholder?: string;

    /**
     * Whether to show the required indicator (*) next to the label.
     * @default false
     */
    isRequired?: boolean;

    /**
     * Helper text displayed below the text area.
     */
    helperText?: string;

    /**
     * Error message displayed when validation fails.
     */
    errorMessage?: string;

    /**
     * Whether the text area is in an error/invalid state.
     * @default false
     */
    isInvalid?: boolean;

    /**
     * Maximum character count for the counter.
     * @default 300
     */
    maxLength?: number;

    /**
     * Whether to show the character counter.
     * @default true
     */
    showCounter?: boolean;

    /**
     * Color scheme for light or dark backgrounds.
     * @default 'default'
     */
    surface?: 'default' | 'inverted';

    /**
     * Whether to show the tooltip icon next to the label.
     * @default false
     */
    tooltip?: boolean;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
    (
        {
            label = 'Text Area Label',
            labeled = true,
            placeholder = 'Placeholder',
            isRequired = false,
            helperText,
            errorMessage,
            isInvalid = false,
            isDisabled,
            isReadOnly,
            maxLength = 300,
            showCounter = true,
            surface = 'default',
            tooltip = false,
            className,
            value,
            defaultValue,
            onChange,
            ...props
        },
        ref
    ) => {
        const [charCount, setCharCount] = useState(
            () => (value ?? defaultValue ?? '').toString().length
        );

        const handleChange = (val: string) => {
            setCharCount(val.length);
            onChange?.(val);
        };

        const textFieldClasses = [
            styles['text-area'],
            surface === 'inverted' ? styles['surface-inverted'] : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <TextField
                {...props}
                ref={ref}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                isInvalid={isInvalid}
                isRequired={isRequired}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={textFieldClasses}
            >
                {labeled && (
                    <div className={styles['label-row']}>
                        <div className={styles['label-wrapper']}>
                            <Label className={styles.label}>{label}</Label>
                            {isRequired && (
                                <span className={styles.required}>*</span>
                            )}
                        </div>
                        {tooltip && (
                            <span className={styles['tooltip-icon']} aria-hidden="true" />
                        )}
                    </div>
                )}
                <AriaTextArea
                    className={styles.textarea}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
                <div className={styles['helper-counter-row']}>
                    {isInvalid && errorMessage ? (
                        <div className={styles['helper-row']}>
                            <span className={styles['helper-icon-wrapper']}>
                                <span
                                    aria-hidden="true"
                                    className={`${styles['helper-icon']} ${styles['helper-icon--error']}`}
                                />
                            </span>
                            <Text slot="errorMessage" className={styles['error-text']}>
                                {errorMessage}
                            </Text>
                        </div>
                    ) : helperText ? (
                        <div className={styles['helper-row']}>
                            <span className={styles['helper-icon-wrapper']}>
                                <span
                                    aria-hidden="true"
                                    className={`${styles['helper-icon']} ${styles['helper-icon--default']}`}
                                />
                            </span>
                            <Text slot="description" className={styles['helper-text']}>
                                {helperText}
                            </Text>
                        </div>
                    ) : null}
                    {showCounter && !isReadOnly && (
                        <span className={styles.counter}>
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>
            </TextField>
        );
    }
);

TextArea.displayName = 'TextArea';
