import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import { useTheme, Box, Button, TextField, MenuItem, Checkbox,FormControlLabel } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LineHeader from '../../components/LineHeader';
import { tokens } from "../../theme";


const exerciseFrequency = [
    {value: 'Once'}, {value: 'Twice'}, {value: 'Thrice'}
];

const Planner = ({patient}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRequired = false; // set to true to set parameters for being required (false for testing)   
    const navigate = useNavigate(); // Get the history object
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
    const weeks = Array.from({ length: patient.injuryTime }, (_, i) => `W${i + 1}`);
    const [rehabWeeks, setRehabWeeks] = useState(Array.from({ length: patient.injuryTime }, () => Array.from({ length: 7 }, () => '')));
    const [checkboxes, setCheckboxes] = useState(Array(weeks.length).fill({ once: false, twice: false }));

    // Load saved selections and checkbox states from localStorage when component mounts
    useEffect(() => {
        const savedRehabWeeks = localStorage.getItem(`rehabWeeks_${patient.userName}`);
        const savedCheckboxes = localStorage.getItem(`checkboxes_${patient.userName}`);
        if (savedRehabWeeks) {
            setRehabWeeks(JSON.parse(savedRehabWeeks));
        }
        if (savedCheckboxes) {
            setCheckboxes(JSON.parse(savedCheckboxes));
        }
    }, []);
    useEffect(() => {
        setCheckboxes(rehabWeeks.map(week => {
            const uniqueValues = [...new Set(week)];
            if (uniqueValues.length === 1 && uniqueValues[0] !== '') {
                return { once: uniqueValues[0] === 'Once', twice: uniqueValues[0] === 'Twice' };
            }
            return { once: false, twice: false };
        }));
    }, [rehabWeeks]);

    const handleSelectChange = (weekIndex, dayIndex, newValue) => {
        setRehabWeeks(prevRehabWeeks => {
            const newRehabWeeks = [...prevRehabWeeks];
            newRehabWeeks[weekIndex][dayIndex] = newValue;
            return newRehabWeeks;
        });
    };

    const handleWeekChange = (weekIndex, checked, frequency) => {
        setRehabWeeks(prevRehabWeeks => {
            const newRehabWeeks = [...prevRehabWeeks];
            newRehabWeeks[weekIndex] = newRehabWeeks[weekIndex].map(() => checked ? frequency : '');
            return newRehabWeeks;
        });
        setCheckboxes(prevCheckboxes => {
            const newCheckboxes = [...prevCheckboxes];
            newCheckboxes[weekIndex] = { ...newCheckboxes[weekIndex], [frequency.toLowerCase()]: checked };
            return newCheckboxes;
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        const values = {
            rehabWeeks: rehabWeeks.map(week => week.map(day => {
                if (day === 'Once') return 1;
                if (day === 'Twice') return 2;
                if (day === 'Thrice') return 3;
                return 0; // default value if none of the above
            }))
        };
        // Save selections and checkbox states to localStorage when form is submitted
        localStorage.setItem(`rehabWeeks_${patient.userName}`, JSON.stringify(rehabWeeks));
        localStorage.setItem(`checkboxes_${patient.userName}`, JSON.stringify(checkboxes));
        alert(JSON.stringify(values, null, 2)); // make a popup to show all the inputted data
        navigate(`/${patient.userName}`) 
    }
 
    return (
    <React.Fragment>
            
      <Box m="20px 80px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 -5px 0" }}>
            <Box marginLeft="10px">
                <Header title={`${patient.firstName} ${patient.lastName}`} subtitle={`Current Rehab Schedule for ${patient.firstName}`} />
            </Box>
            <Box mb="10px" justifyItems={"right"} marginBottom={"80px"}>
                <LineHeader title="Injured Hand: " value={patient.hand}/>
                <LineHeader title="Date of Birth: " value={patient.dateOfBirth}/>
                <LineHeader title="Injury: " value={patient.injury} />
            </Box>
        </Box>
      
            <form onSubmit={handleSubmit} >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                sx={{
                    "& > div": { 
                      display: 'flex', 
                    //   flexDirection: 'row', 
                      gridColumn: isNonMobile ? undefined : "span 8", 
                    },
                  }}
              >
                
                {weeks.map((week, weekIndex) => (
                    <>
                        {/* <Button type="button" color="primary" variant="contained"
                        onClick={() => handleWeekChange(weekIndex, 'new value')}>
                            Set all days in {week} to Once
                        </Button> */}
                        <Box sx={{ gridColumn: "span 1", display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkboxes[weekIndex]?.once}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onChange={(event) => handleWeekChange(weekIndex, event.target.checked, 'Once')}
                                />
                            }
                            label="Once"
                            labelPlacement='bottom'
                            sx={{ width: "50%" }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkboxes[weekIndex]?.twice}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onChange={(event) => handleWeekChange(weekIndex, event.target.checked, 'Twice')}
                                />
                            }
                            label="Twice"
                            labelPlacement='bottom'
                            sx={{ width: "50%" }}
                        />
        </Box>
                    {days.map((day, dayIndex) => (
                        <TextField
                            select
                            required={isRequired}
                            label={week + " - " + day}
                            labelPlacement="bottom"
                            variant='outlined'
                            color='secondary'
                            value={rehabWeeks[weekIndex][dayIndex]}
                            onChange={e => handleSelectChange(weekIndex, dayIndex, e.target.value)}
                            sx={{ gridRow: "span 1", marginTop: "5px"}}
                        >
                            {exerciseFrequency.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                            ))}
                        </TextField>
                    ))}
                    </>
                ))}
                <Box display="flex" justifyContent="center" mt="10px" 
                sx={{gridColumn: "span 8", margin:"30px 0 100px 0"}}>
                  <Button type="submit" color="secondary" variant="contained" fullWidth>
                    Save Patient Plan
                  </Button>
                </Box>
              </Box>
            </form>
            </Box>
        </React.Fragment>
    )
}


export default Planner;