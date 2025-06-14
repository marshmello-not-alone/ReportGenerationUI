import { useMutation } from "@tanstack/react-query";
import { downloadReport } from "@/lib/api";
import { toast } from "sonner";

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: ({
      reportId,
      fileName,
    }: {
      reportId: string;
      fileName?: string;
    }) => downloadReport(reportId, fileName),
    onSuccess: () => {
      toast.success("Download started!");
    },
    onError: (error) => {
      toast.error(`Download failed: ${error.message}`);
    },
  });
};
