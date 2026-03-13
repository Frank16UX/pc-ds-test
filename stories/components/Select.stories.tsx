import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../src/components/form-elements/Select';
import { DropdownListItem } from '../../src/components/data-display/DropdownListItem';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

const meta: Meta<typeof Select> = {
    title: 'Components/Form Elements/Select',
    component: Select,
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
        isRequired: {
            control: 'boolean',
        },
        helperText: {
            control: 'text',
        },
        errorMessage: {
            control: 'text',
        },
        isInvalid: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
        },
        tooltip: {
            control: 'boolean',
        },
        placeholder: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const items = [
    { id: 'cookware', label: 'Cookware' },
    { id: 'bakeware', label: 'Bakeware' },
    { id: 'stoneware', label: 'Stoneware' },
    { id: 'entertaining', label: 'Entertaining' },
    { id: 'pantry', label: 'Pantry' },
    { id: 'kitchen-tools', label: 'Kitchen Tools' },
];

const manyItems = [
    ...items,
    { id: 'cutlery', label: 'Cutlery' },
    { id: 'seasonings', label: 'Seasonings' },
    { id: 'outdoor-grilling', label: 'Outdoor Grilling' },
    { id: 'storage', label: 'Storage' },
];

export const Default: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const Required: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        isRequired: true,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const WithTooltip: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        tooltip: true,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const WithHelperText: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        helperText: 'Choose the product category that best fits.',
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const ErrorState: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        isInvalid: true,
        errorMessage: 'Please select a category.',
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        isDisabled: true,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const WithoutLabel: Story = {
    args: {
        labeled: false,
        placeholder: 'Select a category',
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const WithManyItems: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {manyItems.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

const invertedDecorator = (Story: React.ComponentType) => (
    <div
        style={{
            backgroundColor: resolveTokenValue('$color-background-accent-strongest') ?? '#2d2926',
            padding: '40px',
            borderRadius: '8px',
        }}
    >
        <Story />
    </div>
);

export const Inverted: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        surface: 'inverted',
    },
    decorators: [invertedDecorator],
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const InvertedError: Story = {
    args: {
        label: 'Category',
        placeholder: 'Select a category',
        surface: 'inverted',
        isInvalid: true,
        errorMessage: 'Please select a category.',
    },
    decorators: [invertedDecorator],
    render: (args) => (
        <div style={{ width: '320px' }}>
            <Select {...args} aria-label="Product category">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '320px' }}>
            <Select label="Default" placeholder="Select a category" aria-label="Default">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>

            <Select label="Required" placeholder="Select a category" isRequired aria-label="Required">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>

            <Select label="With Helper" placeholder="Select a category" helperText="Choose a category" aria-label="With helper">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>

            <Select label="Error" placeholder="Select a category" isInvalid errorMessage="This field is required." aria-label="Error">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>

            <Select label="Disabled" placeholder="Select a category" isDisabled aria-label="Disabled">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </Select>
        </div>
    ),
};
