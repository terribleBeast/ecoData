import { Paper, Box, Typography } from "@mui/material";
import {
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Card,
  Button,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DialogPanel } from "../../DialogPanel";
import {
  ImageStatus,
  type IImageData,
  type IPrediction,
} from "../../../Models/Image";
import type { MRT_ColumnDef } from "material-react-table";

interface ImageCardProps {
  image: IImageData;
  onDelete: (image: IImageData) => void;
  onOpen: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatus) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onDelete: handleDelete,
  onOpen: handleOpenImageFullInfo,
  onUpdate: handleUpdateImage,
}) => {
  console.log("ImageCard");
  let borderStyle = "0 0 4px";
  switch (image.status) {
    case ImageStatus.LOADING:
      borderStyle = borderStyle.concat(" #3C9DD0");
      handleUpdateImage(image, ImageStatus.UPLOADED);
      break;
    case ImageStatus.UPLOADED:
      borderStyle = borderStyle.concat(" yellow");
      break;
    case ImageStatus.PROCESSING:
      borderStyle = borderStyle.concat(" blue");
      break;
    case ImageStatus.PROCESSED:
      borderStyle = borderStyle.concat(" green");
      break;
    case ImageStatus.ERROR:
      borderStyle = borderStyle.concat(" red");
      break;
    default:
      borderStyle = borderStyle.concat(" gray");
      break;
  }

  const prediction =
    image.predictions !== null && image.predictions !== undefined
      ? image.predictions.reduce((max, current) =>
          current.probability > max.probability ? current : max,
        )
      : null;
  return (
    <Paper
      key={image.key}
      sx={{
        padding: "0.5rem",
        width: "150px",
        boxShadow: borderStyle,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={image.src !== undefined ? image.src : "no-image-icon_1200.png"}
          alt="ошибка загрузки изображения"
          width="100px"
          height="100px"
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleOpenImageFullInfo(image)}
        ></img>
      </Box>

      <Box className="image-overlay">
        <Typography sx={{ overflowWrap: "break-word", fontWeight: "bold" }}>
          {image.name !== undefined ? image.name : "Не найдено"}
        </Typography>
        <Typography>
          {prediction !== null ? prediction.classifier : "Нет предсказаний"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Delete
          sx={{
            color: "red",
            fontSize: "medium",
            cursor: "pointer",
          }}
          onClick={() => handleDelete(image)}
        />
      </Box>
    </Paper>
  );
};

export const ImageFullInfo = ({ image }: { image: IImageData }) => {
  console.log("image FULL");

  const columns: MRT_ColumnDef<IPrediction>[] = [
    {
      header: "Классификатор",
    },
    {
      header: "Вероятность",
    },
  ];
  const bestValue =
    image.predictions !== null && image.predictions !== undefined
      ? image.predictions.reduce((max, current) =>
          current.probability > max.probability ? current : max,
        )
      : null;

  return (
    <DialogPanel>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: "2.2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
            height: "5%",
            alignSelf: "center",
          })}
        >
          Изображение
        </Typography>

        <img
          src={image.src !== undefined ? image.src : "no-image-icon_1200.png"}
          alt={image.src}
          width="100%"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="success">
            Лупа
          </Button>
          <Button
            href={image.src !== undefined ? image.src : ""}
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
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          gutterBottom
          sx={(theme) => ({
            fontSize: "2.2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
            height: "10%",
            alignSelf: "center",
          })}
        >
          Информация об изображении
        </Typography>

        <Box sx={{ height: "90%" }}>
          <Card elevation={2} sx={{ marginBottom: "16px" }}>
            <CardHeader title="Общая информация" />
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                Имя:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.name !== undefined ? image.name : "Не найдено"}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Статус:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.status}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={2} sx={{ marginBottom: "16px" }}>
            <CardHeader title="Результаты анализа" />
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                Выбранный классификатор:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.classifier}
                </Typography>
              </Typography>
              {image.predictions !== null && image.predictions !== undefined ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index}>{column.header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {image.predictions.map((prediction, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            bestValue &&
                            prediction.probability === bestValue.probability
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
    </DialogPanel>
  );
};
