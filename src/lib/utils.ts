import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatReportType = (reportType: string): string => {
  return reportType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatStatus = (
  status: string
): "Ready" | "Processing" | "Failed" => {
  switch (status) {
    case "READY":
      return "Ready";
    case "PROCESSING":
      return "Processing";
    case "FAILED":
      return "Failed";
    default:
      return "Processing";
  }
};

export const formatMimeType = (mimeType: string): string => {
  switch (mimeType) {
    case "APPLICATION_PDF":
      return "PDF";
    case "TEXT_CSV":
      return "CSV";
    case "APPLICATION_JSON":
      return "JSON";
    default:
      return "unknown type";
  }
};

export const formatFileExtension = (mimeType: string): string => {
  switch (mimeType) {
    case "APPLICATION_PDF":
      return "pdf";
    case "TEXT_CSV":
      return "csv";
    case "APPLICATION_JSON":
      return "json";
    default:
      return "p";
  }
};

export const formatValue = (value: string) =>
  value.replace(/_/g, " ").replace(/APPLICATION_|TEXT_/g, "");
