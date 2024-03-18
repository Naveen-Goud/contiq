import React from "react";
import UploadFile from ".";
import { StoryFn , Meta} from "@storybook/react"; 

export default{
    title:'organisms/UploadFile',
    component:UploadFile
}as Meta<typeof UploadFile>

const Template :StoryFn<typeof UploadFile>=(args)=><UploadFile onClick={function (): void {
    throw new Error("Function not implemented.");
} } setUploadData={function (value: React.SetStateAction<File | undefined>): void {
    throw new Error("Function not implemented.");
} } dialogBox={function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
} } onClose={function (): void {
    throw new Error("Function not implemented.");
} } duplicateId={function (id: string): void {
    throw new Error("Function not implemented.");
}   }/>

export const uploadFile=Template.bind({})
