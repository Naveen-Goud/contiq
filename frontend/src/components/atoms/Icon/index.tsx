import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

interface AvatarProps extends MuiAvatarProps {
  icon?: string;
  radius?: string;
  dataTestId?: string;
}

const CustomIcon: React.FC<AvatarProps> = ({
  icon,
  radius = '0', 
  dataTestId,
  ...props
}) => {
  return <MuiAvatar data-testid={dataTestId} src={icon} sx={{ borderRadius: radius }} {...props} />;
};

export default CustomIcon;
