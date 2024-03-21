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

const Planner = ({username}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRequired = false; // set to true to set parameters for being required (false for testing)   
    const navigate = useNavigate(); // Get the history object
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [injuryTime, setInjuryTime] = useState(3);
    const [rehabStart, setRehabStart] = useState('2024-01-01');
    const [hand, setHand] = useState('None');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    console.log("injuryTime2", injuryTime);
    useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-dashboard-data-web/?userName=${username}`)
          .then(response => response.json() )
          .then(data => {
            console.log("data", data.result)
            setInjuryTime(data.result.injuryTime);
            setRehabStart(data.result.rehabStart);
            setHand(data.result.hand);
            setFirstName(data.result.firstName);
            setLastName(data.result.lastName);
        })
        
    }, [username, injuryTime]);
    
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
        
    const weeks = Array.from({ length: injuryTime }, (_, i) => `W${i + 1}`);
    console.log("weeks", weeks);

    //const [rehabWeeks, setRehabWeeks] = useState(Array.from({ length: injuryTime }, () => Array.from({ length: 7 }, () => '')));
    const [rehabWeeks, setRehabWeeks] = useState([]);

    useEffect(() => {
        if (injuryTime > 0) {
            setRehabWeeks(Array.from({ length: injuryTime }, () => Array.from({ length: 7 }, () => '')));
        }
    }, [injuryTime]);

    const [checkboxes, setCheckboxes] = useState(Array(injuryTime).fill({ once: false, twice: false }));

    const [year, month, day] = rehabStart.split("-");
    const rehabStartDate = new Date(year, month - 1, day);
    const rehabStartIndex = rehabStartDate.getDay();
    const rehabStartDay = days[rehabStartIndex];

    // reps and sets
    const [sets, setSets] = useState(Array(weeks.length).fill(3));
    const [reps, setReps] = useState(Array(weeks.length).fill(5));
    
    const lastSubmit = localStorage.getItem(`lastSubmit_${username}`);
    
    const [isSaved, setIsSaved] = useState(false);

    // Load saved selections and checkbox states from localStorage when component mounts
    useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-patient-plan/?userName=${username}`)
          .then(response => response.json())
          .then(data => {
              console.log("data", data.result)
              const userPlan = data.result[0];

              if (userPlan && userPlan.rehabWeeks) {
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
                setSets(userPlan.sets);
                setReps(userPlan.reps);
              }
            else {
                // setRehabWeeks(Array.from({ length: injuryTime }, () => Array.from({ length: 7 }, () => '')));
                // console.log("wks", weeks.length)
                setSets(Array(weeks.length).fill(3));
                setReps(Array(weeks.length).fill(5));
            }
          });

        const savedCheckboxes = localStorage.getItem(`checkboxes_${username}`);
        if (savedCheckboxes) {
            setCheckboxes(JSON.parse(savedCheckboxes));
        }

    }, [injuryTime, weeks.length, username]);

    console.log("rw", rehabWeeks);

    useEffect(() => {
        setCheckboxes(rehabWeeks.map(week => {
            const uniqueValues = [...new Set(week)];
            console.log("uv", uniqueValues);
            if (uniqueValues.length === 1 && uniqueValues[0] !== '') {
                return { once: uniqueValues[0] === 'Once', twice: uniqueValues[0] === 'Twice' };
            }
            return { once: false, twice: false };
        }));
    }, [username, rehabWeeks, injuryTime, weeks.length]);

    const handleSelectChange = (weekIndex, dayIndex, newValue) => {
        setIsSaved(true);
        // if( rehabWeeks && rehabWeeks.length > 0) {
            setRehabWeeks(prevRehabWeeks => {
                const newRehabWeeks = [...prevRehabWeeks];
                if (newRehabWeeks[weekIndex]) {
                    newRehabWeeks[weekIndex][dayIndex] = newValue;
                }
                return newRehabWeeks;
            });
        // }
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
            userName: username,
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
        console.log(dataToSend);
        // Save selections and checkbox states to localStorage when form is submitted
        localStorage.setItem(`lastSubmit_${username}`, new Date().toLocaleString('en-US', 
        { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }));
        
        // Send the patient plan to the database
        const uploadPlan = await fetch('https://flexifybackend.vercel.app/upload-patient-plan/', {
          method: 'POST', // or 'PUT'
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(dataToSend),
        });
        if (!uploadPlan.ok) { throw new Error(`HTTP error! status: ${uploadPlan.status}`); }

        const data = await uploadPlan.json();
        console.log(data);

        // alert(JSON.stringify(dataToSend, null, 2)); // make a popup to show all the inputted data
        navigate(`/${username}`) 
    }

    const handleReset = async (event) => {
        // Clear saved selections for the current user from localStorage
        localStorage.removeItem(`checkboxes_${username}`);
        localStorage.removeItem(`lastSubmit_${username}`);

        const response = await fetch(`https://flexifybackend.vercel.app/delete-user/?userName=${username}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: username }),
        });

        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

        const data = await response.json();
        console.log(data);

        alert(JSON.stringify("THIS PATIENT HAS BEEN DELETED", null, 2)); // make a popup to show all the inputted data
        navigate('/all-patients') 
    }
 
    return (
    <React.Fragment>
            
      <Box m="50px 60px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 -5px 0" }}>
            <Button
            onClick={() => navigate(`/${username}`)}
            type="submit" color="secondary" variant="outlined"
            style={{ marginBottom: '10px', color: colors.blueAccent[900], position: 'absolute', left: '60px', top: '140px', 
            width: '16em', height: '3em', fontSize:'14px', fontWeight:'400', borderRadius: "12px", border: '1px solid colors.blueAccent[400]'
          }} >
            <ArrowLeftIcon />
            View Patient Dashboard
            </Button>
            <Box m="60px 0 70px 10px">
                <Header 
                    title={`${firstName} ${lastName}`} 
                    subtitle={
                        <>
                            <br /><b>Update {firstName}'s Rehab Schedule by setting their Exercise Frequency.</b>
                            <br /><br />To set the exercise frequency for the whole week, use the checkboxes. For each day, manually use the dropdowns.
                            <br />Then, set the intended reps and sets for all exercises for each week. <b>Don't forget to save once complete!</b>
                        </>
                    } 
                />            
            </Box>
            <Box mt="10px" justifyItems={"right"} marginBottom={"80px"}>
                <LineHeader title="Injured Hand: " value={hand}/>
                <LineHeader title="Rehab Length: " value={`${injuryTime} Weeks`} />
                <LineHeader title="Rehab Start: " value={`${rehabStartDay}, ${rehabStart}`} />
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
                            value={rehabWeeks[weekIndex] && rehabWeeks[weekIndex][dayIndex] ? rehabWeeks[weekIndex][dayIndex] : ''}
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