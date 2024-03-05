import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px"  >
      <Typography
        variant="h2"
        color={colors.greenAccent[800]}
        fontWeight="bold"
        fontSize={50}
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" fontSize={20} color={colors.greenAccent[800]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
