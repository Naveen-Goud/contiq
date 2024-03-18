import React from "react";
import FileSync from ".";
import { Meta, StoryFn } from "@storybook/react";

export default{
    title:'molecules/FileSync',
    component:FileSync
}as Meta<typeof FileSync>

const Template: StoryFn<typeof FileSync>=(args)=><FileSync {...args}/>

export const syncFile=Template.bind({})

syncFile.args={
    open:true, 
}