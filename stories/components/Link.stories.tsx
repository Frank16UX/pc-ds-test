import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../src/components/actions/Link';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

// Import all icons using Vite's glob import
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, query: '?url', import: 'default' });

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

const meta: Meta<typeof Link> = {
    title: 'Components/Actions/Link',
    component: Link,
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
                        backgroundColor: resolveTokenValue('$color-background-accent-strongest') ?? '#1a5961',
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
            description: 'The size of the link.',
            table: {
                defaultValue: { summary: 'sm' },
            },
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
            description: 'The surface context where the link is placed.',
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the link is disabled.',
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
            table: { category: 'React Aria' },
        },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the link. Use when link text doesn\'t fully describe destination.',
            table: { category: 'React Aria' },
        },
        'aria-labelledby': {
            control: 'text',
            description: 'ID of element that labels this link.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that provides additional description for the link.',
            table: { category: 'React Aria' },
        },
        'aria-current': {
            control: 'select',
            options: ['page', 'step', 'location', 'date', 'time', 'true'],
            description: 'Indicates current page/location in navigation.',
            table: { category: 'React Aria' },
        },
        target: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top'],
            description: 'Where to open the linked document.',
            table: { category: 'React Aria' },
        },
        rel: {
            control: 'text',
            description: 'Relationship between current and linked document. Use "noopener noreferrer" with target="_blank".',
            table: { category: 'React Aria' },
        },
        onPress: { action: 'pressed' },
    },
};

export default meta;
type Story = StoryObj<typeof Link>;

// Default story
export const Default: Story = {
    args: {
        children: 'Link',
        href: '#',
    },
};

// Size variants
export const SizeSmall: Story = {
    args: {
        size: 'sm',
        children: 'Small Link',
        href: '#',
    },
};

export const SizeMedium: Story = {
    args: {
        size: 'md',
        children: 'Medium Link',
        href: '#',
    },
};

export const SizeLarge: Story = {
    args: {
        size: 'lg',
        children: 'Large Link',
        href: '#',
    },
};

export const SizeExtraLarge: Story = {
    args: {
        size: 'xl',
        children: 'Extra Large Link',
        href: '#',
    },
};

// Surface variants
export const Inverted: Story = {
    args: {
        surface: 'inverted',
        children: 'Inverted Link',
        href: '#',
    },
};

// State variants
export const Disabled: Story = {
    args: {
        isDisabled: true,
        children: 'Disabled Link',
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
        children: 'Link Without Icon',
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
            <Link size="sm" href="#">Small (14px)</Link>
            <Link size="md" href="#">Medium (16px)</Link>
            <Link size="lg" href="#">Large (18px)</Link>
            <Link size="xl" href="#">Extra Large (20px)</Link>
        </div>
    ),
};

// All sizes on inverted surface
export const AllSizesInverted: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <Link size="sm" surface="inverted" href="#">Small Inverted</Link>
            <Link size="md" surface="inverted" href="#">Medium Inverted</Link>
            <Link size="lg" surface="inverted" href="#">Large Inverted</Link>
            <Link size="xl" surface="inverted" href="#">Extra Large Inverted</Link>
        </div>
    ),
    decorators: [
        (Story) => (
            <div style={{
                backgroundColor: resolveTokenValue('$color-background-accent-strongest') ?? '#1a5961',
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
            <Link size="sm" iconTrailing={false} href="#">Small (no icon)</Link>
            <Link size="md" iconTrailing={false} href="#">Medium (no icon)</Link>
            <Link size="lg" iconTrailing={false} href="#">Large (no icon)</Link>
            <Link size="xl" iconTrailing={false} href="#">Extra Large (no icon)</Link>
        </div>
    ),
};
