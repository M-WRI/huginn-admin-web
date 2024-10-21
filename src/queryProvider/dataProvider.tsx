import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  ErrorResponse,
  IRequestPost,
  TDeleteOptions,
  TMutationOptions,
  TQueryKey,
  TQueryOptions,
} from "../types";
import { axiosDelete, axiosGet, axiosPost } from "./axios";
import { useError } from "../context";

export const useFetch = <BR extends any>({
  options,
  queryKey,
  url,
}: {
  queryKey: string[];
  url: string;
  options?: TQueryOptions<BR>;
}): UseQueryResult<BR> => {
  const queryKeyWithUrl: TQueryKey = [queryKey, url];
  const { setError } = useError();

  const context = useQuery<BR, ErrorResponse, BR, TQueryKey>(
    queryKeyWithUrl,
    async () => {
      const headers = options?.meta?.headers as Record<string, string>;
      return await axiosGet<BR>(url, headers);
    },
    {
      retry: 0,
      onError: (error) => {
        setError(error);
      },
      ...options,
    }
  );

  return context;
};

export const usePost = <TVariables, TResponse = any>({
  options,
  url,
}: {
  options: TMutationOptions<TVariables, TResponse>;
  url: string;
}): UseMutationResult<TResponse, ErrorResponse, IRequestPost<TVariables>> => {
  const { setError } = useError();
  const mutation = useMutation<
    TResponse,
    ErrorResponse,
    IRequestPost<TVariables>
  >(
    async ({ variables }) => {
      const headers = options?.meta?.headers as Record<string, string>;
      const response = await axiosPost<TVariables, TResponse>(
        url,
        variables,
        headers
      );
      return response;
    },
    {
      retry: 0,
      onError: (error) => {
        setError(error);
      },
      ...options,
    }
  );

  return mutation;
};

export const useDelete = ({
  options,
  url,
}: {
  url: string;
  options?: TDeleteOptions;
}): UseMutationResult<
  { message: string },
  ErrorResponse,
  { [key: string]: any }
> => {
  const { setError } = useError();
  const headers = options?.meta?.headers as Record<string, string>;

  const mutation = useMutation<
    { message: string },
    ErrorResponse,
    { [key: string]: any }
  >(
    async (variables: { [key: string]: any }) => {
      const processedUrl = Object.keys(variables).reduce(
        (acc, key) => acc.replace(`:${key}`, variables[key]),
        url
      );

      await axiosDelete(processedUrl, headers);

      return { message: "Deletion was successful" };
    },
    {
      onError: (error: ErrorResponse) => {
        setError(error);
      },
      ...options,
    }
  );

  return mutation;
};
