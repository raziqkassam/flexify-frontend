import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InstructionAccordion from "../../components/InstructionAccordion";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const wristFlexionGif = "/assets/Wrist Flexion.gif"; // Path to wrist flexion GIF
  const wristExtensionGif = "/assets/Wrist Extension.gif"; // Path to wrist extension GIF
  const radialDeviationGif = "/assets/Radial Deviation.gif"; // Path to radial deviation GIF
  const ulnarDeviationGif = "/assets/Ulnar Deviation.gif"; // Path to ulnar deviation GIF

  return (
    <Box m="30px 80px 200px 80px" p="30px 0px 200px" >
      <Header title="Instructional Manual" 
      subtitle="Quick tips to help with instructing the exercise form is best for the motion tracking model" 
      sx={{margin:"0px 0 0px 0"}}/>
      />
      <InstructionAccordion
        accordion={{title: "Wrist Flexion Instructions"}}
        positioning={{
          title: "Positioning",
          description: "Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.",
          startingTitle: "Starting Position",
          starting: "Begin with your wrist in a neutral position, positioning the ulnar side (pinky side) toward the camera, ensuring it's neither flexed nor extended. Keep your fingers relaxed.",
        }} 
        exercise={{
          title: "Wrist Flexion",
          gif: wristFlexionGif,
          one: "Slowly bend your wrist forward, drawing your palm closer to your forearm.",
          two: "Hold this position for up to 3 seconds.",
          three: "Gradually bend your wrist backward, returning it to the neutral position.",
          four: "Repeat this motion as recommended by your physiotherapist.",
        }}
        rest={{ 
          title: "Rest",
          description: "After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.", 
        }}
        frequency={{
          title: "Frequency",
          description: "Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.",
        }}
        images={{
          one:    "/assets/f/f1.jpg",
          two:    "/assets/f/f2.jpg",
          three:  "/assets/f/f3.jpg",
        }}
      />
      <InstructionAccordion
        accordion={{title: "Wrist Extension Instructions"}}
        positioning={{
          title: "Positioning",
          description: "Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.",
          startingTitle: "Starting Position",
          starting: "Begin with your wrist in a neutral position, positioning the ulnar side (pinky side) toward the camera, ensuring it's neither flexed nor extended. Keep your fingers relaxed.",
        }} 
        exercise={{
          title: "Wrist Extension",
          gif: wristExtensionGif,
          one: "Slowly bend your wrist backwards, bringing the back of your hand closer to your forearm.",
          two: "Hold this position for up to 3 seconds.",
          three: "Gradually bend your wrist backward, returning it to the neutral position.",
          four: "Repeat this motion as recommended by your physiotherapist.",
        }}
        rest={{
          title: "Rest",
          description: "After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.",
        }}
        frequency={{
          title: "Frequency",
          description: "Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.",
        }}
        images={{
          one:    "/assets/e/e1.jpg",
          two:    "/assets/e/e2.jpg",
          three:  "/assets/e/e3.jpg",
        }}
      />
      <InstructionAccordion
        accordion={{title: "Ulnar Deviation Instructions"}}
        positioning={{
          title: "Positioning",
          description: "Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.",
          startingTitle: "Starting Position",
          starting: "Begin with your wrist in a neutral position, positioning the back of your hand to face the camera, ensuring it is neither deviated towards the ulnar side (pinky side) nor the radial side (thumb side). Keep your fingers relaxed.",
        }}
        exercise={{
          title: "Wrist Ulnar Deviation",
          gif: ulnarDeviationGif,
          one: "Slowly tilt your wrist towards the ulnar side, moving your hand so that the pinky side comes closer to your forearm.",
          two: "Hold this position for up to 3 seconds.",
          three: "Gradually tilt your wrist away from the ulnar side to return to the neutral position.",
          four: "Repeat this motion as recommended by your physiotherapist.",
        }}
        rest={{
          title: "Rest",
          description: "After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.",
        }}
        frequency={{
          title: "Frequency",
          description: "Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.",
        }}
        images={{
          one:    "/assets/u/u1.png",
          two:    "/assets/u/u2.jpg",
          three:  "/assets/u/u3.jpg",
        }}
      />
      <InstructionAccordion
        accordion={{title: "Radial Deviation Instructions"}}
        positioning={{
          title: "Positioning",
          description: "Sit or stand comfortably with your forearm supported on a table. Your wrist should be perpendicular to the table.",
          startingTitle: "Starting Position",
          starting: "Begin with your wrist in a neutral position, positioning the back of your hand to face the camera, ensuring it is neither deviated towards the ulnar side (pinky side) nor the radial side (thumb side). Keep your fingers relaxed.",
        }}
        exercise={{
          title: "Wrist Radial Deviation",
          gif: radialDeviationGif,
          one: "Slowly tilt your wrist towards the radial side, moving your hand so that the thumb side comes closer to your forearm.",
          two: "Hold this position for up to 3 seconds.",
          three: "Gradually tilt your wrist away from the ulnar side to return to the neutral position.",
          four: "Repeat this motion as recommended by your physiotherapist.",
        }}
        rest={{
          title: "Rest",
          description: "After completing the desired number of repetitions, allow your wrist to rest for a moment before proceeding to the next set.",
        }}
        frequency={{
          title: "Frequency",
          description: "Aim to perform these exercises 2-3 times a day initially, gradually increasing frequency as tolerated.",
        }}
        images={{
          one:    "/assets/r/r1.png",
          two:    "/assets/r/r2.jpg",
          three:  "/assets/r/r3.jpg",
        }}
      />

      <InstructionAccordion
        accordion={{title: "Patient Tracking Troubleshooting"}}
        rest={{
          title: "Issues with Tracking",
          description: (
            <>
              During the rehabilitation process, challenges may arise in environments with limited lighting or when the user is wearing long sleeves.<br/><br/>
              These conditions could potentially hinder the effectiveness of the exercises and compromise safety.<br/><br/>
              It is advisable to ensure adequate lighting and to wear clothing that allows for full range of motion during rehabilitation sessions.<br/><br/>
            </>
          ),
        }}
      />
      
    </Box>
  );
};

export default FAQ;
