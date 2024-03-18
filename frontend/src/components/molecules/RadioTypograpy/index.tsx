import { Box, Radio, styled } from "@mui/material";
import { Stack } from "@mui/system";
import Container from "@mui/system/Container/Container";
import React from "react";
import Typography from "../../atoms/Typography";
import theme from "../../../theme"; 
import RadioButton from "../../atoms/RadioButton";
import { RadioTypoConst } from "../../../utils/constants";
 
const StyledBox = styled(Box)`
  width: 10vw;
  height: 24px;
  padding: 2px 2px 0px 2px;
`;
const CustomRadio = styled(Radio)`
 color: ${theme.palette.text.medemp }
`;
 
const RadioTypo = () => {
    return (
      <Container  data-testid="container"> 
        <Stack direction={'row'}> 
        <Stack direction="row" alignItems="center" >
        <CustomRadio
        data-testid="unchecked-radio"
        checked={false}
        />
          <StyledBox>
            <Typography  variant={"body2"}  sx={{color:theme.palette.text.medemp}}>{RadioTypoConst[0]}</Typography>
          </StyledBox>
        </Stack>
        <Stack direction="row" alignItems="center" >
        < RadioButton checked={true} customColor={theme.palette.structural.white}   data-testid="disabled-radio"/> 
          <StyledBox>
            <Typography variant={"body2"} sx={{color:theme.palette.structural.white}}>{RadioTypoConst[1]} </Typography>
          </StyledBox>
        </Stack>
        </Stack>
      </Container>
    );
  };

export default RadioTypo;
