import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { fullPatientInfo } from "../../data/patientData";
import { useState } from 'react';
import ProgressCircle from "../../components/ProgressCircle";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCell, setSelectedCell] = useState(null);

  const patientDataColumns = [
    {
      field: "progress",
      headerName: "Progress",
      headerAlign: "center",
      
      flex: 0.5,
      cellClassName: "name-column--cell",
      fontWeight: "heavy",
      align: "center",
      renderCell: (params) => {
        const progress = params.value / params.row.injuryTime;
        return <ProgressCircle progress={progress} size="30"/>
      },
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      fontWeight: "heavy",
      
      renderCell: (params) => (
        <a href={`/${params.value}`} rel="noopener noreferrer"
        style={{ 
          color: colors.blueAccent[600], 
          textDecoration: 'none', 
          fontWeight: 'bold', // Add this line
          fontSize: "20px",
        }}>
          {params.value}
        </a>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '20px' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '20px' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ fontSize: '20px' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "dateOfBirth",
      headerName: "Age / DOB",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "center",
      renderCell: (params) => {
        const dob = new Date(params.value);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms); 

        const age = Math.abs(age_dt.getUTCFullYear() - 1970);

        return (
          <div style={{ fontSize: '20px' }}
            onClick={() => setSelectedCell(selectedCell === params.id ? null : params.id)}
          >
            {selectedCell === params.id ? params.value : age}
          </div>
        );
      },
    },
    
    {
      field: "hand",
      headerName: "Hand",
      flex: 0.5,
      renderCell: (params) => (
        <div style={{ fontSize: '20px' }}>
          {params.value}
        </div>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="PATIENT LIST"
        subtitle="Complete list of all your active patients"
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
          rows={fullPatientInfo}
          columns={patientDataColumns}
          components={{ Toolbar: GridToolbar }}
          // checkboxSelection
        />
      </Box>
    </Box>
  );

};



export default Contacts;
