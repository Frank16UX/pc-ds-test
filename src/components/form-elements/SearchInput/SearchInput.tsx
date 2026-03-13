import React, { useState, useRef, useCallback } from 'react';
import {
    SearchField,
    Input,
    Label,
    Button,
} from 'react-aria-components';
import type { SearchFieldProps as AriaSearchFieldProps } from 'react-aria-components';
import styles from './SearchInput.module.scss';

export interface SearchInputProps extends Omit<AriaSearchFieldProps, 'children'> {
    /**
     * The label text displayed above the search input.
     * @default 'Search Products'
     */
    label?: string;

    /**
     * Whether to show the label.
     * @default true
     */
    labeled?: boolean;

    /**
     * Placeholder text shown when the input is empty.
     * @default 'Search by product or sku'
     */
    placeholder?: string;

    /**
     * Whether the search is in an active state (showing results).
     * When true, the search button becomes teal/active colored.
     * @default false
     */
    isActive?: boolean;

    /**
     * Callback when the search button is clicked or Enter is pressed.
     */
    onSearchSubmit?: (value: string) => void;

    /**
     * Content to render in the typeahead dropdown menu.
     * Pass TypeaheadMenu or custom content.
     */
    menuContent?: React.ReactNode;

    /**
     * Whether the typeahead menu is open.
     * @default false
     */
    isMenuOpen?: boolean;

    /**
     * Additional CSS class names.
     */
    className?: string;
}

export const SearchInput = React.forwardRef<HTMLDivElement, SearchInputProps>(
    (
        {
            label = 'Search Products',
            labeled = true,
            placeholder = 'Search by product or sku',
            isActive = false,
            onSearchSubmit,
            menuContent,
            isMenuOpen = false,
            className,
            value,
            defaultValue,
            onChange,
            ...props
        },
        ref
    ) => {
        const [inputValue, setInputValue] = useState(
            (value ?? defaultValue ?? '').toString()
        );
        const inputRef = useRef<HTMLInputElement>(null);

        const isFilled = inputValue.length > 0;

        const handleChange = useCallback(
            (val: string) => {
                setInputValue(val);
                onChange?.(val);
            },
            [onChange]
        );

        const handleSearchClick = useCallback(() => {
            onSearchSubmit?.(inputValue);
        }, [onSearchSubmit, inputValue]);

        const rootClasses = [
            styles['search-input'],
            isMenuOpen ? styles['menu-open'] : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div ref={ref} className={rootClasses}>
                <SearchField
                    {...props}
                    value={value !== undefined ? value.toString() : inputValue}
                    onChange={handleChange}
                    aria-label={!labeled ? label : undefined}
                    className={styles['search-field']}
                >
                    {labeled && (
                        <Label className={styles.label}>{label}</Label>
                    )}
                    <div className={styles['input-wrapper']}>
                        <div className={styles.content}>
                            <Input
                                ref={inputRef}
                                className={styles.input}
                                placeholder={placeholder}
                            />
                        </div>
                        <div className={styles.icons}>
                            {isFilled && (
                                <Button className={styles['clear-button']}>
                                    <span
                                        className={styles['clear-icon']}
                                        aria-hidden="true"
                                    />
                                </Button>
                            )}
                            <button
                                type="button"
                                className={[
                                    styles['search-button'],
                                    isActive ? styles['search-button-active'] : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={handleSearchClick}
                                aria-label="Search"
                            >
                                <span
                                    className={[
                                        styles['search-icon'],
                                        isActive ? styles['search-icon-active'] : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </SearchField>
                {isMenuOpen && menuContent && (
                    <div className={styles['typeahead-menu']}>
                        {menuContent}
                    </div>
                )}
            </div>
        );
    }
);

SearchInput.displayName = 'SearchInput';
