import { TextField } from '@mui/material';

const GoalField = (props) => {
  return (
  <TextField
    {...props}
    variant='outlined'
    color='secondary'
    sx={{
        margin: '30px 0 0px 0',

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#bfeef2',
        },
        '&:hover fieldset': {
          borderColor: '#eaf9fb', // replace 'desiredColor' with the color you want for the box outline on hover
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
        color: '#eaf9fb', 
        fontSize: '20px',
      },
      '& .MuiFormLabel-root': {
        color: '#eaf9fb', 
      },
      ...props.sx,
    }}
  />
);
};

export default GoalField;