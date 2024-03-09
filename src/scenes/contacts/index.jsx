import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from 'react';
import ProgressCircle from "../../components/ProgressCircle";
import { fullPatientInfo } from "../../data/patientData";

import 'isomorphic-fetch';
import 'es6-promise';


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCell, setSelectedCell] = useState(null);

  const [users, setUsers] = useState([]);
  const [patientDataRows, setPatientDataRows] = useState([]);
  useEffect(() => {
    fetch('https://flexifybackend.vercel.app/get-all-patients/')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        const rows = data.results.map((user, index) => {

          // Calculate fraction of patient rehab progress based on start date and injury time
          const startDate = new Date(user.rehabStart);
          const endDate = new Date(startDate.getTime());
          endDate.setDate(startDate.getDate() + user.injuryTime * 7);
          const now = new Date();
          const elapsedTime = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
          const totalTime = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
          const fraction = elapsedTime / totalTime; // set fraction as new parameter in data
        
          return {
            id: index,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            hand: user.hand,
            injuryTime: user.injuryTime,
            rehabStart: user.rehabStart,
            fraction: fraction,
          };
        });
        console.log(rows)
        setPatientDataRows(rows);
      });
  }, []);
  console.log(users.results)

  const patientDataColumns = [
    {
      field: "fraction",
      headerName: "Progress",
      headerAlign: "center",
      
      flex: 1,
      fontWeight: "heavy",
      align: "center",
      renderCell: (params) => {
        return <ProgressCircle progress={params.value} size="30"/>
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
          fontWeight: 'bold',
          fontSize: "20px",
        }}
        onMouseOver={(e) => e.currentTarget.style.color = colors.primary[700]} 
        onMouseOut={(e) => e.currentTarget.style.color = colors.blueAccent[600]}
        >
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
        <a href={`mailto:${params.value}`} 
          style={{ fontSize: '20px', color:colors.blueAccent[600],  }}
          onMouseOver={(e) => e.currentTarget.style.color = colors.primary[700]} 
          onMouseOut={(e) => e.currentTarget.style.color = colors.blueAccent[600]}
        >
          {params.value}
        </a>
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
        const formatDob = `${dob.toLocaleString('default', { month: 'short' })} ${dob.getDate()}, ${dob.getFullYear()}`;

        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms); 

        const age = Math.abs(age_dt.getUTCFullYear() - 1970);

        return (
          <div style={{ fontSize: selectedCell === params.id ? '16px' : '20px'  }}
            onClick={() => setSelectedCell(selectedCell === params.id ? null : params.id)}
          >
            {selectedCell === params.id ? formatDob : age}
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
    <Box m="40px 60px">
      <Header 
          title={"Patient List"} 
          subtitle={
              <>
                  <br />Full list of all active patients currently completing their rehabilitation.
                  <br /><b>Click on the patient's username to view their exercise summary and set their exercise plan</b>
                  <br />
              </>
          } 
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
          rows={patientDataRows}
          columns={patientDataColumns}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick
          sortModel={[ { field: 'fraction', sort: 'desc', }, ]}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#bfeef2', 
            },
          }}
          // onRowClick={(params) => navigate(`/${params.row.userName}`)} 
        />
      </Box>
    </Box>
  );

};



export default Contacts;
