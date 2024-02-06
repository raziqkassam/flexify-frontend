






// IGNORE THIS FILE - REAL FORM IS INDEX.JSX









import * as React from 'react';
import ReactDOM from 'react-dom';

import { useTheme, Box, Button, TextField, Select, MenuItem, InputLabel, Checkbox, 
  FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { tokens } from "../../theme";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate(); // Get the history object
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);

    // ADD SOMETHING TO DO WITH VALUES (maybe a verification thing plus create new page)
    // Handle right and left values
    // if (values.right) {
    //   if (values.left) {
    //     values.hand = 'Left';
    //   }
    //   values.hand = 'Right';
    // } else {
    //   values.hand = 'Left';
    // }

    // Create a text file with the form values
    const textContent = `Hand: ${values.firstName}`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const fileName = 'form_data.txt';

    // Create an anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    navigate('/created-user') // navigate to new page once form is submitted
  };

  return (
    <Box m="20px 80px">
      <Header title="ADD NEW PATIENT" subtitle="Create a new detailed Patient Profile" />

      <Formik
        // onSubmit={handleFormSubmit}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControlLabel
                sx={{ gridColumn: "span 1" }}
                value={values.hand}
                variant="filled"
                control={
                <Checkbox sx={{
                  color: colors.primary[100],
                  '&.Mui-checked': {
                    color: colors.blueAccent[300],
                  },
                }}
                />}
                label="Left"
                labelPlacement="bottom"
              />
              <FormControlLabel
                sx={{ gridColumn: "span 1" }}
                value={values.right}
                variant="filled"
                control={
                <Checkbox sx={{
                  color: colors.primary[100],
                  '&.Mui-checked': {
                    color: colors.blueAccent[300],
                  },
                }}
                />}
                label="Right"
                labelPlacement="bottom"
              />

            </Box>
            <Box display="flex" justifyContent="center" mt="20px" >
              <Button type="submit" color="secondary" variant="contained" >
                Create New Patient
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
    // .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  hand:"",
  contact: "",
};

export default Form;
