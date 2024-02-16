import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";


const Thanks = () => {

  return (
    <Box m="20px 80px">
      <Header title="Thanks for Adding a Patient" subtitle="You have created a new Patient Profile" />
    </Box>
  );
};

export default Thanks;
