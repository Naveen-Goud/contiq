import {StoryFn, Meta} from "@storybook/react";
import HomeTemplate from ".";
import React from "react";

export default {
    title:'Templates/HomeTemplate',
    component:HomeTemplate,
} as Meta<typeof HomeTemplate>;

const Template:StoryFn<typeof HomeTemplate> = (args) => <HomeTemplate {...args}/>;

export const Default = Template.bind({});
Default.args = {
    sidebar:"sidebar ",
    header:"header" ,
    content: "content ",
    
}