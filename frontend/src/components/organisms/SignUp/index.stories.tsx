import React from 'react';
import {Meta,StoryFn} from '@storybook/react';
import { SignUp} from '.';
import { BrowserRouter } from "react-router-dom";

const meta : Meta = {
    title:"Organisms/SignUp",
    component:SignUp
};
export default meta;

const Template: StoryFn=()=> <BrowserRouter><SignUp/></BrowserRouter>

export const Component=Template.bind({});

