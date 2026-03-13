import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components/data-display/Badge';
import React from 'react';

// Resolve a token CSS custom property value at runtime (for inverted background)
const resolveTokenValue = (token: string): string | null => {
    if (typeof document === 'undefined') return null;
    const el = document.createElement('div');
    el.style.display = 'none';
    const prop = token.replace('$', '--');
    el.style.setProperty('background', `var(${prop})`);
    document.body.appendChild(el);
    const value = getComputedStyle(el).background;
    el.remove();
    return value !== '' ? value : null;
};

// Get icon paths via glob (keys only) then derive static URL by stripping '/assets' prefix.
// Storybook serves the assets/ folder as staticDirs root, so /assets/icons/base/x.svg → /icons/base/x.svg
const iconModulePaths = Object.keys(import.meta.glob('/assets/icons/custom/*.svg'));
const baseIconPaths = Object.keys(import.meta.glob('/assets/icons/base/*.svg'));

// Icon component that applies mask via DOM setProperty (React 19 doesn't serialize maskImage inline)
const StoryMaskIcon = ({ src }: { src: string }) => {
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

const iconOptions: Record<string, React.ReactNode> = {};

[...iconModulePaths, ...baseIconPaths].forEach((path) => {
    const iconName = path.split('/').pop()?.replace('.svg', '') || '';
    // Derive static URL: /assets/icons/base/x.svg → /icons/base/x.svg
    const iconUrl = path.replace('/assets', '');
    iconOptions[iconName] = <StoryMaskIcon src={iconUrl} />;
});

const iconNames = Object.keys(iconOptions).sort();

const meta: Meta<typeof Badge> = {
    title: 'Components/Data Display/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const isInverted = context.args.surface === 'inverted';
            if (isInverted) {
                return (
                    <div
                        style={{
                            backgroundColor:
                                resolveTokenValue('$color-background-accent-solid') ?? '#1a5961',
                            padding: '32px',
                            borderRadius: '8px',
                        }}
                    >
                        <Story />
                    </div>
                );
            }
            return <Story />;
        },
    ],
    argTypes: {
        size: {
            control: 'radio',
            options: ['md', 'sm'],
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
        },
        iconOnly: {
            control: 'boolean',
        },
        label: {
            control: 'text',
        },
        leadingIcon: {
            control: 'boolean',
        },
        swapLeadingIcon: {
            control: 'select',
            options: iconNames,
            mapping: iconOptions,
            if: { arg: 'leadingIcon', truthy: true },
        },
        'aria-label': {
            control: 'text',
            description:
                'Accessible label for the badge. Required when iconOnly is true.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        label: 'Badge Label',
        size: 'md',
        surface: 'default',
        leadingIcon: true,
        iconOnly: false,
    },
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: 'sm',
    },
};

export const IconOnly: Story = {
    args: {
        ...Default.args,
        iconOnly: true,
        'aria-label': 'Guarantee badge',
    },
};

export const IconOnlySmall: Story = {
    args: {
        ...IconOnly.args,
        size: 'sm',
    },
};

export const NoIcon: Story = {
    args: {
        ...Default.args,
        leadingIcon: false,
    },
};

export const Inverted: Story = {
    args: {
        ...Default.args,
        surface: 'inverted',
    },
};

export const InvertedSmall: Story = {
    args: {
        ...Default.args,
        surface: 'inverted',
        size: 'sm',
    },
};

export const InvertedIconOnly: Story = {
    args: {
        ...Default.args,
        surface: 'inverted',
        iconOnly: true,
        'aria-label': 'Guarantee badge',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Badge size="md" label="Badge Label" />
                <Badge size="md" label="Badge Label" iconOnly />
                <Badge size="sm" label="Badge Label" />
                <Badge size="sm" label="Badge Label" iconOnly />
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    backgroundColor: '#1a5961',
                    padding: '16px',
                    borderRadius: '8px',
                }}
            >
                <Badge size="md" surface="inverted" label="Badge Label" />
                <Badge size="md" surface="inverted" label="Badge Label" iconOnly />
                <Badge size="sm" surface="inverted" label="Badge Label" />
                <Badge size="sm" surface="inverted" label="Badge Label" iconOnly />
            </div>
        </div>
    ),
};
