import { TextField } from '@mui/material';

const PlannerField = (props) => {
  return (
  <TextField
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
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "input[type=number]": {
            MozAppearance: "textfield",
        },
      },
      '& .MuiOutlinedInput-input': {
        color: '#2c5331', 
        fontWeight: 'bold',
      },
      '& .MuiFormLabel-root': {
        color: '#2c5331', 
        fontSize: '15px', 
      },
      '& .MuiInputBase-input': {
        fontSize: '20px', 
      },
      '& .MuiSelect-icon': {
        color: '#6ad7e1', // Add this line
      },
      ...props.sx,
    }}
  />
);
};

export default PlannerField;