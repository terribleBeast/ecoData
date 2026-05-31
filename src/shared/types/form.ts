import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";

export interface IEndpointState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;

  error?: FetchBaseQueryError | SerializedError | undefined;
  successMsg: string | undefined;
}

export interface IFormProps<T> {
  initialData?: T;
  onSubmit: SubmitHandler<T>;
  endpointState: IEndpointState;
}

export interface IFormTemplateProps {
  title: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  endpointState: IEndpointState;
}

export interface IFormEntityTemplateProps extends IFormTemplateProps {
  submitLabel: string;
  submitLoadingLabel: string;
}
