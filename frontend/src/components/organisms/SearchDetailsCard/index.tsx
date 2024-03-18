import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import downArrow from '../../../../public/assets/icons/downarrow.svg';
import disabledDownArrow from '../../../../public/assets/icons/disabledDownArrow.svg';
import upArrow from '../../../../public/assets/icons/uparrow.svg';
import disabledUpArrow from '../../../../public/assets/icons/disabledUpArrow.svg';
import minimize from '../../../../public/assets/icons/minimize.svg';
import copy from '../../../../public/assets/icons/copy.svg';
import complete from '../../../../public/assets/icons/complete.svg';
import cancel from '../../../../public/assets/icons/cancel.svg';
import more from '../../../../public/assets/icons/more.svg';
import maximize from '../../../../public/assets/icons/maximize.svg';
import CustomIcon from '../../atoms/Icon';
import ReactHtmlParser from 'react-html-parser';
import { copied_text } from '../../../utils/constants';
import { DataItem } from '../PdfViewer';

interface SearchDetailsCardProps {
    searchKey: string;
    fileName?: string;
    totalSlides?: number;
    handlePrev: () => void;
    handleNext: () => void;
    content: DataItem[];
}

const Card = styled(Box)({
    width: '26vw',
    border: `1px solid ${theme.palette.structural.border}`,
    boxShadow: `0px ${theme.spacing(0.5)} ${theme.spacing(2.5)} 0px ${
        theme.palette.structural.border
    }`,
    background: theme.palette.structural.structural,
    borderRadius: theme.spacing(1.5)
});

const Heading = styled(Box)({
    height: '5vh',
    display: 'flex',
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '1.17vw',
    borderBottom: `1px solid ${theme.palette.structural.border}`
});
const Body = styled(Box)({
    padding: theme.spacing(6.5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3)
});

const Icon = styled(CustomIcon)({
    height: theme.spacing(6),
    width: theme.spacing(6),
    cursor: 'pointer'
});
const SearchDetailsCard = ({
    searchKey,
    fileName,
    totalSlides,
    content,
    handlePrev,
    handleNext
}: SearchDetailsCardProps) => {
    const [minimizeCard, setMinimizeCard] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    const handleNextContent = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex == content.length - 1 ? prevIndex : prevIndex + 1
        );
        handleNext();
    };

    const handlePrevContent = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        handlePrev();
    };

    const handleCopyContent = () => {
        const contentToCopy = content[currentIndex].ambientStr;

        navigator.clipboard?.writeText(contentToCopy);
        setCopySuccess(true);
    };
    const renderHighlightedContent = (text: string) => {
        const regex = new RegExp(searchKey, 'gi');

        const html = text?.replace(regex, createHighlightedSpan);
        return ReactHtmlParser(html);
    };

    const createHighlightedSpan = (match: string) => {
        return `<span style="color: ${theme.palette.textColor.black};"><strong>${match}</strong></span>`;
    };

    return (
        <Box sx={{ width: '26vw' }}>
            <Card>
                <Heading>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            flex: '1 0 0',
                            borderRight: `1px solid ${theme.palette.structural.border}`,
                            padding: theme.spacing(2.5)
                        }}
                    >
                        <Typography
                            variant="body2"
                            color={theme.palette.textColor.black}
                        >
                            {searchKey}
                        </Typography>
                        <Typography
                            variant="body2"
                            color={theme.palette.textColor.mediumEmphasis}
                        >
                            <span
                                style={{ color: theme.palette.textColor.black }}
                            >
                                {currentIndex + 1}
                            </span>
                            /<span>{content.length}</span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: theme.spacing(2)
                        }}
                    >
                        <Icon
                            src={currentIndex > 0 ? disabledUpArrow : upArrow}
                            onClick={handlePrevContent}
                            dataTestId="up"
                        />
                        <Icon
                            src={
                                currentIndex == content.length - 1
                                    ? disabledDownArrow
                                    : downArrow
                            }
                            onClick={handleNextContent}
                            dataTestId="down"
                        />
                        <Icon
                            src={!minimizeCard ? maximize : minimize}
                            onClick={() => setMinimizeCard(!minimizeCard)}
                            dataTestId="minimize"
                        />
                    </Box>
                </Heading>
                {minimizeCard && (
                    <Body>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body1"
                                    color={theme.palette.textColor.black}
                                >
                                    {fileName}
                                </Typography>
                                <Typography
                                    variant="overline"
                                    color={
                                        theme.palette.textColor.mediumEmphasis
                                    }
                                >
                                    SLIDE{' '}
                                    <span
                                        style={{
                                            color: theme.palette.textColor.black
                                        }}
                                    >
                                        {content.length !== 0
                                            ? content[currentIndex]?.pageNum
                                            : ''}
                                    </span>
                                    /<span>{totalSlides}</span>
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: theme.spacing(2)
                                }}
                            >
                                <Icon
                                    src={copy}
                                    onClick={handleCopyContent}
                                    dataTestId="copy"
                                />
                                <Icon src={more} />
                            </Box>
                        </Box>
                        <Typography
                            variant="body3"
                            color={theme.palette.textColor.lowEmphasis}
                        >
                            {renderHighlightedContent(
                                content[currentIndex]?.ambientStr
                            )}
                        </Typography>
                    </Body>
                )}
            </Card>
            {copySuccess && (
                <Box
                    sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        padding: `${theme.spacing(2)} ${theme.spacing(3.5)}`,
                        height: '4.6vh',
                        width: '12vw',
                        alignItems: 'center',
                        gap: theme.spacing(3),
                        background: theme.palette.grey[400],
                        borderRadius: theme.spacing(2),
                        marginTop: '2.3vh',
                        marginLeft: '12.4vw'
                    }}
                >
                    <Box sx={{ display: 'flex', gap: theme.spacing(2.5) }}>
                        <Icon src={complete} />

                        <Typography
                            variant="body1"
                            color={theme.palette.structural.white}
                        >
                            {copied_text}
                        </Typography>
                    </Box>
                    <Icon
                        src={cancel}
                        sx={{ paddingLeft: theme.spacing(6) }}
                        onClick={() => setCopySuccess(false)}
                        dataTestId="close"
                    />
                </Box>
            )}
        </Box>
    );
};

export default SearchDetailsCard;
