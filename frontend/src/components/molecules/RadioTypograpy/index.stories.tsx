import React from "react";
import RadioTypo from ".";
import { Meta, StoryFn } from "@storybook/react";

export default{
    title:"molecules/RadioTypo",
    component:RadioTypo
}as Meta<typeof RadioTypo>

const Template:StoryFn<typeof RadioTypo>=(args)=><RadioTypo />

export const RadioDefault=Template.bind({})
RadioDefault.args={
    
}