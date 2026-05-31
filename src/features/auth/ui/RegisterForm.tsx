import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  EmailField,
  PasswordField,
  FormTextField,
} from "@/shared/components/formFields";
import { AuthFormTemplate } from "@/features/auth/components/AuthFormTemplate";
import type { ICreateUser } from "@/shared/types/user";
import type { IAuthFormProps } from "../types";

const RegisterForm = ({
  endpointState,
  onSubmit,
  isLogInForm,
  onSwitchForm,
}: IAuthFormProps<ICreateUser>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  return (
    <AuthFormTemplate
      title="Регистрация"
      submitLabel="Зарегистрироваться"
      submitLoadingLabel="Создание..."
      endpointState={endpointState}
      isLogInForm={isLogInForm}
      onSwitchForm={onSwitchForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormTextField<ICreateUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="surname"
        label="Фамилия"
        autoComplete="family-name"
        rules={{ required: "Фамилия обязательна" }}
      />

      <FormTextField<ICreateUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="name"
        label="Имя"
        autoComplete="name"
        rules={{ required: "Имя обязательно" }}
      />

      <FormTextField<ICreateUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="patronymic"
        label="Отчество"
        autoComplete="additional-name"
        rules={{ required: "Отчество обязательно" }}
      />

      <EmailField<ICreateUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="email"
      />

      <PasswordField<ICreateUser>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="password_hash"
        showPassword={showPassword}
        onClickEye={handleShowPassword}
      />
    </AuthFormTemplate>
  );
};

export default RegisterForm;
