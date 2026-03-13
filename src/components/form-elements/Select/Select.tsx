import React from 'react';
import {
    Select as AriaSelect,
    SelectProps as AriaSelectProps,
    Label,
    Button,
    SelectValue,
    Popover,
    ListBox,
    Text,
} from 'react-aria-components';
import styles from './Select.module.scss';

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
    /**
     * The label text displayed above the select trigger.
     */
    label?: string;

    /**
     * Whether to show the label.
     * @default true
     */
    labeled?: boolean;

    /**
     * Whether to show the required indicator (*) next to the label.
     * @default false
     */
    isRequired?: boolean;

    /**
     * Helper text displayed below the select trigger.
     */
    helperText?: string;

    /**
     * Error message displayed when validation fails.
     */
    errorMessage?: string;

    /**
     * Whether the select is in an error/invalid state.
     * @default false
     */
    isInvalid?: boolean;

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
     * Placeholder text shown when no option is selected.
     * @default 'Select'
     */
    placeholder?: string;

    /**
     * Additional CSS class names.
     */
    className?: string;

    /**
     * Children (ListBox items).
     */
    children: React.ReactNode;
}

function SelectInner<T extends object>(
    {
        label = 'Select Label',
        labeled = true,
        isRequired = false,
        helperText,
        errorMessage,
        isInvalid = false,
        isDisabled,
        surface = 'default',
        tooltip = false,
        placeholder = 'Select',
        className,
        children,
        ...props
    }: SelectProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const selectClasses = [
        styles.select,
        surface === 'inverted' ? styles['surface-inverted'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AriaSelect
            {...props}
            ref={ref}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}
            placeholder={placeholder}
            className={selectClasses}
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
            <Button className={styles.trigger}>
                <SelectValue className={styles['select-value']} />
                <span className={styles.chevron} aria-hidden="true" />
            </Button>
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
            <Popover className={styles.popover} offset={-12}>
                {({placement}) => (
                    <>
                        {placement === 'bottom' && <div className={styles['spacer-top']} />}
                        <ListBox className={styles.listbox}>
                            {children}
                        </ListBox>
                        {placement === 'top' && <div className={styles['spacer-bottom']} />}
                    </>
                )}
            </Popover>
        </AriaSelect>
    );
}

export const Select = React.forwardRef(SelectInner) as <T extends object>(
    props: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(Select as React.FC).displayName = 'Select';
