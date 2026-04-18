import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useState, useCallback } from "react";
import { getPrediction } from "../../../api/api.js";
import { getMockImages, getMockPrediction } from "../../../mock_data.js";
import FileDragAndDrop from "./DND";
import { ImageCard, ImageFullInfo, imageStatus } from "./Image.jsx";
import {
  ChapterContentTemplate,
  ChapterHeaderTemplate,
} from "../../ChapterTemplate.jsx";
import { classifiers } from "../../../entities.js";

const DropDownGenusMenu = ({ handleSelectClassifier }) => {
  return (
    <FormControl style={{ minWidth: "15%" }}>
      <InputLabel>Род растения</InputLabel>
      <Select>
        {classifiers.map((item, index) => (
          <MenuItem
            key={index}
            value={item.plant}
            onClick={() => handleSelectClassifier(index)}
          >
            {item.plant}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

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

const ClassifiersMenu = ({ handleSelectClassifier }) => {
  return (
    <Paper
      className="chapter"
      style={{
        width: "100%",
        display: "flex",
        // justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography className="chapter-title" style={{ fontSize: "32px" }}>
        Род
      </Typography>
      <DropDownGenusMenu handleSelectClassifier={handleSelectClassifier} />
    </Paper>
  );
};

function getAllPrediction(images) {
  // TODO: implement function creating csv file
}

const ClassifiersChapter = () => {
  const chaptersInfo = [
    {
      title:
        "Выберите род растения, чтобы увидеть сорта, по которым будет производиться классификация",
      fields: [],
    },
  ];
  const [selectedGenus, setSelectedGenus] = useState([chaptersInfo[0]]);
  for (let i = 0; i < classifiers.length; i++) {
    chaptersInfo.push({
      title: classifiers[i].plant,
      fields: [
        {
          name: "Сорта",
          value: classifiers[i].varieties.join(", "),
        },
      ],
    });
  }

  return (
    <Paper className="chapter">
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <ChapterHeaderTemplate chapterTitle={"Роды и сорта растений"} />
        <DropDownGenusMenu
          handleSelectClassifier={(classifier_index) =>
            setSelectedGenus([chaptersInfo[classifier_index + 1]])
          }
        />
      </Box>
      <ChapterContentTemplate chaptersInfo={selectedGenus} />
    </Paper>
  );
};
const Analyzator = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(getMockImages(imageStatus.LOADING, 50));
  const [selectedClassifier, setSelectedClassifier] = useState("Вишня");

  const handleSelectClassifier = (classifier_index) => {
    setSelectedClassifier(classifiers[classifier_index].plant);
  };

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
      <ClassifiersChapter />
      <Paper elevation={3} className="chapter">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ChapterHeaderTemplate chapterTitle="Изображения" />
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
                handleSelectClassifier={handleSelectClassifier}
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
