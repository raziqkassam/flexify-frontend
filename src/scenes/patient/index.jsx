import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import ROMBox from "../../components/ROMBox";
import LineHeader from "../../components/LineHeader";
import { useNavigate } from 'react-router-dom';
import { romData } from "../../data/rehabLineData";

const exercises = [ "Wrist Flexion", "Wrist Extension", "Radial Deviation", "Ulnar Deviation" ];

const Patient = ({patient}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [timeframeButton, setTimeframeButton] = useState(1);
  const [lineData, setLineData] = useState([]);

  const allTimeLineData = romData.map(item => ({
    ...item, data: item.data.slice(0, patient.injuryTime) }));
  
  const lastMonthLineData = romData.map(item => ({
    ...item, data: item.data.slice(patient.injuryTime-5, patient.injuryTime) }));

  const lastWeekLineData = romData.map(item => ({
    ...item, data: item.data.slice(patient.injuryTime-2, patient.injuryTime) }));
  
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [increase, setIncrease] = useState();
  useEffect(() => {
    switch (timeframeButton) {
      case 1:
        setLineData(allTimeLineData);
        setTimePeriod("All Time");
        setIncrease(patient.increaseA);
        break;
      case 2:
        setLineData(lastMonthLineData);
        setTimePeriod("the Last Month");
        setIncrease(patient.increaseM);
        break;
      case 3:
        setLineData(lastWeekLineData);
        setTimePeriod("the Last Week");
        setIncrease(patient.increaseW);
        break;
      default:
        setLineData(allTimeLineData);
    }
  }, [timeframeButton, allTimeLineData, lastMonthLineData, lastWeekLineData, 
    timePeriod, patient.increaseA, patient.increaseM, patient.increaseW]);

  return (
    <Box m="20px 30px" pb="50px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 0px 0" }}>
        <Box marginLeft="10px">
          <Header title={`${patient.firstName} ${patient.lastName}`} subtitle={`Summary of ${patient.firstName}'s Rehab Progress`} />
        </Box>
        <Box mb="10px" justifyItems={"right"}>
          <LineHeader title="Injured Hand: " value={patient.hand}/>
          <LineHeader title="Date of Birth: " value={patient.dateOfBirth}/>
          <LineHeader title="Injury: " value={patient.injury} />
          <Box display="flex" justifyContent="center" mt="10px" 
            sx={{margin:"30px 0 10px 0"}}>
              <Button
                onClick={() => navigate(`/${patient.userName}/plan`)}
                type="submit" color="secondary" variant="contained" fullWidth
                style={{ marginBottom: '10px', backgroundColor: colors.greenAccent[700], color: '#ffffff',
                  width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold'
                }}
              >
              Edit Patient Plan
            </Button>
          </Box>
        </Box>
      </Box>
      <Box m="-30px 0 30px 0">
        <Box display="flex " justifyContent="left" alignContent={"center"} >
            <Button
              style={{
              backgroundColor:timeframeButton === 1 ? colors.greenAccent[700] : colors.primary[400],
              color:"white",
              marginRight:"10px",
              fontWeight:"550",
              fontSize:'12',
              width:"100px",
              height:"40px"
              }}
              onClick={() => setTimeframeButton(1)}
            > All Time </Button>
            <Button
              style={{
                backgroundColor:timeframeButton === 2 ? colors.greenAccent[700] : colors.primary[400],
                color:"white",
                marginRight:"10px",
                fontWeight:"550",
                fontSize:'12',
                width:"100px",
                height:"40px"
                }}
              onClick={() => setTimeframeButton(2)}
            > Last Month </Button>
              <Button
              mr="25px"
              style={{
                backgroundColor:timeframeButton === 3 ? colors.greenAccent[700] : colors.primary[400],
                color:"white",
                marginRight:"10px",
                fontWeight:"550",
                fontSize:'12',
                width:"100px",
                height:"40px"
                }}
              onClick={() => setTimeframeButton(3)}
            > Last Week </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        margin="20px 0 0 0"
        pb="30px"
      >
        {exercises.map((exercise, i) => (
          <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          borderRadius={5}
          
          >
            <ROMBox 
              exerciseName={exercise}
              targetAngle={patient.targets[i]}
              maxAngle={"20"}
              increase={increase} 
              timePeriod={timePeriod}
              subtitle="Rehabilitation Exercise Progress" 
            />
          </Box>
        ))}

          {/* ROW 2 */}
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            borderRadius={5}
            mt="20px"
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Range of Motion Improvement
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  Total Rehabilitation Exercise Progress
                </Typography>
              </Box>
            </Box>
            <Box height="400px" m="-20px 0 0 0">
              <LineChart isDashboard={true} 
              data={lineData}
              />
            </Box>
          </Box>

        </Box>
    </Box>
  );
};

export default Patient;
