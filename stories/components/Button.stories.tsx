import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/actions/Button';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

// Import all icons using Vite's glob import
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });
const consumableIcons = import.meta.glob('/assets/icons/consumables/*.svg', { eager: true, as: 'url' });
const customIcons = import.meta.glob('/assets/icons/custom/*.svg', { eager: true, as: 'url' });
const filledIcons = import.meta.glob('/assets/icons/filled/*.svg', { eager: true, as: 'url' });
const graphicIcons = import.meta.glob('/assets/icons/graphic/*.svg', { eager: true, as: 'url' });
const socialIcons = import.meta.glob('/assets/icons/social/*.svg', { eager: true, as: 'url' });
// Force Vite to include flags directory in build output (used by Button component at runtime)
const flagModules = import.meta.glob('/assets/icons/flags/*.svg', { eager: true });
// @ts-ignore - flagModules is intentionally unused but required for build
void flagModules;

// Create icon mapping
const iconOptions: Record<string, React.ReactNode> = {
    none: null,
};

// Process all icon sets
[iconModules, consumableIcons, customIcons, filledIcons, graphicIcons, socialIcons].forEach((iconSet) => {
    Object.keys(iconSet).forEach((path) => {
        const iconName = path.split('/').pop()?.replace('.svg', '') || '';
        const iconPath = iconSet[path] as string;
        iconOptions[iconName] = (
            <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        );
    });
});

const iconNames = Object.keys(iconOptions).sort();

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const isInverted = context.args.surface === 'inverted';
            if (isInverted) {
                return (
                    <div style={{
                        backgroundColor: resolveTokenValue('$color-background-accent-solid') ?? '#1a5961',
                        padding: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Story />
                    </div>
                );
            }
            return <Story />;
        },
    ],
    argTypes: {
        kind: {
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
        fullWidth: {
            control: 'boolean',
            description: 'If true, button expands to fill the width of its container.',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        isDisabled: {
            control: 'boolean',
        },
        isLoading: {
            control: 'boolean',
        },
        success: {
            control: 'boolean',
        },
        successStaysActive: {
            control: 'boolean',
            if: { arg: 'success', truthy: true },
        },
        successLabel: {
            control: 'text',
            if: { arg: 'success', truthy: true },
        },
        successDuration: {
            control: { type: 'number', min: 2000, step: 100 },
            if: { arg: 'success', truthy: true },
        },
        iconLeading: {
            control: 'boolean',
        },
        iconLeadingSwap: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            if: { arg: 'iconLeading', truthy: true },
        },
        iconTrailing: {
            control: 'boolean',
        },
        iconTrailingSwap: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            if: { arg: 'iconTrailing', truthy: true },
        },
        flag: {
            control: 'select',
            options: ['none', 'USA', 'Canada', 'France', 'Germany', 'Austria'],
            if: { arg: 'iconTrailing', truthy: false },
        },
        onPress: { action: 'pressed' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        kind: 'primary',
        children: 'Button CTA',
    },
};

export const Secondary: Story = {
    args: {
        kind: 'secondary',
        children: 'Secondary Action',
    },
};

export const Tertiary: Story = {
    args: {
        kind: 'tertiary',
        children: 'Tertiary Action',
    },
};

export const Destructive: Story = {
    args: {
        kind: 'destructive',
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
        success: true,
        successLabel: 'Success!',
        successDuration: 2000,
        children: 'Submit',
    },
};

// Full width decorator with vertical centering
const fullWidthDecorator = (Story: React.ComponentType) => (
    <div style={{
        width: '100%',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        padding: '32px',
        boxSizing: 'border-box',
    }}>
        <Story />
    </div>
);

export const PrimaryInverted: Story = {
    args: {
        kind: 'primary',
        surface: 'inverted',
        children: 'Primary Inverted',
    },
};

export const SecondaryInverted: Story = {
    args: {
        kind: 'secondary',
        surface: 'inverted',
        children: 'Secondary Inverted',
    },
};

export const TertiaryInverted: Story = {
    args: {
        kind: 'tertiary',
        surface: 'inverted',
        children: 'Tertiary Inverted',
    },
};

export const WithLeadingIcon: Story = {
    args: {
        kind: 'primary',
        iconLeading: true,
        children: 'With Icon',
    },
};

export const WithTrailingIcon: Story = {
    args: {
        kind: 'primary',
        iconTrailing: true,
        children: 'Continue',
    },
};

export const WithBothIcons: Story = {
    args: {
        kind: 'secondary',
        iconLeading: true,
        iconTrailing: true,
        children: 'Both Icons',
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        kind: 'primary',
        size: 'lg',
        fullWidth: true,
    },
    parameters: {
        layout: 'padded',
    },
    decorators: [fullWidthDecorator],
};
