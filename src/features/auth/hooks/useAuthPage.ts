import { useState } from "react";
import { useUserLogin } from "./useUserLogin";
import { useUserReg } from "./useUserReg";
import type { IAuthFormProps, IFormLogInProps } from "../types";
import type { ICheckExistUser, ICreateUser } from "@/shared/types/user";

export const useAuthPage = () => {
  const [isLogInForm, setIsLogInForm] = useState(true);

  const handleChangeForm = () => {
    setIsLogInForm((prev) => !prev);
  };
  const handleClickForgotPassword = () => console.log("Forgot password");
  const { handleReg, endpointState: registerEndpointState } = useUserReg();
  const { handleLogIn, endpointState: logInEndpointState } = useUserLogin();

  const regFormProps: IAuthFormProps<ICreateUser> = {
    endpointState: {
      ...registerEndpointState,
      successMsg: "Пользователь создан",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onSubmit: async (formData) => handleReg(formData),
  };

  const logInFormProps: IFormLogInProps<ICheckExistUser> = {
    endpointState: {
      ...logInEndpointState,
      successMsg: "Вход выполнен",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onForgotPassword: handleClickForgotPassword,
    onSubmit: async (formData) => handleLogIn(formData),
  };

  return {
    isLogInForm,
    handleChangeForm,
    regFormProps,
    logInFormProps,
    onSwitchForm: handleChangeForm,
  };
};
