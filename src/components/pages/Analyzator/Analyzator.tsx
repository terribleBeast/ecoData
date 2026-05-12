import { Box, Button, Dialog, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { getPrediction } from "../../../api/api.js";
import { getMockImages } from "../../../mock_data.js";
import FileDragAndDrop from "./DND.jsx";
import { ImageCard, ImageFullInfo } from "./Image.jsx";
import { ChapterHeaderTemplate, PageChapter } from "../../Templates.jsx";
import { classifiers } from "../../../entities.js";
import { ClassifiersChapter, DropDownGenusMenu } from "./components.jsx";
import type { IImageData } from "../../../Models/Image.js";
import { ImageStatus } from "../../../Models/Image.js";

interface ImagesContainerProps {
  images: IImageData[];
  onOpen: (image: IImageData) => void;
  onDelete: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatus) => void;
}

const ImagesContainer: React.FC<ImagesContainerProps> = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
  onUpdate: handleUpdateImage,
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
        onUpdate={handleUpdateImage}
        image={image}
        key={index}
      />
    ))}
  </Box>
);

const ClassifiersMenu = ({
  handleSelectClassifier,
}: {
  handleSelectClassifier: (classifier_index: number) => void;
}) => {
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

// function getAllPrediction(images) {
//   // TODO: implement function creating csv file
// }

const Analyzer = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | IImageData>(null);
  const [images, setImages] = useState<IImageData[]>(
    getMockImages(ImageStatus.LOADING, 0),
  );
  const [selectedClassifier, setSelectedClassifier] = useState("Яблоня");
  const handleSelectClassifier = (classifier_index: number) => {
    setSelectedClassifier(classifiers[classifier_index].plant);
  };

  const handleAddImages = (newImages: IImageData[]) => {
    setImages((images) => [...newImages, ...images]);
  };
  const handleDeleteImage = (image: IImageData) => {
    setImages(images.filter((tmp_image) => tmp_image.key !== image.key));
  };

  const handleOpenImageFullInfo = (image: IImageData) => {
    setSelectedImage(image);
  };
  const handleUpdateImageStatus = (
    image: IImageData,
    newStatus: ImageStatus,
  ) => {
    setImages(
      images.map((tmp_image) => {
        if (tmp_image.key === image.key) tmp_image.status = newStatus;
        return tmp_image;
      }),
    );
  };

  const handleDownloadResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      console.warn("No images to export");
      return;
    }

    // Get all unique species
    const allSpecies = new Set();
    images.forEach((image) => {
      if (image.predictions) {
        image.predictions.forEach((pred) => allSpecies.add(pred.classifier));
      }
    });
    const species = Array.from(allSpecies);

    // Prepare CSV data
    //
    const data = [["Id", "Изображение", "Род", ...species].join(",")];

    images.map((image, index) => {
      const row = [index + 1, image.name || "Unknown", image.classifier];

      species.forEach((speciesName) => {
        const prediction = image.predictions?.find(
          (p) => p.classifier === speciesName,
        );
        row.push(prediction ? prediction.probability : "");
      });

      data.push(row.join(","));
    });

    const type = "data:text/csv;charset=UTF-8";
    const blob = new Blob([data.join("\n")], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "result.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleProcessImages = async (images: IImageData[]) => {
    const updatedImages = await Promise.all(
      images
        .filter((image) => image.status === ImageStatus.UPLOADED)
        .map(async (image) => {
          try {
            const predictions = await getPrediction(image);
            return { ...image, predictions, status: ImageStatus.PROCESSED };
          } catch (e) {
            console.log(e);
            return { ...image, status: ImageStatus.ERROR };
          }
        }),
    );
    // for (let i = 0; i < images.length; i++) {
    //   if (images[i].status === ImageStatus.UPLOADED) {
    //     images[i].predictions = await getPrediction(images[i]).then(
    //       (data) => data,
    //     );
    //     images[i].status = ImageStatus.PROCESSED;
    //   }
    // }
    setImages([...updatedImages]);

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
      <ClassifiersChapter />

      <PageChapter
        title={undefined}
        headerComponent={
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChapterHeaderTemplate chapterTitle={"Изображения"} />
            <Box style={{ display: "flex", gap: "1rem" }}>
              <Button
                color="success"
                variant="contained"
                onClick={() => setIsOpenFileMenu(!isOpenFileMenu)}
              >
                <Typography>
                  {isOpenFileMenu ? "Закрыть" : "Добавить"}
                </Typography>
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => handleProcessImages(images)}
              >
                <Typography>Обработать</Typography>
              </Button>
              <Button
                href=""
                color="success"
                variant="contained"
                onClick={handleDownloadResult}
              >
                <Typography>Выгрузить</Typography>
              </Button>
            </Box>
          </Box>
        }
      >
        {isOpenFileMenu && (
          <Box style={{ display: "flex" }}>
            <Box style={{ width: "80%" }}>
              <FileDragAndDrop
                updateImages={handleAddImages}
                defaultStatus={ImageStatus.LOADING}
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
          onUpdate={handleUpdateImageStatus}
        />
      </PageChapter>
    </>
  );
};

export default Analyzer;
