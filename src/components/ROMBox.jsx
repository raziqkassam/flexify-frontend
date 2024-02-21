import { Box, Typography, useTheme, Grid,  } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";


const ROMBox = ({ exerciseName, targetAngle, maxAngle, increase, timePeriod }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  return (
    <Grid container p="20px">
      <Grid item xs={6} >
        {/* Content of the first column of the first row */}
        <Typography fontSize={30} fontWeight="700"
          sx={{ color: colors.grey[100] }} >
          {exerciseName}
        </Typography>
      </Grid>
      <Grid item xs={6} >
        {/* Content of the second column of the first row */}
        <Box ml={"30px"} display="flex" justifyContent="space-between">
          <ProgressCircle progress={(maxAngle/targetAngle)} size="60" />
        </Box>
      </Grid>
      <Grid item xs={6} >
        {/* Parent Grid item that spans the same width as the first column of the first row */}
        <Grid container ml="40px" >
          {/* Child Grid container with two columns */}
          <Grid item xs={6} width={"40px"}>
            {/* Content of the first column of the second row */}
            <Box display="flex" justifyContent="space-between" >
              <Typography fontSize={13} fontWeight="700"
                sx={{ color: colors.grey[100] }} >
                Target<br/>ROM: 
              </Typography>
              <Typography fontSize={30} fontWeight="700" m="-5px 40px 5px 0"
                sx={{ color: colors.greenAccent[200] }} >
                {targetAngle}°
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
          <Box display="flex" justifyContent="space-between">
              <Typography fontSize={13} fontWeight="700"
                sx={{ color: colors.grey[100] }} >
                Peak<br/>ROM: 
              </Typography>
              <Typography fontSize={30} fontWeight="700" m="-5px 40px 0px 0"
                sx={{ color: colors.greenAccent[400] }} >
                {maxAngle}°
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
      {/* Content of the third column of the second row */}
      <Box display="flex" textAlign="center" justifyContent="space-between" ml={"30px"}>
        <Box display="flex" flexDirection="column">
          <Typography fontSize={20} fontWeight="700"  mt="5px" fontStyle={"italic"} textAlign="center"
            sx={{ color: colors.greenAccent[400] }} >
            {((maxAngle/targetAngle)*100).toFixed(1)}%
          </Typography>
          <Typography fontSize={12} fontWeight="700"  mt="-4px" fontStyle={"italic"} textAlign="center"
            sx={{ color: colors.greenAccent[100] }} >
            of ROM Goal
          </Typography>
        </Box>
        {increase > 0 ? (
          <Box mt="-40px">
            <ArrowUpwardIcon style={{ size: "80px", fill: colors.greenAccent[500] }} />
            <Typography fontSize={12} fontWeight="400" mt="5px"
              sx={{ color: colors.primary[100] }} >
              Patient had a <b>{increase}%</b> increase <br/> in ROM over {timePeriod}
            </Typography>
          </Box>
          ) : (
            <Box mt="-40px">
            <ArrowDownwardIcon style={{ size: "80px", fill: colors.redAccent[400] }} />
            <Typography fontSize={12} fontWeight="400" mt="5px"
              sx={{ color: colors.primary[100] }} >
              Patient had a <b>{increase.substring(1)}%</b> decrease <br/> in ROM over {timePeriod}
            </Typography>
          </Box>
          )}
      </Box>
    </Grid>
    </Grid>
  );
};

export default ROMBox;
