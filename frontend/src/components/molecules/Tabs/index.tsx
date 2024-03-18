import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';

interface TabData {
    label: string;
    content: React.ReactNode;
    disabled: boolean;
}

interface CustomTabsProps {
    tabs: TabData[];
    activeTabColor?: string;
    inactiveTabColor?: string;
    backgroundColor?: string;
    tabWidth?: string;
    width?: string;
    setActiveTab:(newValue:number)=>void
}

const CustomTabs = ({
    tabs,
    activeTabColor,
    inactiveTabColor,
    backgroundColor,
    width,
    tabWidth,
    setActiveTab
}: CustomTabsProps) => {
    const Container = styled(Box)({
        backgroundColor: backgroundColor,
        width: width,
        '& .MuiTabs-indicator': {
            height: theme.spacing(0.7)
        },
        '& .MuiTab-root': {
            maxWidth: '1366px'
        }
    });
    const CustomTab = styled(Tab)({
        flex: 1,
        textTransform: 'none',
        color: inactiveTabColor,
        '&.Mui-selected': {
            color: activeTabColor
        }
    });

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setActiveTab(newValue);
    };

    return (
        <Container>
            <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: '100%', display: 'flex' }}
            >
                {tabs.map((tab) => (
                    <CustomTab
                        key={tab.label}
                        disabled={tab.disabled}
                        label={
                            <Typography variant="body1">{tab.label}</Typography>
                        }
                    />
                ))}
            </Tabs>
        </Container>
    );
};

export default CustomTabs;
