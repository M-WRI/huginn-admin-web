import React, { createContext, useContext, useState, ReactNode } from "react";
import { ErrorResponse } from "../types";
import { generateTranslationKey } from "../utils";

interface ErrorState {
  error: ErrorResponse | undefined;
  translationKey: string;
}

interface ErrorContextProps {
  errorState: ErrorState | undefined;
  setError: (error: ErrorResponse) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errorState, setErrorState] = useState<ErrorState>();

  const setError = (error: ErrorResponse) => {
    const { type, errorCode, location } = error;
    const translationKey = generateTranslationKey(errorCode, location, type);
    setErrorState({
      error,
      translationKey,
    });
  };

  return (
    <ErrorContext.Provider value={{ errorState, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
