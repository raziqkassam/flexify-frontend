import { TextField } from '@mui/material';

const FormField = (props) => (
  <TextField
    {...props}
    variant='outlined'
    color='secondary'
    sx={{
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#fff22f', // replace 'desiredColor' with the color you want
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "input[type=number]": {
            MozAppearance: "textfield",
        },
      },
      ...props.sx,
    }}
  />
);

export default FormField;