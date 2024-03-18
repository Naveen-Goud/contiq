import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

interface AvatarProps extends MuiAvatarProps {
    src?: string;
  }

  const Avatar: React.FC<AvatarProps> = ({ src, ...props }) => {
    return <MuiAvatar src={src} {...props} />;
  };
  
  export default Avatar;
