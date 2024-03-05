import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import Patient from "./scenes/patient";
import { fullPatientInfo } from "./data/patientData";
import { physiotherapistData } from "./data/physiotherapistData";

import Thanks from "./scenes/thanks";
import Planner from "./scenes/planner";
import Menubar from "./scenes/global/Menubar";
import Home from "./scenes/home";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Add something about retrieving all patient data from the backend

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '*::-webkit-scrollbar': {
              width: '1em', 
            },
            '*::-webkit-scrollbar-track': {
              '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#6ad7e1',
              outline: '4px solid #6ad7e1',
            },
          }}
        />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content" >
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Menubar setIsSidebar={setIsSidebar} />
            <div style={{ padding: '20px 20px 10px 20px' }}>
            <Routes >
              <Route path="/" element={<Home physiotherapist={physiotherapistData}/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/all-patients" element={<Contacts />} />
              <Route path="/create-patient" element={<Form />} />
              <Route path="/created-patient" element={<Thanks />} />

              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/manual" element={<FAQ />} />
              
              {fullPatientInfo.map((patient, i) => (
                <Route path={`/${patient.userName}`} element={<Patient patient={patient}/>} />
              ))}
              {fullPatientInfo.map((patient, i) => (
              <Route path={`/${patient.userName}/plan`} element={<Planner patient={patient}/>} />
              ))}
            </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
