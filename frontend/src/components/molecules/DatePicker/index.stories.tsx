import React from 'react';
import type { Meta, StoryFn  } from '@storybook/react';
import BasicDateCalendar from '.';
import theme from '../../../theme';

export default{
    title:"molecules/Calender",
    component:BasicDateCalendar
}as Meta<typeof BasicDateCalendar>

const Template: StoryFn<typeof BasicDateCalendar>=(args)=><BasicDateCalendar {...args}/>

export const Calender1=Template.bind({})

Calender1.args={
    sx:{backgroundColor:theme.palette.textColor.dark},
    placeholder: 'Select Date',
}