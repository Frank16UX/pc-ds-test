import React from 'react';
import {
    TextField,
    TextFieldProps,
    Input,
    Label,
    Text,
} from 'react-aria-components';
import styles from './TextInput.module.scss';

export interface TextInputProps extends Omit<TextFieldProps, 'children'> {
    /**
     * The label text displayed above the input field.
     */
    label?: string;

    /**
     * Whether to show the label.
     * @default true
     */
    labeled?: boolean;

    /**
     * Placeholder text shown when input is empty.
     */
    placeholder?: string;

    /**
     * Whether to show the required indicator (*) next to the label.
     * @default false
     */
    isRequired?: boolean;

    /**
     * Helper text displayed below the input field.
     */
    helperText?: string;

    /**
     * Error message displayed when validation fails.
     */
    errorMessage?: string;

    /**
     * Whether the input is in an error/invalid state.
     * @default false
     */
    isInvalid?: boolean;

    /**
     * Icon displayed at the start of the input field.
     */
    leadingIcon?: React.ReactNode;

    /**
     * Icon displayed at the end of the input field.
     */
    trailingIcon?: React.ReactNode;

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

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
    (
        {
            label = 'Input Label',
            labeled = true,
            placeholder = 'Placeholder',
            isRequired = false,
            helperText,
            errorMessage,
            isInvalid = false,
            isDisabled,
            isReadOnly,
            leadingIcon,
            trailingIcon,
            surface = 'default',
            tooltip = false,
            className,
            ...props
        },
        ref
    ) => {
        const textFieldClasses = [
            styles['text-input'],
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
                <div className={styles['input-wrapper']}>
                    {leadingIcon && (
                        <span className={styles['leading-icon']}>{leadingIcon}</span>
                    )}
                    <Input
                        className={styles.input}
                        placeholder={placeholder}
                    />
                    {trailingIcon && (
                        <span className={styles['trailing-icon']}>{trailingIcon}</span>
                    )}
                </div>
                {isInvalid && errorMessage ? (
                    <div className={styles['helper-row']}>
                        <span className={styles['helper-icon-wrapper']}>
                            <span className={styles['helper-icon-error']} aria-hidden="true" />
                        </span>
                        <Text slot="errorMessage" className={styles['error-text']}>
                            {errorMessage}
                        </Text>
                    </div>
                ) : helperText ? (
                    <div className={styles['helper-row']}>
                        <span className={styles['helper-icon-wrapper']}>
                            <span className={styles['helper-icon-default']} aria-hidden="true" />
                        </span>
                        <Text slot="description" className={styles['helper-text']}>
                            {helperText}
                        </Text>
                    </div>
                ) : null}
            </TextField>
        );
    }
);

TextInput.displayName = 'TextInput';
