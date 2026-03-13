import React from 'react';
import {
    ListBox,
    ListBoxProps,
} from 'react-aria-components';
import styles from './DropdownMenu.module.scss';

export interface DropdownMenuProps<T extends object> extends ListBoxProps<T> {
    /**
     * Content sizing behavior.
     * - `overflow`: Fixed max height with scrollbar (for >6 items).
     * - `hug`: Auto height fitting all items (for <=6 items).
     * @default 'overflow'
     */
    content?: 'overflow' | 'hug';

    /**
     * Adds top spacing so the menu doesn't overlap the trigger when positioned above.
     * @default false
     */
    positionAbove?: boolean;

    /**
     * Adds bottom spacing so the menu doesn't overlap the trigger when positioned below.
     * @default false
     */
    positionBelow?: boolean;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

function DropdownMenuInner<T extends object>(
    {
        content = 'overflow',
        positionAbove = false,
        positionBelow = false,
        className,
        children,
        ...props
    }: DropdownMenuProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const menuClasses = [
        styles['dropdown-menu'],
        content === 'hug' ? styles['content-hug'] : styles['content-overflow'],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={ref} className={menuClasses}>
            {positionAbove && <div className={styles['spacer-top']} />}
            <ListBox
                {...props}
                className={styles.container}
            >
                {children}
            </ListBox>
            {positionBelow && <div className={styles['spacer-bottom']} />}
        </div>
    );
}

export const DropdownMenu = React.forwardRef(DropdownMenuInner) as <T extends object>(
    props: DropdownMenuProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(DropdownMenu as React.FC).displayName = 'DropdownMenu';
