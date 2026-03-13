import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../src/components/actions/Chip';
import React from 'react';

// Import icons using Vite's glob import (same pattern as Button)
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, query: '?url', import: 'default' });
const consumableIcons = import.meta.glob('/assets/icons/consumables/*.svg', { eager: true, query: '?url', import: 'default' });
const customIcons = import.meta.glob('/assets/icons/custom/*.svg', { eager: true, query: '?url', import: 'default' });
const filledIcons = import.meta.glob('/assets/icons/filled/*.svg', { eager: true, query: '?url', import: 'default' });

// Create icon mapping
const iconOptions: Record<string, React.ReactNode> = {};

[iconModules, consumableIcons, customIcons, filledIcons].forEach((iconSet) => {
    Object.keys(iconSet).forEach((path) => {
        const iconName = path.split('/').pop()?.replace('.svg', '') || '';
        const iconPath = iconSet[path] as string;
        iconOptions[iconName] = (
            <img src={iconPath} alt={iconName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        );
    });
});

const iconNames = Object.keys(iconOptions).sort();

const meta: Meta<typeof Chip> = {
    title: 'Components/Actions/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        kind: {
            control: 'select',
            options: ['outline', 'filled'],
        },
        size: {
            control: 'radio',
            options: ['md', 'xl'],
        },
        leading: {
            control: 'select',
            options: ['icon', 'image', 'none'],
        },
        label: {
            control: 'text',
        },
        leadingIcon: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            if: { arg: 'leading', eq: 'icon' },
        },
        leadingImageSrc: {
            control: 'text',
            if: { arg: 'leading', eq: 'image' },
        },
        leadingImageAlt: {
            control: 'text',
            if: { arg: 'leading', eq: 'image' },
        },
        isSelected: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        onChange: { action: 'changed' },
        onRemove: { action: 'removed' },
        'aria-label': {
            control: 'text',
            description: 'Accessible name when the visible label is not sufficient.',
            table: { category: 'React Aria' },
        },
        'aria-labelledby': {
            control: 'text',
            description: 'References an element that labels the chip.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'References supporting descriptive content.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const OutlineDefault: Story = {
    args: {
        kind: 'outline',
        label: 'Filter',
    },
};

export const OutlineSelected: Story = {
    args: {
        kind: 'outline',
        label: 'Selected',
        isSelected: true,
    },
};

export const FilledDefault: Story = {
    args: {
        kind: 'filled',
        label: 'Category',
    },
};

export const FilledSelected: Story = {
    args: {
        kind: 'filled',
        label: 'Applied Filter',
        isSelected: true,
    },
};

export const WithIcon: Story = {
    args: {
        kind: 'outline',
        label: 'With Icon',
    },
};

export const WithImage: Story = {
    args: {
        kind: 'outline',
        leading: 'image',
        label: 'With Image',
    },
};

export const ExtraLarge: Story = {
    args: {
        kind: 'outline',
        size: 'xl',
        label: 'XL Chip',
    },
};

export const ExtraLargeWithImage: Story = {
    args: {
        kind: 'outline',
        size: 'xl',
        leading: 'image',
        label: 'XL Image',
        isSelected: true,
    },
};

export const Disabled: Story = {
    args: {
        kind: 'outline',
        label: 'Disabled',
        isDisabled: true,
    },
};

const allChipLabels = ['All', 'Cookware', 'Bakeware', 'Entertaining', 'Stoneware'];

const OutlineChipGroup = ({ kind, size }: { kind: 'outline'; size?: 'md' | 'xl' }) => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {allChipLabels.map((label) => (
            <Chip key={label} kind={kind} size={size} label={label} defaultSelected={label === 'All'} />
        ))}
    </div>
);

const FilledChipGroup = ({ kind, size }: { kind: 'filled'; size?: 'md' | 'xl' }) => {
    const [visible, setVisible] = React.useState(allChipLabels);
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {visible.map((label) => (
                <Chip
                    key={label}
                    kind={kind}
                    size={size}
                    label={label}
                    isSelected
                    onRemove={() => setVisible((prev) => prev.filter((l) => l !== label))}
                />
            ))}
            {visible.length === 0 && (
                <button type="button" onClick={() => setVisible(allChipLabels)} style={{ cursor: 'pointer', border: '1px dashed #ccc', borderRadius: '48px', padding: '8px 16px', background: 'none', color: '#888' }}>
                    Reset chips
                </button>
            )}
        </div>
    );
};

export const ChipGroup: Story = {
    render: (args) => {
        const kind = args.kind || 'outline';
        if (kind === 'filled') {
            return <FilledChipGroup kind="filled" size={args.size} />;
        }
        return <OutlineChipGroup kind="outline" size={args.size} />;
    },
    args: {
        kind: 'outline',
    },
};
