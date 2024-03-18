import React, { useEffect, useState } from 'react';
import Header from '../../components/organisms/Header';
import CustomTabs from '../../components/molecules/Tabs';
import PresentationCard from '../../components/molecules/ImageTypography';
import { styled } from '@mui/system';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import theme from '../../theme';
import { Box, Button } from '@mui/material';
import HomeTemplate from '../../components/templates/HomeTemplate';
import NavBar from '../../components/organisms/Navbar';
import Dropdown from '../../components/atoms/Dropdown';
import CustomImage from '../../components/atoms/Image';
import BasicDateCalendar from '../../components/molecules/DatePicker'; 
import AddIcon from '@mui/icons-material/Add';
import pdfExtension from '../../../public/assets/icons/PDF.svg';
import Up from '../../../public/assets/icons/up.svg';
import Down from '../../../public/assets/icons/down.svg';
import Swap from '../../../public/assets/icons/swapIcon.svg';
import GridIcon from '../../../public/assets/icons/grid.svg';
import ListIcon from '../../../public/assets/icons/list.svg';
import { CloudSync } from '../../components/organisms/CloudSync';
import leftArrow from '../../../public/assets/icons/leftArrow.svg'; 
import { tabs, fileTypeList, publishSettingList, SearchBarImages } from '../../utils/constants';
import { getFileLists, getFileResource } from '../../services';
import PdfViewer from '../../components/organisms/PdfViewer';
import CustomIcon from '../../components/atoms/Icon';   
import { useUserContext } from '../../contexts/User/UserContext';
 
 

interface FileDataProps {
    id: string;
    name: string;
    type: string;
    content: string;
    path: string;
    isDeleted: boolean;
    isSync: boolean;
    uploadDate: string;
    updateDate: string;
}

interface SwitchIconProps {
    isActive?: boolean;
}

const HeaderBox = styled(Box)({
    width: '90vw',
    justifyContent: 'left',
    paddingLeft: '3.7vw',
    flexDirection: 'column'
});

const ContentHeader = styled(Box)({
    backgroundColor: '#FFF',
    width: '100%',
    paddingTop: '3vh',
    boxShadow: 'none',
    zIndex: 'auto',
    position: 'inherit'
});

const Title = styled(Typography)({
    flexGrow: 1,
    color: theme.palette.textColor.black
});

interface Tab {
    label: string;
    content: JSX.Element;
    disabled: boolean;
}

const Gap = styled(Box)({
    margin: theme.spacing(8)
});

const UploadButtonStyled = styled(IconButton)({
    color: '#FFF',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    },
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(2)
    }
});

const ImageStyled = styled(CustomImage)({
    width: '24px',
    height: '24px'
});

const SwitchIcon = styled(CustomImage)<SwitchIconProps>(({ isActive }) => ({
    width: '24px',
    height: '24px',
    padding: '1.2vh 0.9vw',
    borderRadius: '4px',
    backgroundColor: isActive ? theme.palette.primary[100] : 'transparent',
    cursor: 'pointer'
}));

const SwitchButton = styled(Button)(() => ({
    color: `${theme.palette.text.primary}`,
    height: '5.2vh',
    minHeight: '1.3vh',
    margin: 0,
    padding: 5,
    textTransform: 'none',
    border: `1px solid ${theme.palette.structural.border}`,
    '&:hover': {
        border: `1px solid ${theme.palette.structural.border}`
    },
    '.css-9tj150-MuiButton-endIcon': {
        marginLeft: 0
    },
    '.css-1d6wzja-MuiButton-startIcon': {
        marginRight: 0
    }
}));

const RecentButton = styled(Button)(() => ({
    color: `${theme.palette.text.primary}`,
    height: '5.2vh',
    minHeight: '1.3vh',
    minWidth: theme.spacing(2),
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    textTransform: 'none',
    border: `1px solid ${theme.palette.structural.border}`,
    '&:hover': {
        border: `1px solid ${theme.palette.structural.border}`
    }
}));

const FilterBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2.5)
});

const RightFilterBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: theme.spacing(2.5)
});

const PresentationStyled = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(6)
});

const DateBox = styled(Box)({
    width: '7vw'
});

const ButtonText = styled(Typography)({
    color: theme.palette.textColor.black
});

function FilesPage() {
    const [isCloudSyncOpen, setIsCloudSyncOpen] = useState(false);
    const [fileData, setFileData] = useState<FileDataProps[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [resourceData,setResourceData]=useState<any>();
    const [state, setState] = useState<boolean>(false);
    const [fileName,setFileName]=useState<string >("");
    const [fileUrl,setFileUrl]=useState<string >("");
    const [searchKey,setSearchKey]=useState<string>("");
    const { user } = useUserContext();
    useEffect(() => {
        fetchData();
    }, [startDate, endDate,]);

    const fetchData = async () => {
        const formattedStartDate = startDate
            ? new Date(startDate).toISOString()
            : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';
        if(user == null){
            return;
        }
        
       await getFileLists(user?.id) 
            ?.then((response) => {
                if(response==null || response.data==null){
                    return
                }
                const data = response.data;

                // Filter the data based on the selected date range
                const filteredData = data?.filter(
                    (file: { uploadDate: string | number | Date }) => {
                        const uploadDate = new Date(
                            file.uploadDate
                        ).toISOString();

                        if (formattedStartDate && formattedEndDate) {
                            return (
                                uploadDate >= formattedStartDate &&
                                uploadDate <= formattedEndDate
                            );
                        } else if (formattedStartDate) {
                            return uploadDate >= formattedStartDate;
                        } else if (formattedEndDate) {
                            return uploadDate <= formattedEndDate;
                        }

                        return true;
                    }
                );
                
                setFileData(filteredData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setStartDate(date);
        } else {
            setStartDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setEndDate(date);
        } else {
            setEndDate(null);
        }
    };

    const handleAddFiles = () => {
        setIsCloudSyncOpen(true);
    };

    const handleCloseCloudSync = () => {
        setIsCloudSyncOpen(false);
 
    };
  
    useEffect(() => {
        const loadPdf = async () => {
          try {  
            const filePath = fileUrl.substring(0, fileUrl.lastIndexOf('/files') + 6)+"/"+fileName;
            if(fileName==null || fileName==" ") return
            await getFileResource(filePath) 
           .then(res=>{ 
            const dataUrl = URL.createObjectURL(res.data);
             setResourceData(dataUrl);
           }) 
          } catch (error) {
            console.error('Error loading PDF:', error);
          }
        }
    
        loadPdf();
      }, [state,fileName ]);
      console.log(" new file name"+fileName)
    console.log(resourceData)
    console.log(searchKey)
    return (
        <HomeTemplate
            header={<Header setState={setState} setSearchKey={setSearchKey}  setFileName={setFileName} setFileUrl={setFileUrl}/> }
            sidebar={<NavBar />}
            content={
                !state  ? (
                    <HeaderBox>
                        <ContentHeader>
                            <Toolbar disableGutters={true}>
                                <Title variant="header2">Files</Title>
                                <UploadButtonStyled
                                    color="inherit"
                                    aria-label="Add Files"
                                    onClick={handleAddFiles}
                                >
                                    <AddIcon />{' '}
                                    <Typography variant="body1">
                                        Add Files
                                    </Typography>
                                </UploadButtonStyled>
                            </Toolbar>
                        </ContentHeader>
                        {isCloudSyncOpen && (
                            <CloudSync
                                open={isCloudSyncOpen}
                                onClose={handleCloseCloudSync}
                            />
                        )}

                        <Gap />
                        <FilterBar>
                            <Dropdown
                                listofItems={fileTypeList}
                                isFilterApplied={false}
                                buttonContent="File type"
                                listTextColor={
                                    theme.palette.textColor.highEmphasis
                                }
                                listTextVariant="body1"
                                menuheaderText="File type"
                                menuheaderVariant="caption1"
                                endIconOpen={
                                    <ImageStyled src={Up} alt="endIconOpen" />
                                }
                                endIconClose={
                                    <ImageStyled
                                        src={Down}
                                        alt="endIconClose"
                                    />
                                }
                                borderWhenClosed={`1px solid ${theme.palette.structural.border}`}
                            />

                            <DateBox>
                                <BasicDateCalendar
                                    placeholder="Start Date"
                                    onChange={handleStartDateChange}
                                />
                            </DateBox>
                            <DateBox>
                                <BasicDateCalendar
                                    placeholder="End Date"
                                    onChange={handleEndDateChange}
                                />
                            </DateBox>

                            <Dropdown
                                listofItems={publishSettingList}
                                isFilterApplied={false}
                                buttonContent="Publish Setting"
                                listTextColor={
                                    theme.palette.textColor.highEmphasis
                                }
                                listTextVariant="body1"
                                menuheaderText="Publish Setting"
                                menuheaderVariant="caption1"
                                endIconOpen={
                                    <ImageStyled src={Up} alt="endIconOpen" />
                                }
                                endIconClose={
                                    <ImageStyled
                                        src={Down}
                                        alt="endIconClose"
                                    />
                                }
                                borderWhenClosed={`1px solid ${theme.palette.structural.border}`}
                            />

                            <RightFilterBox>
                                <RecentButton
                                    variant="outlined"
                                    color="primary"
                                    startIcon={
                                        <ImageStyled
                                            src={Swap}
                                            alt="SwapIcon"
                                        />
                                    }
                                    endIcon={
                                        <ImageStyled
                                            src={Down}
                                            alt="DownIcon"
                                        />
                                    }
                                >
                                    <ButtonText variant="body1">
                                        Most relevant
                                    </ButtonText>
                                </RecentButton>

                                <SwitchButton
                                    startIcon={
                                        <SwitchIcon
                                            src={GridIcon}
                                            alt="SwapIcon"
                                            isActive={true}
                                        />
                                    }
                                    endIcon={
                                        <SwitchIcon
                                            src={ListIcon}
                                            alt="DownIcon"
                                            isActive={false}
                                        />
                                    }
                                ></SwitchButton>
                            </RightFilterBox>
                        </FilterBar>

                        <Gap />
                        <CustomTabs
                            tabs={tabs}
                            setActiveTab={() => {
                                '1';
                            }}
                            activeTabColor={theme.palette.primary[500]}
                            inactiveTabColor={theme.palette.text.secondary}
                            backgroundColor={theme.palette.background.default}
                            width="fit-content"
                        />

                        <Gap />
                        <PresentationStyled>
                            {fileData?.map((file) => (
                                <PresentationCard
                                    key={file.id}
                                    imageUrl={SearchBarImages[1]}
                                    pdfIcon={pdfExtension}
                                    pdfLabel={file.name}
                                    primary={true}
                                />
                            ))}
                        </PresentationStyled>
                    </HeaderBox>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '60px',
                            marginTop:"18px",
                            gap: '16px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '7px',
                                alignItems: 'center'
                            }}
                        >
                            <CustomIcon
                                src={leftArrow}
                                sx={{ height: '24px', width: '24px' ,cursor:"pointer"}}
                                onClick={()=>{setState(false)}}
                            />
                            <Typography
                                variant="header2"
                                color={theme.palette.textColor.black}
                            >
                                {fileName}
                            </Typography>
                        </Box>
                        {resourceData && (
                        <PdfViewer
                            searchKey={searchKey}
                            filePath={resourceData}
                            fileName={fileName}
                        />)}
                    </Box>
                )
            }
 
        />
    );
}

export default FilesPage;
