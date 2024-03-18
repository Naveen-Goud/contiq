import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { AvatarTypography, AvatarTypographyProps } from '.';
import ElipseAvatar from '../../../../public/assets/icons/Ellipse 19.svg';

const meta: Meta = {
    title: 'Molecules/AvatarTypography',
    component: AvatarTypography
};
export default meta;

const Template: StoryFn<AvatarTypographyProps> = (
    args: AvatarTypographyProps
) => <AvatarTypography {...args} />;

export const Component = Template.bind({});

Component.args = {
    src: ElipseAvatar,
    name: 'Amit',
    text: 'has uploaded company agreement.pdf',
    date: '20 June 10:30 AM'
};
