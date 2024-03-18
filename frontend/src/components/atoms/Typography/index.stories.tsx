import Typography from '.';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../theme';

const meta = {
    title: 'Atoms/Typography',
    component: Typography
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "body1",
        color: 'primary',
        children: 'contiq'
    }
};