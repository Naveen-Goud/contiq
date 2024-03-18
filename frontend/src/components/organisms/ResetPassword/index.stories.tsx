import ResetPassword from '.';
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
    title: 'organisms/ResetPassword',
    component: ResetPassword
} satisfies Meta<typeof ResetPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        
    }
};