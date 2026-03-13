import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../src/components/form-elements/Switch';

const meta: Meta<typeof Switch> = {
    title: 'Components/Form Elements/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
        },
        supportingText: {
            control: 'text',
        },
        isSelected: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
        onChange: { action: 'changed' },
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the switch.',
            table: { category: 'React Aria' },
        },
        'aria-labelledby': {
            control: 'text',
            description: 'ID of element that labels this switch.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that describes this switch.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        label: 'Receive updates via SMS',
        supportingText: 'Get notified via text',
    },
};

export const Selected: Story = {
    args: {
        label: 'Receive updates via SMS',
        supportingText: 'Get notified via text',
        isSelected: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Receive updates via SMS',
        supportingText: 'Get notified via text',
        isDisabled: true,
    },
};

export const DisabledSelected: Story = {
    args: {
        label: 'Receive updates via SMS',
        supportingText: 'Get notified via text',
        isDisabled: true,
        isSelected: true,
    },
};

export const WithoutVisibleText: Story = {
    args: {
        'aria-label': 'Receive updates via SMS',
    },
};

export const SwitchGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
            <Switch label="Receive updates via SMS" supportingText="Get notified via text" />
            <Switch label="Receive updates via SMS" supportingText="Get notified via text" isSelected />
            <Switch label="Receive updates via SMS" supportingText="Get notified via text" isDisabled />
            <Switch label="Receive updates via SMS" supportingText="Get notified via text" isDisabled isSelected />
        </div>
    ),
};
