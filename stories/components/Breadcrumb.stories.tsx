import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../../src/components/navigation/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Navigation/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        showBack: {
            control: 'boolean',
        },
        onBack: {
            action: 'back',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Subcategory', href: '#' },
            { label: 'Current Page' },
        ],
        showBack: true,
    },
};

export const TwoLevels: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Current Page' },
        ],
        showBack: true,
    },
};

export const FiveLevels: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'L1 Item', href: '#' },
            { label: 'L2 Item', href: '#' },
            { label: 'L3 Item', href: '#' },
            { label: 'L4 Item', href: '#' },
            { label: 'L5 Item' },
        ],
        showBack: true,
    },
};

export const WithoutBack: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Cookware', href: '#' },
            { label: 'Stainless Steel Pan' },
        ],
        showBack: false,
    },
};

export const SingleItem: Story = {
    args: {
        items: [{ label: 'Home' }],
        showBack: false,
    },
};
