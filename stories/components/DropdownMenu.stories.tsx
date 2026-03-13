import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '../../src/components/data-display/DropdownMenu';
import { DropdownListItem } from '../../src/components/data-display/DropdownListItem';
import React from 'react';

const baseIconPaths = Object.keys(import.meta.glob('/assets/icons/base/*.svg'));

const iconUrlMap = Object.fromEntries(
    baseIconPaths.map((path) => {
        const name = path.split('/').pop()?.replace('.svg', '') ?? path;
        return [name, path.replace('/assets', '')];
    })
);

// Component that applies CSS mask imperatively to avoid React 19 maskImage filtering
const MaskIcon = ({ src }: { src: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    React.useLayoutEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        el.style.setProperty('mask-image', `url(${src})`);
        el.style.setProperty('mask-repeat', 'no-repeat');
        el.style.setProperty('mask-position', 'center');
        el.style.setProperty('mask-size', 'contain');
        el.style.setProperty('-webkit-mask-image', `url(${src})`);
        el.style.setProperty('-webkit-mask-repeat', 'no-repeat');
        el.style.setProperty('-webkit-mask-position', 'center');
        el.style.setProperty('-webkit-mask-size', 'contain');
    }, [src]);
    return (
        <span
            ref={ref}
            aria-hidden="true"
            style={{ display: 'block', width: '100%', height: '100%', backgroundColor: 'currentColor' }}
        />
    );
};

const meta: Meta<typeof DropdownMenu> = {
    title: 'Components/Form Elements/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: 'radio',
            options: ['overflow', 'hug'],
        },
        positionAbove: {
            control: 'boolean',
        },
        positionBelow: {
            control: 'boolean',
        },
        selectionMode: {
            control: 'radio',
            options: ['none', 'single', 'multiple'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const items = [
    { id: '1', label: 'Cookware' },
    { id: '2', label: 'Bakeware' },
    { id: '3', label: 'Stoneware' },
    { id: '4', label: 'Entertaining' },
    { id: '5', label: 'Pantry' },
    { id: '6', label: 'Kitchen Tools' },
];

const manyItems = [
    ...items,
    { id: '7', label: 'Cutlery' },
    { id: '8', label: 'Seasonings' },
    { id: '9', label: 'Outdoor Grilling' },
    { id: '10', label: 'Storage' },
];

export const Default: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Product categories">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const OverflowWithScroll: Story = {
    args: {
        content: 'overflow',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Product categories">
                {manyItems.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label}>
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const MultiSelect: Story = {
    args: {
        content: 'hug',
        selectionMode: 'multiple',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Select categories">
                {items.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label} showCheckbox>
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const MultiSelectOverflow: Story = {
    args: {
        content: 'overflow',
        selectionMode: 'multiple',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Select categories">
                {manyItems.map((item) => (
                    <DropdownListItem key={item.id} id={item.id} label={item.label} showCheckbox>
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const WithIconLeading: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Icon leading items">
                {[
                    { id: '1', label: 'Cookware', icon: 'grid' },
                    { id: '2', label: 'Bakeware', icon: 'star' },
                    { id: '3', label: 'Kitchen Tools', icon: 'tool' },
                    { id: '4', label: 'Pantry', icon: 'shopping-bag' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        kind="iconLeading"
                        leadingIcon={
                            iconUrlMap[item.icon]
                                ? <MaskIcon src={iconUrlMap[item.icon]} />
                                : undefined
                        }
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const WithAvatar: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Avatar items">
                {[
                    { id: '1', label: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                    { id: '2', label: 'Bob Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                    { id: '3', label: 'Carol White', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        kind="avatar"
                        leadingImage={item.avatar}
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const WithThumbnail: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Thumbnail items">
                {[
                    { id: '1', label: 'Cast Iron Skillet', thumb: 'https://www.pamperedchef.com/iceberg/com/product/1702-lg.jpg' },
                    { id: '2', label: 'Stoneware Baker', thumb: 'https://www.pamperedchef.com/iceberg/com/product/1588-lg.jpg' },
                    { id: '3', label: 'Nonstick Pan', thumb: 'https://www.pamperedchef.com/iceberg/com/product/2733-lg.jpg' },
                    { id: '4', label: 'Cookie Sheet', thumb: 'https://www.pamperedchef.com/iceberg/com/product/1521-lg.jpg' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        kind="thumbnail"
                        leadingImage={item.thumb}
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

// === Boolean Option Stories ===

const subItemsMap: Record<string, { id: string; label: string }[]> = {
    Cookware: [
        { id: 'c1', label: 'Skillets' },
        { id: 'c2', label: 'Saucepans' },
        { id: 'c3', label: 'Dutch Ovens' },
        { id: 'c4', label: 'Stockpots' },
    ],
    Bakeware: [
        { id: 'b1', label: 'Cookie Sheets' },
        { id: 'b2', label: 'Muffin Pans' },
        { id: 'b3', label: 'Cake Pans' },
    ],
    Stoneware: [
        { id: 's1', label: 'Bakers' },
        { id: 's2', label: 'Bar Pans' },
        { id: 's3', label: 'Pizza Stones' },
    ],
    Entertaining: [
        { id: 'e1', label: 'Platters' },
        { id: 'e2', label: 'Serving Bowls' },
        { id: 'e3', label: 'Dip Sets' },
    ],
    Pantry: [
        { id: 'p1', label: 'Spices' },
        { id: 'p2', label: 'Seasonings' },
        { id: 'p3', label: 'Mixes' },
        { id: 'p4', label: 'Oils & Vinegars' },
    ],
    'Kitchen Tools': [
        { id: 'k1', label: 'Utensils' },
        { id: 'k2', label: 'Gadgets' },
        { id: 'k3', label: 'Cutting Boards' },
    ],
};

export const WithTrailingIcon: Story = {
    args: {
        content: 'hug',
        selectionMode: 'none',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Trailing icon items">
                {items.map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        showTrailingIcon
                        subItems={
                            <DropdownMenu content="hug" selectionMode="single" aria-label={`${item.label} subcategories`}>
                                {(subItemsMap[item.label] ?? []).map((sub) => (
                                    <DropdownListItem key={sub.id} id={sub.id} label={sub.label}>
                                        {sub.label}
                                    </DropdownListItem>
                                ))}
                            </DropdownMenu>
                        }
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const WithSupportingText: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Supporting text items">
                {[
                    { id: '1', label: 'Cookware', support: 'Pots, pans & skillets' },
                    { id: '2', label: 'Bakeware', support: 'Sheets, molds & pans' },
                    { id: '3', label: 'Stoneware', support: 'Oven-safe stone pieces' },
                    { id: '4', label: 'Entertaining', support: 'Platters & serving sets' },
                    { id: '5', label: 'Pantry', support: 'Spices & seasonings' },
                    { id: '6', label: 'Kitchen Tools', support: 'Utensils & gadgets' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        showSupportingText
                        supportingText={item.support}
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const WithSuffix: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Suffix items">
                {[
                    { id: '1', label: 'Cookware', count: '24' },
                    { id: '2', label: 'Bakeware', count: '18' },
                    { id: '3', label: 'Stoneware', count: '12' },
                    { id: '4', label: 'Entertaining', count: '8' },
                    { id: '5', label: 'Pantry', count: '31' },
                    { id: '6', label: 'Kitchen Tools', count: '20' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        showSuffix
                        suffixText={item.count}
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const SelectedWithCheckmark: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="Selected items" defaultSelectedKeys={['2']}>
                {items.map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};

export const AllBooleanOptions: Story = {
    args: {
        content: 'hug',
        selectionMode: 'single',
        positionAbove: false,
        positionBelow: false,
    },
    render: (args) => (
        <div style={{ width: '320px' }}>
            <DropdownMenu {...args} aria-label="All options" defaultSelectedKeys={['1']}>
                {[
                    { id: '1', label: 'Cookware', support: 'Pots, pans & skillets', count: '24' },
                    { id: '2', label: 'Bakeware', support: 'Sheets, molds & pans', count: '18' },
                    { id: '3', label: 'Stoneware', support: 'Oven-safe stone pieces', count: '12' },
                ].map((item) => (
                    <DropdownListItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        showSupportingText
                        supportingText={item.support}
                        showSuffix
                        suffixText={item.count}
                        showTrailingIcon
                    >
                        {item.label}
                    </DropdownListItem>
                ))}
            </DropdownMenu>
        </div>
    ),
};
