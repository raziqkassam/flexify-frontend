import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { tokens } from "../../theme";

const Thanks = () => {
  const navigate = useNavigate(); // Get the navigate function
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="200px 80px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Header title="You have succesfuly added a new patient!" subtitle="" alignItems="center"/>
      <Box display="flex" flexDirection="column" alignItems="center" m="40px 0">
        {/* Button to navigate back to the form page */}
        <Button color="secondary" variant="contained" onClick={() => navigate("/all-patients")} 
        style={{ marginBottom: '10px', backgroundColor: colors.blueAccent[400], color: colors.blueAccent[900], boxShadow: 'none',
        width: '25em', height: '3em', fontSize:'15px', fontWeight:'bold', borderRadius: "18px",
        }}>
          View All Patients
        </Button >
        {/* Wrapper Box with margin */}
        <Box mt="10px">
          {/* Button to navigate to the "View All Patients" page */}
          <Button type="button" color="secondary" variant="contained" onClick={() => navigate("/create-patient")}
          style={{ marginBottom: '30px', backgroundColor: colors.blueAccent[800], color: colors.blueAccent[400], boxShadow: 'none',
          width: '25em', height: '3em', fontSize:'15px', fontWeight:'bold', borderRadius: "18px",
          }}>
            Add Another Patient
          </Button>
        </Box>
      </Box>
    </Box>
  );  
};

export default Thanks;
