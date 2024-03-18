import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import theme from '../../../theme';
import Dropdown from '.';
import Up from '../../../../public/assets/icons/up.svg';
import Down from '../../../../public/assets/icons/down.svg';
import CustomImage from '../Image/index';
export default {
    title: 'atoms/Dropdown',
    component: Dropdown
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = ({ ...args }) => (
    <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
    listofItems: [
        {
            text: 'PDF'
        },
        {
            text: 'PPT'
        },
        {
            text: 'Image'
        }
    ],
    isFilterApplied: false,
    buttonContent: 'File type',
    listTextColor: theme.palette.textColor.highEmphasis,
    listTextVariant: 'body1',
    menuheaderText: 'File type',
    menuheaderVariant: 'caption1',
    endIconOpen: (
        <CustomImage src={Up} width="24px" height="24px" alt="endIcon" />
    ),
    endIconClose: (
        <CustomImage src={Down} width="24px" height="24px" alt="endIcon" />
    ),
    borderWhenClosed: `1px solid ${theme.palette.structural.border} `
};
