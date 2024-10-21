import { UseMutationOptions, UseQueryOptions } from "react-query";
import { ErrorResponse } from "./error";

export type TQueryKey = [string[], any | undefined];
export type TQueryOptions<SR> = UseQueryOptions<
  SR,
  ErrorResponse,
  SR,
  TQueryKey
>;

export type TMutationOptions<TVariables, TResponse = any> = UseMutationOptions<
  TResponse,
  ErrorResponse,
  IRequestPost<TVariables>
>;

export type TDeletionOptions<TResponse = void> = UseMutationOptions<
  TResponse,
  ErrorResponse,
  void,
  unknown
>;

export interface IRequestPost<V> {
  variables: V;
}

export interface IDeletionReposnse {
  message: string;
}

export type TDeleteOptions = Omit<
  UseMutationOptions<
    { message: string },
    ErrorResponse,
    { [key: string]: any }
  >,
  "mutationFn"
>;
