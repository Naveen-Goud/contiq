import { StoryObj, Meta } from '@storybook/react';
import Avatar from '.';
import ElipseAvatar from '../../../../public/assets/icons/Ellipse 19.svg';

const meta = {
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args:{
        src:ElipseAvatar,
        onClick: () => {
            alert('Avatar clicked!');
        },
    }
}