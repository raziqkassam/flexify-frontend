import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ForkLeft } from "@mui/icons-material";

const LineHeader = ({ title, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="0px" style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Typography
        variant="h5"
        color={colors.greenAccent[900]}
        fontWeight="bold"
        fontSize={18}
        textAlign={"left"}
        sx={{ m: "0 20px 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[800]}
        fontWeight="bold"
        fontSize={18}
        textAlign={"left"}
        sx={{ m: "0 0 5px 0" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default LineHeader;
