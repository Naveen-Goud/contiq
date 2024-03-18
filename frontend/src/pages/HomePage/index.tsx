import React, { useEffect, useState } from 'react';
import HomeTemplate from '../../components/templates/HomeTemplate';
import NavBar from '../../components/organisms/Navbar';
import Header from '../../components/organisms/Header';
import { styled } from 'styled-components';
import { Box, Stack } from '@mui/material';
import Typography from '../../components/atoms/Typography';
import CustomImage from '../../components/atoms/Image';
import Emptystate from '../../../public/assets/icons/emptystate.svg';
import theme from '../../theme';
import PresentationCard from '../../components/molecules/ImageTypography';
import pdfIcon from "../../../public/assets/icons/PDF.svg"
import { HomePageConstants, SearchBarImages } from '../../utils/constants';
import { InputFileData } from '../../modal/Interfaces';
import { getFileLists } from '../../services';
import { useUserContext } from '../../contexts/User/UserContext';
const HeaderBox = styled(Box)`
    width: 90vw;
    justifycontent: left;
    padding-left: ${theme.spacing(10)};
    padding-top:  ${theme.spacing(8)};
    flex-direction: column;
`;
const OuterBox = styled(Box)`
    width: 80vw;
    height: 80vh;
    justify-content: center;
    align-items: center;
    padding-left:24px;
`;
const ImageBox = styled(Box)`
    width: 23.4vw;
    height: 33vh;
    text-align: center;
    flex-direction: column;  
    justify-content: center;
    align-items: center;
    padding-left: 522px;
    padding-top: 140px;
`;
const TypoStack = styled(Stack)`
    align-itmes: center;
    justify-content: center;
    flex-direction: column;
    gap: ${theme.spacing(2)};
`;
 
const RecentBox = styled(Box)`
    width: 90vw;
    justifycontent: left;
    padding-left: ${theme.spacing(10)};
    padding-top: ${theme.spacing(10)};
    flex-direction: column;
`;
const RecentDataBox = styled(Box)`
    width: 92vw;
    justifycontent: left;
    padding-left: ${theme.spacing(10)};
    padding-top: ${theme.spacing(6)};
    flex-direction: column;
    gap:${theme.spacing(2)};
    overflow: auto;  
    max-height: 60vh;  

    &::-webkit-scrollbar {
        width: ${theme.spacing(4)};
        border-radius: ${theme.spacing(4)};
        border: 4px solid ${theme.palette.structural.border};
    }

    &::-webkit-scrollbar-track {
        background-color: ${theme.palette.structural.scrollTrack};
        border-radius: ${theme.spacing(4)};
        width: ${theme.spacing(4)};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.grey[50]};
        border-radius: ${theme.spacing(8)};
        border: 4px solid ${theme.palette.structural.scrollTrack};
    }
`


const HomeComponent = () => {
    const [recentData,setRecentData]=useState<any>([]);
    const { user } = useUserContext();

    useEffect(()=>{
     if(user==null) return
     getFileLists(user?.id) 
     .then(response=>{
        if(response==null || response.data==null){
            return
        }
        const responseArray = response.data; 
      const uniqueData:InputFileData[]= []; 
      responseArray.forEach((item:    any ) => { 
        const isDuplicate = uniqueData.some((uniqueItem ) => uniqueItem.name === item.name); 
        console.log(item)
        if (!isDuplicate) {
          uniqueData.push(item);
        }
      });
 
      setRecentData(uniqueData);
     })
     .catch(error=>{
        console.log(error)
     })
    },[])


    return (
        <OuterBox data-testid={'home-component'}>
            <HeaderBox>
                <Typography variant="header2">{HomePageConstants[0]}</Typography>
            </HeaderBox>
             {recentData.length !== 0 ?   (  
            <>
            <RecentBox>
                <Typography variant="header3" color={theme.palette.textColor.lowEmphasis}>{HomePageConstants[1]}</Typography>
            </RecentBox> 
            <RecentDataBox flexDirection={'row'}>
                 <Stack flexWrap={'wrap'} direction={'row'} spacing={'12px'}>
                     {recentData.map((item:any)=>(
                        <PresentationCard  imageUrl={SearchBarImages.length>=2 && SearchBarImages[1]} pdfIcon={pdfIcon} pdfLabel={item.name} primary={true} key={item.id}/>
            
                    ))} 
                 </Stack>
            </RecentDataBox> 
                </>
                ):(<ImageBox>
                <TypoStack direction={'column'}>
                    <CustomImage src={Emptystate} />
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.textColor.black}
                    >
                        {HomePageConstants[2]}
                    </Typography>
                    <Typography
                        variant="body2"
                        color={theme.palette.text.lowemp}
                    >
                        {HomePageConstants[3]}
                    </Typography>
                </TypoStack>
            </ImageBox>)  
}     </OuterBox>
    );
};
const HomePage = () => {
    return (
        <div>
            <HomeTemplate
                sidebar={<NavBar />}
                header={<Header setState={ ()=>{/*using this state in another place ,so it passes as props*/}} />}
                content={<HomeComponent />}
            />
        </div>
    );
};

export default HomePage;
