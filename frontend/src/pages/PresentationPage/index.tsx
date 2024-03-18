import React from 'react';
import HomeTemplate from '../../components/templates/HomeTemplate';
import Header from '../../components/organisms/Header';
import PdfViewer from '../../components/organisms/PdfViewer';
import { Box } from '@mui/material';
import CustomIcon from '../../components/atoms/Icon';
import leftArrow from '../../../public/assets/icons/leftArrow.svg';
import Typography from '../../components/atoms/Typography';
import theme from '../../theme';
import NavBar from '../../components/organisms/Navbar';

interface PresentationPageProps{
    fileName:string;
    filePath:string;
    searchKey:string;
}
const PresentationPage = ({fileName,filePath,searchKey}:PresentationPageProps) => {
    return (
        <HomeTemplate
            sidebar={<NavBar />}
            header={<Header setState={()=>{/*using this state in another place ,so it passes as props*/}}/>}
            content={
                <Box sx={{display:"flex",flexDirection:"column",marginLeft:"60px",gap:"16px"}}>
                    <Box sx={{display:"flex",gap:"7px",alignItems:"center"}}>
                        <CustomIcon src={leftArrow} sx={{height:"24px" ,width:"24px"}}/>
                        <Typography variant='header2' color={theme.palette.textColor.black}>{fileName}</Typography>
                    </Box>
                    <PdfViewer searchKey={searchKey} filePath={filePath} fileName={fileName} />
                </Box>
            }
        />
    );
};

export default PresentationPage;
