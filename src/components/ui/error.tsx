import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  className?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showRetry?: boolean;
  showGoHome?: boolean;
  variant?: "default" | "minimal" | "full";
}

export const Error = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  className,
  onRetry,
  onGoHome,
  showRetry = true,
  showGoHome = false,
  variant = "default",
}: ErrorProps) => {
  const baseClasses = "flex flex-col items-center justify-center text-center";

  const variantClasses = {
    default: "p-6 border border-destructive/20 rounded-lg bg-destructive/5",
    minimal: "p-4",
    full: "min-h-[400px] p-8",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>

      <h3 className="text-lg font-semibold text-destructive mb-2">{title}</h3>

      <p className="text-sm text-muted-foreground mb-6 max-w-md">{message}</p>

      <div className="flex gap-3">
        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="hover:bg-destructive/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}

        {showGoHome && onGoHome && (
          <Button onClick={onGoHome} variant="default" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
};

// Variants for different use cases
export const PageError = ({
  title = "Page Error",
  message = "Failed to load this page. Please try again.",
  onRetry,
  onGoHome,
}: Partial<ErrorProps>) => (
  <Error
    title={title}
    message={message}
    onRetry={onRetry}
    onGoHome={onGoHome}
    variant="full"
    showRetry={true}
    showGoHome={true}
  />
);

export const InlineError = ({
  title = "Error",
  message = "Something went wrong.",
  onRetry,
}: Partial<ErrorProps>) => (
  <Error
    title={title}
    message={message}
    onRetry={onRetry}
    variant="minimal"
    showRetry={!!onRetry}
    showGoHome={false}
  />
);

export const TableError = ({
  message = "Failed to load data. Please try again.",
  onRetry,
}: Partial<ErrorProps>) => (
  <div className="flex items-center justify-center p-8">
    <Error
      title="Data Error"
      message={message}
      onRetry={onRetry}
      variant="minimal"
      showRetry={!!onRetry}
    />
  </div>
);

export const NetworkError = ({ onRetry }: { onRetry?: () => void }) => (
  <Error
    title="Network Error"
    message="Unable to connect to the server. Please check your internet connection and try again."
    onRetry={onRetry}
    variant="default"
    showRetry={!!onRetry}
  />
);

export const NotFoundError = ({ onGoHome }: { onGoHome?: () => void }) => (
  <Error
    title="Not Found"
    message="The page or resource you're looking for doesn't exist."
    onGoHome={onGoHome}
    variant="full"
    showRetry={false}
    showGoHome={!!onGoHome}
  />
);
