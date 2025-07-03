import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, ArrowUpDown } from "lucide-react";
import type { ApiReport } from "@/lib/api";
import {
  formatReportType,
  formatDate,
  formatStatus,
  formatMimeType,
  formatFileExtension,
} from "@/lib/utils";
import { useDownloadReport } from "@/hooks/downloadReport";

export type Report = ApiReport;

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "reportName",
    header: () => <div className="pl-4">Report title</div>,
    cell: ({ row }) => (
      <div className="pl-4 font-medium">{row.getValue("reportName")}</div>
    ),
    size: 300,
  },
  {
    accessorKey: "reportType",
    header: ({ column }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>Report Type</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const reportType = row.getValue("reportType") as string;
      return formatReportType(reportType);
    },
  },
  {
    accessorKey: "mimeType",
    header: ({ column }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>File Type</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const mimeType = row.getValue("mimeType") as string;
      return formatMimeType(mimeType);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const displayStatus = formatStatus(status);
      return (
        <Badge
          variant="outline"
          className={
            displayStatus === "Ready"
              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
              : displayStatus === "Processing"
              ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50"
              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
          }
        >
          {displayStatus === "Ready" && "✓ "}
          {displayStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>Request time</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return formatDate(createdAt);
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const reportId = row.original.id;
      const mimeType = row.getValue("mimeType") as string;

      const downloadMutation = useDownloadReport();

      const handleDownload = () => {
        const fileExtension = formatFileExtension(mimeType);
        const fileName = `reportName.${fileExtension}`;

        downloadMutation.mutate({ reportId, fileName });
      };

      if (status === "READY") {
        return (
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
          >
            {downloadMutation.isPending ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="size-4 mr-2" />
                Download
              </>
            )}
          </Button>
        );
      }

      return <span className="text-muted-foreground">Pending</span>;
    },
  },
];
