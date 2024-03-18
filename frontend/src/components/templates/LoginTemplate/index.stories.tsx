import React from "react";
import { Meta,StoryFn } from "@storybook/react";
import LoginSignupTemplate from ".";

export default{
    title:'templates/LoginSignupTemplate',
    Component:LoginSignupTemplate
}as Meta<typeof LoginSignupTemplate>;

const Template : StoryFn<typeof LoginSignupTemplate>=(args: any)=><LoginSignupTemplate{...args}/>

export const Logintemp = Template.bind({});

Logintemp.args={
   
}
