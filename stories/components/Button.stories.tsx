import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/Button';
import React from 'react';

// Import all icons using Vite's glob import
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });

// Create icon mapping
const iconOptions: Record<string, React.ReactNode> = {
    none: null,
};

Object.keys(iconModules).forEach((path) => {
    const iconName = path.split('/').pop()?.replace('.svg', '') || '';
    const iconPath = iconModules[path] as string;
    iconOptions[iconName] = (
        <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    );
});

const iconNames = Object.keys(iconOptions).sort();

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        hierarchy: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'destructive'],
        },
        size: {
            control: 'radio',
            options: ['sm', 'lg'],
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
        },
        isDisabled: {
            control: 'boolean',
        },
        isLoading: {
            control: 'boolean',
        },
        isSuccess: {
            control: 'boolean',
        },
        iconLeading: {
            control: 'boolean',
        },
        iconLeadingSwap: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
        },
        iconTrailing: {
            control: 'boolean',
        },
        iconTrailingSwap: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
        },
        onPress: { action: 'pressed' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        hierarchy: 'primary',
        children: 'Button CTA',
    },
};

export const Secondary: Story = {
    args: {
        hierarchy: 'secondary',
        children: 'Secondary Action',
    },
};

export const Tertiary: Story = {
    args: {
        hierarchy: 'tertiary',
        children: 'Tertiary Action',
    },
};

export const Destructive: Story = {
    args: {
        hierarchy: 'destructive',
        children: 'Delete',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small Button',
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        children: 'Disabled Button',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        children: 'Loading...',
    },
};

export const Success: Story = {
    args: {
        isSuccess: true,
        children: 'Success!',
    },
};
