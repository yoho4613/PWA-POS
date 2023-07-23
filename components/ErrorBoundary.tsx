// components/ErrorBoundary.tsx
import React, { useState, useEffect, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      // Handle the error here or display a fallback UI
      console.error("Something went wrong.");
    }
  }, [hasError]);

  const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    setHasError(true);
    // You can log the error here or send it to an error tracking service
    console.error("Error:", error);
  };

  if (hasError) {
    // Handle the error here or display a fallback UI
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
