import React from 'react';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import FolderIcon from '../../../../public/assets/icons/file drive.svg';
import RightArrowIcon from '../../../../public/assets/icons/bottomArrow.svg';
import CustomIcon from '../../atoms/Icon';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';

const FolderCardContainer = styled(Paper)(() => ({
  display: 'flex',
  width: 'auto',
  height: 74,
  padding: theme.spacing(3, 4),
  marginTop: theme.spacing(4),
  marginLeft:theme.spacing(8),
  marginRight:theme.spacing(6),
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: 4,
  border: `1px solid ${theme.palette.grey[300]}`, 
  background: theme.palette.grey[400],
  cursor: 'pointer',
}));

const FolderIconStyle = styled(CustomIcon)(() => ({
  width: 50,
  height: 50,
  backgroundColor: theme.palette.grey[300],
  borderRadius: '2',
}));

const FolderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const FolderName = styled(Typography)({
  color: 'white',
  marginLeft: 16,
});

const RightArrowIconStyle = styled(CustomIcon)(() => ({
    width: 24,
    height: 24,
    color: 'white',
    borderRadius: '0',
  }));

interface FolderCardProps {
  folderName: string;
  onClick?: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ 
    folderName, 
    onClick 
}) => {
  return (
    <FolderCardContainer elevation={0} onClick={onClick}>
      <FolderContent>
        <FolderIconStyle alt='FolderIcon' src={FolderIcon} />
        <FolderName variant="body1">{folderName}</FolderName>
      </FolderContent>
      <RightArrowIconStyle alt='RightArrowIcon' src={RightArrowIcon} />
    </FolderCardContainer>
  );
};

export default FolderCard;
