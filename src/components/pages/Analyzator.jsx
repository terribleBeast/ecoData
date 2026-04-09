import { Box, Paper, Typography } from "@mui/material";
import { getImages } from "../../mock_images.js";

const Image = ({ src, prediction = "No prediction" }) => {
  return (
    <Paper className="image-container" key={src}>
      <img src={src} alt={"Image"} width="100px" height="100px" />
      <Box className="image-overlay">
        <Typography className="image-title">{src}</Typography>
        <Typography className="image-prediction">{prediction}</Typography>
      </Box>
    </Paper>
  );
};

const Analyzer = () => {
  let images = getImages();

  return (
    <>
      <Typography className="page-title">Анализатор</Typography>
      <Paper className="chapter">
        <Typography className="chapter-title" style={{ textAlign: "center" }}>
          Изображения
        </Typography>
        <Box className="cards">
          {images.map((image) => (
            <Image src={image} />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default Analyzer;
