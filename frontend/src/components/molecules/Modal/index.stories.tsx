import CustomModal from '.';
import type { Meta, StoryFn } from '@storybook/react';
import { Box, Divider, Stack } from '@mui/material';
import Typography from '../../atoms/Typography';
import React from 'react';
import profile from '../../../../public/assets/icons/profile.svg';
import settings from '../../../../public/assets/icons/settings.svg';
import logout from '../../../../public/assets/icons/logout.svg';
import CustomIcon from '../../atoms/Icon';
import theme from '../../../theme';
import styled from '@mui/system/styled'; // Import styled from @mui/system/styled

const meta: Meta<typeof CustomModal> = {
    title: 'molecules/modal',
    component: CustomModal
} satisfies Meta<typeof CustomModal>;

export default meta;



const options = [
    {
        src: profile,
        name: 'Profile'
    },
    {
        src: settings,
        name: 'Settings'
    },
    {
        src: logout,
        name: 'Logout'
    }
];

const ModalContainer = styled(Box)({
    width: '13.9vw',
    height: '23.6vh',
    borderRadius: theme.spacing(1.5),
    border: `2px solid ${theme.palette.structural.border}`,
    background: theme.palette.structural.white
});

const ProfileInfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 12px'
});

const StyledDivider = styled(Divider)({
    border: `1px solid ${theme.palette.structural.border}`
});

const OptionsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const Options = styled(Box)({
    display: 'flex',
    gap: theme.spacing(2.5),
    alignItems: 'center',
    cursor: 'pointer'
});

const ModalComponent: StoryFn<typeof CustomModal> = (args) => (
    <CustomModal {...args}>
        <ModalContainer>
            <ProfileInfoContainer>
                <Typography
                    variant="body1"
                    color={theme.palette.textColor.black}
                >
                    John Ross
                </Typography>
                <Typography
                    variant="overline"
                    color={theme.palette.textColor.lowEmphasis}
                >
                    IDJR00292
                </Typography>
            </ProfileInfoContainer>
            <StyledDivider />
            <OptionsContainer>
                {options.map((option) => (
                    <Options key={option.name}>
                        <CustomIcon src={option.src} />
                        <Typography
                            variant="body2"
                            color={theme.palette.textColor.black}
                        >
                            {option.name}
                        </Typography>
                    </Options>
                ))}
            </OptionsContainer>
        </ModalContainer>
    </CustomModal>
);

// export const Default = ModalComponent.bind({});
// Default.args = {
//     open: true,
//     onClose: () => {}
// };
