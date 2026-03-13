import React from 'react';
import {
    Switch as AriaSwitch,
    SwitchProps as AriaSwitchProps,
} from 'react-aria-components';
import styles from './Switch.module.scss';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
    /**
     * Main text label shown next to the switch.
     */
    label?: string;

    /**
     * Supporting text shown below the label.
     */
    supportingText?: string;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
    (
        {
            label,
            supportingText,
            className,
            isDisabled,
            id,
            'aria-describedby': ariaDescribedBy,
            ...props
        },
        ref
    ) => {
        const switchClasses = [styles.switch, className].filter(Boolean).join(' ');
        const fallbackId = React.useId();
        const baseId = id || fallbackId;

        const supportingId = supportingText ? `${baseId}-supporting` : undefined;
        const describedBy = [ariaDescribedBy, supportingId].filter(Boolean).join(' ') || undefined;

        return (
            <AriaSwitch
                {...props}
                id={id}
                ref={ref}
                isDisabled={isDisabled}
                className={switchClasses}
                aria-describedby={describedBy}
            >
                <div className={styles.control}>
                    <div className={styles.track}>
                        <div className={styles.thumb} />
                    </div>
                </div>
                {(label || supportingText) && (
                    <div className={styles.content}>
                        {label && <span className={styles.label}>{label}</span>}
                        {supportingText && (
                            <span id={supportingId} className={styles['supporting-text']}>
                                {supportingText}
                            </span>
                        )}
                    </div>
                )}
            </AriaSwitch>
        );
    }
);

Switch.displayName = 'Switch';
