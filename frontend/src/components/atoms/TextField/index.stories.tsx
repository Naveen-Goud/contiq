import { Meta, StoryFn } from '@storybook/react';

import SearchIcon from '../../../../public/assets/icons/search.svg';

import TextFieldComponent, { TextFieldProps } from '.';
import React from 'react';
import theme from '../../../theme';

const meta: Meta = {
    title: 'atoms/TextField',
    component: TextFieldComponent
};
export default meta;

const Template: StoryFn<TextFieldProps> = (args) => (
    <TextFieldComponent {...args} />
);

export const TextField = Template.bind({});
TextField.args = {
    placeholder: 'john@example.com',
    variant: 'outlined',
    paddingLeftForText: '16px',
    backgroundColor: theme.palette.structural.white,
    onFocus: () => console.log('hi')
};

// export const TextFieldWithStartIcon = Template.bind({});
// TextFieldWithStartIcon.args = {
//     placeholderColor: theme.palette.structural.white,
//     textColor: theme.palette.structural.white,
//     paddingLeftForText: '10px',
//     placeholder: 'Search',
//     variant: 'outlined',
//     border: 'none',
//     startAdornment: <img src={SearchIcon} alt="icon" />
// };
