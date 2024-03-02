import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import ROMBox from "../../components/ROMBox";
import LineHeader from "../../components/LineHeader";
import { useNavigate } from 'react-router-dom';
import { romData } from "../../data/rehabLineData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fullPatientInfo } from "../../data/patientData";

const exercises = [ "Wrist Flexion", "Wrist Extension",  "Ulnar Deviation", "Radial Deviation", ];

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

  const [isEditMode, setIsEditMode] = useState(false); // Added state for edit mode
  const [editedPatientData, setEditedPatientData] = useState({ ...patient }); // Added state for edited patient data
  
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [increase, setIncrease] = useState([]);
  const [peak, setPeak] = useState([]);
  useEffect(() => {
    switch (timeframeButton) {
      case 1:
        setLineData(allTimeLineData);
        setTimePeriod("All Time");
        setIncrease(patient.increase[0].A);
        setPeak(patient.peak[0].A);
        break;
      case 2:
        setLineData(lastMonthLineData);
        setTimePeriod("the Last Month");
        setIncrease(patient.increase[0].M);
        setPeak(patient.peak[0].M);
        break;
      case 3:
        setLineData(lastWeekLineData);
        setTimePeriod("the Last Week");
        setIncrease(patient.increase[0].W);
        setPeak(patient.peak[0].W);
        break;
      default:
        setLineData(allTimeLineData);
    }
  }, [timeframeButton, allTimeLineData, lastMonthLineData, lastWeekLineData, 
      timePeriod, patient.increase, patient.peak]);

      const handleEditClick = () => {
        setIsEditMode(!isEditMode);
      };
       
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedPatientData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };  
      
      const handleSaveChanges = () => {
        // Save changes logic goes here
        // For demonstration purposes, let's log the edited patient data
        // patient.hand: editedPatientData.hand
        // you can see the updated patient info in the logs if you inspect element, but i may need to make an API endpoint to be able to change the patientData.js file?
        // may require additional support
        const updatedPatientInfo = fullPatientInfo.map((patient) =>
          patient.id === editedPatientData.id ? editedPatientData : patient
        );
        console.log("Updated Patient Info:", updatedPatientInfo);

        setIsEditMode(false);
      };

      const patientDataColumns = [
        {
          field: "progress",
          headerName: "Progress",
          headerAlign: "center",
          
          flex: 1,
          cellClassName: "name-column--cell",
          fontWeight: "heavy",
          align: "center"
        },
        {
          field: "userName",
          headerName: "First Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
      ]
  return (
    <Box m="20px 30px" pb="50px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 0px 0" }}>
        <Box m="0 0 30px 10px">
        <Header title={`${editedPatientData.firstName} ${editedPatientData.lastName}`} subtitle={`Summary of ${editedPatientData.firstName}'s Rehab Progress`} />
        </Box>
        <Box mb="10px" justifyItems={"right"}>
          {/*<LineHeader title="Injured Hand: " value={patient.hand}/>*/}
          {isEditMode ? (
            <TextField
              id="injured-hand"
              name="hand"
              label="Injured Hand"
              value={isEditMode ? editedPatientData.hand : patient.hand}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          ) : (
            <LineHeader title="Injured Hand: " value={patient.hand} />
          )}
          <LineHeader title="Date of Birth: " value={patient.dateOfBirth}/>
          <LineHeader title="Injury: " value={patient.injury} />
          <LineHeader title="Rehab Start Date: " value={`${patient.rehabStart}`} />
          <LineHeader title="Progress: " value={`${patient.progress} / ${patient.injuryTime} Weeks`} />
          <Box display="flex" justifyContent="center" mt="10px" 
            sx={{margin:"30px 0 10px 0"}}>
              <Button
                onClick={() => navigate(`/${patient.userName}/plan`)}
                type="submit" color="secondary" variant="contained" fullWidth
                style={{ marginBottom: '10px', backgroundColor: colors.greenAccent[700], color: '#ffffff',
                  width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px",
                }}
              >
              Edit Patient Plan
            </Button>
          </Box>
        </Box>
      </Box>
      <Box m="-70px 0 30px 0">
        <Box display="flex " justifyContent="left" alignContent={"center"} >
            <Button
              style={{
                backgroundColor:timeframeButton === 1 ? colors.greenAccent[700] : colors.primary[400],
                color:"white",
                marginRight:"10px",
                fontWeight:"550",
                fontSize:'12',
                width:"100px",
                height:"40px",
                borderRadius: "12px",
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
                height:"40px",
                borderRadius: "12px",
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
                height:"40px",
                borderRadius: "12px",
              }}
              onClick={() => setTimeframeButton(3)}
            > Last Week </Button>

          {/* Edit Patient Data Button */}
          <Button
              onClick={isEditMode ? handleSaveChanges : handleEditClick} // Updated click handler
              type="submit" color="secondary" variant="contained" fullWidth
              style={{
                marginBottom: '10px', backgroundColor: colors.greenAccent[700], color: '#ffffff',
                width: '150px', height: '40px', fontSize: '12', fontWeight: '550', borderRadius: "12px",
              }}
            >
              {isEditMode ? "Save Changes" : "Edit Patient Data"} {/* Updated button text */}
            </Button>

        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="140px"
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
              maxAngle={peak[i]}
              increase={increase[i]} 
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
            <Box height="400px" m="20px 0 0px 0">
              <LineChart isDashboard={true} 
              data={lineData}
              />
            </Box>
          </Box>
          
          

        </Box>

        <Box m="20px">
          <Header
            title="Exercise Tracking List"
            subtitle="Table of completed exercises and patient subjective feedback"
          />
          <Box
            m="40px 20px 0 10px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[400],
                
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={fullPatientInfo}
              columns={patientDataColumns}
              components={{ Toolbar: GridToolbar }}
              // checkboxSelection
            />
          </Box>
        </Box>
    </Box>
  );
};

export default Patient;
