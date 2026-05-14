import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// import { toLogIn } from "../features/user/userSlice"
// import { createUser, getUser } from "../database/CRUD"
import {
  useLazyGetUserQuery,
  // useCreateUserMutation,
} from "../../../api/userApi";
import { toLogIn } from "../../user/userSlice";
import { LevelLog, sendLogToServer } from "../../../api/api";
import { deriveErrorMessage, EMAIL_REGEX } from "../utils";

interface IUserRegFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [getUser, { isLoading, isError, error: rtkError }] =
    useLazyGetUserQuery();
  // const [createUser] = useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<IUserRegFormData> = async (
    formData: IUserRegFormData,
  ) => {
    console.log("onSubmit");
    try {
      const user = await getUser({ email: formData.email }).unwrap();
      if (user) {
        // const user = await createUser({
        //   name: name,
        //   email: email,
        //   password: password,
        // }).unwrap();
        dispatch(toLogIn({ login: user.email, id: user.id, name: user.name }));
        navigate("/");
      } else {
        sendLogToServer(LevelLog.INFO, `User ${formData.email}`);
      }
    } catch (err) {
      sendLogToServer(
        LevelLog.ERROR,
        `Register attempt failed for ${formData.email}`,
        err instanceof Error ? err.message : String(err),
      ).catch();
    }
  };

  return (
    <div className="reg-form">
      <Typography className="reg-form-title">Регистрация</Typography>
      {/* Server-level errors */}
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
          {/* ---- Name ---- */}
          <Grid size={12}>
            <TextField
              label="Имя"
              type="text"
              fullWidth
              disabled={isLoading}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Имя обязательно",
              })}
              variant="outlined"
              // className="reg-input"
            />
          </Grid>
          {/* ---- Email ---- */}
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
          {/* ---- Password ---- */}
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
              className="reg-button"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Создание..." : "Зарегистрироваться"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RegisterForm;
