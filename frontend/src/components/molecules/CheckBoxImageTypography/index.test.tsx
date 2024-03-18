import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { CheckBoxImageTypography } from '.';

describe("CheckBoxImageTypography",()=>{
    test("render CheckBoxImageTypography",()=>{
        render(<CheckBoxImageTypography content={'Company overview'}/>)
        const data=screen.getByText('Company overview');
        expect(data).toBeInTheDocument();
    })
    test("render CheckBoxImageTypography with image",()=>{
        render(<CheckBoxImageTypography content={'Company overview'}/>)
        const text=screen.getByAltText('files')
        expect(text).toBeInTheDocument();
    })
})