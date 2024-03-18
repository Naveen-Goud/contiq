import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CloudStorage, { CloudStorageIcon } from '.';
import GoogleDrive from '../../../../public/assets/icons/Google drive.svg';
import DropBox from '../../../../public/assets/icons/DropBox.svg';
import TeraBox from '../../../../public/assets/icons/TeraBox.svg';
import ICloud from '../../../../public/assets/icons/iCloud.svg';

const meta = {
    title: 'Molecules/CloudStorage',
    component: CloudStorage,
    tags: ['autodocs'],
} satisfies Meta<typeof CloudStorage>

export default meta;
type Story = StoryObj<typeof meta>;

const iconsLists: CloudStorageIcon[] = [
    { dataTestId: 'google-drive', iconSrc: GoogleDrive, onClick: () => alert('Clicked GoogleDrive icon')  },
    { dataTestId: 'dropbox', iconSrc: DropBox, onClick: () => alert('Clicked Dropbox icon')  },
    { dataTestId: 'terabox', iconSrc: TeraBox, onClick: () => alert('Clicked Terabox icon')  },
  ];

export const Default: Story = {
    args:{     
    }
}

export const Custom: Story = {
    args:{     
        title: 'Testing upload file drives',
        icons: iconsLists,
    }
}