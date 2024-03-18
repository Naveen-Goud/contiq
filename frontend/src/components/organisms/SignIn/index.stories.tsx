import React from 'react';
import {Meta,StoryFn} from '@storybook/react';
import { SignIn} from '.';
import { BrowserRouter } from "react-router-dom";
const meta : Meta = {
    title:"Organisms/SignIn",
    component:SignIn
};
export default meta;

const Template: StoryFn=()=><BrowserRouter><SignIn/></BrowserRouter>

export const Component=Template.bind({});

