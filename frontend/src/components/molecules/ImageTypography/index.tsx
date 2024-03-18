import React, { CSSProperties } from 'react';
import { Card, CardContent, Box, styled } from '@mui/material';
import CustomImage from '../../atoms/Image';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';

export interface PresentationCardProps {
  imageUrl: string;
  pdfIcon?: string;
  pdfLabel?: string;
  primary?: boolean;
  containerStyle?: CSSProperties;
  CardImageBoxStyle?: CSSProperties;
  imgWidth?: string | number;
  imgHeight?: string | number;
  nameContainerStyle?: React.CSSProperties;
  alt?: string;
}

const PresentationCard: React.FC<PresentationCardProps> = ({
  imageUrl,
  pdfIcon,
  pdfLabel,
  primary = true,
  containerStyle = { backgroundColor: '#F4F5F5', borderRadius: '8px', boxShadow: 'none' },
  CardImageBoxStyle = { padding: '16px', backgroundColor: '#F4F5F5' },
  imgWidth = '258px',
  imgHeight = '160px',
  nameContainerStyle = { marginTop: 12 },
  alt = 'Card Image',
}) => {

  const StyledCard = styled(Card)(() => ({
    ...(primary ? containerStyle : {}),
  }));

  const StyledCardContent = styled(CardContent)({
    padding: 0,
  });

  const CardImageBox = styled(Box)(() => ({
    ...(primary ? CardImageBoxStyle : {}),
  }));

  const NameContent = styled(Box)(() => ({
    display: 'flex', 
    alignItems: 'center', 
    marginLeft: 0,
    ...nameContainerStyle,
  }));

  return (
    <Box sx={{ width: 'fit-content' }}>
      <StyledCard>
        <CardImageBox>
          <CustomImage src={imageUrl} alt={alt} width={imgWidth} height={imgHeight} />
        </CardImageBox>
      </StyledCard>
      <StyledCardContent>
        {pdfLabel && (
          <NameContent >
            <CustomImage src={pdfIcon} alt="PDF Icon" height={"24px"} width={"24px"}/>
            <Typography variant="body1" ml={primary ? 3 : 0} color={theme.palette.textColor.black}>
              {pdfLabel}
            </Typography>
          </NameContent>
        )}
      </StyledCardContent>
    </Box>
  );
};

export default PresentationCard;
