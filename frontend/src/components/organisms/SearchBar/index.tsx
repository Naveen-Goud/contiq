import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';  
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import searchIcon from '../../../../public/assets/icons/search.svg';
import theme from '../../../theme';
import CustomImage from '../../atoms/Image';
import Typography from '../../atoms/Typography';
import {  Stack, TextField } from '@mui/material';
import { SearchBarImages } from '../../../utils/constants';
import { SearchFilesByKeyword } from '../../../services';
import { useUserContext } from '../../../contexts/User/UserContext';
 
interface SerchBarProps{ 
    setState:(React.Dispatch<React.SetStateAction<boolean>>) ,
    setSearchKey?:(key:string)=>void; 
    setFileName?: React.Dispatch<React.SetStateAction<string>>;
    setFileUrl?:React.Dispatch<React.SetStateAction<string>>
}
const Search = styled(TextField)({ 
    display: 'flex', 
    position: 'relative',
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.structural.overlay4, 
    width: '25.7vw',
    height: '46px',
    borderColor:'none',
    
    '& .icon-wrapper': {
        paddingRight: '6px', 
        height: theme.spacing(6),
        width:theme.spacing(6),
    },
    '& input': {
        color: theme.palette.structural.white,  
        border: 'none', 
        outline: 'none', 
        padding: '14.5px 8px',
    },
    '& input::placeholder': {
        color: theme.palette.structural.white,  
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',  
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',  
    },
});
 

const CustomList = styled(List)({ 
    
    backgroundColor: theme.palette.structural.white,
    marginTop: '6px',
    width: '25.6vw',
    height: '39vh',
    position: 'absolute',
    borderRadius: theme.spacing(1),
    overflowY: 'scroll',
    border: `1px solid ${theme.palette.structural.border}`,
    '&::-webkit-scrollbar': {
        width: theme.spacing(4),
        borderRadius: theme.spacing(4)
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.structural.scrollTrack,
        borderRadius: theme.spacing(4),
        width: theme.spacing(4)
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[50],
        borderRadius: theme.spacing(8),
        border: `4px solid ${theme.palette.structural.scrollTrack}`
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.grey[200]
    },
    '& li': {
        cursor: 'pointer',
         
    },
});
 
 const SearchBar=({setState,setSearchKey,setFileName,setFileUrl}:SerchBarProps)=> {
 
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [isCustomListOpen, setIsCustomListOpen] = React.useState(false); 
    const { user } = useUserContext();
    const handleSearchChange = (event: any) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery); 
        setSearchKey?.(newQuery) 
        
        SearchFilesByKeyword(newQuery)
          .then(response=> { 
            if(response == null) return;
            const filteredItems = response.data.filter((item:any) => item.userId === user?.id);
            const items = filteredItems.map((item: any) => ({
                name: item.name,
                url: item.path,

              }));
              setSearchResults(items);
              }) 
        setIsCustomListOpen(true);
    }; 
     
    const handleCandidateClick =  async (selectedFile:any) => { 
        setIsCustomListOpen(false);   
        setState(true)   
        console.log("inside the axios  searchbar call", selectedFile.url);
        setFileName?.(selectedFile.name); 
        setFileUrl?.(selectedFile.url)
    };
   
    return (
        <Box>  
             <Search   
                    data-testid="input"
                    placeholder="Search "
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment:  <div className="icon-wrapper">
                        <CustomImage src={searchIcon} />
                    </div>
                    }}
                />
            {searchResults.length > 0 && isCustomListOpen && (
            <CustomList>
                <ListItem>
                    <ListItemText>
                        <Typography
                            variant="caption1"
                            color={theme.palette.textColor.black}
                        >
                            {'Search results'}
                        </Typography>
                    </ListItemText>
                </ListItem>
                {searchResults.slice(0,3).map((item:any) => (
                    <ListItem style={{ margin: '-6px 0' }} key={item.name} onClick={()=>handleCandidateClick (item)}>
                        <ListItemText sx={{ marginBottom: '4px' }}>
                            <Typography
                                variant="body2"
                                color={theme.palette.textColor.lowEmphasis}
                            >
                                {item.name}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText>
                        <Typography
                            variant="caption1"
                            color={theme.palette.textColor.black}
                        >
                            {'Other documents'}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <Box>
                    <Stack direction={'row'} spacing={theme.spacing(6)}>
                        {SearchBarImages.map((item) => (
                            <Box key={item} sx={{ width: '10vw', height: '10vh' }} >
                                <ListItem>
                                    <ListItemText sx={{ height: '15px' }}>
                                        <CustomImage src={item} />
                                    </ListItemText>
                                </ListItem>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </CustomList>)}
        </Box>
    );
}
 
export default SearchBar;