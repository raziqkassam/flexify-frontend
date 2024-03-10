import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {React, useEffect, useRef} from 'react';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { CalendarTodayOutlined, NoteAltOutlined } from '@mui/icons-material';
import LineHeader from "../../components/LineHeader";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Define the function to convert string to number
  const convertStringToNumber = (str) => {
    const value = str / 360;
    return value;
  };
  
  // Get today's date
  const today = new Date();
  const todayString = today.toDateString(); // Format: Day Month Date Year

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  useEffect(() => {
    if (el && el.current) {
      const typed = new Typed(el.current, {
        strings: ['Welcome <span style="color: #2c5331;">Physiotherapist</span>!'],
        typeSpeed: 50,
      });

      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }
  }, []);

  return (
    
    <Box m="10px 30px auto"> 
    <div style={{ height: '50px' }}></div>
            
    <Grid container >
        <Grid item xs={4} p="20px 50px 20px 30px" 
        sx={{ color: colors.greenAccent[700], fontSize: '15px', textAlign: 'left', m: "0 0 0px 0",
        fontWeight: '500', 
        }}>
            {/* Left column */}
            {/* ROMET is a Fifth Year Design Project, built to help improve the experience of completing and 
            tracking at home rehabilitaiton exercises for both the patient and their physiotherapist. */}
        </Grid>
        <Grid item xs={4}>
            {/* Middle column */}
            {/* TYPING ANIMATION HEADER */}
            <Box sx={{ color: colors.greenAccent[900], fontSize: '30px', textAlign: 'center', m: "0 0 20px 0",
                    fontWeight: '700', 
            }}>
                <span ref={el} />
            </Box>
            <Box
                sx={{
                    display: 'flex', // Add this line
                    justifyContent: 'center', // Add this line
                }}
            >
                <Box p="20px" mt="20px"
                    sx={{
                        width: '35em', height: '10em',
                        display: 'flex', 
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign:'center',
                        borderRadius:'12px', backgroundColor:colors.grey[100], color:colors.greenAccent[900],
                    }}
                >
                    <Typography fontSize={50} fontWeight="900" sx={{ color: colors.primary[900] }} >
                        R.O.M.E.T.
                    </Typography>
                    <Typography fontSize={20} fontWeight="900" sx={{ color: colors.primary[600] }} >
                        Range of Motion Exercise Tracker
                    </Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={4} p="0px 30px 20px 150px" >
            {/* Right column */}
            <LineHeader title="Today's Date:" value={todayString} />
            <LineHeader title="Total Patient Count:" value="10" />
            <LineHeader title="Patient's in their Final Week:" value="2" />
            <LineHeader title="Patient's in their Final Month:" value="4" />
        </Grid>
    </Grid>

    {/* BUTTONS */}
    <Grid container spacing={1} p="60px 180px">
        <Grid item xs={3} p="0 10px" >
            <Button
                variant="outlined"
                fullWidth
                style={{
                    backgroundColor: colors.primary[400],
                    color: colors.primary[800],
                    // border: '1px solid #000000', 
                    fontWeight:"550", fontSize:'20px', textTransform: 'none',
                    height:"65px",
                    borderRadius: "12px",
                    
                }} onClick={() => navigate('/create-patient')} >
                <ContactsOutlinedIcon sx={{  mr: '8px', }} />
                Add New Patient
            </Button>
        </Grid>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={5} p="0 10px" >
            <Button
                variant="outlined"
                fullWidth
                style={{
                    backgroundColor: colors.primary[800],
                    color: colors.primary[400],
                    // border: `3px solid ${colors.blueAccent[400]}`, 
                    fontWeight:"550", fontSize:'20px', textTransform: 'none',
                    height:"65px",
                    borderRadius: "12px",
                }} onClick={() => navigate('/all-patients')} >
                <PeopleOutlinedIcon sx={{  mr: '8px', }} />
                View All Patients
            </Button>
        </Grid>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={2} p="0 10px" >
            <Button
                variant="outlined"
                fullWidth
                style={{
                    backgroundColor: colors.primary[400],
                    color: colors.primary[800],
                    // border: '1px solid #000000',
                    fontWeight:"550", fontSize:'20px', textTransform: 'none',
                    height:"65px",
                    borderRadius: "12px",
                }} onClick={() => navigate('/calendar')} >
                <CalendarTodayOutlined sx={{  mr: '8px', }} />
                Calendar
            </Button>
        </Grid>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={2} p="0 10px">
            <Button
                variant="outlined"
                fullWidth
                style={{
                    backgroundColor: colors.primary[400],
                    color: colors.primary[800],
                    // border: '1px solid #000000',
                    fontWeight:"550", fontSize:'20px', textTransform: 'none',
                    height:"65px",
                    borderRadius: "12px",
                }} onClick={() => navigate('/manual')} >
                <NoteAltOutlined sx={{  mr: '8px', }} />
                Manual
            </Button>
        </Grid>
    </Grid>
    <div style={{ height: '20px' }}></div>
    </Box>
  );
};

export default Home;