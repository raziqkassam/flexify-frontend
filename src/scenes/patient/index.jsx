import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { exerciseInfo } from "../../data/exerciseInfoData";
import { patientInfo } from "../../data/patientData";
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

const convertStringToNumber = (str) => {
  const value = str/360
  return value
};

const Patient = ({patient}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px 30px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: "0 0 -5px 0" }}>
        <Box marginLeft="10px">
          <Header title={patient.name} subtitle="Overview of John Doe's Rehab Progress" />
        </Box>
        <Box mb="10px" justifyItems={"right"}>
          <Subheader title="Start Date: " value={patient.start}/>
          <Subheader title="End Date: " value={patient.end}/>
          <Subheader title="Injury: " value={patient.injury}/>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        margin="20px 0 0 0"
        
      >
        {/* ROW 1 */}
        {exerciseInfo.map((exercise, i) => (
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
          
        >
          <StatBox
            title={exercise.title}
            subtitle={exercise.subtitle}
            progress={exercise.progress}
            increase={exercise.increase}
          />
        </Box>
        ))}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius={5}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Weekly Improvement
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Total Rehabilitation Exercise Progress
              </Typography>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        

        {/* ROW 3 */}
        {exerciseInfo.map((exercise, i) => (
        <Box
          gridColumn="span 3"
          // gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={5}
        >
          <Typography variant="h6" fontWeight="200" textAlign={"center"}>
            Maximum Angle
          </Typography>
          <Typography variant="h3" fontWeight="600" textAlign={"center"}>
            {exercise.title}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            // mt="25px"
          >
            {/* <ProgressCircle progress="0.2" size="80"/> */}
            <Typography
              variant="h2"
              color={colors.greenAccent[500]}
              sx={{ mt: "5px" }}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              {exercise.maxangle}˚
            </Typography>
          </Box>
        </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Patient;
