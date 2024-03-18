import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const meta = {
    title: 'Organisms/Header',
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const withBrowserRouter = (Story: React.ComponentType) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);

export const Default: Story = {
    args: {},
};

Default.decorators = [withBrowserRouter];

export const Custom: Story = {
    args: {
        title: 'CONTIQ APP',
        userDetails: { username: 'Test01', userId: 'IDTST001' },
        avatarOptions: [
            {
                name: 'Profile',
                handleClick: () => {
                    alert('Profile Clicked');
                },
            },
            {
                name: 'Settings',
                handleClick: () => {
                    alert('Settings click');
                },
            },
        ],
    },
};

Custom.decorators = [withBrowserRouter];
