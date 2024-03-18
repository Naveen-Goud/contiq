import React , { useState }  from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, IconButton, SxProps, styled, } from '@mui/material';
import theme from '../../../theme';
import DarkVector from '../../../../public/assets/icons/DarkVector.svg';
import CustomImage from '../../atoms/Image';
import chevron from '../../../../public/assets/icons/down.svg';
 
 
interface CalendarProps {
    sx?: SxProps;
    autofocus?: boolean;
    label?: string;
    placeholder?:string;
    onChange: (date: Date | null) => void; 
}
 
const StyledDiv= styled('div')`
width:  90px ,
height:  36px ,
 
border-radius: 4px,
border: 1px,
 
&:focus-within {
    border-color: ${theme.palette.textColor.black};  
  },

  & .MuiInputBase-root {
    border-color: transparent;  
  },
 
  & .MuiInputBase-root.Mui-focused {
    border-color:  ${theme.palette.textColor.black};  
  },

  & .MuiInputBase-root.Mui-focused {
    border-color:  ${theme.palette.textColor.black};  
  },
  .css-1tgun3c-MuiInputBase-root-MuiOutlinedInput-root{
    height:5.2vh
  }
`
const dateTimePaperPropsStyles = {
  sx: {
      '.MuiPickersCalendarHeader-root': {
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          color: 'white'
      },
      '.MuiPickersCalendarHeader-root:first-child': {
          order: 0,
          paddingRight: '20px',
          paddingLeft: '20px',
          color: 'white'
      },
      '.MuiPickersArrowSwitcher-root': {
          display: 'inline-flex',
          color: 'white'
      },

      '.MuiPickersArrowSwitcher-spacer': {
          width: '220px',
          color: 'white'
      },
      '.css-31ca4x-MuiPickersFadeTransitionGroup-root': {
          display: 'flex',
          position: 'absolute',
          paddingLeft: '80px',
          color: 'white'
      },
      '.css-9reuh9-MuiPickersArrowSwitcher-root': {
          marginLeft: '-2px',
          color: 'white'
      },
      '.MuiPickersArrowSwitcher-button': {
          paddingRight: '7px',
          color: 'white'
      },
      '.css-169iwlq-MuiCalendarPicker-root ': {
          backgroundColor: 'black',
          color: 'white',
          boxshadow:'0 0 0 '
      },
      '.css-raiqh1-MuiTypography-root-MuiDayPicker-weekDayLabel': {
          color: 'white'
      },
      '.css-1c5a2ex-MuiButtonBase-root-MuiPickersDay-root ': {
          backgroundColor: 'black',
          color: 'white', 
          
      },
      '.css-1hbtwn5-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected) ':{
        backgroundColor: 'black',
        color: 'white',  
      },
      '.MuiPickersPopper-root':{
         margin:'0'
      },
      '&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPickersPopper-paper':{
            margin:'15px',
            
      }, 
      '.css-1i0fca-MuiButtonBase-root-MuiPickersDay-root': {
          backgroundColor: 'black',
          color: theme.palette.textColor.lowEmphasis
      },
      '.css-1c5a2ex-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled ':{
          color:theme.palette.grey[300],
          backgroundColor:'white'
      },
      '.css-15dbmtb-MuiPickersFadeTransitionGroup-root-MuiCalendarPicker-viewTransitionContainer ':{
           borderTop:  `1px solid  grey`
      },
      '.MuiPickersPopper-root css-1anqmj6-MuiPopper-root-MuiPickersPopper-root MuiPopper-root':{
          inset:'10px 116px 15px 15px'
      },
      '.css-1anqmj6-MuiPopper-root-MuiPickersPopper-root':{
          inset:'12px 15px 12px 12px',
          color:"yellow"
      },
     ' .MuiPickersPopper-root.css-1anqmj6-MuiPopper-root-MuiPickersPopper-root.MuiPopper-root' :{ 
          backgroundColor: "black",
          border: "1px solid grey" 
      },
      '.css-1wsk5at-MuiPaper-root-MuiPickersPopper-paper':{
          backgroundColor: "black",
      },
      '.MuiInputBase-input::placeholder .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input':{
          color: "black",
          fontWeight: "bold",
          backgroundColor: "black",
        },
        '&.MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-dayOutsideMonth':{
               backgroundColor:'black',
               color:'grey'
        },
        '&.MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin':{
          backgroundColor:'black',
          color:'white'
        }, 
         '.css-10rr6qy-MuiButtonBase-root-MuiPickersDay-root':{
          backgroundColor:'black',
          color:theme.palette.grey[200]
         },
         '.css-1a16q0h-MuiButtonBase-root-MuiPickersDay-root':{
          backgroundColor:'black',
          color:'white'
         },
         '&.MuiButtonBase-root.Mui-disabled MuiPickersDay-root.Mui-disabled.MuiPickersDay-dayWithMargin.css-1a16q0h-MuiButtonBase-root-MuiPickersDay-root':{
          backgroundColor:'black',
          color:'white'
         }
         ,
         '&.MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.future-date':{
          backgroundColor: 'red',
          color: 'white'
        }, 
       ' .MuiPickersDay-root.Mui-disabled' :{
        backgroundColor: 'black',
        color: 'grey'
        },
        '.css-1hbtwn5-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)':{
          borderRadius:'0px',
          backgroundColor:  theme.palette.grey[300],
        },
        
  }
};
const StyledTextfield=styled(TextField)`
 
 .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input::placeholder{
  color:  #2A3238 !important; 
  font-weight:bold;
  opacity:1;
   
 }`
 
 
 const BasicDateCalendar=(props: CalendarProps) =>{
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
          props.onChange(date);
      };
    const handleClearDate = () => {
        setSelectedDate(null);
        props.onChange(null);
    };
    const shouldDisableDate = (date: Date) => { 
        return date > new Date();
      }; 
       

      return (
        <div className="App" data-testid="basic-date-calendar">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
              <DatePicker
                data-testid="basic-date-calendar"
                open={isDatePickerOpen}
                onOpen={() => setIsDatePickerOpen(true)}
                onClose={() => setIsDatePickerOpen(false)}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                dayOfWeekFormatter={(day: any) => `${day.toLocaleUpperCase()}`}
                inputFormat="dd MMM yyyy"
                className="bg-mainPanel rounded-md"
                PaperProps={dateTimePaperPropsStyles}
                renderInput={(params: any) => (
                  <StyledDiv>
                    <StyledTextfield
                      data-testid="textField"
                      {...params} 
                      inputProps={{ ...params.inputProps,
                        style: { color: theme.palette.textColor.black },
                        placeholder: props.placeholder  }}
                      InputProps={{
                        ...params.InputProps,
                        style: { fontWeight: 'bold', border: 'none',color:"black" },
                        endAdornment: selectedDate ? (
                          <IconButton
                            aria-label="Clear Date"
                            onClick={handleClearDate}
                          >
                            <CustomImage src={DarkVector} />
                          </IconButton>
                        ) : (
                          <Box onClick={() => setIsDatePickerOpen(true)}>
                            <CustomImage src={chevron} alt="chevron" />
                          </Box>
                        ),
                        placeholder: 'Select2 date',
                      }}
                      openPickerButton={false}
                      error={false}
                      value={selectedDate ? selectedDate.toLocaleDateString() : " "}
                      style={{
                        backgroundColor: selectedDate
                          ? theme.palette.primary[100]
                          : 'white',
                      }}
                      
                    />
                  </StyledDiv>
                )}
                label={props.label}
                showDaysOutsideCurrentMonth={true}
                views={['day']}
                value={selectedDate}
                //{...props}
              />
            </div>
          </LocalizationProvider>
        </div>
      );
}

export default BasicDateCalendar
 