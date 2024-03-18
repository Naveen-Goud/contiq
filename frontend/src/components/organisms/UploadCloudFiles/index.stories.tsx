import React from 'react';
import {Meta,StoryFn} from '@storybook/react';
import { UploadCloudFiles, UploadCloudFilesProps} from '.';

const meta : Meta = {
    title:"Organisms/UploadCloudFiles",
    component:UploadCloudFiles
};
export default meta;

const Template: StoryFn<UploadCloudFilesProps>=(args:UploadCloudFilesProps)=><UploadCloudFiles {...args}/>

export const Component=Template.bind({});

const data = [
    {
        trashed: false,
        name: "contiq",
        id: "123d",
        files: [
            {
            name:'company overview',
            trashed:true,
            parents:"iu6438irhfdl"
            },
            {
            name:'Software agreement',
            trashed:true,
            parents:"hgefjh",
        }
        ]
    },
    {
        trashed: false,
        name: "figma",
        id: "194d",
        files: [
            {
            name:'company overview',
            trashed:true,
            parents:"iu6438irhfdl"
            },
            {
            name:'Software agreement',
            trashed:true,
            parents:"hgefjh",
        }
        ]
    }
];


Component.args={
    open:true,
    data:data
}
