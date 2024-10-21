export interface ErrorResponse {
  type: string;
  errorCode: string;
  location: string;
  variables: { [key: string]: any };
}
