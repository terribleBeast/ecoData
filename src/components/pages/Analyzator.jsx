import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Dialog,
  Card,
  Paper,
  Typography,
  Table,
  Link,
} from "@mui/material";
import { getImages, getPredictions } from "../../mock_images.js";
import { Delete, Search } from "@mui/icons-material";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { useTable } from "react-table";
import FileDragAndDrop from "../DND";

const handleProcessImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    images[i].status = "processed";
    images[i].predictions = getPredictions(images[i]);
  }
  return images;
};
const ImageFullInfo = ({ image }) => {
  console.log("image FULL");

  const columns = [
    {
      Header: "Классификатор",
      accessor: "classifier",
    },
    {
      Header: "Вероятность",
      accessor: "probability",
    },
  ];
  const bestValue =
    image.predictions !== null
      ? image.predictions.reduce((max, current) =>
          current.probability > max.probability ? current : max,
        )
      : null;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        margin: "1rem",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          className="chapter-title"
          style={{ height: "5%", alignSelf: "center" }}
        >
          Изображение
        </Typography>

        <img src={image.src} alt={image.src} width="100%" />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="success">
            Лупа
          </Button>
          <Button
            href={image.src}
            target="_blank"
            variant="contained"
            color="success"
          >
            Открыть в новой вкладке
          </Button>
          <Button variant="contained" color="success">
            Линейка
          </Button>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          className="chapter-title"
          // variant="h6"
          // component="h2"
          gutterBottom
          style={{ height: "10%", alignSelf: "center" }}
        >
          Информация об изображении
        </Typography>

        <Box style={{ height: "90%" }}>
          <Card elevation={2} style={{ marginBottom: "16px" }}>
            <CardHeader title="Общая информация" />
            <CardContent>
              <Typography style={{ fontWeight: "bold" }}>
                Имя:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.src}
                </Typography>
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Статус:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.status}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={2} style={{ marginBottom: "16px" }}>
            <CardHeader title="Результаты анализа" />
            <CardContent>
              <Typography style={{ fontWeight: "bold" }} gutterBottom>
                Выбранный классификатор:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.selectedClassifier}
                </Typography>
              </Typography>
              {image.predictions !== null ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index}>{column.Header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {image.predictions.map((prediction, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            prediction.probability == bestValue.probability
                              ? "lightgreen"
                              : "",
                        }}
                      >
                        <TableCell>{prediction.classifier}</TableCell>
                        <TableCell>
                          {prediction.probability.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>Нет предсказаний</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
};

const Analyzator = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(() => {
    var images = [];
    for (let i = 0; i < 1; i++) {
      getImages().forEach((image) => {
        images.push({
          src: image,
          key: image + i.toString(),
          predictions: null,
          status: "pending",
          selectedClassifier: "Яблоня",
        });
      });
    }
    return images;
  });

  const handleAddImages = (newImages) => {
    // images.map((image) => console.log(image));
    setImages((images) => [...newImages, ...images]);
  };

  const ImageComponent = ({ image }) => {
    let borderStyle = "0 0 4px";
    switch (image.status) {
      case "Загружен":
        borderStyle = borderStyle.concat(" gray");
        break;
      case "В обработке":
        borderStyle = borderStyle.concat(" blue");
        break;
      case "Обработан":
        borderStyle = borderStyle.concat(" green");
        break;
      case "Ошибка":
        borderStyle = borderStyle.concat(" red");
        break;
    }
    const prediction =
      image.predictions !== null
        ? image.predictions.reduce((max, current) =>
            current.probability > max.probability ? current : max,
          )
        : null;
    return (
      <Paper
        key={image.key}
        style={{
          padding: "0.5rem",
          width: "150px",
          boxShadow: borderStyle,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
            onClick={() => {
              // handleOpenImage(image)
              setSelectedImage(image);
            }}
          ></img>
        </Box>

        <Box className="image-overlay">
          <Typography
            className="image-title"
            style={{ overflowWrap: "break-word", fontWeight: "bold" }}
          >
            {image.src.split("/")[image.src.split("/").length - 1]}
          </Typography>
          <Typography className="image-prediction">
            {prediction !== null
              ? prediction.classifier +
                " (" +
                prediction.probability.toFixed(2) +
                "%)"
              : "Не определено"}
          </Typography>
        </Box>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Delete
            style={{
              color: "red",
              fontSize: "medium",
              cursor: "pointer",
            }}
            onClick={() =>
              setImages(
                images.filter((tmp_image) => tmp_image.key !== image.key),
              )
            }
          />
        </Box>
      </Paper>
    );
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
        // onKeyDown={() => setSelectedImage(images[10])}
        // fullScreen={true}
      >
        {/* <DialogContent style={{ maxWidth: "1000px", width: "1000px" }}>*/}
        {selectedImage !== null && <ImageFullInfo image={selectedImage} />}
        {/* </DialogContent>*/}
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
              onClick={() => {
                setImages([...handleProcessImages(images)]);
              }}
            >
              <Typography>Обработать</Typography>
            </Button>
          </Box>
        </Box>
        {isOpenFileMenu && <FileDragAndDrop updateImages={handleAddImages} />}

        <Box
          className="cards-container"
          style={{
            maxHeight: "900px",
            overflowY: "scroll",
          }}
        >
          {images.map((image) => (
            <ImageComponent image={image} />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default Analyzator;
