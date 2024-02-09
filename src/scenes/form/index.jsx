import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import { useTheme, Box, Button, TextField, Select, MenuItem, InputLabel, Checkbox, Stack,
  FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { exerciseInfo } from '../../data/exerciseInfoData';

const hands = [
  {
    value: 'Left'
  },
  {
    value: 'Right'
  }
];
const Form = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [hand, setHand] = useState('')
    const [injury, setInjury] = useState('')
    const [injuryTime, setInjuryTime] = useState('')

    const initialTargets = Array.from({ length: 4 }, () => ''); // Initialize an array with a length of 4
    const [targets, setTargets] = useState(initialTargets); // Use useState to manage the state of the array

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate(); // Get the history object
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isRequired = false; // set to true to set parameters for being required (false for testing)
 
    function handleSubmit(event) {
        event.preventDefault();
        const values = {firstName, lastName, userName, email, dateOfBirth, hand, injury, injuryTime, targets}
        // new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2)); // make a popup to show all the inputted data
        navigate('/created-user') // navigate to new page once form is submitted
    }
 
    return (
        <React.Fragment>
            
      <Box m="20px 80px">
      <Header title="ADD NEW PATIENT" subtitle="Create a new detailed Patient Profile" />
      
            <form onSubmit={handleSubmit} initialValues={initialValues} >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    sx={{gridColumn: "span 2" }}
                    required={isRequired}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    sx={{gridColumn: "span 2" }}
                    required={isRequired}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Username (choose a unique patient identifier)"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    sx={{gridColumn: "span 4" }}
                    required={isRequired}
                />
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    sx={{mb: 4, gridColumn: "span 2" }}
                />
                <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Date of Birth"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    required={isRequired}
                    fullWidth
                    sx={{gridColumn: "span 2" }}
                />
                {/* <Header subtitle="Select the Injured Hand"/> */}
                <TextField
                  select
                  required={isRequired}
                  label="Injured Hand"
                  labelPlacement="bottom"
                  variant='outlined'
                  color='secondary'
                  value={hand}
                  onChange={e => setHand(e.target.value)}
                  sx={{gridColumn: "span 1" }}
                >
                  {hands.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Injury Type"
                    onChange={e => setInjury(e.target.value)}
                    value={injury}
                    sx={{gridColumn: "span 2" }}
                />
                <TextField
                    id="outlined-number"
                    color='secondary'
                    variant='outlined'
                    label="Expected Injury Duration (weeks)"
                    type="number"
                    inputProps={{min: 0, max: 360, style: { textAlign: 'center', fontSize:'20px' }}}
                    onChange={e => setInjuryTime(e.target.value)}
                  />
                <Box display="flex" justifyContent="center" mt="10px" sx={{gridColumn: "span 4" }}>
                  Set the Desired Target Angles (in degrees) for each exercise for the patient
                </Box>
                {targets.map((target, i) => (
                  <TextField
                    id="outlined-number"
                    color='secondary'
                    variant='outlined'
                    label="Target Angle (Degrees)"
                    type="number"
                    inputProps={{min: 0, max: 360, style: { textAlign: 'center', fontSize:'20px' }}}
                    onChange={(e) => {
                      const newTargets = [...targets];
                      newTargets[i] = e.target.value;
                      setTargets(newTargets);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  ))}
                {exerciseInfo.map((exercise, i) => (
                  <Box display="flex" justifyContent="center" mt="10px"  marginTop="-20px" >
                    <Header subtitle={exercise.title} sx={{gridColumn: "span 1"}}/>
                  </Box>
                ))}
                <Box display="flex" justifyContent="center" mt="10px" sx={{gridColumn: "span 4" }}>
                  <Button type="submit" color="secondary" variant="contained" fullWidth>
                    Create New Patient
                  </Button>
                </Box>
              </Box>
            </form>
            </Box>
        </React.Fragment>
    )
}
 
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
    // .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  dateOfBirth: "",
  email: "",
  hand:"",
  contact: "",

};

export default Form;