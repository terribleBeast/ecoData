import { Typography, Box, Button } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import LoginForm from "./ui/LoginForm";
import { useState } from "react";
import RegisterForm from "./ui/RegisterForm";

const AuthForm = () => {
  const [isRegForm, setStateLog] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f2f3f5",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <SpaIcon />
        <Typography
          sx={(theme) => ({
            fontSize: "2rem",
            fontWeight: "bold",
            color: theme.palette.primary.main,
          })}
        >
          EcoData
        </Typography>
      </Box>

      {isRegForm ? <RegisterForm /> : <LoginForm />}

      <Button
        onClick={() => {
          setStateLog(!isRegForm);
        }}
        sx={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "#1a56db",
          textDecoration: "none",
          display: "inline-block",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {isRegForm ? "Уже зарегистрированы?" : "Нет аккаунта?"}
      </Button>
      {isRegForm ? null : (
        <Button
          sx={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#1a56db",
            textDecoration: "none",
            display: "inline-block",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Typography> Забыли пароль?</Typography>
        </Button>
      )}
    </Box>
  );
};

export default AuthForm;
