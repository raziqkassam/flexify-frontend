import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
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

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormField from "../../components/FormField";

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
        console.log()
        setIsEditMode(!isEditMode);
      };
       
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setEditedPatientData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };  
      
      const handleSaveChanges = () => {
        setIsEditMode(false);
      };

      const [open, setOpen] = useState(false);
      const [dialogContent, setDialogContent] = useState(''); // for clicking to expand notes section
      const handleOpen = (content: any) => {
        setDialogContent(content);
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const patientDataColumns = [
        {
          field: "exerciseName",
          headerName: "Exercise",
          headerAlign: "center",
          flex: 1,
          fontWeight: "heavy",
        },
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
          field: "maxAngle",
          headerName: "Max Angle",
          headerAlign: "center",
          flex: 1,
          align: "center",
          renderCell: (params) => `${params.value}˚`, // Add this line
        },
        {
          field: "pain",
          headerName: "Pain",
          headerAlign: "center",
          flex: 1,
          align: "center",
        },
        {
          field: "discomfort",
          headerName: "Discomfort",
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
            <div
              style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              onClick={() => handleOpen(params.value)}
            >
              {params.value}
            </div>
          ),
        },
      ]
      

  return (
    <Box m="20px 30px" pb="50px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 0px 0" }}>
      <Button
        onClick={() => navigate('/all-patients')}
        type="submit" color="secondary" variant="outlined"
        style={{ marginBottom: '10px', color: colors.blueAccent[900], position: 'absolute', left: '50px', top: '110px', 
          width: '15em', height: '3em', fontSize:'14px', fontWeight:'400', borderRadius: "12px", border: '1px solid colors.blueAccent[400]'
        }}
      >
          <ArrowLeftIcon />
          View All Patients
        </Button>
        <Box m="60px 0 90px 10px">
          <Header title={`${editedPatientData.firstName} ${editedPatientData.lastName}`} subtitle={`Summary of ${editedPatientData.firstName}'s Rehab Progress`} />
        </Box>
        <Box mb="10px" justifyItems={"right"}>
          {isEditMode ? (
            <FormField
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
            <LineHeader title="Injured Hand: " value={editedPatientData.hand} />
          )}
          {isEditMode ? (
            <FormField
              id="date-of-birth"
              name="dateOfBirth"
              label="Date of Birth"
              value={isEditMode ? editedPatientData.dateOfBirth : patient.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          ) : (
            <LineHeader title="Date of Birth: " value={editedPatientData.dateOfBirth} />
          )}
          {isEditMode ? (
            <FormField
              id="injury-type"
              name="injury"
              label="Injury"
              value={isEditMode ? editedPatientData.injury : patient.injury}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          ) : (
            <LineHeader title="Injury: " value={editedPatientData.injury} />
          )}
          {isEditMode ? (
            <FormField
              id="rehab-start-date"
              name="rehabStart"
              label="Rehab Start Date"
              value={isEditMode ? `${editedPatientData.rehabStart}` : `${patient.rehabStart}`}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          ) : (
            <LineHeader title="Rehab Start Date: " value={`${editedPatientData.rehabStart}`} />
          )}
          {/* did not make progress editable because we may want to conisder making them dates rather than number of weeks*/}
          <LineHeader title="Progress: " value={`${patient.progress} / ${patient.injuryTime} Weeks`} />
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt="10px" 
            sx={{margin:"30px 0 10px 0"}}>
              <Button
                onClick={() => navigate(`/${patient.userName}/plan`)}
                type="submit" color="secondary" variant="contained" fullWidth
                style={{ marginBottom: '10px', backgroundColor: colors.blueAccent[400], color: colors.blueAccent[900], boxShadow: 'none',
                  width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px",
                }}
              >
              Edit Patient Plan
            </Button>
          
              {/* Edit Patient Data Button */}
              <Button
                  onClick={isEditMode ? handleSaveChanges : handleEditClick} // Updated click handler
                  type="submit" color="secondary" variant="contained" fullWidth
                  style={{ marginBottom: '10px', backgroundColor: colors.primary[100], color: colors.blueAccent[900], boxShadow: 'none',
                      width: '15em', height: '2.5em', fontSize:'15px', fontWeight:'bold', borderRadius: "12px", border: '1px solid #6ad7e1'
                    }}
                >
                  {isEditMode ? "Save Changes" : "Edit Patient Details"} {/* Updated button text */}
              </Button>
            </Box>
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

          {/* Edit Patient Data Button */}
          {/* <Button
              onClick={isEditMode ? handleSaveChanges : handleEditClick} // Updated click handler
              type="submit" color="secondary" variant="contained" fullWidth
              style={{
                marginBottom: '10px', backgroundColor: colors.blueAccent[400], color: colors.blueAccent[900], boxShadow: 'none',
                width: '150px', height: '40px', fontSize: '12', fontWeight: '550', borderRadius: "12px",
              }}
            >
              {isEditMode ? "Save Changes" : "Edit Patient Data"} {/* Updated button text */}
            {/* </Button> */}

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
            backgroundColor={colors.grey[100]}
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
                  color={colors.primary[700]}
                >
                  Range of Motion Improvement
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.primary[900]}
                >
                  Total Rehabilitation Exercise Progress
                </Typography>
              </Box>
            </Box>
            <Box height="400px" m="20px 0 20px 0" p="0 30px">
              <LineChart isDashboard={true} 
              data={lineData}
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
              rows={exampleExerciseRating}
              columns={patientDataColumns}
              components={{ Toolbar: GridToolbar }}
              // checkboxSelection
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
