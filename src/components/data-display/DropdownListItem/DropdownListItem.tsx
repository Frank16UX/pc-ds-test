import React from 'react';
import ReactDOM from 'react-dom';
import {
    ListBoxItem,
    ListBoxItemProps,
} from 'react-aria-components';
import styles from './DropdownListItem.module.scss';

export type DropdownListItemKind = 'default' | 'iconLeading' | 'avatar' | 'thumbnail';

export interface DropdownListItemProps extends ListBoxItemProps {
    /**
     * Primary text displayed in the list item.
     */
    label?: string;

    /**
     * Determines the leading element style.
     * - `default`: no leading element
     * - `iconLeading`: small icon (20px)
     * - `avatar`: circular image (40px)
     * - `thumbnail`: rounded image (40px)
     * @default 'default'
     */
    kind?: DropdownListItemKind;

    /**
     * Whether to show a checkbox control as the leading element (for multi-select).
     * @default false
     */
    showCheckbox?: boolean;

    /**
     * Icon node for `iconLeading` kind.
     */
    leadingIcon?: React.ReactNode;

    /**
     * Image URL for `avatar` or `thumbnail` kind.
     */
    leadingImage?: string;

    /**
     * Whether to show a trailing chevron-right icon.
     * @default false
     */
    showTrailingIcon?: boolean;

    /**
     * Whether to show supporting text below the primary label.
     * @default false
     */
    showSupportingText?: boolean;

    /**
     * Supporting text displayed below the primary label.
     */
    supportingText?: string;

    /**
     * Whether to show a suffix on the trailing edge.
     * @default false
     */
    showSuffix?: boolean;

    /**
     * Suffix text displayed on the trailing edge (e.g. count).
     */
    suffixText?: string;

    /**
     * Whether to show the selected checkmark icon (for kind=default, isSelected=true).
     * Controlled internally based on selection state when showSelectedIcon is true.
     * @default true
     */
    showSelectedIcon?: boolean;

    /**
     * Submenu content to display on hover/click when showTrailingIcon is true.
     * The submenu automatically positions to the right or left based on available space.
     * When provided, the parent DropdownMenu should use selectionMode="none"
     * since these items act as navigation triggers, not selectable options.
     */
    subItems?: React.ReactNode;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const DropdownListItem = React.forwardRef<HTMLDivElement, DropdownListItemProps>(
    (
        {
            label,
            kind = 'default',
            showCheckbox = false,
            leadingIcon,
            leadingImage,
            showTrailingIcon = false,
            showSupportingText = false,
            supportingText,
            showSuffix = false,
            suffixText,
            showSelectedIcon = true,
            subItems,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const hasSubmenu = !!(showTrailingIcon && subItems);
        const itemRef = React.useRef<HTMLDivElement>(null);
        const submenuRef = React.useRef<HTMLDivElement>(null);
        const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
        const [submenuOpen, setSubmenuOpen] = React.useState(false);
        const [submenuPosition, setSubmenuPosition] = React.useState<{
            top: number;
            left: number;
            side: 'right' | 'left';
        } | null>(null);

        const calculatePosition = React.useCallback(() => {
            const el = itemRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const submenuWidth = 280;
            const gap = 4;
            const viewportWidth = window.innerWidth;

            const spaceRight = viewportWidth - rect.right;
            const spaceLeft = rect.left;

            let left: number;
            let side: 'right' | 'left';

            if (spaceRight >= submenuWidth + gap) {
                left = rect.right + gap;
                side = 'right';
            } else if (spaceLeft >= submenuWidth + gap) {
                left = rect.left - submenuWidth - gap;
                side = 'left';
            } else {
                left = rect.right + gap;
                side = 'right';
            }

            setSubmenuPosition({
                top: rect.top,
                left,
                side,
            });
        }, []);

        const openSubmenu = React.useCallback(() => {
            calculatePosition();
            setSubmenuOpen(true);
        }, [calculatePosition]);

        const handleMouseEnter = React.useCallback(() => {
            if (!hasSubmenu) return;
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = setTimeout(openSubmenu, 150);
        }, [hasSubmenu, openSubmenu]);

        const handleMouseLeave = React.useCallback(() => {
            if (!hasSubmenu) return;
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = setTimeout(() => {
                setSubmenuOpen(false);
            }, 200);
        }, [hasSubmenu]);

        const handleSubmenuMouseEnter = React.useCallback(() => {
            clearTimeout(hoverTimeoutRef.current);
        }, []);

        const handleSubmenuMouseLeave = React.useCallback(() => {
            hoverTimeoutRef.current = setTimeout(() => {
                setSubmenuOpen(false);
            }, 200);
        }, []);

        // Toggle submenu on click/action for items with submenus
        const handleAction = React.useCallback(() => {
            if (!hasSubmenu) return;
            if (submenuOpen) {
                setSubmenuOpen(false);
            } else {
                openSubmenu();
            }
        }, [hasSubmenu, submenuOpen, openSubmenu]);

        React.useEffect(() => {
            return () => clearTimeout(hoverTimeoutRef.current);
        }, []);

        const itemClasses = [
            styles['dropdown-list-item'],
            hasSubmenu && submenuOpen ? styles['dropdown-list-item-submenu-open'] : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const renderLeading = () => {
            if (kind === 'iconLeading' && leadingIcon) {
                return <span className={styles['leading-icon']}>{leadingIcon}</span>;
            }
            if (kind === 'avatar') {
                return (
                    <span className={styles['leading-avatar']}>
                        {leadingImage
                            ? <img src={leadingImage} alt="" className={styles['leading-img']} />
                            : <span className={styles['leading-avatar-placeholder']} />}
                    </span>
                );
            }
            if (kind === 'thumbnail') {
                return (
                    <span className={styles['leading-thumbnail']}>
                        {leadingImage
                            ? <img src={leadingImage} alt="" className={styles['leading-img']} />
                            : <span className={styles['leading-thumbnail-placeholder']} />}
                    </span>
                );
            }
            return null;
        };

        return (
            <>
                <ListBoxItem
                    {...props}
                    ref={(node) => {
                        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        if (typeof ref === 'function') ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    className={itemClasses}
                    textValue={label || (typeof children === 'string' ? children : undefined)}
                    onHoverStart={hasSubmenu ? handleMouseEnter : undefined}
                    onHoverEnd={hasSubmenu ? handleMouseLeave : undefined}
                    onAction={hasSubmenu ? handleAction : undefined}
                >
                    {({ isSelected }) => (
                        <div className={`${styles.content}${isSelected && !showCheckbox ? ` ${styles['content-selected']}` : ''}`}>
                            {showCheckbox && (
                                <span
                                    className={[
                                        styles.checkbox,
                                        isSelected ? styles['checkbox-selected'] : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    aria-hidden="true"
                                >
                                    {isSelected && (
                                        <img
                                            src="/icons/base/check.svg"
                                            alt=""
                                            className={styles['checkbox-icon']}
                                        />
                                    )}
                                </span>
                            )}
                            {renderLeading()}
                            <div className={styles.text}>
                                <span className={`${styles['primary-text']}${isSelected && !showCheckbox ? ` ${styles['primary-text-selected']}` : ''}`}>
                                    {(children as React.ReactNode) || label}
                                </span>
                                {showSupportingText && supportingText && (
                                    <span className={styles['supporting-text']}>
                                        {supportingText}
                                    </span>
                                )}
                            </div>
                            {showSuffix && suffixText && (
                                <span className={styles['suffix-text']}>
                                    {suffixText}
                                </span>
                            )}
                            {kind === 'default' && !showCheckbox && isSelected && showSelectedIcon && (
                                <span className={styles['trailing-checkmark']} aria-hidden="true">
                                    <img
                                        src="/icons/base/check.svg"
                                        alt=""
                                        className={styles['trailing-checkmark-icon']}
                                    />
                                </span>
                            )}
                            {showTrailingIcon && (
                                <span className={styles['trailing-icon']} aria-hidden="true">
                                    <img
                                        src="/icons/base/chevron-right.svg"
                                        alt=""
                                        className={styles['trailing-icon-img']}
                                    />
                                </span>
                            )}
                        </div>
                    )}
                </ListBoxItem>
                {hasSubmenu && submenuOpen && submenuPosition && ReactDOM.createPortal(
                    <div
                        ref={submenuRef}
                        className={styles.submenu}
                        style={{
                            top: submenuPosition.top,
                            left: submenuPosition.left,
                        }}
                        onMouseEnter={handleSubmenuMouseEnter}
                        onMouseLeave={handleSubmenuMouseLeave}
                    >
                        {subItems}
                    </div>,
                    document.body
                )}
            </>
        );
    }
);

DropdownListItem.displayName = 'DropdownListItem';
