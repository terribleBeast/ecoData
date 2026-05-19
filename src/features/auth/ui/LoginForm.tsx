import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { useLazyGetUserQuery } from "../../../api/userApi";
import { toLogIn } from "../../user/userSlice";
import type { IUserData } from "../../../shared/types/user";
import { LevelLog, sendLogToServer } from "../../../api/api";
import { deriveErrorMessage, EMAIL_REGEX } from "../utils";

interface IUserFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [getUser, { isLoading, isError, error: rtkError }] =
    useLazyGetUserQuery();

  const onSubmit: SubmitHandler<IUserFormData> = async (
    formData: IUserFormData,
  ) => {
    try {
      const user: IUserData = await getUser({ email: formData.email }).unwrap();
      if (user) {
        dispatch(
          toLogIn({
            login: user.email,
            id: user.id,
            name: user.name,
          }),
        );
        navigate("/");
        sendLogToServer(LevelLog.INFO, `User ${user.email} logged in `);
      }
    } catch (err) {
      sendLogToServer(
        LevelLog.ERROR,
        `Login attempt failed for ${formData.email}`,
        err instanceof Error ? err.message : String(err),
      ).catch();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
          color: "text.primary",
        }}
      >
        Вход
      </Typography>
      {isError && (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
          {deriveErrorMessage(rtkError)}
        </Alert>
      )}
      <Box
        component="form"
        sx={{ width: "100%" }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              disabled={isLoading}
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                htmlInput: {
                  "aria-invalid": errors.email ? "true" : "false",
                },
              }}
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Некорректный email адрес",
                },
              })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Пароль"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              error={!!errors.password}
              fullWidth
              slotProps={{
                htmlInput: {
                  "aria-invalid": errors.password ? "true" : "false",
                },
              }}
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 4,
                  message: "Пароль должен содержать минимум 4 символа",
                },
              })}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
              sx={(theme) => ({
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              })}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
