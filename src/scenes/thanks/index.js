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

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate('/created-user')
  };

  return (
    <Box m="20px 80px">
      <Header title="Thanks for Adding a Patient" subtitle="You have created a new Patient Profile" />
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Button to navigate back to the form page */}
        <Button color="secondary" variant="contained" onClick={() => navigate("/create-user")} style={{ marginBottom: '10px', backgroundColor: colors.primary[400], color: '#ffffff'}}>
          Add Another Patient
        </Button >
        {/* Wrapper Box with margin */}
        <Box mt="10px">
          {/* Button to navigate to the "View All Patients" page */}
          <Button color="secondary" variant="contained" onClick={() => navigate("/all-patients")}style={{ marginBottom: '10px', backgroundColor: colors.primary[400], color: '#ffffff'}}>
            View All Patients
          </Button>
        </Box>
      </Box>
    </Box>
  );  
};

export default Thanks;
