import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Icon from '.';
import theme from '../../../theme';
import UserIcon from '../../../../public/assets/icons/add user.svg';
import HomeIcon from '../../../../public/assets/icons/home2.svg';


const meta = {
    title: 'Atoms/Icon',
    component: Icon,
    tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderIcon: Story = {
    args:{
        icon: UserIcon,
        sx: {
            borderRadius: 2,
            color: theme.palette.structural.overlay2,
            padding: '10px',
            background: theme.palette.structural.overlay4,
            width: '24px',
            height: '24px',
        }
    }
}

export const Primary: Story = {
    args:{
        icon: HomeIcon,
        sx: {
            borderRadius: 0,
            backgroundColor: 'black',
            color: theme.palette.structural.overlay2,
            width: '24px',
            height: '24px',
        }
    }
}
