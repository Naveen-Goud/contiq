import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Dialogcard, DialogcardProps } from ".";

const meta : Meta = {
    title:"Molecules/Dialogcard",
    component:Dialogcard
};
export default meta;

const Template : StoryFn<DialogcardProps>=(args:DialogcardProps)=> <Dialogcard {...args}/>

export const Component=Template.bind({});

Component.args = {
    open:true,
    pdfName:"Contract agreement.pdf"
}
