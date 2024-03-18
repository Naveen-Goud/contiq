import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import IconTypo from '../../molecules/IconTypograpy';
import { Images, NavBarImages } from '../../../utils/constants';
import { useNavigate,useLocation } from "react-router-dom";

const OutBox = styled(Box)`
    width: 6vw;
    height:  94.5vh;
    background-color: black;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;  
    user-select: none; 
    &::-moz-focus-inner {
        border: 0;
    }
`;

const NavBar = () => {
    const [navState, setNavState] = useState({
        isSelected: false,
        fileSelected: false
    });

    const navigate=useNavigate()
    const location=useLocation()

    const handleHomeClick = () => {
       
        setNavState({
            isSelected: !navState.isSelected,
            fileSelected: false
        });

 
        navigate("/home");
    };
 
    const handleFiles = (name:any) => {
      
        if (name === 'Files') {
            setNavState({
                isSelected: false,
                fileSelected: !navState.fileSelected
            });
            navigate("/filesPage")
        }
        
    };
    return (
        <OutBox>
            <div>
                <Box onClick={handleHomeClick}>
                    <IconTypo
                        iconUrl={
 
                            location.pathname=="/home"
 
                                ? NavBarImages[0]
                                : NavBarImages[1]
                        }
                        text={"Home"}
 
                        isSelected={location.pathname=="/home"}
 
                      
                    />
                </Box>
                {Images.map((image) => (
                    <Box
                        key={image.name}
                        onClick={() => handleFiles(image.name)}
                    >
                        <IconTypo
                            iconUrl={
                                image.name === 'Files' && location.pathname==="/filesPage"
                                    ? NavBarImages[2]
                                    : image.imageUrl
                            }
                            text={
                                image.name === 'Files' && navState.fileSelected
                                    ? 'Files'
                                    : image.name
                            }
                            isSelected={
 
                                image.name === 'Files' && location.pathname==="/filesPage"
 
                            }
                         
                        />
                    </Box>
                ))}
            </div>
            <IconTypo iconUrl={NavBarImages[3]} />
        </OutBox>
    );
};

export default NavBar;
