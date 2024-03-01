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

const convertStringToNumber = (str) => {
  const value = str/360
  return value
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px 30px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" textAlign="center" alignContent="center" sx={{ m: "0 0 -5px 0" }}>
        <Box mt="200px">
          <Header title="ROMET Home Page" subtitle="Landing Page for the ROMET Dashboard for Physiotherapists" />
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
        
      </Box>
    </Box>
  );
};

export default Dashboard;
