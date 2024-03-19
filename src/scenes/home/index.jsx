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
  const todayString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' });
  
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  useEffect(() => {
    if (el && el.current) {
      const typed = new Typed(el.current, {
        strings: [`<span >${todayString}</span>`],
        typeSpeed: 50,
      });

      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }
  }, []);

  return (
    
    <>
    <Box
    style={{ 
        width: '99vw', height: '90vh', 
        backgroundImage: `url("/assets/bg1.png")`, 
        backgroundSize: '110% 110%', backgroundPosition: 'center' 
    }} >
        <Box   > 
        <div style={{ height: '15vh' }}></div>
                
        <Grid container p="0 40px">
            <Grid item xs={7} p="0px 50px 20px 100px" 
            sx={{ color: colors.greenAccent[700], fontSize: '15px', textAlign: 'left', m: "0 0 0px 0",
            display: 'flex', flexDirection:'column',  
            }}>
                {/* Left column */}
                
                
                <Typography sx={{ color: colors.primary[900], margin:"0px 0 0px 0",
                    fontSize:'50px', fontWeight:'800', color: colors.blueAccent[900],
                    textStroke: '10px #ffffff',
                }} >
                    Rehabilitation Tracking.
                </Typography>
                <Typography sx={{ color: colors.primary[900], margin:"-30px 0 0px 0",
                    fontSize:'100px', fontWeight:'800', color: colors.blueAccent[400],
                    textStroke: '10px #ffffff',
                }} >
                    Redesigned.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'left',
                            color:colors.blueAccent[900], backgroundColor: colors.grey[100],
                            margin:"50px 0 0px -300px", padding:"20px", borderRadius:"35px",
                        }}
                    >
                        <Typography fontSize={45} fontWeight="900" sx={{ color: colors.blueAccent[900], margin:"50px 0 0px 300px" }} >
                            Welcome to R.O.M.E.T.
                        </Typography>
                        <Typography fontSize={30} fontWeight="900" sx={{ color: colors.blueAccent[900], margin:"-5px 0 40px 300px" }} >
                            Range of Motion Exercise Tracker
                        </Typography>
                    </Box>
            </Grid>
            
            <Grid item xs={5} p="0px 0px 0px 0px" 
            sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', }}>
                {/* Right column */}
                <img src="/assets/logo_color.png" alt="logo" style={{ height: '250px', margin:'-70px 0px 50px 0px' }} />
                
                <Box sx={{ color: colors.blueAccent[900], fontSize: '30px', textAlign: 'left', margin: "30px 0 30px 0",
                        fontWeight: '700', 
                }}>
                    <span ref={el} />
                </Box>
                <Button variant="outlined" 
                    style={{ backgroundColor: colors.blueAccent[800], color: colors.blueAccent[400],
                        fontWeight:"550", fontSize:'20px', textTransform: 'none',
                        height:"50px", borderRadius: "15px", padding: "0 50px"
                    }} onClick={() => navigate('/all-patients')} >
                    <PeopleOutlinedIcon sx={{  mr: '8px', }} />
                    View All Patients
                </Button>
                <Button variant="outlined" 
                    style={{ backgroundColor: colors.blueAccent[400], color: colors.blueAccent[800],
                        fontWeight:"550", fontSize:'20px', textTransform: 'none',
                        height:"50px", borderRadius: "15px", padding: "0 50px", margin:"10px"
                    }} onClick={() => navigate('/create-patient')} >
                    <ContactsOutlinedIcon sx={{  mr: '8px', }} />
                    Add New Patient
                </Button>
                
            </Grid>
        </Grid>

        
        <div style={{ height: '20px' }}></div>
        </Box>
    </Box>
    <Box style={{ width: '100vw', height: '100px', backgroundColor: '#6ad7e1' }} />
    <Box
    style={{ 
        width: '99vw', height: '90vh', 
        backgroundImage: `url("/assets/bg1.png")`, 
        backgroundSize: '110% 110%', backgroundPosition: 'center' 
    }} >
        
    </Box>
    </>
  );
};

export default Home;