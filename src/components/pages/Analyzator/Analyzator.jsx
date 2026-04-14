import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { getPrediction } from "../../../api/api.js";
import { getMockImages, getPredictions } from "../../../mock_images.js";
import FileDragAndDrop from "./DND";
import { ImageCard, ImageFullInfo, imageStatus } from "./Image.jsx";

const ImagesContainer = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
}) => (
  <Box
    className="cards-container"
    style={{
      maxHeight: "900px",
      overflowY: "scroll",
    }}
  >
    {images.map((image) => (
      <ImageCard
        onOpen={(image) => handleOpenImageFullInfo(image)}
        onDelete={handleDeleteImage}
        image={image}
      />
    ))}
  </Box>
);

const Analyzator = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(getMockImages(imageStatus.LOADING));

  const handleAddImages = (newImages) => {
    setImages((images) => [...newImages, ...images]);
  };

  const handleDeleteImage = (image) => {
    setImages(images.filter((tmp_image) => tmp_image.key !== image.key));
  };

  const handleOpenImageFullInfo = (image) => {
    setSelectedImage(image);
  };
  const handleDownloadResult = () => {
    // TODO: Implement download logic here
  };

  const handleProcessImages = async (images) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].status === imageStatus.UPLOADED)
        images[i].status = imageStatus.PROCESSED;
      images[i].predictions = await getPrediction(images[i]).then(
        (data) => data,
      );
      console.log(images[i].predictions);

      setImages([...images]);
    }

    return images;
  };

  return (
    <>
      <Dialog
        open={selectedImage !== null}
        onClose={() => {
          setSelectedImage(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedImage !== null && <ImageFullInfo image={selectedImage} />}
      </Dialog>
      <Typography className="page-title">Анализатор</Typography>

      <Paper elevation={3} className="chapter">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className="chapter-title">Изображения</Typography>
          <Box style={{ display: "flex", gap: "1rem" }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => setIsOpenFileMenu(!isOpenFileMenu)}
            >
              <Typography>{isOpenFileMenu ? "Закрыть" : "Добавить"}</Typography>
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleProcessImages(images)}
            >
              <Typography>Обработать</Typography>
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleDownloadResult}
            >
              <Typography>Выгрузить</Typography>
            </Button>
          </Box>
        </Box>
        {isOpenFileMenu && (
          <FileDragAndDrop
            updateImages={handleAddImages}
            defaultState={imageStatus.LOADING}
          />
        )}
        <ImagesContainer
          images={images}
          onOpen={handleOpenImageFullInfo}
          onDelete={handleDeleteImage}
        />
      </Paper>
    </>
  );
};

export default Analyzator;
