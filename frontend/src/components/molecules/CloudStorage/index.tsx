import React from 'react';
import Typography from '../../atoms/Typography';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import GoogleDrive from '../../../../public/assets/icons/Google drive.svg';
import DropBox from '../../../../public/assets/icons/DropBox.svg';
import TeraBox from '../../../../public/assets/icons/TeraBox.svg';
import ICloud from '../../../../public/assets/icons/iCloud.svg';
import DashedBorder from '../../../../public/assets/icons/DashedBorder.svg';
import CustomImage from '../../atoms/Image';
import theme from '../../../theme';

export interface CloudStorageIcon {
  dataTestId?: string;
  iconSrc?: string;
  onClick?: () => void;
}

interface CloudStorageProps {
    title?: string;
    icons?: CloudStorageIcon[];
}

const Container = styled(Box)({
  display: 'flex',
  height: "47vh",
  width: "45vw",
  padding: '48px 32px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  flexShrink: 0,
  borderRadius: '4px',
  background: theme.palette.grey[400],
  backgroundImage: `url("${DashedBorder}")`,
});

const IconWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '50px',
  height: '50px',
  flexShrink: 0,
  borderRadius: '4px',
  background: theme.palette.structural.white,
});

const Icon = styled(CustomImage)({
  width: '32px',
  height: '32px',
  flexShrink: 0,
  borderRadius: '4px',
  background: theme.palette.structural.white,
});

const Title = styled(Typography)({
    width: '100%', 
    '@media (min-width: 600px)': {
      width: '230px', 
    },
    color:theme.palette.structural.white, 
});

const defaultIcons: CloudStorageIcon[] = [
  { dataTestId: 'google-drive', iconSrc: GoogleDrive },
  { dataTestId: 'dropbox', iconSrc: DropBox },
  { dataTestId: 'terabox', iconSrc: TeraBox },
  { dataTestId: 'icloud', iconSrc: ICloud },
];

const CloudStorage: React.FC<CloudStorageProps> = ({
    title='Drag media here to upload or connect an account',
    icons = defaultIcons,
}) => {
  return (
    <Container>
      <Title variant="subtitle2"  align="center">
        {title}
      </Title>
      <Box display="flex" gap="32px">
        {icons.map((icon) => (
            <IconWrapper sx={{ cursor: 'pointer' }} onClick={icon.onClick} key={icon.dataTestId}>
              <Icon data-testid={icon.dataTestId} src={icon.iconSrc} />
            </IconWrapper>
          ))}
      </Box>
    </Container>
  );
};

export default CloudStorage;
