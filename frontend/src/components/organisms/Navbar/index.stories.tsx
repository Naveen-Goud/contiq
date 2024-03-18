import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import NavBar from "."; 
import { BrowserRouter } from "react-router-dom";
export default{
    title:"organisms/NavBar",
    component:NavBar
}as Meta<typeof NavBar>

const Tempalte:StoryFn<typeof NavBar> =(args) => <BrowserRouter><NavBar  /></BrowserRouter>


export const item1=Tempalte.bind({})

item1.args={
    
}