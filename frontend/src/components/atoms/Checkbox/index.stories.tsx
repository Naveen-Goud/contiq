import { StoryObj, Meta } from '@storybook/react';
import CustomCheckbox from '.';

const meta = {
    title: 'atoms/Checkbox',
    component: CustomCheckbox,
    tags: ['autodocs'],
} satisfies Meta<typeof CustomCheckbox>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args:{
    }
}

export const Disabled: Story = {
    args:{
        label:'Disabled Checkbox',
        disabled: true,
    }
}

export const Checked: Story = {
    args:{
        label:'PreChecked Checkbox',
        checked:true,
    }
}
