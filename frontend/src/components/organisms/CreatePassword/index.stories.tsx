import CreatePassword from '.';
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
    title: 'organisms/CreatePassword',
    component: CreatePassword
} satisfies Meta<typeof CreatePassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        
    }
};