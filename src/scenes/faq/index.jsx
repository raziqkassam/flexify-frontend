import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const wristFlexionGif = "/assets/Wrist Flexion.gif"; // Path to wrist flexion GIF
  const wristExtensionGif = "/assets/Wrist Extension.gif"; // Path to wrist extension GIF
  const radialDeviationGif = "/assets/Radial Deviation.gif"; // Path to radial deviation GIF
  const ulnarDeviationGif = "/assets/Ulnar Deviation.gif"; // Path to ulnar deviation GIF

  return (
    <Box m="20px">
      <Header title="Instructional Manual" subtitle="Instructional Page" />
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.primary[600]} variant="h2">
            Wrist Flexion Instructions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* <h3>Wrist Flexion Instructions</h3>
            <p> */}
              <h2>Positioning</h2>
              <Typography variant="h5">
                Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.
              </Typography>
              <h2>Starting Position</h2>
              <Typography variant="h5">
                Begin with your wrist in a neutral position, neither flexed nor extended. Your fingers should be relaxed.
              </Typography>
              <h2>Wrist Flexion Exercise</h2>
              <Typography variant="h5">
                <img src={wristFlexionGif} alt="Wrist Flexion Exercise" style={{ maxWidth: "10%", height: "auto" }}/>
              </Typography>
              <Typography variant="h5">
              <li>Slowly bend your wrist forward, bringing your palm closer to your forearm.</li>
              <li>Hold the position for 5-10 seconds, feeling a gentle stretch in your wrist and forearm muscles.</li>
              <li>Make sure to keep the movement slow and controlled, avoiding any sudden jerks.</li>
              <li>Repeat this motion for 10-15 repetitions, or as recommended by your healthcare provider or physical therapist.</li>                
              </Typography>
              <h2>Rest Period</h2>
              <Typography variant="h5">
                After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.
              </Typography>
              <h2>Frequency</h2>
              <Typography variant="h5">
                Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.
              </Typography>
            {/* </p> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.primary[600]} variant="h2">
            Wrist Extension Instructions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* <h3>Wrist Extension Instructions</h3>
            <p> */}
              <h2>Positioning</h2>
              <Typography variant="h5">
                Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.
              </Typography>
              <h2>Starting Position</h2>
              <Typography variant="h5">
                Begin with your wrist in a neutral position, neither flexed nor extended. Your fingers should be relaxed.
              </Typography>
              <h2>Wrist Extension Exercise</h2>
              <Typography variant="h5">
                <img src={wristExtensionGif} alt="Wrist Extension Exercise" style={{ maxWidth: "10%", height: "auto" }}/>
              </Typography>
              <Typography variant="h5">
              <li>Slowly bend your wrist backward, bringing the back of your hand closer to your forearm.</li>
              <li>Hold the position for 5-10 seconds, feeling a gentle stretch in your wrist and forearm muscles.</li>
              <li>Make sure to keep the movement slow and controlled, avoiding any sudden jerks.</li>
              <li>Repeat this motion for 10-15 repetitions, or as recommended by your healthcare provider or physical therapist.</li>                
              </Typography>
              <h2>Rest Period</h2>
              <Typography variant="h5">
                After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.
              </Typography>
              <h2>Frequency</h2>
              <Typography variant="h5">
                Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.
              </Typography>
            {/* </p> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.primary[600]} variant="h2">
            Wrist Radial Deviation Instructions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            {/* <h3>Wrist Radial Deviation Instructions</h3>
            <p> */}
              <h2>Positioning</h2>
              <Typography variant="h5">
                Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.
              </Typography>
              <h2>Starting Position</h2>
              <Typography variant="h5">
                Begin with your wrist in a neutral position, neither deviated towards the ulnar side (pinky side) nor the radial side (thumb side). Keep your fingers relaxed.
              </Typography>
              <h2> Wrist Radial Deviation Exercise</h2>
              <Typography variant="h5">
                <img src={radialDeviationGif} alt="Radial Deviation Exercise" style={{ maxWidth: "10%", height: "auto" }}/>
              </Typography>
              <Typography variant="h5">
              <li>Slowly tilt your wrist towards the radial side, moving your hand so that your thumb side moves closer to your forearm.</li>
              <li>Hold this position for 5-10 seconds, feeling a gentle stretch on the radial side of your wrist and forearm.</li>
              <li>Make sure to keep the movement slow and controlled, avoiding any sudden jerks.</li>
              <li>Repeat this motion for 10-15 repetitions, or as recommended by your healthcare provider or physical therapist.</li>                
              </Typography>
              <h2>Rest Period</h2>
              <Typography variant="h5">
                After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.
              </Typography>
              <h2>Frequency</h2>
              <Typography variant="h5">
                Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.
              </Typography>
            {/* </p> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.primary[600]} variant="h2">
            Wrist Ulnar Deviation Instructions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            {/* <h3>Wrist Ulnar Deviation Instructions</h3>
            <p> */}
              <h2>Positioning</h2>
              <Typography variant="h5">
                Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.
              </Typography>
              <h2>Starting Position</h2>
              <Typography variant="h5">
                Begin with your wrist in a neutral position, neither deviated towards the ulnar side (pinky side) nor the radial side (thumb side). Keep your fingers relaxed.
              </Typography>
              <h2> Wrist Ulnar Deviation Exercise</h2>
              <Typography variant="h5">
                <img src={ulnarDeviationGif} alt="Ulnar Deviation Exercise" style={{ maxWidth: "10%", height: "auto" }}/>
              </Typography>
              <Typography variant="h5">
              <li>Slowly tilt your wrist towards the ulnar side, moving your hand so that your pinky side moves closer to your forearm.</li>
              <li>Hold this position for 5-10 seconds, feeling a gentle stretch on the ulnar side of your wrist and forearm.</li>
              <li>Make sure to keep the movement slow and controlled, avoiding any sudden jerks.</li>
              <li>Repeat this motion for 10-15 repetitions, or as recommended by your healthcare provider or physical therapist.</li>                
              </Typography>
              <h2>Rest Period</h2>
              <Typography variant="h5">
                After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.
              </Typography>
              <h2>Frequency</h2>
              <Typography variant="h5">
                Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.
              </Typography>
            {/* </p> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.primary[600]} variant="h2">
            Patients Troubleshooting
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <h2>Issues with Tracking</h2>
              <Typography variant="h5">
              During the rehabilitation process, challenges may arise in environments with limited lighting or when the user is wearing long sleeves. These conditions could potentially hinder the effectiveness of the exercises and compromise safety. 
              It is advisable to ensure adequate lighting and to wear clothing that allows for full range of motion during rehabilitation sessions.
              </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
