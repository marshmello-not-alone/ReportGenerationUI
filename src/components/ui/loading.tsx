import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const textSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export const Loading = ({
  size = "md",
  text = "Loading...",
  className,
  showText = true,
}: LoadingProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-primary border-t-transparent",
            sizeClasses[size]
          )}
        />
        {showText && (
          <span className={cn("text-muted-foreground", textSizes[size])}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

// Variants for different use cases
export const PageLoading = ({
  text = "Loading page...",
}: {
  text?: string;
}) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loading size="lg" text={text} />
  </div>
);

export const InlineLoading = ({ text = "Loading..." }: { text?: string }) => (
  <Loading size="sm" text={text} className="py-2" />
);

export const FullScreenLoading = ({
  text = "Loading...",
}: {
  text?: string;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
    <Loading size="xl" text={text} />
  </div>
);

export const TableLoading = () => (
  <div className="flex items-center justify-center p-8">
    <Loading size="md" text="Loading data..." />
  </div>
);
