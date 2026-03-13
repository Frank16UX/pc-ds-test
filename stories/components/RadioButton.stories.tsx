import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '../../src/components/form-elements/RadioButton';
import { RadioGroup } from 'react-aria-components';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

const meta: Meta<typeof RadioButton> = {
    title: 'Components/Form Elements/RadioButton',
    component: RadioButton,
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
        supportingText: {
            control: 'text',
        },
        required: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the radio button.',
            table: { category: 'React Aria' },
        },
        'aria-labelledby': {
            control: 'text',
            description: 'ID of element that labels this radio button.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that describes this radio button.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
    args: {
        label: 'Option A',
        supportingText: 'Description of option A.',
        value: 'a',
    },
    decorators: [
        (Story) => (
            <RadioGroup aria-label="Example">
                <Story />
            </RadioGroup>
        ),
    ],
};

export const Selected: Story = {
    render: () => (
        <RadioGroup defaultValue="a" aria-label="Example">
            <RadioButton label="Selected option" supportingText="This is pre-selected." value="a" />
        </RadioGroup>
    ),
};

export const WithError: Story = {
    args: {
        label: 'Required option',
        supportingText: 'Please select to continue.',
        error: true,
        errorText: 'Please select this option to continue.',
        required: true,
        value: 'required',
    },
    decorators: [
        (Story) => (
            <RadioGroup aria-label="Example">
                <Story />
            </RadioGroup>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        supportingText: 'This option is not available.',
        isDisabled: true,
        value: 'disabled',
    },
    decorators: [
        (Story) => (
            <RadioGroup aria-label="Example">
                <Story />
            </RadioGroup>
        ),
    ],
};

export const Inverted: Story = {
    render: () => (
        <RadioGroup defaultValue="b" aria-label="Inverted example">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <RadioButton label="Option A" supportingText="First option." surface="inverted" value="a" />
                <RadioButton label="Option B" supportingText="Second option." surface="inverted" value="b" />
            </div>
        </RadioGroup>
    ),
    args: {
        surface: 'inverted',
    },
};

export const RadioButtonGroup: Story = {
    render: () => (
        <RadioGroup defaultValue="standard" aria-label="Shipping method">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <RadioButton label="Standard Shipping" supportingText="5-7 business days" value="standard" />
                <RadioButton label="Express Shipping" supportingText="2-3 business days" value="express" />
                <RadioButton label="Overnight Shipping" supportingText="Next business day" value="overnight" />
                <RadioButton label="In-Store Pickup" supportingText="Available within 2 hours" value="pickup" isDisabled />
            </div>
        </RadioGroup>
    ),
};
