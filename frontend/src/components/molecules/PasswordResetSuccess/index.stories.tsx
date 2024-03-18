import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PasswordResetSuccess from '.';

const meta = {
    title: 'Molecules/PasswordResetSuccess',
    component: PasswordResetSuccess,
    tags: ['autodocs'],
} satisfies Meta<typeof PasswordResetSuccess>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args:{
        onClick: () => {
            alert('Button has been clicked');
        },
    }
}

export const CustomWithArgs: Story = {
    args:{
        title: 'CustomTitle',
        subText: 'Custom SubText',
        buttonLabel: 'Test Button',
        onClick: () => {
            alert('Button has been clicked');
        },
    }
}