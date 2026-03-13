import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../src/components/form-elements/Checkbox';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Form Elements/Checkbox',
    component: Checkbox,
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
                    }}>
                        <Story />
                    </div>
                );
            }
            return <Story />;
        },
    ],
    argTypes: {
        surface: {
            control: 'radio',
            options: ['default', 'inverted'],
        },
        error: {
            control: 'boolean',
        },
        errorText: {
            control: 'text',
            if: { arg: 'error', truthy: true },
        },
        label: {
            control: 'text',
        },
        helperText: {
            control: 'text',
        },
        required: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        isIndeterminate: {
            control: 'boolean',
        },
        isSelected: {
            control: 'boolean',
        },
        onChange: { action: 'changed' },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the checkbox.',
            table: { category: 'React Aria' },
        },
        'aria-labelledby': {
            control: 'text',
            description: 'ID of element that labels this checkbox.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that describes this checkbox.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Remember me',
        helperText: 'Save my login details for next time.',
    },
};

export const Selected: Story = {
    args: {
        label: 'Remember me',
        helperText: 'Save my login details for next time.',
        isSelected: true,
    },
};

export const Indeterminate: Story = {
    args: {
        label: 'Select all',
        isIndeterminate: true,
    },
};

export const WithError: Story = {
    args: {
        label: 'I agree to the terms',
        helperText: 'Please read our terms and conditions.',
        error: true,
        errorText: 'You must agree to the terms to continue.',
        required: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        helperText: 'This option is not available.',
        isDisabled: true,
    },
};

export const DisabledSelected: Story = {
    args: {
        label: 'Disabled selected',
        helperText: 'This option is locked.',
        isDisabled: true,
        isSelected: true,
    },
};

export const Inverted: Story = {
    args: {
        label: 'Inverted checkbox',
        helperText: 'On a dark background.',
        surface: 'inverted',
    },
};

export const InvertedSelected: Story = {
    args: {
        label: 'Inverted selected',
        helperText: 'Selected on dark background.',
        surface: 'inverted',
        isSelected: true,
    },
};

export const CheckboxGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox label="Cookware" helperText="Pots, pans, and skillets" />
            <Checkbox label="Bakeware" helperText="Baking sheets, molds, and pans" isSelected />
            <Checkbox label="Stoneware" helperText="Durable stoneware products" />
            <Checkbox label="Entertaining" helperText="Platters, bowls, and serving pieces" isDisabled />
        </div>
    ),
};
