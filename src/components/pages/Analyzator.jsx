import { Box, Button, Paper, Typography } from "@mui/material";
import { getImages } from "../../mock_images.js";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import FileDragAndDrop from "../DND";

interface ImageProps {
  src: string;
  key: number;
  prediction: string;
  status: 'pending' | 'processing' | 'processed' | 'error';
};

const handleProcessImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    images[i].status = 'processing';
  }

  setTimeout(() => {
    for (let i = 0; i < images.length; i++) {
      images[i].status = 'processed';
    }
    // setImages([...images]);
  }, 10);
  return images;
};

const Analyzator = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);

  const [images: ImageProps[], setImages] = useState(() => {
    var images = [];
    for (let i = 0; i < 5; i++) {
      getImages().forEach((image) => {
        images.push({
          src: image,
          key: image + i.toString(),
          prediction: "No prediction",
          status: 'pending',
        });
      });
    }
    return images;
  });

  const ImageComponent = ({image}) => {
    let borderStyle = "0 0 4px";
    switch (image.status) {
      case "pending":
        borderStyle = borderStyle.concat(' gray');
        break;
      case "processing":
        borderStyle = borderStyle.concat(' blue');
        break;
      case "processed":
        borderStyle = borderStyle.concat(' green');
        break;
      case "error":
        borderStyle = borderStyle.concat(' red');
        break;
    }
    return (
      <Paper key={image.key}
        style={{
          padding: "0.5rem",
          width: "120px",
          boxShadow: borderStyle
        }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.src}
            alt={"Image"}
            width="100px"
            height="100px"
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          ></img>
        </Box>
        <Box className="image-overlay">
          <Typography
            className="image-title"
            style={{ overflowWrap: "break-word" }}
          >
            {image.src.split('/')[1]}
          </Typography>
          <Typography className="image-prediction">{image.prediction}</Typography>
        </Box>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Delete
            style={{
              color: "red",
              fontSize: "medium",
              cursor: "pointer",
            }}
            onClick={() =>
              setImages(images.filter((tmp_image) => tmp_image.key !== image.key))
            }
          />
        </Box>
      </Paper>
    );
  };
  return (
    <>
      <Typography className="page-title">Анализатор</Typography>

      <Paper className="chapter">
        <Typography className="chapter-title" style={{ textAlign: "center" }}>
          Изображения
          <Box>
            <Button onClick={() => setIsOpenFileMenu(!isOpenFileMenu)}>
              <Typography>{isOpenFileMenu ? "Закрыть" : "Добавить"}</Typography>
            </Button>
            <Button onClick={() =>

              setImages([...handleProcessImages(images)])
            }>
              <Typography>Обработать</Typography>
            </Button>
          </Box>
        </Typography>
        {isOpenFileMenu && <FileDragAndDrop style={{ zIndex: "1rem" }} />}

        <Box
          className="cards-container"
          style={{
            maxHeight: "900px",
            overflowY: "scroll",
          }}
        >
          {images.map((image) => (
            <ImageComponent image={image}/>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default Analyzator;
