import Spinner from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Atoms/Spinner',
    component: Spinner
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'indeterminate',
        color: 'primary',
        size: 30,
        thickness: 5
    }
};
