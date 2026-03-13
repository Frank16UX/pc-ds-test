import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../../src/components/form-elements/SearchInput';
import { TypeaheadMenu } from '../../src/components/form-elements/SearchInput';
import { PredictiveResultsItem } from '../../src/components/form-elements/SearchInput';
import React, { useState } from 'react';

const meta: Meta<typeof SearchInput> = {
    title: 'Components/Form Elements/Input/Search',
    component: SearchInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
        },
        labeled: {
            control: 'boolean',
        },
        placeholder: {
            control: 'text',
        },
        isActive: {
            control: 'boolean',
        },
        isMenuOpen: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

const recentSearches = [
    { id: '1', text: 'air fryer', category: 'Small Appliances' },
    { id: '2', text: 'deluxe coffee machine', category: 'Small Appliances' },
    { id: '3', text: 'pizza cutter', category: 'Cookware & Bakeware' },
    { id: '4', text: 'pizza stone', category: 'Cookware & Bakeware' },
    { id: '5', text: 'pumpkin cinnamon rolls', category: 'Recipes' },
    { id: '6', text: 'cheesy bacon pasta', category: 'Recipes' },
    { id: '7', text: 'garlic & herb beef tenderloin', category: 'Recipes' },
    { id: '8', text: 'layered pumpkin dessert', category: 'Recipes' },
];

const searchSuggestions = [
    'accessories',
    'replacement parts',
    'faqs',
    'cooking guide',
    'recipes',
    'discounts',
];

export const Default: Story = {
    args: {
        label: 'Search Products',
        placeholder: 'Search by product or sku',
    },
    render: (args) => (
        <div style={{ width: '400px' }}>
            <SearchInput {...args} />
        </div>
    ),
};

export const WithoutLabel: Story = {
    args: {
        label: 'Search Products',
        labeled: false,
        placeholder: 'Search by product or sku',
    },
    render: (args) => (
        <div style={{ width: '400px' }}>
            <SearchInput {...args} />
        </div>
    ),
};

export const WithRecentSearches: Story = {
    args: {
        label: 'Search Products',
        isMenuOpen: true,
    },
    render: (args) => (
        <div style={{ width: '400px', paddingBottom: '500px' }}>
            <SearchInput
                {...args}
                menuContent={
                    <TypeaheadMenu sectionLabel="RECENT SEARCHES">
                        {recentSearches.map((item) => (
                            <PredictiveResultsItem
                                key={item.id}
                                primaryText={item.text}
                                supportingText={item.category}
                                isRecentSearch
                                onRemove={() => console.log('Remove:', item.text)}
                                onSelect={() => console.log('Select:', item.text)}
                            />
                        ))}
                    </TypeaheadMenu>
                }
            />
        </div>
    ),
};

export const WithSearchSuggestions: Story = {
    args: {
        label: 'Search Products',
        isActive: true,
        isMenuOpen: true,
    },
    render: (args) => (
        <div style={{ width: '400px', paddingBottom: '400px' }}>
            <SearchInput
                {...args}
                defaultValue="air fryer"
                menuContent={
                    <TypeaheadMenu sectionLabel="SEARCH SUGGESTIONS">
                        {searchSuggestions.map((suggestion) => (
                            <PredictiveResultsItem
                                key={suggestion}
                                primaryText={suggestion}
                                highlightText="air fryer"
                                onSelect={() => console.log('Select suggestion:', suggestion)}
                            />
                        ))}
                    </TypeaheadMenu>
                }
            />
        </div>
    ),
};

export const Loading: Story = {
    args: {
        label: 'Search Products',
        isActive: true,
        isMenuOpen: true,
    },
    render: (args) => (
        <div style={{ width: '400px', paddingBottom: '400px' }}>
            <SearchInput
                {...args}
                defaultValue="air fryer"
                menuContent={
                    <TypeaheadMenu sectionLabel="LOADING RESULTS" isLoading />
                }
            />
        </div>
    ),
};

export const NoResults: Story = {
    args: {
        label: 'Search Products',
        isActive: true,
        isMenuOpen: true,
    },
    render: (args) => (
        <div style={{ width: '400px', paddingBottom: '150px' }}>
            <SearchInput
                {...args}
                defaultValue="air fryer"
                menuContent={
                    <TypeaheadMenu noResults />
                }
            />
        </div>
    ),
};

const InteractiveDemo = () => {
    const [value, setValue] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [items, setItems] = useState(recentSearches);

    const handleFocus = () => {
        setMenuOpen(true);
    };

    const handleChange = (val: string) => {
        setValue(val);
        setMenuOpen(val.length > 0 || true);
    };

    const handleRemove = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const isSearching = value.length > 0;

    return (
        <div style={{ width: '400px', paddingBottom: '500px' }}>
            <SearchInput
                label="Search Products"
                value={value}
                onChange={handleChange}
                isActive={isSearching}
                isMenuOpen={menuOpen}
                onFocus={handleFocus}
                onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                menuContent={
                    isSearching ? (
                        <TypeaheadMenu sectionLabel="SEARCH SUGGESTIONS">
                            {searchSuggestions.map((s) => (
                                <PredictiveResultsItem
                                    key={s}
                                    primaryText={s}
                                    highlightText={value}
                                    onSelect={() => {
                                        setValue(`${value} ${s}`);
                                        setMenuOpen(false);
                                    }}
                                />
                            ))}
                        </TypeaheadMenu>
                    ) : (
                        <TypeaheadMenu sectionLabel="RECENT SEARCHES">
                            {items.map((item) => (
                                <PredictiveResultsItem
                                    key={item.id}
                                    primaryText={item.text}
                                    supportingText={item.category}
                                    isRecentSearch
                                    onRemove={() => handleRemove(item.id)}
                                    onSelect={() => {
                                        setValue(item.text);
                                        setMenuOpen(false);
                                    }}
                                />
                            ))}
                        </TypeaheadMenu>
                    )
                }
            />
        </div>
    );
};

export const Interactive: Story = {
    render: () => <InteractiveDemo />,
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
            <SearchInput label="Default" placeholder="Search by product or sku" />
            <SearchInput
                label="Without Label"
                labeled={false}
                placeholder="Search by product or sku"
            />
        </div>
    ),
};
