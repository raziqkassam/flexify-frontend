import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import { useTheme, Box, Button, MenuItem, Checkbox,FormControlLabel } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LineHeader from '../../components/LineHeader';
import { tokens } from "../../theme";
import PlannerField from '../../components/PlannerField';
import FormField from '../../components/FormField';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const exerciseFrequency = [
    {value: 'None'}, {value: 'Once'}, {value: 'Twice'}, {value: 'Thrice'}
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

    const [year, month, day] = patient.rehabStart.split("-");
    const rehabStartDate = new Date(year, month - 1, day);
    const rehabStartIndex = rehabStartDate.getDay();
    const rehabStartDay = days[rehabStartIndex];

    // reps and sets
    const [sets, setSets] = useState(Array(weeks.length).fill(''));
    const [reps, setReps] = useState(Array(weeks.length).fill(''));
    
    const lastSubmit = localStorage.getItem(`lastSubmit_${patient.userName}`);
    
    const [isSaved, setIsSaved] = useState(false);

    // Load saved selections and checkbox states from localStorage when component mounts
    useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-patient-plan/?userName=${patient.userName}`)
          .then(response => response.json())
          .then(data => {
              console.log("data", data.result)
              const userPlan = data.result[0]
              if (userPlan) {
                console.log("one", userPlan.rehabWeeks)
                setRehabWeeks(userPlan.rehabWeeks.map(week => week.map(day => {
                    switch(day) {
                      case 1:
                        return "Once";
                      case 2:
                        return "Twice";
                      case 3:
                        return "Thrice";
                      default:
                        return "None";
                    }
                })));
                console.log("rw", rehabWeeks)
                setSets(userPlan.sets);
                setReps(userPlan.reps);
              }
          });

        const savedCheckboxes = localStorage.getItem(`checkboxes_${patient.userName}`);
        if (savedCheckboxes) {
            setCheckboxes(JSON.parse(savedCheckboxes));
        }

    }, [patient.userName]);

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
        setIsSaved(true);
        setRehabWeeks(prevRehabWeeks => {
            const newRehabWeeks = [...prevRehabWeeks];
            newRehabWeeks[weekIndex][dayIndex] = newValue;
            return newRehabWeeks;
        });
    };

    const handleWeekChange = (weekIndex, checked, frequency) => {
        setIsSaved(true);
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
    
    const handleRepChange = (weekIndex, newValue) => {
        setIsSaved(true);
        setReps(prevReps => {
            const newReps = [...prevReps];
            newReps[weekIndex] = newValue;
            return newReps;
        });
    };
    const handleSetChange = (weekIndex, newValue) => {
        setIsSaved(true);
        setSets(prevSets => {
            const newSets = [...prevSets];
            newSets[weekIndex] = newValue;
            return newSets;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            userName: patient.userName,
            rehabWeeks: rehabWeeks.map(week => week.map(day => {
                if (day === 'Once') return 1;
                if (day === 'Twice') return 2;
                if (day === 'Thrice') return 3;
                return 0; // default value if none of the above
            })),
            sets: sets.map(set => {
                const setNumber = parseInt(set);
                return isNaN(setNumber) ? 0 : setNumber;
            }),
            reps: reps.map(rep => {
                const repNumber = parseInt(rep);
                return isNaN(repNumber) ? 0 : repNumber;
            }),
        };
        console.log(JSON.stringify(reps));
        console.log(JSON.stringify(sets));
        // Save selections and checkbox states to localStorage when form is submitted
        localStorage.setItem(`rehabWeeks_${patient.userName}`, JSON.stringify(rehabWeeks));
        localStorage.setItem(`checkboxes_${patient.userName}`, JSON.stringify(checkboxes));
        localStorage.setItem(`lastSubmit_${patient.userName}`, new Date().toLocaleString('en-US', 
        { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }));
        localStorage.setItem(`reps_${patient.userName}`, JSON.stringify(reps));
        localStorage.setItem(`sets_${patient.userName}`, JSON.stringify(sets));
        
        // Send the patient plan to the database
        const uploadPlan = await fetch('https://flexifybackend.vercel.app/upload-patient-plan/', {
          method: 'POST', // or 'PUT'
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(dataToSend),
        });
        if (!uploadPlan.ok) { throw new Error(`HTTP error! status: ${uploadPlan.status}`); }

        const data = await uploadPlan.json();
        // console.log(data);

        alert(JSON.stringify(dataToSend, null, 2)); // make a popup to show all the inputted data
        navigate(`/${patient.userName}`) 
    }

    function handleReset() {
        // Clear saved selections for the current user from localStorage
        localStorage.removeItem(`checkboxes_${patient.userName}`);
        localStorage.removeItem(`rehabWeeks_${patient.userName}`);
        localStorage.removeItem(`lastSubmit_${patient.userName}`);
        localStorage.removeItem(`reps_${patient.userName}`);
        localStorage.removeItem(`sets_${patient.userName}`);
        alert(JSON.stringify("Patient Schedule has been RESET for this User", null, 2)); // make a popup to show all the inputted data
        navigate(`/${patient.userName}`) 
    }
 
    return (
    <React.Fragment>
            
      <Box m="50px 60px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 -5px 0" }}>
            <Button
            onClick={() => navigate(`/${patient.userName}`)}
            type="submit" color="secondary" variant="outlined"
            style={{ marginBottom: '10px', color: colors.blueAccent[900], position: 'absolute', left: '60px', top: '140px', 
            width: '16em', height: '3em', fontSize:'14px', fontWeight:'400', borderRadius: "12px", border: '1px solid colors.blueAccent[400]'
          }} >
            <ArrowLeftIcon />
            View Patient Dashboard
            </Button>
            <Box m="60px 0 70px 10px">
                <Header 
                    title={`${patient.firstName} ${patient.lastName}`} 
                    subtitle={
                        <>
                            <br /><b>Update {patient.firstName}'s Rehab Schedule by setting their Exercise Frequency.</b>
                            <br /><br />To set the exercise frequency for the whole week, use the checkboxes. For each day, manually use the dropdowns.
                            <br />Then, set the intended reps and sets for all exercises for each week. <b>Don't forget to save once complete!</b>
                        </>
                    } 
                />            
            </Box>
            <Box mt="10px" justifyItems={"right"} marginBottom={"80px"}>
                <LineHeader title="Injured Hand: " value={patient.hand}/>
                <LineHeader title="Rehab Length: " value={`${patient.injuryTime} Weeks`} />
                <LineHeader title="Rehab Start: " value={`${rehabStartDay}, ${patient.rehabStart}`} />
                <LineHeader /><LineHeader /><LineHeader />
                <LineHeader title="Last Saved: " value={lastSubmit || 'Not yet saved'} />
                <Box display="flex" justifyContent="center" sx={{margin:"30px 0 -20px 0"}}>
                    <Button
                        onClick={handleSubmit} 
                        type="submit" color="secondary" variant="contained" fullWidth disabled={!isSaved}
                        style={{ marginBottom: '10px', width: '15em', height: '2.5em', fontSize:'15px', 
                        fontWeight:'bold', borderRadius: "12px", boxShadow: 'none',
                        backgroundColor: colors.blueAccent[400], // backgroundColor: !isSaved ? colors.grey[200] : colors.blueAccent[400],  
                        color: colors.blueAccent[900], // color: !isSaved ? colors.grey[100] : colors.blueAccent[900], 
                        }}
                    >
                    Save Patient Plan
                    </Button>
                </Box>
            </Box>
        </Box>
      
            <form onSubmit={handleSubmit} >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                sx={{
                    "& > div": { 
                      display: 'flex',
                      gridColumn: isNonMobile ? undefined : "span 8", 
                    },
                  }}
              >
                
                {weeks.map((week, weekIndex) => (
                    <>
                        <Box sx={{ gridColumn: "span 1", display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkboxes[weekIndex]?.once}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'secondary checkbox',}}
                                    onChange={(event) => handleWeekChange(weekIndex, event.target.checked, 'Once')}
                                    sx={{
                                        '&.MuiCheckbox-root': {
                                            color: colors.blueAccent[600], 
                                          },
                                        '&.Mui-checked': {
                                          color: colors.blueAccent[600],
                                        },
                                      }}
                                />
                            }
                            label="Once"
                            labelPlacement='bottom'
                            sx={{
                                width: "50%",
                                marginLeft: "-5px",
                                '& .MuiTypography-root': {
                                  fontSize: '20px', 
                                  fontStyle: 'italic',
                                  fontWeight: 'bold',
                                  color: colors.blueAccent[500],
                                },
                              }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkboxes[weekIndex]?.twice}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onChange={(event) => handleWeekChange(weekIndex, event.target.checked, 'Twice')}
                                    sx={{
                                        '&.MuiCheckbox-root': {
                                            color: colors.blueAccent[600], 
                                          },
                                        '&.Mui-checked': {
                                          color: colors.blueAccent[600],
                                        },
                                      }}
                                />
                            }
                            label="Twice"
                            labelPlacement='bottom'
                            sx={{
                                width: "50%",
                                marginLeft: "-5px",
                                '& .MuiTypography-root': {
                                  fontSize: '20px', 
                                  fontStyle: 'italic',
                                  fontWeight: 'bold',
                                  color: colors.blueAccent[500],
                                },
                              }}
                        />
                </Box>

                    {days.map((day, dayIndex) => (
                        <PlannerField
                            select
                            required={isRequired}
                            label={week + " - " + day}
                            labelPlacement="bottom"
                            variant='outlined'
                            color='secondary'
                            value={rehabWeeks[weekIndex][dayIndex]}
                            onChange={e => handleSelectChange(weekIndex, dayIndex, e.target.value)}
                            sx={{ gridRow: "span 1", marginTop: "5px", textAlign:'center', }}
                        >
                            {exerciseFrequency.map((option) => (
                            <MenuItem key={option.value} value={option.value}
                            sx={{ fontSize: "20px", width: '7em', textAlign:'center',}}>
                                {option.value}
                            </MenuItem>
                            ))}
                        </PlannerField>
                    ))}
                    <Box sx={{ gridColumn: "span 2", display: 'flex', justifyContent: 'space-between' }}>
                        <FormField
                            label="Sets"
                            type="number"
                            inputProps={{min: 0, max: 20, style: { textAlign: 'center', fontSize:'30px', padding:"10px 0px", 
                                        color: colors.blueAccent[500], }}}
                            value={sets[weekIndex]}
                            onChange={e => handleSetChange(weekIndex, e.target.value)}
                            sx={{
                                margin: "5px 0 0 40px",
                                width: "30%",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: colors.blueAccent[500],
                                    },
                                    '&:hover fieldset': {
                                        borderColor: colors.blueAccent[900],
                                    },
                                },
                            }}
                        />
                        <FormField
                            label="Reps"
                            type="number"
                            inputProps={{min: 0, max: 20, style: { textAlign: 'center', fontSize:'30px', padding:"10px 0px",
                                        color: colors.blueAccent[500],}}}
                            value={reps[weekIndex]}
                            onChange={e => handleRepChange(weekIndex, e.target.value)}
                            sx={{
                                margin: "5px 40px 0 0",
                                width: "30%",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: colors.blueAccent[500],
                                    },
                                    '&:hover fieldset': {
                                        borderColor: colors.blueAccent[900],
                                    },
                                },
                            }}
                        />
                    </Box>
                    </>
                    
                ))}
                <Box display="flex" justifyContent="center" mt="10px" 
                sx={{gridColumn: "span 8", margin:"30px 0 80px 280px"}}>
                  <Button type="submit" color="secondary" variant="contained" disabled={!isSaved}
                    style={{ marginBottom: '10px', boxShadow: 'none',
                    width: '40em', height: '3em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px", 
                    backgroundColor: !isSaved ? colors.grey[200] : colors.blueAccent[400],  
                    color: !isSaved ? colors.grey[100] : colors.blueAccent[900],
                    }}>
                    Save Patient Plan
                  </Button>
                </Box>
                
              </Box>
            </form>
            </Box>
            <Button type="button" color="primary" justifyContent="right" variant="contained" onClick={handleReset} 
            sx={{boxShadow:'none'}}>
            Reset
            </Button>
        </React.Fragment>
        
    )
}


export default Planner;