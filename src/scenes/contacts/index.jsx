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
      flex: 0.5,
      cellClassName: "name-column--cell",
      fontWeight: "heavy",
      align: "center",
      renderCell: (params) => (
        <ProgressCircle progress={params.value} size="30"/>
      ),
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
      fontWeight: "heavy",
      // align: "center",
      renderCell: (params) => (
        <a href={`/${params.value}`} rel="noopener noreferrer"
        style={{ 
          color: '#fdf222', 
          textDecoration: 'none', 
          fontWeight: 'bold' // Add this line
        }}>
          {params.value}
        </a>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "dateOfBirth",
      headerName: "Age",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const dob = new Date(params.value);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms); 

        const age = Math.abs(age_dt.getUTCFullYear() - 1970);

        return (
          <div 
            onClick={() => setSelectedCell(selectedCell === params.id ? null : params.id)}
          >
            {selectedCell === params.id ? params.value : age}
          </div>
        );
      },
    },
    
    {
      field: "hand",
      headerName: "Injured Hand",
      flex: 0.5
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="PATIENT LIST"
        subtitle="Complete list of all your active patients"
      />
      <Box
        m="40px 0 0 10px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
        />
      </Box>
    </Box>
  );
};

export default Contacts;
