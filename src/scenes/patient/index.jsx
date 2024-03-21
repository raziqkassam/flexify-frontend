import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import ROMBox from "../../components/ROMBox";
import LineHeader from "../../components/LineHeader";
import { useNavigate } from 'react-router-dom';
import { romData } from "../../data/rehabLineData";
import { DataGrid, GridToolbar, GridRenderCellParams } from "@mui/x-data-grid";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { exampleExerciseRating } from "../../data/exerciseInfoData";
 import MailIcon from '@mui/icons-material/Mail';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import GoalField from "../../components/GoalField";
import Subheader from "../../components/Subheader";
import { set } from "mongoose";


const exercises = [ "Wrist Flexion", "Wrist Extension",  "Ulnar Deviation", "Radial Deviation", ];

const Patient = ({username}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [timeframeButton, setTimeframeButton] = useState(1);
  
  const [lineGraphButton, setLineGraphButton] = useState(1);
  const [lineData, setLineData] = useState([]);

  const [injuryTime, setInjuryTime] = useState(0);
  const [injury, setInjury] = useState('None');
  const [dob, setDob] = useState('01-01-2000'); 
  const [email, setEmail] = useState('test@test.com'); 
  const [rehabStart, setRehabStart] = useState('01-01-2024');
  const [currentWeek, setCurrentWeek] = useState(0); 
  const [hand, setHand] = useState('None');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [peaks, setPeaks] = useState([10,10,10,10]); // changes as the timeframe changes
  const [allPeaks, setAllPeaks] = useState([[1,2,3,4], [5,6,7,8], [9,10,11,12]]);
  const [increases, setIncreases] = useState([0,0,0,0]); // changes as the timeframe changes
  const [allIncreases, setAllIncreases] = useState([[1,2,3,4], [5,6,7,8], [9,10,11,12]]);
  
  const [targets, setTargets] = useState([0,0,0,0]); 

  useEffect(() => {
      fetch(`https://flexifybackend.vercel.app/get-dashboard-data-web/?userName=${username}`)
        .then(response => response.json() )
        .then(data => {
          console.log("data", data.result)

          setInjuryTime(data.result.injuryTime);
          setRehabStart(data.result.rehabStart);
          setCurrentWeek(data.result.currentWeek);
          setHand(data.result.hand);
          setFirstName(data.result.firstName);
          setLastName(data.result.lastName);
          setInjury(data.result.injury);
          setDob(data.result.dateOfBirth); 
          setEmail(data.result.email); 
          setTargets([data.result.targetWristFlexion, data.result.targetWristExtension, 
                      data.result.targetUlnarDeviation, data.result.targetRadialDeviation]);

          // peaks
          const alltimePeaks = [data.result.maxWristFlexion, data.result.maxWristExtension, 
                            data.result.maxUlnarDeviation, data.result.maxRadialDeviation];
          const monthPeaks = [10, 10, 10, 10];
          const weekPeaks = [0, 0, 0, 0];
          setAllPeaks([alltimePeaks, alltimePeaks, alltimePeaks]);

          // increases
          const alltimeInc = [data.result.wfAllTime, data.result.weAllTime, data.result.udAllTime, data.result.rdAllTime];
          const monthInc = [data.result.wfLastMonth, data.result.weLastMonth, data.result.udLastMonth, data.result.rdLastMonth];
          const weekInc = [data.result.wfLastWeek, data.result.weLastWeek, data.result.udLastWeek, data.result.rdLastWeek];
          const alltimeIncRounded = alltimeInc.map(Math.round);
          const monthIncRounded = monthInc.map(Math.round);
          const weekIncRounded = weekInc.map(Math.round);
          setAllIncreases([alltimeIncRounded, monthIncRounded, weekIncRounded]);
          
        })
  }, []);

  const getLineDataForTimeframe = (data) => {
    switch (timeframeButton) {
      case 1: // All data
        return data;
      case 2: // Last 30 values
        return data.slice(Math.max(data.length - 30, 0));
      case 3: // Last 7 values
        return data.slice(Math.max(data.length - 7, 0));
      default:
        return data;
    }
  };
  
  
  const [timePeriod, setTimePeriod] = useState("All Time");
  
  useEffect(() => {
    switch (timeframeButton) {
      case 1:
        setTimePeriod("All Time");
        setIncreases(allIncreases[0]);
        setPeaks(allPeaks[0]);
        break;
      case 2:
        setTimePeriod("the Last Month");
        setIncreases(allIncreases[1]);
        setPeaks(allPeaks[1]);
        break;
      case 3:
        setTimePeriod("the Last Week");
        setIncreases(allIncreases[2]);
        setPeaks(allPeaks[2]);
        break;
      default:
        setTimePeriod("All Time");
        setIncreases(allIncreases[0]);
        setPeaks(allPeaks[0]);
    }
  }, [timeframeButton, timePeriod, allIncreases, allPeaks]);

      const [open, setOpen] = useState(false);
      const [dialogContent, setDialogContent] = useState(''); // for clicking to expand notes section
      const handleOpen = (content: any) => {
        setDialogContent(content);
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const [goals, setGoals] = useState(['','','']);
      const [open2, setOpen2] = useState(false);
      const setGoalAtIndex = (index, value) => {
        setGoals(prevGoals => {
          const newGoals = [...prevGoals]; // Create a copy of the previous goals array
          newGoals[index] = value; // Set the new value at the given index
          return newGoals; // Return the new goals array
        });
      };
      const handleOpen2 = (content: any) => {
        setDialogContent(content);
        setOpen2(true);
      };
      const handleClose2 = () => {
        setOpen2(false);
      };
      const [isGoalSubmitted, setIsGoalSubmitted] = useState(false);
      useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-goals/?userName=${username}`)
          .then(response => response.json())
          .then(data => {
              const userGoals = data.result[0]
              if (userGoals) {
                setGoals([userGoals.goal1, userGoals.goal2, userGoals.goal3]);
                setIsGoalSubmitted(true);
              }
          });
      }, []);

      const handleGoalSubmit = async (event) => {
        event.preventDefault();
        handleClose2();
        // Check if any goals are set
        if (!goals.some(goal => goal.trim() !== '')) {
          setGoals(['', '', '']); // Clear the goals area
          setIsGoalSubmitted(true); // Mark as submitted
          return; // Exit the function
        }
        setOpen(false);

        // Create a new object with the desired structure
        const dataToSend = {
          userName: username,
          goal1: goals[0] ? goals[0] : '',
          goal2: goals[1] ? goals[1] : '',
          goal3: goals[2] ? goals[2] : '',
        };
      
        // Send the goals to the database
        const uploadGoals = await fetch('https://flexifybackend.vercel.app/upload-goals/', {
          method: 'POST', // or 'PUT'
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(dataToSend),
        });
        if (!uploadGoals.ok) { throw new Error(`HTTP error! status: ${uploadGoals.status}`); }
        window.location.reload();
        const data = await uploadGoals.json();
        // alert(JSON.stringify(dataToSend, null, 2));
      };

      const patientDataColumns = [
        {
          field: "completionDate",
          headerName: "Date",
          headerAlign: "center",
          flex: 1,
          align: "center",
          renderCell: (params) => {
            const [year, month, day] = params.value.split('-');
            const date = new Date(year, month - 1, day);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
          },
        },
        {
          field: "exerciseName",
          headerName: "Exercise",
          headerAlign: "center",
          flex: 1.5,
          fontWeight: "heavy",
        },
        {
          field: "maxAngle",
          headerName: "Max Angle",
          headerAlign: "center",
          flex: 1,
          align: "center",
          renderCell: (params) => `${params.value}˚`, 
        },
        {
          field: "pain",
          headerName: "Pain",
          headerAlign: "center",
          flex: 1,
          align: "center",
        },
        {
          field: "difficulty",
          headerName: "Difficulty",
          headerAlign: "center",
          flex: 1,
          align: "center",
        },
        {
          field: 'notes',
          headerName: 'Notes',
          headerAlign: "center",
          flex: 3,
          renderCell: (params: GridRenderCellParams) => (
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              onClick={() => handleOpen(params.value)}
            >
              {params.value}
            </div>
          ),
        },
      ]
      
      const [exerciseDataRows, setExerciseDataRows] = useState([]);
      useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-completed-exercises/?userName=${username}`)
          .then(response => response.json())
          .then(data => {
            const rows = data.result
              .filter(exercise => exercise.isCompleted)
              .map((exercise, index) => {
                console.log("e", exercise);
                return {
                  id: index,
                  completionDate: exercise.date,
                  exerciseName: exercise.exerciseName,
                  maxAngle: exercise.maxAngle,
                  pain: exercise.painRating,
                  difficulty: exercise.difficultyRating,
                  notes: exercise.notes === "Write any notes here" ? "N/A" : exercise.notes,
                };
              });
            console.log(rows)
            setExerciseDataRows(rows);
          });
      }, []);

      const [exerciseDataLines, setExerciseDataLines] = useState([]);
      const [exertionDataLines, setExertionDataLines] = useState([]);
      const colorMapping = {
        'Pain': '#3f6344', 
        'Difficulty': '#26b2bf', 
        'Radial Deviation': '#3da58a', 
        'Ulnar Deviation': '#69b071', 
        'Wrist Extension': '#1e8b95', 
        'Wrist Flexion': '#1e5345' 
      };
      useEffect(() => {
        fetch(`https://flexifybackend.vercel.app/get-exercise-data/?userName=${username}`)
          .then(response => response.json())
          .then(data => {
            const exertionKeys = ['painArray', 'difficultyArray'];
            const exertionIDs = ['Pain', 'Difficulty']; // replace with your desired IDs
            const exerciseKeys = ['maxRadialDeviationArray', 'maxUlnarDeviationArray', 'maxWristExtensionArray', 'maxWristFlexionArray'];
            const exerciseIDs = ['Radial Deviation', 'Ulnar Deviation', 'Wrist Extension', 'Wrist Flexion']; // replace with your desired IDs
            
             

            const exertionLines = exertionKeys.map((key, index) => {
              const dataForLineGraph = getLineDataForTimeframe(data.result[key]);
              const color = colorMapping[exertionIDs[index]]; // get color from mapping
              return {
                id: exertionIDs[index],
                color: color,
                data: dataForLineGraph.map((value, index) => {
                  return {
                    x: index+1,
                    y: value,
                  };
                }),
              };
            });
            setExertionDataLines(exertionLines);

            const exerciseLines = exerciseKeys.map((key, index) => {
              const dataForLineGraph = getLineDataForTimeframe(data.result[key]);
              const color = colorMapping[exerciseIDs[index]]; // get color from mapping
              return {
                id: exerciseIDs[index],
                color: color,
                data: dataForLineGraph.map((value, index) => {
                  return {
                    x: index+1,
                    y: value,
                  };
                }),
              };
            });
            setExerciseDataLines(exerciseLines);
          });
      }, []);
  
  return (
    <Box m="20px 30px" p="0 30px 100px 30px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 0px 0" }}>
        <Button
          onClick={() => navigate('/all-patients')}
          type="submit" color="secondary" variant="outlined"
          style={{ marginBottom: '10px', color: colors.blueAccent[900], position: 'absolute', left: '60px', top: '140px', 
            width: '15em', height: '3em', fontSize:'14px', fontWeight:'400', borderRadius: "12px", border: '1px solid colors.blueAccent[400]'
          }} >
          <ArrowLeftIcon />
          View All Patients
        </Button>
        <Button
           onClick={() => window.location.href = `mailto:${email}`}
           type="submit" color="secondary" variant="outlined"
           style={{ marginBottom: '10px', color: colors.blueAccent[900], position: 'absolute', left: '285px', top: '140px', 
             width: '2em', height: '3em', fontSize:'14px', fontWeight:'400', borderRadius: "12px", border: '1px solid colors.blueAccent[400]'
           }} >
             <MailIcon fontSize="50px" sx={{color: colors.blueAccent[500], fontSize:"25px"}} />
         </Button>

        <Box m="100px 0 100px 10px">
          <Header title={`${firstName} ${lastName}`} subtitle={`Summary of ${firstName}'s Rehab Progress`} />
        </Box>
        
        <Box mb="20px" justifyItems={"right"}>
          <LineHeader title="Injured Hand: " value={hand} />
          <LineHeader title="Date of Birth: " value={dob} />
          <LineHeader title="Injury: " value={injury} />
          <LineHeader title="Rehab Start Date: " value={`${rehabStart}`} />
          <LineHeader title="Progress: " value={`${currentWeek} / ${injuryTime} Weeks`} />
          <Box sx={{textAlign: "center", m: "20px 0 0 0", }} >
            <Button
                onClick={() => navigate(`/${username}/plan`)}
                color="secondary" variant="contained" fullWidth type="submit"
                style={{ backgroundColor: colors.blueAccent[400],  color: colors.blueAccent[900], boxShadow: 'none',
                width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px",
                }} >
                Edit Patient Plan
            </Button>
          </Box>

          <Box sx={{textAlign: "center", m: "10px 0 0 0", }} >
            <Button
                onClick={handleOpen2} color="secondary" variant="outlined" fullWidth type="submit"
                style={{ border: '3px solid colors.blueAccent[400]',  color: colors.blueAccent[900], boxShadow: 'none',
                width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px",
                }} >
                Edit Patient Goals
            </Button>
            <Dialog open={open2} onClose={handleClose2} 
              sx={{ '& .MuiDialog-paper': {  backgroundColor: colors.blueAccent[900], },
              }}>
                <Button variant="outlined" onClick={() => { setGoals(['','','']); }}
                  sx={{  position: 'absolute', right: 8, top: 8,
                    color: colors.grey[200], border: '3px solid colors.blueAccent[400]',
                  }}
                >
                  Clear Goals
                </Button>
              <DialogContent >
                <form onSubmit={handleGoalSubmit} >
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                  p="10px 10px">
                    <Subheader 
                    title="Set Patient Goals" 
                    value="Set up to 3 unique patient goals to follow during their rehabilitation."
                    />
                    <GoalField
                      label="Goal 1"
                      value={goals[0]}
                      onChange={(event) => setGoalAtIndex(0, event.target.value)}
                      fullWidth
                    />
                    <GoalField
                      label="Goal 2"
                      value={goals[1]}
                      onChange={(event) => setGoalAtIndex(1, event.target.value)}
                      fullWidth
                    />
                    <GoalField
                      label="Goal 3"
                      value={goals[2]}
                      onChange={(event) => setGoalAtIndex(2, event.target.value)}
                      fullWidth
                    />
                  </Box>
                <Box display="flex" justifyContent="center" mt="10px" sx={{gridColumn: "span 4" }} p="0px 10px">
                  <Button type="submit" color="secondary" variant="contained"
                  style={{ margin: '20px 0', backgroundColor: colors.blueAccent[400], color: colors.blueAccent[900], boxShadow: 'none',
                  width: '80em', height: '3em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px",
                  }}>
                    Save Patient Goals
                  </Button>
                </Box>
                </form>
              </DialogContent>
            </Dialog>
          </Box>
          
          {isGoalSubmitted && (goals[0] || goals[1] || goals[2] ) && (
            <Box sx={{ marginTop:'-255px', position:'absolute', width:'26em', right:'330px'}}>
              <Typography sx={{color:colors.blueAccent[800], fontSize:'25px', fontWeight:'700'}}>
                Rehab Goals:
              </Typography>
              {goals.map((goal, index) => (
                goal && (
                  <Box sx={{ display: 'flex', margin:'10px 0 -4px 0px'}}>
                    <Typography variant="h5" color={colors.blueAccent[400]} fontWeight="bold" fontSize={18} >
                      {index+1}.
                    </Typography>
                    <Typography variant="h5" color={colors.blueAccent[900]} fontSize={18} 
                    textAlign={"left"} sx={{ m: "0 0 0 8px" }} >
                      {goal}
                    </Typography>
                  </Box>
                )
              ))}
            </Box>
          )}
        </Box>
        
      </Box>
      <Box m="-70px 0 30px 0">
        <Box display="flex " justifyContent="left" alignContent={"center"} >
            <Button
            variant="outlined"
              style={{
                backgroundColor:timeframeButton === 1 ? colors.blueAccent[400] : colors.grey[100],
                color: colors.blueAccent[900],
                marginRight:"10px",
                fontWeight:"550", fontSize:'12',
                width:"100px", height:"40px",
                borderRadius: "12px",
              }}
              onClick={() => setTimeframeButton(1)}
            > All Time </Button>
            <Button
              style={{
                backgroundColor:timeframeButton === 2 ? colors.blueAccent[400] : colors.grey[100],
                color: colors.blueAccent[900],
                marginRight:"10px",
                fontWeight:"550",
                fontSize:'12',
                width:"100px",
                height:"40px",
                borderRadius: "12px",
              }}
              onClick={() => setTimeframeButton(2)}
            > Last Month </Button>
              <Button
              mr="25px"
              style={{
                backgroundColor:timeframeButton === 3 ? colors.blueAccent[400] : colors.grey[100],
                
                color: colors.blueAccent[900],
                marginRight:"10px",
                fontWeight:"550",
                fontSize:'12',
                width:"100px",
                height:"40px",
                borderRadius: "12px",
              }}
              onClick={() => setTimeframeButton(3)}
            > Last Week </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)" // gridAutoRows="140px"
        gap="20px"
        margin="20px 0 0 0"
        pb="30px"
      >
        {exercises.map((exercise, i) => (
          <Box
          gridColumn="span 6"
          backgroundColor={colors.grey[100]}
          display="flex"
          justifyContent="center"
          borderRadius={5}
          >
            <ROMBox 
              exerciseName={exercise}
              targetAngle={targets[i]}
              maxAngle={peaks[i]}
              increase={increases[i]} 
              timePeriod={timePeriod}
              subtitle="Rehabilitation Exercise Progress" 
            />
            
          </Box>
        ))}
          
          {/* ROW 2 */}
          <Grid container spacing={3} direction={"row"} mt="50px" gridColumn="span 9">
          <Grid item xs={2}>
            <Button variant="outlined" flex="none" mt="5px"
              style={{
                backgroundColor:lineGraphButton === 1 ? colors.blueAccent[400] : colors.grey[100],
                color: colors.blueAccent[900], fontWeight:"550", fontSize:'12',
                width:"150px", height:"40px", borderRadius: "12px", 
              }}
              onClick={() => setLineGraphButton(1)}
            > EXERCISE ROM</Button>
            </Grid>
            <Grid item xs={2}>
              <Button 
              style={{
                backgroundColor:lineGraphButton === 2 ? colors.blueAccent[400] : colors.grey[100],
                color: colors.blueAccent[900], fontWeight:"550", fontSize:'12',
                width:"150px", height:"40px", borderRadius: "12px", marginLeft:"-10px",
              }}
              onClick={() => setLineGraphButton(2)}
            > EXERTION RATINGS</Button>
            </Grid>
          </Grid>
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor={colors.grey[100]}
            borderRadius={5}
            mt="10px"
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" fontWeight="600" color={colors.primary[700]} >
                  Range of Motion Improvement
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={colors.primary[900]}
                >
                  Total Rehabilitation Exercise Progress
                </Typography>
              </Box>
            </Box>
            
            <Box height="550px" m="20px 0 20px 0" p="0 10px 0 30px">
              <LineChart 
                data={lineGraphButton === 1 ? exerciseDataLines : exertionDataLines}
                // xAxisLegend={lineGraphButton === 1 ? 'Time' : 'Exertion X Legend'}
                yAxisLegend={lineGraphButton === 1 ? 'Degrees' : 'Likert Scale'}
              />
            </Box>
          </Box>

        </Box>

        <Box m="50px 20px 0px 20px">
          <Header
            title="Exercise Tracking List"
            subtitle="Table of recently completed exercises and patient subjective feedback"
          />
          <Box
            m="40px 20px 0 10px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                color: colors.primary[100],
                fontSize: "20px",
                
              },
              "& .MuiDataGrid-row": {
                // borderBottom: '1px solid #2c5331', // Add this line
                '&:hover': {
                  backgroundColor: colors.blueAccent[200], 
                },
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                color: colors.primary[900],
              },
              "& .name-column--cell": {
                color: colors.primary[900],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.primary[800],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.grey[100],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.primary[800],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.primary[600]} !important`,
              },
            }}
          >
            <DataGrid
              rows={exerciseDataRows}
              columns={patientDataColumns}
              components={{ Toolbar: GridToolbar }}
              disableRowSelectionOnClick
              sortModel={[ { field: 'completionDate', sort: 'desc', }, ]}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#bfeef2', 
                },
              }}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle textAlign={"center"} fontWeight={"bold"} fontSize={30}>
                Patient Notes:</DialogTitle>
              <DialogContent sx={{fontSize:"20px", p:"40px 40px"}}>
                {dialogContent}
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
    </Box>
  );
};

export default Patient;
