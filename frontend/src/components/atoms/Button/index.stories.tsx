import React from "react"; 
import {Meta,StoryFn} from '@storybook/react';
import theme from "../../../theme"; 
import CustomButton from "."; 
 import Vector from "../../../../public/assets/icons/Vector.svg"
 
export default{
    title:'atoms/Button',
    component: CustomButton
}as Meta<typeof CustomButton>

const Template: StoryFn<typeof CustomButton >=({ ...args }) =>  <CustomButton {...args} />
 
 

export const signInbutton=Template.bind({})
signInbutton.args={
children:'sign in',
variant:"contained" ,
 sx:{backgroundColor:theme.palette.structural.gradient}
}

export const AddFilesButton=Template.bind({})
AddFilesButton.args={
children:'add files',
icon:  Vector ,
variant:"contained" ,
 
 sx:{backgroundColor:theme.palette.structural.gradient}
}