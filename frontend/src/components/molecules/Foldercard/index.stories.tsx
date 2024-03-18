import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FolderCard from '.';

const meta = {
    title: 'Molecules/FolderCard',
    component: FolderCard,
    tags: ['autodocs'],
} satisfies Meta<typeof FolderCard>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args:{
        folderName: 'Zemoso decks',
    }
}