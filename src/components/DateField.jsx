import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateField = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
        {...props}
        variant='outlined'
        color='secondary'
        sx={{
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#2c5331',
            },
            '&:hover fieldset': {
                borderColor: '#2c5331', // replace 'desiredColor' with the color you want for the box outline on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: "#6ad7e1", // replace 'desiredColor' with the color you want
            },
            },
            '& .MuiOutlinedInput-input': {
                color: '#2c5331', 
                fontWeight: 'bold',
            },
            '& .MuiInputBase-input': {
                fontSize:'20px', fontWeight: 'bold',
                color: '#2c5331',
                },
            '& .MuiFormLabel-root': {
            color: '#2c5331', 
            fontSize:'15px',
            },
            '& .MuiSvgIcon-root': {
            color: "#6ad7e1",
            },

            ...props.sx,

        }}
        />
    </LocalizationProvider>
);
};

export default DateField;