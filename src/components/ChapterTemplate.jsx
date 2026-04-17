import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export const ChapterHeaderTemplate = ({ chapterTitle }) => (
  <>
    <Typography className="chapter-title" style={{ alignSelf: "center" }}>
      {chapterTitle}
    </Typography>
  </>
);

export const ChapterContentTemplate = ({ chaptersInfo }) => (
  <Box style={{ overflowY: "auto", maxHeight: "60vh" }}>
    {chaptersInfo.map((chapterData, index) => (
      <Card
        elevation={3}
        style={{ marginBottom: "16px" }}
        key={chapterData.title + index}
      >
        <CardHeader title={chapterData.title} />
        <CardContent>
          {chapterData.fields.map((field, index) => (
            <Typography style={{ fontWeight: "bold" }}>
              {field.name}:{" "}
              <Typography style={{ display: "inline" }}>
                {field.value}
              </Typography>
            </Typography>
          ))}
        </CardContent>
      </Card>
    ))}
  </Box>
);

export const ChaptersPaper = ({ children }) => (
  <Paper
    elevation={3}
    style={{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    }}
  >
    {children}
  </Paper>
);
