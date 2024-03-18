import CustomTabs from '.';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../theme';
import { Box } from '@mui/material';
import React from 'react';

const meta = {
    title: 'molecules/CustomTabs',
    component: CustomTabs
} satisfies Meta<typeof CustomTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Files: Story = {
    args: {
       tabs:[
        {
          label: 'All files',
          content: <Box>Content for Tab 1</Box>,
          disabled:false
        },
        {
          label: 'Slides',
          content: <Box>Content for Tab 2</Box>,
          disabled:true
        },
        {
          label: 'Docs',
          content: <Box>Content for Tab 3</Box>,
          disabled:true
        },
      ],
      activeTabColor:theme.palette.primary[500],
      inactiveTabColor:theme.palette.textColor.mediumEmphasis,
      backgroundColor:theme.palette.structural.white,
      width:"300px"

    }
};
export const Uploads: Story = {
    args: {
       tabs:[
        {
          label: 'Uploads',
          content: <Box>Content for Tab 1</Box>,
          disabled:false
        },
        {
          label: 'Cloud storage',
          content: <Box>Content for Tab 2</Box>,
          disabled:false
        },
      ],
      activeTabColor:theme.palette.structural.white,
      inactiveTabColor:theme.palette.textColor.mediumEmphasis,
      backgroundColor:theme.palette.grey[400],
      width:"500px",
      tabWidth:"250px"
    }
};