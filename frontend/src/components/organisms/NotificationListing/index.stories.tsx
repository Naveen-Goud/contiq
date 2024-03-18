import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import NotificationListing from '.';

const meta = {
    title: 'Organisms/NotificationListing',
    component: NotificationListing,
    tags: ['autodocs'],
} satisfies Meta<typeof NotificationListing>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args:{

    }
}

export const Custom: Story = {
    args:{
        title: 'Notification Test',
        notifications:[      {
            id: '1',
            avatarUrl: '',
            senderName: 'Amit',
            message: 'has uploaded company agreement.pdf',
            updateDate: new Date('2023-06-20T10:30:00'),
          },
            {
              id: '2',
              avatarUrl: '',
              senderName: 'John',
              message: 'request access to User agreement.pdf',
              updateDate: new Date('2023-06-03T09:30:00'),
            },], 
          menuSx: {left: '300px'},
    }
}

export const NoNotificatin: Story = {
  args:{
      title: 'Notification Test',
      notifications:[], 
  }
}