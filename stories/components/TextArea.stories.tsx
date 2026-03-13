import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../../src/components/form-elements/TextArea';
import React from 'react';
import { resolveTokenValue } from '../utils/scssTokens';

const meta: Meta<typeof TextArea> = {
    title: 'Components/Form Elements/Input/TextArea',
    component: TextArea,
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
        maxLength: {
            control: 'number',
        },
        showCounter: {
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
            description: 'Accessible label for the text area.',
            table: { category: 'React Aria' },
        },
        'aria-describedby': {
            control: 'text',
            description: 'ID of element that describes this text area.',
            table: { category: 'React Aria' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        label: 'Description',
        placeholder: 'Enter a description...',
        maxLength: 300,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Bio',
        placeholder: 'Tell us about yourself...',
        helperText: 'Keep it brief and relevant.',
        maxLength: 200,
    },
};

export const Required: Story = {
    args: {
        label: 'Feedback',
        placeholder: 'Share your feedback...',
        isRequired: true,
        maxLength: 500,
    },
};

export const WithTooltip: Story = {
    args: {
        label: 'Special Instructions',
        placeholder: 'Add any special requests...',
        tooltip: true,
        maxLength: 300,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Message',
        placeholder: 'Enter your message...',
        isInvalid: true,
        errorMessage: 'This field is required.',
        maxLength: 300,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Notes',
        placeholder: 'Cannot edit this field',
        isDisabled: true,
        maxLength: 300,
    },
};

export const ReadOnly: Story = {
    args: {
        label: 'Order Notes',
        placeholder: '',
        isReadOnly: true,
        defaultValue: 'Please deliver to the back door. Ring the bell twice.',
        maxLength: 300,
    },
};

export const WithoutCounter: Story = {
    args: {
        label: 'Comments',
        placeholder: 'Add your comments...',
        showCounter: false,
        helperText: 'No character limit shown.',
    },
};

export const Inverted: Story = {
    args: {
        label: 'Description',
        placeholder: 'Enter a description...',
        surface: 'inverted',
        maxLength: 300,
    },
};

export const InvertedError: Story = {
    args: {
        label: 'Message',
        placeholder: 'Enter your message...',
        isInvalid: true,
        errorMessage: 'This entry is not valid.',
        surface: 'inverted',
        maxLength: 300,
    },
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
            <TextArea
                label="Default"
                placeholder="Placeholder"
                maxLength={300}
            />
            <TextArea
                label="Required"
                placeholder="Placeholder"
                isRequired
                maxLength={300}
            />
            <TextArea
                label="With Helper"
                placeholder="Placeholder"
                helperText="This is a helper text."
                maxLength={300}
            />
            <TextArea
                label="Error State"
                placeholder="Placeholder"
                isInvalid
                errorMessage="This field is required."
                maxLength={300}
            />
            <TextArea
                label="Disabled"
                placeholder="Placeholder"
                isDisabled
                maxLength={300}
            />
            <TextArea
                label="Read Only"
                isReadOnly
                defaultValue="Pre-filled content that cannot be edited."
                maxLength={300}
            />
        </div>
    ),
};
