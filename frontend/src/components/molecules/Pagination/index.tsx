import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import minus from '../../../../public/assets/icons/minus.svg';
import plus from '../../../../public/assets/icons/plus.svg';
import CustomIcon from '../../atoms/Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  zoomRange?:number;
  handleZoomIn?:()=>void;
  handleZoomOut?:()=>void;
}

const Card = styled(Box)({
  width: '21.96vw',
  height: '6.25vh',
  background: theme.palette.grey[400],
  borderRadius: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 2.41vw',
  gap: '4.61vw',
});

const Zoom = styled(Box)({
  height: '4.42vh',
  width: '8vw',
  borderRadius: theme.spacing(3),
  background: theme.palette.grey[300],
  padding: '6px 1.17vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
});

const ZoomIcon = styled(Box)({
  '&:hover': {
    cursor: 'pointer',
  },
  height:theme.spacing(6),
  width:theme.spacing(6),
  paddingBottom:theme.spacing(3),
  paddingRight:theme.spacing(3),
});

const Pagination = ({ currentPage, totalPages, zoomRange, handleZoomIn, handleZoomOut }: PaginationProps) => {
 

  const page = `Page ${currentPage} of ${totalPages}`;

  return (
    <Card>
      <Typography variant="header3" color={theme.palette.textColor.highEmphasis}  >
        {page}
      </Typography>
      <Zoom>
        <ZoomIcon onClick={handleZoomOut}>
          <CustomIcon src={minus} dataTestId='minus'/>
        </ZoomIcon>

        <Typography variant="header3" color={theme.palette.structural.white} data-testid="zoom">
          {zoomRange}%
        </Typography>
        <ZoomIcon onClick={handleZoomIn}>
          <CustomIcon src={plus} dataTestId='plus'/>
        </ZoomIcon>
      </Zoom>
    </Card>
  );
};

export default Pagination;
