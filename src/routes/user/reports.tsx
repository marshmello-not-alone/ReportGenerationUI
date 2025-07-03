// filepath: /src/routes/user/reports.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/reports/data-table";
import { columns } from "@/components/reports/columns";
import { SuspenseWithError } from "@/components/SuspenseWithError";
import { TableLoading } from "@/components/ui/loading";
import { TableError } from "@/components/ui/error";
import { getReports } from "../../lib/api";

export const Route = createFileRoute("/user/reports")({
  component: () => (
    <SuspenseWithError
      fallback={<TableLoading />}
      errorFallback={({ error, resetErrorBoundary }) => (
        <div className="container mx-auto py-6">
          <TableError
            message={`Failed to load reports: ${error.message}`}
            onRetry={resetErrorBoundary}
          />
        </div>
      )}
    >
      <RouteComponent />
    </SuspenseWithError>
  ),
});

const RouteComponent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
