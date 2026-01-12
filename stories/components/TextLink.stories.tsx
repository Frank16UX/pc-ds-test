import type { Meta, StoryObj } from '@storybook/react';
import { TextLink } from '../../src/components/actions/TextLink';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

// Import all icons using Vite's glob import
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });

// Create icon mapping
const iconOptions: Record<string, React.ReactNode> = {
    none: null,
};

// Process icon set
Object.keys(iconModules).forEach((path) => {
    const iconName = path.split('/').pop()?.replace('.svg', '') || '';
    const iconPath = iconModules[path] as string;
    iconOptions[iconName] = (
        <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    );
});

const iconNames = Object.keys(iconOptions).sort();

const meta: Meta<typeof TextLink> = {
    title: 'Components/TextLink',
    component: TextLink,
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
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'The size of the text link.',
            table: {
                defaultValue: { summary: 'sm' },
            },
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
            description: 'The surface context where the text link is placed.',
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the text link is disabled.',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        iconTrailing: {
            control: 'boolean',
            description: 'If true, displays the default chevron-right icon on the right side of the link text.',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
        iconTrailingSwap: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            description: 'Custom icon to display on the right side.',
            if: { arg: 'iconTrailing', truthy: true },
        },
        href: {
            control: 'text',
            description: 'The URL to navigate to when clicked.',
        },
        onPress: { action: 'pressed' },
    },
};

export default meta;
type Story = StoryObj<typeof TextLink>;

// Default story
export const Default: Story = {
    args: {
        children: 'Text Link',
        href: '#',
    },
};

// Size variants
export const SizeSmall: Story = {
    args: {
        size: 'sm',
        children: 'Small Text Link',
        href: '#',
    },
};

export const SizeMedium: Story = {
    args: {
        size: 'md',
        children: 'Medium Text Link',
        href: '#',
    },
};

export const SizeLarge: Story = {
    args: {
        size: 'lg',
        children: 'Large Text Link',
        href: '#',
    },
};

export const SizeExtraLarge: Story = {
    args: {
        size: 'xl',
        children: 'Extra Large Text Link',
        href: '#',
    },
};

// Surface variants
export const Inverted: Story = {
    args: {
        surface: 'inverted',
        children: 'Inverted Text Link',
        href: '#',
    },
};

// State variants
export const Disabled: Story = {
    args: {
        isDisabled: true,
        children: 'Disabled Text Link',
        href: '#',
    },
};

export const DisabledInverted: Story = {
    args: {
        isDisabled: true,
        surface: 'inverted',
        children: 'Disabled Inverted',
        href: '#',
    },
};

// Icon variants
export const WithoutIcon: Story = {
    args: {
        iconTrailing: false,
        children: 'Text Link Without Icon',
        href: '#',
    },
};

export const WithCustomIcon: Story = {
    args: {
        iconTrailing: true,
        iconTrailingSwap: iconOptions['arrow-right'] || iconOptions['chevron-right'],
        children: 'Custom Icon',
        href: '#',
    },
};

// All sizes comparison
export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <TextLink size="sm" href="#">Small (14px)</TextLink>
            <TextLink size="md" href="#">Medium (16px)</TextLink>
            <TextLink size="lg" href="#">Large (18px)</TextLink>
            <TextLink size="xl" href="#">Extra Large (20px)</TextLink>
        </div>
    ),
};

// All sizes on inverted surface
export const AllSizesInverted: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <TextLink size="sm" surface="inverted" href="#">Small Inverted</TextLink>
            <TextLink size="md" surface="inverted" href="#">Medium Inverted</TextLink>
            <TextLink size="lg" surface="inverted" href="#">Large Inverted</TextLink>
            <TextLink size="xl" surface="inverted" href="#">Extra Large Inverted</TextLink>
        </div>
    ),
    decorators: [
        (Story) => (
            <div style={{
                backgroundColor: resolveTokenValue('$color-background-accent-solid') ?? '#1a5961',
                padding: '32px',
                borderRadius: '8px',
            }}>
                <Story />
            </div>
        ),
    ],
};

// Without icons comparison
export const AllSizesWithoutIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <TextLink size="sm" iconTrailing={false} href="#">Small (no icon)</TextLink>
            <TextLink size="md" iconTrailing={false} href="#">Medium (no icon)</TextLink>
            <TextLink size="lg" iconTrailing={false} href="#">Large (no icon)</TextLink>
            <TextLink size="xl" iconTrailing={false} href="#">Extra Large (no icon)</TextLink>
        </div>
    ),
};
