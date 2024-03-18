import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  styled,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import theme from '../../../theme';
import Avatar from '../../atoms/Avatar';
import CustomIcon from '../../atoms/Icon';
import SearchBar from '../SearchBar';
import { useNavigate } from "react-router-dom";

import ElipseAvatar from '../../../../public/assets/icons/Ellipse 19.svg';
import UserIcon from '../../../../public/assets/icons/add user.svg';
import HelpIcon from '../../../../public/assets/icons/help.svg';
import profile from '../../../../public/assets/icons/profile.svg';
import settings from '../../../../public/assets/icons/settings.svg';
import logout from '../../../../public/assets/icons/logout.svg';
import DownArraow from '../../../../public/assets/icons/DownArrowWhite.svg';
import NotificationListing from '../NotificationListing';
import { useUserContext } from '../../../contexts/User/UserContext'; 

interface AvatarOptions {
  src?: string;
  name?: string;
  handleClick?: () => void;
}

interface UserDetails {
  username?: string,
  userId?: string,
}

interface HeaderProps {
  title?: string,
  userDetails?: UserDetails,
  avatarOptions?: AvatarOptions[],
  setFileName?:(React.Dispatch<React.SetStateAction<string>>),
  setState:(Dispatch<SetStateAction<boolean>>) ,
  setSearchKey?:(key:string)=>void;
  setFileUrl?:React.Dispatch<React.SetStateAction<string>>

}
 
 const StyledAppBar = styled(AppBar)(() => ({
  background: theme.palette.structural.gradient,
  height: '60px',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    width: '100%', 
  },
}));

const MainContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '20px',
});

const LogoTypography = styled(Typography)({
  color: theme.palette.structural.white,
  marginTop: '19px',
  marginBottom: '16px',
});

const ContentBox = styled(Box)({
  display: 'inline-flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingTop: '0.4vh',
  gap: 20,
});

const IconElement = styled(CustomIcon)({
  borderRadius: 8,
  color: theme.palette.structural.overlay2,
  padding: '10px',
  background: theme.palette.structural.overlay4,
  width: '24px',
  height: '24px',
});

// Profile popup related style below
const StyledMenu = styled(Menu)(({ theme }) => ({

  left: 'calc(100% - (14.7vw + 3.0vh))',
  top:'40px',
  '& .MuiPaper-root': {
    width: '13.9vw',
    borderRadius: theme.spacing(1.5),
    border: '2px solid #BFC4C8',
    boxShadow: theme.shadows[4],
    zIndex: 1000,
  },
}));

const ProfileInfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const OptionsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const Options = styled(Box)({
    display: 'flex',
    gap: theme.spacing(2.5),
    alignItems: 'center',
    cursor: 'pointer'
});

const ModalIcon = styled(CustomIcon)({
  width: '24px',
  height: '24px',
});

const AvatarStyled = styled(IconButton)({
  borderRadius: 8,
  background: theme.palette.structural.overlay4,
  padding: theme.spacing(0.8),
  width: '5.4vw',
  gap: 10,
});

const AvatarDownIcon = styled(CustomIcon)({
  width: '24px', 
  height: '24px',
  color: 'white',
});

const menuSxScreens = {
  left: '-67px'
};

const Header: React.FC<HeaderProps> = ({
  title='CONTIQ',
  userDetails,
  avatarOptions,
  setFileName,
  setState,
  setSearchKey,
  setFileUrl
 
}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useUserContext();
  const navigate=useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
   navigate("/signIn")
    setAnchorEl(null);
  };

  const defaultAvatarOptions: AvatarOptions[] = [
    {
        src: profile,
        name: 'Profile',
        handleClick: () => {},
    },
    {
        src: settings,
        name: 'Settings',
        handleClick: () => {},
    },
    {
        src: logout,
        name: 'Logout',
        handleClick: handleLogout,
    }
];

const avatarOptionData = () => {
  if(avatarOptions){
    return avatarOptions;
  }
  return defaultAvatarOptions;
}

  const renderAvatar = () => {
    if (anchorEl) {
      return (
        <AvatarStyled onClick={handleClick}>
          <Avatar src={ElipseAvatar} data-testid="AvatarIcon" />
          <AvatarDownIcon icon={DownArraow} />
        </AvatarStyled>
      );
    } else {
      return (
        <Avatar data-testid="AvatarIcon" src={ElipseAvatar} sx={{ cursor: 'pointer' }} onClick={handleClick} />
      );
    }
  };

 
  return (
    <StyledAppBar>
      <MainContainer>
        <LogoTypography variant="header3">{title}</LogoTypography>
        <ContentBox>
 
            <SearchBar setState={ setState} setSearchKey={setSearchKey} setFileName={setFileName} setFileUrl={setFileUrl} />
 
            <IconElement icon={HelpIcon} />
            <IconElement icon={UserIcon} />
            <NotificationListing menuSx={menuSxScreens} />
            {renderAvatar()}
          <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
        <MenuItem>
          <ProfileInfoContainer>
            <Typography
              variant="body1"
              color={theme.palette.textColor.black}
            >
                {user?.name}
            </Typography>
              <Typography
                  variant="overline"
                  color={theme.palette.textColor.lowEmphasis}
              >
                  {user?.id}
              </Typography>
          </ProfileInfoContainer>
        </MenuItem>
        <Divider />
              <OptionsContainer>
                  {avatarOptionData().map((option) => (
                       <MenuItem key={option.name}>
                      <Options key={option.name} onClick={option.handleClick}>
                          <ModalIcon icon={option.src} />
                          <Typography
                              variant="body2"
                              color={theme.palette.textColor.black}
                          >
                              {option.name}
                          </Typography>
                      </Options>
                      </MenuItem>
                  ))}
              </OptionsContainer>
        </StyledMenu>
        </ContentBox>
      </MainContainer>
    </StyledAppBar>
  );
};

export default Header;
