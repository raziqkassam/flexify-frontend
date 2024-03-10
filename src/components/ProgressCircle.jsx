import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress, size }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.grey[100]} 45%, transparent 0%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary[200]} ${angle}deg 360deg),
            ${colors.blueAccent[600]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
