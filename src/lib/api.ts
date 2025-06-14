import axios from "axios";
import { saveAs } from "file-saver";

import { CreateReportInput } from "./schema";

const api = axios.create({
  baseURL: "/api", // This will proxy to http://localhost:3000
});

export interface ApiReport {
  id: string;
  userId: string;
  reportType: string;
  timeRange: string;
  mimeType: string;
  status: "READY" | "PROCESSING" | "FAILED";
  createdAt: string;
  updatedAt: string;
  errorMessage: string | null;
  customRequest: string;
}

export async function getReports(): Promise<ApiReport[]> {
  const response = await api.get("/reports");
  return response.data;
}

export async function createReport(
  data: CreateReportInput
): Promise<ApiReport> {
  const response = await api.post("/reports/generate", {
    ...data,
    userId: "18b5e8d4-d7ff-49fa-bc8d-3fdd0ed3c0e0", // hardcoded for now
  });
  return response.data;
}

export async function downloadReport(
  reportId: string,
  fileName?: string
): Promise<void> {
  try {
    const response = await api.get(`/reports/${reportId}/download`, {
      responseType: "blob", // Important for file downloads
    });

    // Get filename from response headers or use default
    const contentDisposition = response.headers["content-disposition"];
    const defaultFileName =
      fileName ||
      contentDisposition
        ?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)?.[1]
        ?.replace(/['"]/g, "") ||
      `report-${reportId}.pdf`;

    // Use file-saver to download
    saveAs(response.data, defaultFileName);
  } catch (error) {
    console.error("Download failed:", error);
    throw new Error("Failed to download report");
  }
}
