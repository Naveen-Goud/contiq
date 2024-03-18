import React from 'react';
import { styled } from '@mui/system';
import CustomButton from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import VerifySignedGif from '../../../../public/assets/icons/VerifiedSignIcon.gif'; 
import CustomIcon from '../../atoms/Icon';
import {
  PASSWORD_RESET_SUCCESS_BUTTON,
  PASSWORD_RESET_SUCCESS_SUBTEXT,
  PASSWORD_RESET_SUCCESS_TITLE
} from '../../../utils/constants';

interface PasswordResetSuccessProps {
    title?: string;
    subText?: string;
    buttonLabel?: string;
    onClick?: () => void;
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '32px',
});

const Title = styled(Typography)({
  color: '#2a3238',
  margin: '2px',
  display: 'flex',
  alignItems: 'center',
});

const VerifyIconStyle = styled(CustomIcon)({
    width: '24px',
    height: '23.4px',
    marginLeft: '16px',
    paddingTop: '4px',
});

const SubText = styled(Typography)({
    display: 'flex',
    flexDirection: 'column',
    color: '#959596',
    width: '246px',
    margin: '2px',
});

const ContinueButton = styled(CustomButton)({
  width: '356px',
  borderRadius: '4px',
  background: 'var(--primary-500, #8B3DFF)',
  padding: '13px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  gap: '10px',
  marginTop: '32px',
  textTransform: 'none',
});

const PasswordResetSuccess: React.FC<PasswordResetSuccessProps> = ({
    title = PASSWORD_RESET_SUCCESS_TITLE,
    subText = PASSWORD_RESET_SUCCESS_SUBTEXT,
    buttonLabel = PASSWORD_RESET_SUCCESS_BUTTON,
    onClick
}) => {
  return (
    <Container>
      <Title variant="header2">
        {title}
        <VerifyIconStyle src={VerifySignedGif} />
      </Title>
      <SubText variant={"overline2"}>
        {subText}
      </SubText>
      <ContinueButton variant="contained" color="primary" onClick={onClick}>
        <Typography variant='body1'>{buttonLabel}</Typography>
      </ContinueButton>
    </Container>
  );
};

export default PasswordResetSuccess;
