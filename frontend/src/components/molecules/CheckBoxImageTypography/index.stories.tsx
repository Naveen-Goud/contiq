import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CheckBoxImageTypography, CheckBoxImageTypographyProps } from '.';
import { action } from '@storybook/addon-actions';
import Files from '../../../../public/assets/icons/files.svg';

const meta: Meta = {
    title: 'molecules/CheckBoxImageTypography',
    component: CheckBoxImageTypography
};
export default meta;

const Template: StoryFn<CheckBoxImageTypographyProps> = (
    args: CheckBoxImageTypographyProps
) => <CheckBoxImageTypography {...args} />;

export const Component = Template.bind({});

Component.args = {
    content: 'Company overview',
    onClick: action('checkBox-clicked'),
    src:Files
};
