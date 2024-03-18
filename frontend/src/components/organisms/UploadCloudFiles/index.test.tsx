import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { UploadCloudFiles } from '.';
import '@testing-library/jest-dom';
import { render } from '../../../test-setUp';

describe("uploadCloudFiles",()=>{
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
    test("render the component",()=>{
        render(<UploadCloudFiles open={true} data={data} onClick={function (): void {
            throw new Error('Function not implemented.');
        } } onClose={()=>{}}/>) 
        const folder=screen.getByText("contiq")
        fireEvent.click(folder) 
        const back=screen.getByTestId("back")
        fireEvent.click(back) 
        const file=screen.getByText("contiq")
        fireEvent.click(file) 
        const sync=screen.getByText("Sync")
        fireEvent.click(sync)

    })
   

})