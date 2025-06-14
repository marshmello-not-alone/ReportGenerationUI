import { Suspense, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Error } from "@/components/ui/error";

interface SuspenseWithErrorProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: React.ComponentType<FallbackProps>;
}

const DefaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Error
      title="Something went wrong"
      message={error.message || "An unexpected error occurred"}
      onRetry={resetErrorBoundary}
      variant="default"
    />
  );
};

export const SuspenseWithError = ({
  children,
  fallback,
  errorFallback,
}: SuspenseWithErrorProps) => {
  const loadingComponent = fallback ?? <div>Loading...</div>;
  const ErrorComponent = errorFallback ?? DefaultErrorFallback;

  return (
    // @ts-ignore
    <ErrorBoundary fallbackRender={ErrorComponent}>
      <Suspense fallback={loadingComponent}>{children}</Suspense>
    </ErrorBoundary>
  );
};
