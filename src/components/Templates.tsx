import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { type IChapterData } from "./pages/Analyzator/components";

export const ChapterHeaderTemplate = ({
  chapterTitle,
}: {
  chapterTitle: string;
}) => (
  <Typography className="chapter-title" style={{ alignSelf: "center" }}>
    {chapterTitle}
  </Typography>
);

export const ChapterContentTemplate = ({
  content,
}: {
  content: React.ReactNode;
}) => {
  return <Box>{content}</Box>;
};

export const ChapterInfoTemplate = ({
  chaptersInfo,
}: {
  chaptersInfo: IChapterData[];
}) => {
  if (chaptersInfo === null) return;

  return (
    <Box style={{ overflowY: "auto", maxHeight: "60vh" }}>
      {chaptersInfo.map((chapterData, index) => (
        <Card style={{ marginBottom: "16px" }} key={chapterData.title + index}>
          <CardHeader title={chapterData.title} />
          <CardContent key={index}>
            {Array.isArray(chapterData.fields)
              ? chapterData.fields.map((field, index) => (
                  <Typography style={{ fontWeight: "bold" }} key={index}>
                    {field.name}:{" "}
                    <Typography style={{ display: "inline" }}>
                      {field.value}
                    </Typography>
                  </Typography>
                ))
              : chapterData.fields}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export const DialogChapters = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={3}
    style={{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    }}
  >
    <Typography className="chapter-title" style={{ alignSelf: "center" }}>
      {title}
    </Typography>
    <ChapterContentTemplate content={children} />
  </Paper>
);

export const Page = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box className="page-layout">
    <Typography className="page-title">{title}</Typography>
    {children}
  </Box>
);

export const PageChapter = ({
  title,
  headerComponent,
  children,
}: {
  title?: string;
  headerComponent?: React.ReactNode;

  children: React.ReactNode;
}) => (
  <Paper elevation={3} className="chapter">
    {headerComponent !== undefined ? (
      headerComponent
    ) : (
      <Typography className="chapter-title">{title}</Typography>
    )}

    {children}
  </Paper>
);
