import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

export const Page = React.memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.backgroundPage,
        border: `1px solid ${theme.palette.border}`,
        borderRadius: "5px",
        height: "100%",
        width: "100%",
        margin: "1.5rem",
        padding: "1.5rem",
        display: "inline-block",
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: "3rem",
          marginBottom: "2rem",
          color: theme.palette.primary.main,
        })}
      >
        {title}
      </Typography>
      {children}
      <Outlet />
    </Box>
  ),
);
