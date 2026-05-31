import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { type IChapterData } from "@/shared/types";
import React from "react";

export const ChapterInfoTemplate = ({
  chaptersInfo,
}: {
  chaptersInfo: IChapterData[];
}) => {
  if (!chaptersInfo?.length) return null;

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
      {chaptersInfo.map((chapterData, index) => (
        <Card sx={{ marginBottom: "16px" }} key={chapterData.title + index}>
          <CardHeader title={chapterData.title} />
          <CardContent>
            {Array.isArray(chapterData.fields)
              ? chapterData.fields.map((field, index) => (
                  <Typography sx={{ fontWeight: "bold" }} key={index}>
                    {field.name}:{" "}
                    <Box component="span" sx={{ fontWeight: "normal" }}>
                      {field.value}
                    </Box>
                  </Typography>
                ))
              : chapterData.fields}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
