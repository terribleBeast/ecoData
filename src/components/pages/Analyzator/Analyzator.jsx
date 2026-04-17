import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useState, useCallback } from "react";
import { getPrediction } from "../../../api/api.js";
import { getMockImages, getMockPrediction } from "../../../mock_data.js";
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
      overflowY: "auto",
    }}
  >
    {images.map((image, index) => (
      <ImageCard
        onOpen={(image) => handleOpenImageFullInfo(image)}
        onDelete={handleDeleteImage}
        image={image}
        key={index}
      />
    ))}
  </Box>
);

const ClassifiersMenu = ({ selectedClassifier, setSelectedClassifier }) => {
  const classifiers = ["Яблоня", "Вишня", "Береза", "Дуб"];
  const handleClassifierChange = useCallback(
    (item) => {
      setSelectedClassifier(item);
    },
    [setSelectedClassifier],
  );
  return (
    <Paper
      elevation={2}
      className="chapter"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography className="chapter-title" style={{ fontSize: "32px" }}>
        Классификаторы
      </Typography>
      <FormGroup
        style={{ maxHeight: "200px", overflowY: "auto", padding: "1rem" }}
        row={true}
      >
        {classifiers.map((item, index) => (
          <FormControlLabel
            control={
              <Checkbox
                key={index}
                checked={item === selectedClassifier}
                onChange={() => handleClassifierChange(item)}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};

function getAllPrediction(images) {
  // TODO: implement function creating csv file
}

const Analyzator = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(getMockImages(imageStatus.LOADING, 50));
  const [selectedClassifier, setSelectedClassifier] = useState("Вишня");

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
      images[i].predictions = await getMockPrediction(images[i]).then(
        (data) => data,
      );

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
          <Box style={{ display: "flex" }}>
            <Box style={{ width: "80%" }}>
              <FileDragAndDrop
                updateImages={handleAddImages}
                defaultState={imageStatus.LOADING}
                selectedClassifier={selectedClassifier}
              />
            </Box>
            <Box style={{ display: "flex", width: "20%" }}>
              <ClassifiersMenu
                selectedClassifier={selectedClassifier}
                setSelectedClassifier={setSelectedClassifier}
              />
            </Box>
          </Box>
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
