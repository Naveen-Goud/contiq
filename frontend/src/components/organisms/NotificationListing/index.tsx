import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../theme';
import Avatar from '../../atoms/Avatar';
import CustomIcon from '../../atoms/Icon';
import { format } from 'date-fns';

import { NotificationList } from '../../../utils/constants';
import { countNotificationByUserId, updateNotificationStatus, listNotifications } from '../../../services';
import { useUserContext } from '../../../contexts/User/UserContext'; 

import CloseIcon from '../../../../public/assets/icons/close.svg';
import NotificationIcon from '../../../../public/assets/icons/notification.svg';
import NotificationLoader from '../../../../public/assets/icons/BarLoading.gif';
import DefaultAvatar from '../../../../public/assets/icons/Ellipse 19.svg';

export interface Notification {
  id?: string;
  avatarUrl?: string;
  senderName?: string;
  message?: string;
  updateDate?: Date;
}

interface NotificationListingProps {
    title?: string;
    notifications?: Notification[];
    menuSx?: React.CSSProperties;
}

// styles related to Notification bell
const NotificationBell = styled(IconButton)({
  borderRadius: '0',
  padding:'0',
});

const IconElement = styled(CustomIcon)({
  borderRadius: 8,
  color: theme.palette.structural.overlay2,
  padding: '10px',
  background: theme.palette.structural.overlay4,
  width: '24px',
  height: '24px',
});

const NotificationBadge = styled('span')<{ unreadCount?: number }>(() => ({
  position: 'absolute',
  top: '9px',
  right: '11px',
  width: '12px',
  height: '12px',
  flexShrink: 0,
  backgroundColor: '#EC3A3A',
  borderRadius: '50%',
  color: theme.palette.structural.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: theme.typography.overline.fontSize,
}));


// styles related to Notification Menu popup
const StyledNotificationText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'normal',
});

const StyledMenu = styled(MuiMenu)({
    '& .MuiPaper-root': {
        display: 'inline-flex',
        flexDirection: 'column',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.structural.border}`,
        boxShadow: '4px 16px 32px 0px rgba(213, 206, 221, 0.70)',
        alignItems: 'flex-start',
        maxHeight: '59vh', 
        overflowY: 'auto',
      },
      marginTop: '12px',
      position: 'absolute',
});

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '25vw',
  height: '50vh',
  top: 0,
  left: 0,
});

const LoaderStyled = styled(CustomIcon)({
  width: '180px',
  height: '160px',
  position:'absolute',
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -50%)',
});

const MenuHeader = styled(MenuItem)({
    display: 'flex',
    padding: '12px',
    paddingTop: '4px', 
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottom: `1px solid ${theme.palette.structural.border}`,
    background: theme.palette.structural.white,
});

const MenuNotification = styled(MenuItem)({
    display: 'flex',
    width: '90vw',
    maxWidth: '400px',
    padding: '10px 12px',
    alignItems: 'center',
    gap: '12px',
    background: theme.palette.structural.white,
});

const NameStyled = styled('strong')({
    margin: '4px', 
    color: '#2A3238',
});

const NotificationMessage = styled('span')({
  color: theme.palette.textColor.lowEmphasis,
});

const NotificationDivider = styled(Divider)({
  backgroundColor: `0.5px solid ${theme.palette.structural.border}`,
});

const CloseIconButton = styled(IconButton)({
    marginLeft: 'auto',
});

const CloseIconStyled = styled(CustomIcon)({
  width: '24px', 
  height: '24px',
});

const NotificationListing: React.FC<NotificationListingProps> = ({
    title='Notifications',
    notifications,
    menuSx
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { user } = useUserContext();
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true); 

  const fetchNotificationLists = () => {
    listNotifications()?.then((response) => {
      if (response && response.data) {
        const notificationData = response.data;
        const transformedNotifications = notificationData.map((item: Notification) => ({
          id: item.id,
          avatarUrl: DefaultAvatar,
          senderName: item.senderName,   
          message: item.message,     
          updateDate: item.updateDate ? new Date(item.updateDate) : new Date(),   
        }));
        setNotificationList(transformedNotifications);
        notifications = notificationList;
      }
      setLoading(false); 
    })
    .catch((error) => {
      if (error.message !== 'Network Error') {
          console.log('Error on fetching notifications:', error);
      };
      setLoading(false); 
    });
  }

  useEffect(() => {
    fetchNotificationLists();
  }, [unreadNotifications]);

  const handleMarkAllRead = () => {
    if(user == null){
      return;
    }
    updateNotificationStatus(`${user.id}`)
      ?.then((response)=>{
        setUnreadNotifications(0);
        if (response && response.status === 200) {
          setUnreadNotifications(0);
          console.log("Notification Status updated successfully.");
        } else {
          console.log("Unable to update notification status.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => { 
    setAnchorEl(event.currentTarget);
    handleMarkAllRead();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationCount = () => {
    if(user == null){
      return;
    }
    countNotificationByUserId(`${user.id}`)
    ?.then((response)=>{
        if (response && response.data) {
          setUnreadNotifications(response.data);
        } else {
          setUnreadNotifications(0);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    useEffect(() => {
      handleNotificationCount();
      const intervalId = setInterval(() => {
        handleNotificationCount();
      }, 5000); 
  
      return () => {
        clearInterval(intervalId);
      };
    }, []); 

  return (
    <div>
      <NotificationBell onClick={handleOpenMenu}>
          <IconElement dataTestId='NotificationBell' icon={NotificationIcon} />
          {unreadNotifications > 0 && (
          <NotificationBadge unreadCount={unreadNotifications}>
            {unreadNotifications}
          </NotificationBadge>
        )}
      </NotificationBell>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={menuSx}
      >
        <MenuHeader>
          <Typography variant="header3">{title}</Typography>
          <CloseIconButton data-testid="close-icon-button" onClick={handleCloseMenu}>
            <CloseIconStyled src={CloseIcon} />
          </CloseIconButton>    
        </MenuHeader>
        
        {loading ? (
          <LoaderContainer>
            <LoaderStyled src={NotificationLoader} alt='Loading...' />
          </LoaderContainer>
        ) : notificationList && notificationList.length > 0 ? (
          notificationList.map((notification) => (
              <div key={notification.id}>
                  <MenuNotification key={notification.id} onClick={handleCloseMenu}>
                      <Avatar src={notification.avatarUrl} alt={notification.senderName} />
                      <StyledNotificationText>
                      <Typography variant="body2">
                          <NameStyled>{notification.senderName}</NameStyled> 
                          <NotificationMessage>{notification.message}</NotificationMessage>
                      </Typography>
                      <Typography variant="caption" color={theme.palette.textColor.mediumEmphasis} m={1}>
                        {notification.updateDate ? format(notification.updateDate, 'dd MMM HH:mm a') : ''}
                      </Typography>
                      </StyledNotificationText>
                  </MenuNotification>
                  <NotificationDivider /> 
              </div>
          ))
        ) : (
          <Typography variant="body2">No notifications to display.</Typography>
        )}
      </StyledMenu>
    </div>
  );
};

export default NotificationListing;
