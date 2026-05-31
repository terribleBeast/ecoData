import { Typography } from "@mui/material";

export const ChapterHeaderTemplate = ({ title }: { title: string }) => (
  <Typography
    sx={(theme) => ({
      fontSize: "2.2rem",
      marginBottom: "1.5rem",
      fontWeight: 600,
      color: theme.palette.secondary.main,
      alignSelf: "center",
    })}
  >
    {title}
  </Typography>
);
