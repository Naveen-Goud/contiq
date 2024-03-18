import React from "react";
import RadioButton from ".";
import {Meta,StoryFn} from'@storybook/react';
import theme from "../../../theme"; 

export default{
    title:"atoms/RadioButtons",
    component:RadioButton
}as Meta<typeof RadioButton>

const Template: StoryFn<typeof RadioButton>=(args)=>  <RadioButton {...args}/> 

export const button1=Template.bind({});
  button1.args={
  customColor:theme.palette.textColor.black,
   
}