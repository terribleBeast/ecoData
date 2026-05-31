import { useForm } from "react-hook-form";
import { useState } from "react";

import type { IFormLogInProps } from "../types";
import type { ICheckExistUser } from "@/shared/types/user";
import { ForgotPasswordButton } from "../components/authPageButtons";
import { AuthFormTemplate } from "@/features/auth/components/AuthFormTemplate";
import {
  EmailField,
  PasswordField,
} from "@/shared/components/formFields/index";

const LoginForm = ({
  endpointState,
  onSubmit,
  isLogInForm,
  onSwitchForm,
  onForgotPassword,
}: IFormLogInProps<ICheckExistUser>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckExistUser>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  return (
    <AuthFormTemplate
      title="Вход"
      submitLabel="Войти"
      submitLoadingLabel="Вход..."
      endpointState={endpointState}
      isLogInForm={isLogInForm}
      onSwitchForm={onSwitchForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <EmailField<ICheckExistUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="email"
      />

      <PasswordField<ICheckExistUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="password_hash"
        showPassword={showPassword}
        onClickEye={() => setShowPassword((prev) => !prev)}
      />

      {/* Forgot password — right-aligned below the password field */}
      <ForgotPasswordButton
        onClick={onForgotPassword}
        disabled={endpointState.isLoading}
      />
    </AuthFormTemplate>
  );
};

export default LoginForm;
