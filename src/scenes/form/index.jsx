import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import { useTheme, Box, Button, MenuItem, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { exerciseInfo } from '../../data/exerciseInfoData';
import FormField from '../../components/FormField';

const hands = [ { value: 'Left' }, { value: 'Right'} ];

const Form = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [hand, setHand] = useState('')
    const [injury, setInjury] = useState('')
    const [rehabStart, setRehabStart] = useState('')
    const [injuryTime, setInjuryTime] = useState('')

    const initialTargets = Array.from({ length: 4 }, () => ''); // Initialize an array with a length of 4
    const [targets, setTargets] = useState(initialTargets); // Use useState to manage the state of the array

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate(); // Get the history object
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isRequired = false; // set to true to set parameters for being required (false for testing)
    const fontSize = '20px';

    function handleSubmit(event) {
        event.preventDefault();
        const patientDetails = {firstName, lastName, userName, email, dateOfBirth, hand, injury, 
                        rehabStart, injuryTime, targets}

        alert(JSON.stringify(patientDetails, null, 2)); // make a popup to show all the inputted data
        navigate('/created-patient') // navigate to new page once form is submitted
        // Add something about sending the data to the backend
    }
 
    return (
        <React.Fragment>
            
      <Box m="20px 80px">
      <Header title="ADD NEW PATIENT" subtitle="Create a new detailed Patient Profile" />
      
            <form onSubmit={handleSubmit} >
              <Box display="grid" gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}
              >
                <FormField
                    type="text"
                    label="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    sx={{gridColumn: "span 2" }}
                    inputProps={{style: {fontSize:'20px' }}}
                    required={isRequired}
                />
                <FormField
                    type="text"
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    sx={{gridColumn: "span 2" }}
                    inputProps={{style: {fontSize:'20px' }}}
                    required={isRequired}
                />
                <FormField
                    type="text"
                    label="Username (choose a unique patient identifier)"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    sx={{ gridColumn: "span 4",}}
                    inputProps={{style: {fontSize:'20px', textAlign: 'center'}}}
                    required={isRequired}
                />
                <FormField
                    type="email"
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    sx={{mb:'10px', gridColumn: "span 2" }}
                    inputProps={{style: {fontSize:'20px' }}}
                />
                <FormField
                    type="date"
                    label="Date of Birth"
                    InputLabelProps={{ shrink: true, }}
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    required={isRequired}
                    fullWidth
                    sx={{gridColumn: "span 2" }}
                    inputProps={{style: {fontSize:'20px' }}}
                />
                {/* <Header subtitle="Select the Injured Hand"/> */}
                <FormField
                  select
                  required={isRequired}
                  label="Injured Hand"
                  labelPlacement="bottom"
                  variant='outlined'
                  color='secondary'
                  value={hand}
                  onChange={e => setHand(e.target.value)}
                  sx={{gridColumn: "span 1" }}
                  inputProps={{style: {fontSize:'20px' }}}
                >
                  {hands.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </FormField>
                <FormField
                    type="text"
                    label="Injury Type"
                    onChange={e => setInjury(e.target.value)}
                    value={injury}
                    inputProps={{style: {fontSize:'20px' }}}
                    sx={{gridColumn: "span 1" }}
                />
                <FormField
                    label="Rehab Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true, }}
                    sx={{gridColumn: "span 1" }}
                    value={rehabStart}
                    onChange={e => setRehabStart(e.target.value)}
                    inputProps={{style: {fontSize:'20px' }}}
                />
                <FormField
                    label="Expected Injury Duration (weeks)"
                    type="number"
                    inputProps={{min: 0, max: 52, style: { textAlign: 'center', fontSize:'20px' }}}
                    onChange={e => setInjuryTime(e.target.value)}
                    sx={{
                      "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      "input[type=number]": {
                        MozAppearance: "textfield",
                      },
                    }}
                />
                <Box display="flex" justifyContent="center" mt="10px" 
                sx={{fontSize:"18px",gridColumn: "span 4", justifyContent:"center", textAlign:"center",
                color: colors.greenAccent[800]}}>
                  Set the Desired Target Angles (in degrees) for each exercise for the patient. 
                  <br />This should be the measured normal ROM for their non-injured hand, or a chosen target metric by the PT
                </Box>
                {targets.map((target, i) => (
                  <FormField
                    id="outlined-number"
                    label={`Target Angle (in degrees)`}
                    type="number"
                    inputProps={{min: 0, max: 360, style: { textAlign: 'center', fontSize:'20px' }}}
                    onChange={(e) => {
                      const newTargets = [...targets];
                      newTargets[i] = e.target.value;
                      setTargets(newTargets);
                    }}
                  />
                  ))}
                {exerciseInfo.map((exercise, i) => (
                  <Box display="flex" justifyContent="center" mt="10px"  marginTop="-20px" 
                  style={{ color: colors.greenAccent[800] }} >
                    {exercise.title}
                  </Box>
                ))}
                <Box display="flex" justifyContent="center" mt="10px" sx={{gridColumn: "span 4" }}>
                  <Button type="submit" color="secondary" variant="contained"
                  style={{ marginBottom: '30px', backgroundColor: colors.blueAccent[400], color: colors.blueAccent[900], boxShadow: 'none',
                  width: '50em', height: '3em', fontSize:'15px', fontWeight:'bold', 
                  }}>
                    Create New Patient Profile
                  </Button>
                </Box>
              </Box>
            </form>
            </Box>
        </React.Fragment>
    )
}


export default Form;