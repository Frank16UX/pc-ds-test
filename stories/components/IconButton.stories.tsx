import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../src/components/actions/IconButton';
import React from 'react';

// Import all icons using Vite's glob import (base and custom)
const baseIconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });
const customIconModules = import.meta.glob('/assets/icons/custom/*.svg', { eager: true, as: 'url' });

// Create icon mapping
const iconOptions: Record<string, React.ReactNode> = {};

// Add base icons
Object.keys(baseIconModules).forEach((path) => {
    const iconName = path.split('/').pop()?.replace('.svg', '') || '';
    const iconPath = baseIconModules[path] as string;
    iconOptions[iconName] = (
        <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    );
});

// Add custom icons with "custom/" prefix to distinguish them
Object.keys(customIconModules).forEach((path) => {
    const iconName = 'custom/' + (path.split('/').pop()?.replace('.svg', '') || '');
    const iconPath = customIconModules[path] as string;
    iconOptions[iconName] = (
        <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    );
});

const iconNames = Object.keys(iconOptions).sort();

// Default icon is custom/cart
const defaultIconName = 'custom/cart';

const meta: Meta<typeof IconButton> = {
    title: 'Components/Icon Button',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'The size of the icon button',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        icon: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            description: 'The icon to display',
        },
        showCounter: {
            control: 'boolean',
            description: 'Whether to show the item counter (only available for md size)',
            table: {
                defaultValue: { summary: 'false' },
            },
            if: { arg: 'size', eq: 'md' },
        },
        itemCount: {
            control: { type: 'number', min: 0 },
            description: 'The count to display when showCounter and showIndicator are both true',
            if: { arg: 'showCounter', truthy: true },
            table: {
                defaultValue: { summary: '1' },
            },
        },
        showIndicator: {
            control: 'boolean',
            description: 'Whether there are items added. Shows dot indicator (without counter) or accent-colored count (with counter)',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the button (required)',
        },
        onPress: { action: 'pressed' },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Default story
export const Default: Story = {
    args: {
        icon: iconOptions[defaultIconName],
        'aria-label': 'Icon button',
    },
};

// All sizes
export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <IconButton size="sm" icon={iconOptions[defaultIconName]} aria-label="Small icon button" />
            <IconButton size="md" icon={iconOptions[defaultIconName]} aria-label="Medium icon button" />
            <IconButton size="lg" icon={iconOptions[defaultIconName]} aria-label="Large icon button" />
            <IconButton size="xl" icon={iconOptions[defaultIconName]} aria-label="Extra large icon button" />
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

// Small size
export const Small: Story = {
    args: {
        size: 'sm',
        icon: iconOptions[defaultIconName],
        'aria-label': 'Small icon button',
    },
};

// Medium size (default)
export const Medium: Story = {
    args: {
        size: 'md',
        icon: iconOptions[defaultIconName],
        'aria-label': 'Medium icon button',
    },
};

// Large size
export const Large: Story = {
    args: {
        size: 'lg',
        icon: iconOptions[defaultIconName],
        'aria-label': 'Large icon button',
    },
};

// Extra large size
export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        icon: iconOptions[defaultIconName],
        'aria-label': 'Extra large icon button',
    },
};

// With dot indicator (no items added yet scenario - shows dot)
export const WithIndicator: Story = {
    args: {
        icon: iconOptions[defaultIconName],
        showIndicator: true,
        'aria-label': 'Icon button with notification',
    },
};

// With counter but no items (showIndicator=false, shows "0" in tertiary color)
export const WithCounterEmpty: Story = {
    args: {
        icon: iconOptions[defaultIconName],
        showCounter: true,
        showIndicator: false,
        'aria-label': 'Empty cart',
    },
};

// With counter and items (showIndicator=true, shows count in accent color)
export const WithCounterAndItems: Story = {
    args: {
        icon: iconOptions[defaultIconName],
        showCounter: true,
        showIndicator: true,
        itemCount: 5,
        'aria-label': 'Cart with 5 items',
    },
};

// Disabled state
export const Disabled: Story = {
    args: {
        icon: iconOptions[defaultIconName],
        isDisabled: true,
        'aria-label': 'Disabled icon button',
    },
};

// All states showcase
export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontFamily: 'system-ui' }}>Default (all sizes)</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <IconButton size="sm" icon={iconOptions[defaultIconName]} aria-label="Small" />
                    <IconButton size="md" icon={iconOptions[defaultIconName]} aria-label="Medium" />
                    <IconButton size="lg" icon={iconOptions[defaultIconName]} aria-label="Large" />
                    <IconButton size="xl" icon={iconOptions[defaultIconName]} aria-label="Extra large" />
                </div>
            </div>
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontFamily: 'system-ui' }}>With Dot Indicator (all sizes)</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <IconButton size="sm" icon={iconOptions[defaultIconName]} showIndicator aria-label="Small with indicator" />
                    <IconButton size="md" icon={iconOptions[defaultIconName]} showIndicator aria-label="Medium with indicator" />
                    <IconButton size="lg" icon={iconOptions[defaultIconName]} showIndicator aria-label="Large with indicator" />
                    <IconButton size="xl" icon={iconOptions[defaultIconName]} showIndicator aria-label="Extra large with indicator" />
                </div>
            </div>
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontFamily: 'system-ui' }}>With Counter (md only)</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <IconButton size="md" icon={iconOptions[defaultIconName]} showCounter showIndicator={false} aria-label="Empty cart (0)" />
                    <IconButton size="md" icon={iconOptions[defaultIconName]} showCounter showIndicator itemCount={5} aria-label="Cart with 5 items" />
                    <IconButton size="md" icon={iconOptions[defaultIconName]} showCounter showIndicator itemCount={10} aria-label="Cart with 10 items" />
                </div>
            </div>
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontFamily: 'system-ui' }}>Disabled (all sizes)</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <IconButton size="sm" icon={iconOptions[defaultIconName]} isDisabled aria-label="Small disabled" />
                    <IconButton size="md" icon={iconOptions[defaultIconName]} isDisabled aria-label="Medium disabled" />
                    <IconButton size="lg" icon={iconOptions[defaultIconName]} isDisabled aria-label="Large disabled" />
                    <IconButton size="xl" icon={iconOptions[defaultIconName]} isDisabled aria-label="Extra large disabled" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

// Interactive playground
export const Interactive: Story = {
    args: {
        size: 'md',
        icon: iconOptions[defaultIconName],
        showCounter: false,
        itemCount: 1,
        showIndicator: false,
        isDisabled: false,
        'aria-label': 'Interactive icon button',
    },
};
