import React from "react";
import SearchBar from ".";
import { Meta, StoryFn } from "@storybook/react";


export default{
    title:"organisms/SearchBar",
    component:SearchBar
}as Meta<typeof SearchBar>

const Template: StoryFn<typeof SearchBar>=(args)=><SearchBar setState={ ()=>{}}/>

export const searchBar=Template.bind({})

searchBar.args={
    
 }