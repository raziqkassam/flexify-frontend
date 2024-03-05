import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { exerciseInfo } from "../../data/exerciseInfoData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import Subheader from "../../components/Subheader";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { CenterFocusStrong } from "@mui/icons-material";
import React from 'react';

const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define the function to convert string to number
  const convertStringToNumber = (str) => {
    const value = str / 360;
    return value;
  };

  // Filler data for demonstration
  const schedule = [
    { id: 1, patientName: 'John Doe', appointmentTime: '2024-02-22T09:00:00' },
    { id: 2, patientName: 'Jane Smith', appointmentTime: '2024-02-22T10:00:00' },
    { id: 3, patientName: 'Alice Johnson', appointmentTime: '2024-02-22T11:00:00' },
    { id: 4, patientName: 'Bob Brown', appointmentTime: '2024-02-22T14:00:00' },
  ];

  // Get today's date
  const today = new Date();
  const todayString = today.toDateString(); // Format: Day Month Date Year

  // Generate time slots (every hour from 9 AM to 5 PM)
  const timeSlots = [];
  for (let i = 9; i <= 17; i++) {
    for (let j = 0; j < 60; j += 30) {
      timeSlots.push(`${i}:${j < 10 ? '0' + j : j}`); // Add leading zero for minutes less than 10
    }
  }

  // Filter appointments for today
  const todayAppointments = React.useMemo(() => {
    return schedule.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentTime);
      const appointmentDateString = appointmentDate.toISOString().slice(0, 10); // Extract date portion
      return appointmentDateString === today.toISOString().slice(0, 10);
    });
  }, [schedule, today]);

  // Create a map of appointments to their associated time slots
const appointmentMap = React.useMemo(() => {
  const map = {};
  todayAppointments.forEach(appointment => {
    const appointmentTime = new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!map[appointmentTime]) {
      map[appointmentTime] = []; // Initialize array if not exists
    }
    map[appointmentTime].push(appointment); // Push appointment to array
  });
  return map;
}, [todayAppointments]);


  // Get theme colors
  const primaryColor = theme.palette.primary.main;
  const borderColor = theme.palette.grey[400];

  return (
    <Box m="10px 30px auto"> {/* Added style directly */}
      {/* HEADER */}
      <Box display="flex" justifyContent="center" textAlign="center" alignContent="center" sx={{ m: "0 0 -5px 0" }}>
        <Box mt="20px">
          <Header title="ROMET (OLD) Home Page" subtitle="Landing Page for the ROMET Dashboard for Physiotherapists" />
        </Box>
      </Box>



      {/* Schedule Header */}
      <Box textAlign="left" mt={2} ml={2} mb={2}>
        <Typography variant="h4" component="h2">
          Schedule for Today:
        </Typography>
      </Box>
      
      {/* Time slots and appointments */}
      <div style={{ display: 'flex', gap: '1px', overflowX: 'auto', borderRight: `1px solid ${borderColor}`, borderTop: `1px solid ${borderColor}`, borderLeft: `1px solid ${borderColor}` }}>
        {/* Time slots */}
        <div style={{ backgroundColor: theme.palette.background.paper }}>
          {timeSlots.map(slot => (
            <div key={slot} style={{ padding: '8px', borderBottom: `1px solid ${borderColor}`, color: theme.palette.text.primary, height: '48px', borderRight: `1px solid ${borderColor}` }}>
              {slot}
            </div>
          ))}
        </div>
        
        {/*Appointments*/}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {timeSlots.map(slot => (
            <div key={slot} style={{ padding: '8px', borderBottom: `1px solid ${borderColor}`, color: theme.palette.text.primary, height: '48px' }}>
              {/* Find appointments for this time slot */}
              {todayAppointments.map(appointment => {
                const appointmentTime = new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                console.log(appointmentTime);
                if (appointmentTime === slot.slice(0, 5)) {
                  return (
                    <div key={appointment.id} style={{ marginBottom: '4px' }}>
                      <div style={{ fontWeight: 'bold' }}>{appointment.patientName}</div>
                      <div>{appointmentTime}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Empty space at the bottom */}
      <div style={{ height: '20px' }}></div>
    </Box>
  );
};

export default DashboardPage;