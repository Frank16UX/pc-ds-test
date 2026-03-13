import React from 'react';
import { ToggleButton, ToggleButtonProps } from 'react-aria-components';
import styles from './Chip.module.scss';

export interface ChipProps extends Omit<ToggleButtonProps, 'children'> {
    /**
     * Visual style of the chip.
     * @default 'outline'
     */
    kind?: 'outline' | 'filled';

    /**
     * Controls height, padding, typography, and icon sizing.
     * @default 'md'
     */
    size?: 'md' | 'xl';

    /**
     * Sets the leading visual treatment.
     * @default 'icon'
     */
    leading?: 'icon' | 'image' | 'none';

    /**
     * Visible label text.
     */
    label: string;

    /**
     * Custom icon swap when leading="icon". Receives the default shopping-bag icon if not provided.
     */
    leadingIcon?: React.ReactNode;

    /**
     * Image URL when leading="image". Defaults to the placeholder image.
     */
    leadingImageSrc?: string;

    /**
     * Alt text for the leading image.
     * @default ''
     */
    leadingImageAlt?: string;

    /**
     * Called when the remove/dismiss affordance is activated (trailing X on selected chips).
     */
    onRemove?: (e: React.MouseEvent) => void;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

const DefaultLeadingIcon = () => (
    <span className={styles['default-leading-icon']} aria-hidden="true" />
);

const CheckIcon = () => <span className={styles['check-icon']} aria-hidden="true" />;

const DismissIcon = () => <span className={styles['dismiss-icon']} aria-hidden="true" />;

const DEFAULT_IMAGE_SRC = '/imgs/img-placeholder-square.jpg';

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
    (
        {
            kind = 'outline',
            size = 'md',
            leading = 'icon',
            label,
            leadingIcon,
            leadingImageSrc,
            leadingImageAlt = '',
            onRemove,
            className,
            isDisabled,
            isSelected,
            ...props
        },
        ref
    ) => {
        const handleRemove = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove?.(e);
        };

        const resolvedLeadingIcon = leadingIcon || <DefaultLeadingIcon />;
        const resolvedImageSrc = leadingImageSrc || DEFAULT_IMAGE_SRC;

        return (
            <ToggleButton
                {...props}
                ref={ref}
                isSelected={isSelected}
                isDisabled={isDisabled}
                className={({ isSelected: selected, isDisabled: disabled }) =>
                    [
                        styles.chip,
                        styles[kind],
                        styles[`size-${size}`],
                        leading !== 'none' ? styles[`leading-${leading}`] : '',
                        selected && !disabled ? styles['has-trailing'] : '',
                        className,
                    ]
                        .filter(Boolean)
                        .join(' ')
                }
            >
                {({ isSelected: selected }) => (
                    <>
                        {leading === 'icon' && (
                            <span className={styles['leading-icon-wrapper']}>{resolvedLeadingIcon}</span>
                        )}
                        {leading === 'image' && (
                            <span className={styles['leading-image-wrapper']}>
                                <img src={resolvedImageSrc} alt={leadingImageAlt} />
                            </span>
                        )}
                        <span className={styles.label}>{label}</span>
                        {kind === 'outline' && selected && !isDisabled && (
                            <span className={styles['trailing-check']}>
                                <CheckIcon />
                            </span>
                        )}
                        {kind === 'filled' && selected && !isDisabled && (
                            <span
                                className={styles['dismiss-icon-wrapper']}
                                onClick={handleRemove}
                                role="img"
                                aria-label={`Remove ${label}`}
                            >
                                <DismissIcon />
                            </span>
                        )}
                    </>
                )}
            </ToggleButton>
        );
    }
);

Chip.displayName = 'Chip';
