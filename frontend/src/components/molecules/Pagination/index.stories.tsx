import Pagination from '.';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../theme';

const meta = {
    title: 'molecules/Pagination',
    component: Pagination
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentPage: 1,
        totalPages: 5,
        zoomRange:100
    }
};
