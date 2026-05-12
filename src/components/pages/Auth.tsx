import { Typography, Box, Button } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import LoginForm from "../../features/auth/ui/LoginForm";
import { useState } from "react";
import RegisterForm from "../../features/auth/ui/RegisterForm";
// import { toLogIn } from "../features/user/userSlice"
// import { createUser, getUser } from "../database/CRUD"

// import './../App.css'

const AuthForm = () => {
  const [isRegForm, setStateLog] = useState(false);

  return (
    <Box className="auth">
      <Box className="auth-logo">
        <SpaIcon />
        <Typography className="auth-logo-text">EcoData</Typography>
      </Box>

      {isRegForm ? <RegisterForm /> : <LoginForm />}

      <Button
        className="forgot-password"
        onClick={() => {
          setStateLog(!isRegForm);
        }}
      >
        {" "}
        {isRegForm ? "Уже зарегистрированы?" : "Нет аккаунта?"}{" "}
      </Button>
    </Box>
  );
};

export default AuthForm;
