import { Box, SxProps } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import theme from "../../../theme";
import CustomImage from "../../atoms/Image";
import Typography from "../../atoms/Typography"; 
import styled from "@emotion/styled";

interface IconTypoProps {
  iconUrl: string;
  text?: string;
  sx?: SxProps;
  onClick?:()=>void;
  isSelected?:boolean
}

const StyledBox = styled(Box)`
  width: 1.5vw;
  height: 2.6vh; 
  margin: ${theme.spacing(1.5)};   
`;


const StyledContainer = styled(Container)<{ isSelected?: boolean }>`
  width:6vw;
  height: 9.3vh;
  cursor: pointer; 
  background-color: ${(props) =>
    props.isSelected ? theme.palette.grey[400] : "transparent"};

  &:hover {
    background-color: ${theme.palette.grey[300]};
  }
`;

const IconTypo = (props: IconTypoProps) => {
  const {isSelected,onClick}=props
  return (
    <StyledContainer data-testid="icon-typo-container"   isSelected={isSelected} onClick={onClick}>
      <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
        <StyledBox>
          <CustomImage src={props.iconUrl}/>
        </StyledBox>
        <Typography variant="caption1" sx={{ color: isSelected? theme.palette.structural.white:theme.palette.grey[200] }}>{props.text}</Typography>
      </Stack>
    </StyledContainer>
  );
};

export default IconTypo;
