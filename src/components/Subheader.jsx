import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ForkLeft } from "@mui/icons-material";

const Subheader = ({ title, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="0px">
      <Typography
        variant="h5"
        color={colors.blueAccent[100]}
        fontWeight="bold"
        fontSize={30}
        textAlign={"center"}
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.blueAccent[300]}
        fontWeight="500"
        fontSize={18}
        textAlign={"center"}
        sx={{ m: "0 0 5px 0" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default Subheader;
