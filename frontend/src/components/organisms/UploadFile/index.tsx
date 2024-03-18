import { Box, styled, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction,  useRef, useState } from 'react';
import {
    UploadFileConstants
} from '../../../utils/constants';
import theme from '../../../theme';
import CustomImage from '../../atoms/Image';
import UploadSymbol from '../../../../public/assets/icons/UploadSymbol.svg';
import CustomButton from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import PDF from '../../../../public/assets/icons/PDF.svg';
import DashedBorder from '../../../../public/assets/icons/DashedBorder.svg';
import { InputFileData } from '../../../modal/Interfaces';
import { getFileLists, postFileData, postNotification } from '../../../services';  
import { useUserContext } from '../../../contexts/User/UserContext'; 
import { PostNotification } from '../../../modal/Interfaces';

const DashedBox = styled(Box)({
    height: "55vh",
    width: "47.8vw",
    spacing: theme.spacing(5),
    backgroundImage: `url("${DashedBorder}")`,
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    margin: "15px"

}) 
const StyledModal = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.structural.white};
`;
 
const UploadBox = styled(Box)` 
align-items:center;
justify-content:center;
padding: 0px 0px 0px 50px; 
}
`; 
const ModalBox = styled(Box)`
    width: 50.7vw;
    hieght: 77vh;
    background-color: ${theme.palette.grey[400]};
    p: 3;
    position:  absolute ;
    gap: 40px;
`; 
const CustomButtons = styled(CustomButton)`
    width: 9.2vw;
    color: ${theme.palette.structural.white};
    border: 1px solid ${theme.palette.structural.white};
    &:hover {
        border-color: ${theme.palette.structural.white};
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
    text-transform: unset;
`;

interface UploadFileProps{
    onClick :( )=>void,
    setUploadData:Dispatch<SetStateAction<File | undefined>>
    dialogBox:Dispatch<SetStateAction<boolean>>,
    onClose :( )=>void,
    duplicateId:(id:string)=>void
}
const UploadFile = ({onClick,setUploadData,dialogBox,onClose,duplicateId}:UploadFileProps) => {
    const [upload, setUpload] = useState(false); 
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>();  
    const [renderDialogCard,setRenderDialogCard]=useState<boolean>( )
    const [uploadFileData, setUploadFileData] = useState<File | null>();
    const { user } = useUserContext();
    const handleChooseFilesClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }; 
    const postNotificationData = async (fileData: InputFileData) => {
        if(user == null){
            return;
        }
        const notificationData: PostNotification = {
            message: `has uploaded ${fileData.name}`,
            updateDate: new Date(),
            fileId: fileData.id,
            userId: user.id,
        }
        await postNotification(notificationData);
    } 
      const handleUploadFile=   async ()=>{  
            {  
                if(uploadFileData==null || user == null) return 
                let isDuplicated = false; 
                const data: InputFileData = {  
                    name: uploadFileData.name,
                    type: "PDF",
                    content:"",
                    downloadSrc:'', 
                    path: "https://digiandme.com/wp-content/uploads/2021/03/Assignment-Front-Page-Format-Word-File.png",
                    isDeleted:false, 
                    userId:user?.id,//user id
                    isSync:false,
                    uploadDate: new Date(uploadFileData.lastModified),
                    updateDate: new Date()
                } 
                await getFileLists(user.id).then(async response=>{
                if(response==null || response.data==null){
                    return
                }
                const responseArray = response.data; 
                     
                 for (const item of responseArray) {  
                      if( data.name === item.name) {
                       duplicateId(item.id);
                       isDuplicated = true;   
                        break;
                      }
                    }   })
               if (!isDuplicated) {   
                console.log("uploadfile post") 
                console.log(uploadFileData) 
                if(user == null){
                    return;
                }
                console.log("user id in upload file"+user?.id);
                await postFileData(uploadFileData, user?.id)
                 .then((response)=>{
 
                    if (response && response.data) {
                        console.log("response found: ",response.data);
                        const fileResponse = response.data;
                        postNotificationData(fileResponse);
                    }
                  }) 
                  .catch((error) => {
                    console.error('Error:', error);
                  });   
 
                    handleCloseClick();
                    dialogBox(false)
                  window.location.reload(); 
                  } else{
                      setUploadData(uploadFileData)
                      console.log("inside uploadfile else ")
                      setRenderDialogCard(true)
                      dialogBox(true)
                  }  
               }
             setName(uploadFileData.name) 
             onClick() 
              
    } 
    const handleCloseClick = () => {
        if(onClose){
            onClose();  
        }

      };
     console.log( renderDialogCard  )

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setUploadFileData(selectedFile);  
        setName(selectedFile?.name)
        setUpload(true);
      };
      
    return (
        <div>  
       (<StyledModal  >
                <ModalBox  >
                    <DashedBox>
                        {upload ?  
                           ( <Stack direction={'column'} gap={theme.spacing(12)} alignItems={"center"} justifyItems={"center"} width={"166px"}>
                                <Stack direction={'column'} >
                                    <Box >
                                        <CustomImage src={PDF} />
                                    </Box>
                                    <Typography >{name}</Typography>
                                </Stack>
                                <Box >
                                    <CustomButton
                                    data-testid={"Upload file"}
                                        variant={'contained'}
                                        sx={{
                                            textTransform: 'none',
                                            width: '12vw'
                                        }}
                                        
                                        onClick={handleUploadFile}
                                    >Upload file</CustomButton>
                                </Box>
                            </Stack>
                        ) : (
                            <Stack direction={'column'} gap={'24px'} alignItems={"center"}>
                                <Box>
                                    <UploadBox>
                                        <CustomImage src={UploadSymbol} />
                                    </UploadBox>
                                    <Typography
                                        variant="subtitle2"
                                        color={theme.palette.structural.white}
                                    >
                                        {UploadFileConstants[1]}
                                    </Typography>
                                    <input
                                        data-testId="input"
                                        type="file"
                                        id="fileInput"
                                        accept=".pdf"
                                        style={{ display: 'none' }}
                                        multiple={false}
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </Box>
                                <Box paddingTop={'30px'}>
                                    <CustomButtons
                                        data-testId="button"
                                        variant={'outlined'}
                                        onClick={handleChooseFilesClick}
                                    >{UploadFileConstants[2]}</CustomButtons>
                                </Box>
                            </Stack>
                        )}
                    </DashedBox>
                </ModalBox>
            </StyledModal>)   
        </div>
    );
};

export default UploadFile;
