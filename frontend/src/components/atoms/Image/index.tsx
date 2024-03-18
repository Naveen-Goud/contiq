import { SxProps } from "@mui/material";
import React from "react"; 

interface ImageProps{
    src?:string
    alt?:string
    width?: string | number
  height?: string | number  
  children?: React.ReactNode
  sx?: SxProps
}
const CustomImage=(props:ImageProps)=>{
    return <img src={props.src} alt={props.alt}  {...props}/>  
}

export default CustomImage