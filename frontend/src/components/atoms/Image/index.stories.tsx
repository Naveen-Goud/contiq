import React from "react"; 
import {Meta,StoryFn} from '@storybook/react';
import theme from "../../../theme"; 
import { ThemeProvider } from "@emotion/react";
import CustomImage from ".";
import DisplayImage from "../../../../public/assets/icons/DisplayImage.svg"
export default{
    title:'atoms/Image',
    component: CustomImage
}as Meta<typeof CustomImage>

const Template: StoryFn<typeof CustomImage >=({ ...args }) => <CustomImage {...args} />
 
export const image1=Template.bind({}) 
image1.args={
    src: DisplayImage,
    alt:"image is loading",
    width:"300px",
    height:"190px"
}