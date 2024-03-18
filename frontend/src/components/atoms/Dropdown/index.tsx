import styled from '@emotion/styled';
import {
    Box,
    Button,
    Divider,
    Menu,
    MenuItem,
    TypographyProps
} from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import TypographyComponent from '../Typography/index';
import ImageComponent from '../Image/index';
import CloseIcon from '../../../../public/assets/icons/close.svg';

interface OuterBoxStyle {
    background?: string;
    menuWidth?: string;
}
interface Item {
    text: string;
}
interface ButtonDefult {
    isOpen?: boolean;
    backgroundColorWhenOpen?: string;
    borderWhenClosed?: string;
}

interface DropdownProps {
    startIcon?: React.ReactNode;
    isFilterApplied: boolean;
    listofItems: Item[];
    listTextColor?: string;
    listTextVariant: TypographyProps['variant'];
    selectedItem?: string;
    menuheaderText?: string;
    menuheaderVariant?: TypographyProps['variant'];
    menuBackgroundColor?: string;
    menuWidth?: string;
    endIconOpen?: React.ReactNode;
    endIconClose?: React.ReactNode;
    styles?: object;
    buttonContent?: string | React.ReactNode;
    backgroundColorWhenOpen?: string;
    borderWhenClosed?: string;
    userName?: string;
    userId?: string;
    isHeader?: boolean;
}

const StyledOuterBox = styled(Box)((props: OuterBoxStyle) => ({
    borderRadius: theme.spacing(0.5),
    background: props.background
        ? props.background
        : `${theme.palette.grey[400]}`,
    color: `${theme.palette.textColor.highEmphasis}`,
    maxHeight: '26.8vh !important',
    minWidth: props.menuWidth ? props.menuWidth : '18.3vw',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: theme.spacing(0.3)
    },
    '&::-webkit-scrollbar-track': {
        background: `${theme.palette.grey[400]}`,
        borderRadius: theme.spacing(0.3)
    },
    '&::-webkit-scrollbar-thumb': {
        background: `${theme.palette.structural.border}`,
        borderRadius: theme.spacing(0.3)
    }
}));

const StyledButton = styled(Button)((props: ButtonDefult) => ({
    color: `${theme.palette.text.primary}`,
    height: '5.2vh',
    minHeight: '1.3vh',
    minWidth: theme.spacing(2),
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    border: !props.isOpen
        ? props.borderWhenClosed
        : `1px solid ${theme.palette.structural.border}`,
    '&:hover': {
        border: props.borderWhenClosed
    },
    '&& .MuiButton-endIcon': {
        marginLeft: theme.spacing(0.5)
    },
    textTransform: 'none',
    backgroundColor: props.isOpen
        ? props.backgroundColorWhenOpen
        : 'transparent'
}));

const StyledSelectedButton = styled(Button)(() => ({
    color: `${theme.palette.text.primary}`,
    backgroundColor: `${theme.palette.primary[100]}`,
    height: '5.2vh',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    border: `1px solid ${theme.palette.primary[100]} !important`,
    '&:hover': {
        border: `1px solid ${theme.palette.primary[100]} !important`,
        backgroundColor: `${theme.palette.primary[100]}`
    },
    '&& .MuiButton-endIcon': {
        marginLeft: theme.spacing(2)
    },
    pointerEvents: 'auto',
    textTransform: 'none'
}));

const StyledMenuItem = styled(MenuItem)({
    '&:hover': {
        borderRadius: theme.spacing(1),
        backgroundColor: `${theme.palette.structural.mediumEmphasis}`
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(4),
    gap: theme.spacing(3.5)
});
const StyledMenu = styled(Menu)({
    '&& .MuiList-root': {
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    marginTop: theme.spacing(2)
});
const styles = {
    boxStyles: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2)
    }
};

const Dropdown = (props: DropdownProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isSelected, setIsSelected] = React.useState<boolean>(
        props.isFilterApplied
    );
    const [selectedItem, setSelectedItem] = React.useState(props.selectedItem);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSelected(false);
    };
    const handleClickInitialState = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (item: string) => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item: string) => {
        setSelectedItem(item);
        handleClose(item);
        setIsSelected(true);
    };

    const SelectedState: React.ReactNode = (
        <StyledSelectedButton
            disableRipple
            disableFocusRipple
            disableTouchRipple
            aria-controls={undefined}
            aria-haspopup={false}
            aria-expanded={undefined}
            onClick={handleClick}
            endIcon={
                <ImageComponent
                    src={CloseIcon}
                    alt="endIcon"
                    width={'auto'}
                    height={'auto'}
                />
            }
            startIcon={props.startIcon}
            variant="outlined"
        >
            <TypographyComponent
                variant={'body1'}
                color={theme.palette.textColor.black}
            >
                {selectedItem}
            </TypographyComponent>
        </StyledSelectedButton>
    );

    const DefaultState: React.ReactNode = (
        <StyledButton
            id="basic-button"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            aria-haspopup="true"
            onClick={handleClickInitialState}
            endIcon={open ? props.endIconOpen : props.endIconClose}
            startIcon={props.startIcon}
            variant="outlined"
            style={{ ...props.styles }}
            isOpen={open}
            backgroundColorWhenOpen={props.backgroundColorWhenOpen}
            borderWhenClosed={props.borderWhenClosed}
        >
            <TypographyComponent
                variant={'body1'}
                color={theme.palette.textColor.black}
            >
                {props.buttonContent}
            </TypographyComponent>
        </StyledButton>
    );

    return (
        <Box>
            {isSelected ? SelectedState : DefaultState}
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <StyledOuterBox
                    background={props.menuBackgroundColor}
                    menuWidth={props.menuWidth}
                >
                    <StyledMenuItem disableRipple>
                        <Box sx={styles.boxStyles}>
                            <TypographyComponent
                                variant={'body1'}
                                color={theme.palette.structural.main}
                            >
                                {props.menuheaderText}
                            </TypographyComponent>
                        </Box>
                    </StyledMenuItem>
                    <Divider
                        orientation="horizontal"
                        variant="fullWidth"
                        sx={{ background: theme.palette.structural.border }}
                    />
                    <StyledMenuItem disableRipple>
                        {props.listofItems.map((item) => (
                            <Box
                                key={item.text}
                                onClick={
                                    item.text === 'PDF' || item.text === 'Published by me'
                                        ? () => handleMenuItemClick(item.text)
                                        : () => {}
                                }
                                style={{
                                    cursor:
                                        item.text === 'PDF' || item.text === 'Published by me'
                                            ? 'pointer'
                                            : 'default'
                                }}
                            >
                                <TypographyComponent
                                    variant="caption1"
                                    color={props.listTextColor}
                                >
                                    {item.text}
                                </TypographyComponent>
                            </Box>
                        ))}
                    </StyledMenuItem>
                </StyledOuterBox>
            </StyledMenu>
        </Box>
    );
};

export default Dropdown;
