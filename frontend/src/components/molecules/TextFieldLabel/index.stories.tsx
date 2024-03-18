import TextFieldLabel from '.';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../theme';

const meta = {
    title: 'molecules/TextFieldLabel',
    component: TextFieldLabel
} satisfies Meta<typeof TextFieldLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
       labelText:"Name",
       placeholder:"John Cena",
       onChange:()=>{}
    }
};