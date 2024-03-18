import styled from '@emotion/styled';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import React from 'react';
import theme from '../../../theme';

export interface LoaderProps{
 variant?:"determinate" | "indeterminate" | "buffer" | "query" ,
 value?:number,
}

const LinearProgressComponent=styled(LinearProgress)({
    width:'25.3vw',
    height:'1.04vh',
    borderRadius:'100px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:theme.palette.structural.overlay3,
      },
   
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary[300],
      },
})
export const LoaderComponent=({variant,value}:LoaderProps)=>{
return(
   
        <LinearProgressComponent variant={variant} value={value} data-testid="loader"/>
    
)
}