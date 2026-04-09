import { Box, Typography } from "@mui/material";
import FileDragAndDrop from "../DND.tsx";

const Analyzer = () => {
  return (
    <Box className="analyzer-container">
      <Box className="parent">
        <Typography className="title">Фотографии</Typography>
        <FileDragAndDrop />
      </Box>

      <Box className="parent">
        <Typography className="title">Результат</Typography>
        <Box className="child"></Box>
      </Box>
    </Box>
  );
};

export default Analyzer;
