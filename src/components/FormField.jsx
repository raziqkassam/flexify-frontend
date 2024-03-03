import { TextField } from '@mui/material';

const FormField = (props) => {
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
      },
      ...props.sx,
    }}
  />
);
};

export default FormField;