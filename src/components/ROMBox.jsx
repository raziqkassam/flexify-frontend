import React, { useState } from 'react';
import { Box, Typography, useTheme, Grid,  } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const ROMBox = ({ exerciseName, targetAngle, maxAngle, increase, timePeriod }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container p="20px">
      <Grid item xs={6} >
        {/* Content of the first column of the first row */}
        <Typography fontSize={35} fontWeight="700" ml={"10px"}
          sx={{ color: colors.blueAccent[900] }} >
          {exerciseName}
        </Typography>
      </Grid>
      <Grid item xs={6} >
        {/* Content of the second column of the first row */}
        <Box ml={"40px"} display="flex" justifyContent="space-between">
          <ProgressCircle progress={(maxAngle/targetAngle)} size="60" /> {/*}.toFixed(3)*/}
        </Box>
      </Grid>
      <Grid item xs={6} >
        {/* Parent Grid item that spans the same width as the first column of the first row */}
        <Grid container ml="40px" >
          {/* Child Grid container with two columns */}
          <Grid item xs={6} width={"40px"}>
            {/* Content of the first column of the second row */}
            <Box display="flex" justifyContent="space-between" >
              <Typography fontSize={20} fontWeight="700"
                sx={{ color: colors.primary[900] }} >
                Target<br/>RoM: 
              </Typography>
              <Typography fontSize={40} fontWeight="700" m="0px 40px 5px 10px"
                sx={{ color: colors.greenAccent[600] }} >
                {targetAngle}°
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
          <Box display="flex" justifyContent="space-between">
              <Typography fontSize={20} fontWeight="700"
                sx={{ color: colors.primary[900] }} >
                Peak<br/>RoM: 
              </Typography>
              <Typography fontSize={40} fontWeight="700" m="0px 40px 5px 10px"
                sx={{ color: colors.blueAccent[600] }} >
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
          <Typography fontSize={25} fontWeight="700"  mt="5px" fontStyle={"italic"} textAlign="center"
            sx={{ color: colors.blueAccent[700] }} >
            {((maxAngle/targetAngle)*100).toFixed(1)}%
          </Typography>
          <Typography fontSize={15} fontWeight="700"  mt="-4px" fontStyle={"italic"} textAlign="center"
            sx={{ color: colors.blueAccent[700] }} >
            of ROM Goal
          </Typography>
        </Box>
        {increase >= 0 ? (
          <Box mt="-40px">
            <ArrowUpwardIcon style={{ fontSize: "30px", fill: colors.primary[500] }} />
            <Typography fontSize={15} fontWeight="600" mt="5px"
              sx={{ color: colors.primary[500] }} >
              Patient had a <b>{increase}%</b> increase <br/> in ROM over {timePeriod}
            </Typography>
          </Box>
          ) : (
            <Box mt="-40px">
            <ArrowDownwardIcon style={{ fontSize: "30px", fill: colors.redAccent[500] }} />
            <Typography fontSize={15} fontWeight="600" mt="5px"
              sx={{ color: colors.redAccent[500] }} >
              Patient had a <b>{Math.abs(increase)}%</b> decrease <br/> in ROM over {timePeriod}
            </Typography>
          </Box>
          )}
      </Box>
    </Grid>

    
    
    <Box style={{ position: 'relative', }}
    >
      <IconButton onClick={handleOpen} style={{ color: colors.primary[300], position: 'absolute', top:'-70px', right:'-10px' }} >
      <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent >
        <img src={`assets/${exerciseName}.gif`} alt="description" style={{ width: '500px', height: '500px', borderRadius:'12px' }} />
        </DialogContent>
      </Dialog>
    </Box>

    </Grid>
    
  );
};

export default ROMBox;
