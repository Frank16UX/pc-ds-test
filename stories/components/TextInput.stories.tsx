import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../../src/components/form-elements/TextInput';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

// Derive static icon URLs from glob keys. Storybook serves assets/ as staticDirs root:
// /assets/icons/base/x.svg → /icons/base/x.svg
const baseIconPaths = Object.keys(import.meta.glob('/assets/icons/base/*.svg'));
const iconUrlMap = Object.fromEntries(
    baseIconPaths.map((path) => {
        const name = path.split('/').pop()?.replace('.svg', '') ?? path;
        return [name, path.replace('/assets', '')];
    })
);

// Component that applies CSS mask via DOM setProperty (React 19 doesn't serialize maskImage inline)
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

const iconNodeMap: Record<string, React.ReactNode> = Object.fromEntries(
    Object.entries(iconUrlMap).map(([name, url]) => [name, <MaskIcon key={name} src={url} />])
);
iconNodeMap['none'] = undefined;

const iconSelectNames = ['none', ...Object.keys(iconUrlMap).sort()];

// Keep backward compat for direct URL usage in static stories
const iconOptions = iconUrlMap;

const meta: Meta<typeof TextInput> = {
    title: 'Components/Form Elements/Input/Text',
    component: TextInput,
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
                        minWidth: '400px',
                    }}>
                        <Story />
                    </div>
                );
            }
            return (
                <div style={{ minWidth: '400px' }}>
                    <Story />
                </div>
            );
        },
    ],
    argTypes: {
        label: {
            control: 'text',
        },
        labeled: {
            control: 'boolean',
        },
        placeholder: {
            control: 'text',
        },
        isRequired: {
            control: 'boolean',
        },
        helperText: {
            control: 'text',
        },
        errorMessage: {
            control: 'text',
            if: { arg: 'isInvalid', truthy: true },
        },
        isInvalid: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        isReadOnly: {
            control: 'boolean',
        },
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
        },
        tooltip: {
            control: 'boolean',
        },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the input.',
            table: { category: 'React Aria' },
        },
        leadingIcon: {
            control: 'select',
            options: iconSelectNames,
            mapping: iconNodeMap,
            description: 'Icon displayed at the start of the input field.',
        },
        trailingIcon: {
            control: 'select',
            options: iconSelectNames,
            mapping: iconNodeMap,
            description: 'Icon displayed at the end of the input field.',
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that describes this input.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
    },
};

export const WithLeadingIcon: Story = {
    args: {
        label: 'Search',
        placeholder: 'Search products...',
        helperText: 'Enter a keyword to search.',
        leadingIcon: <MaskIcon src={iconOptions['search'] ?? ''} />,
    },
};

export const WithTrailingIcon: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        trailingIcon: <MaskIcon src={iconOptions['eye'] ?? iconOptions['eye-off'] ?? ''} />,
    },
};

export const WithBothIcons: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter username',
        helperText: 'Choose a unique username.',
        leadingIcon: <MaskIcon src={iconOptions['user'] ?? ''} />,
        trailingIcon: <MaskIcon src={iconOptions['check'] ?? ''} />,
    },
};

export const Required: Story = {
    args: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        isRequired: true,
        helperText: 'This field is required.',
    },
};

export const WithTooltip: Story = {
    args: {
        label: 'Account Number',
        placeholder: 'Enter account number',
        tooltip: true,
        helperText: 'Find this on your statement.',
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        isInvalid: true,
        errorMessage: 'Please enter a valid email address.',
        leadingIcon: <MaskIcon src={iconOptions['mail'] ?? ''} />,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        placeholder: 'Cannot edit this field',
        isDisabled: true,
        helperText: 'This field is not available.',
    },
};

export const ReadOnly: Story = {
    args: {
        label: 'Order Number',
        placeholder: '',
        isReadOnly: true,
        value: 'ORD-2024-00142',
        helperText: 'This value cannot be changed.',
    },
};

export const WithoutLabel: Story = {
    args: {
        labeled: false,
        placeholder: 'Search...',
        leadingIcon: <MaskIcon src={iconOptions['search'] ?? ''} />,
        'aria-label': 'Search',
    },
};

export const Inverted: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        helperText: 'On a dark background.',
        surface: 'inverted',
    },
};

export const InvertedError: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        isInvalid: true,
        errorMessage: 'Please enter a valid email address.',
        surface: 'inverted',
    },
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
            <TextInput
                label="Default"
                placeholder="Placeholder"
                helperText="This is a hint text for the user."
            />
            <TextInput
                label="Required"
                placeholder="Placeholder"
                isRequired
                helperText="This field is required."
            />
            <TextInput
                label="With Icons"
                placeholder="Search..."
                leadingIcon={<MaskIcon src={iconOptions['search'] ?? ''} />}
                trailingIcon={<MaskIcon src={iconOptions['x'] ?? ''} />}
                helperText="Search for products."
            />
            <TextInput
                label="Error State"
                placeholder="Placeholder"
                isInvalid
                errorMessage="This option is not valid."
                leadingIcon={<MaskIcon src={iconOptions['alert-circle'] ?? ''} />}
            />
            <TextInput
                label="Disabled"
                placeholder="Placeholder"
                isDisabled
                helperText="Not available."
            />
            <TextInput
                label="Read Only"
                placeholder=""
                isReadOnly
                value="Pre-filled value"
                helperText="Cannot be edited."
            />
        </div>
    ),
};
