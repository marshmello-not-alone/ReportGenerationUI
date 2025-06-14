import { z } from "zod";

export const createReportSchema = z.object({
  reportType: z.enum(["STOCK_SUMMARY", "MACRO_TRENDS", "CUSTOM"]),
  timeRange: z.enum(["TODAY", "LAST_7_DAYS", "LAST_30_DAYS"]),
  customRequest: z.string().optional(),
  mimeType: z.enum(["APPLICATION_PDF", "TEXT_CSV", "APPLICATION_JSON"]),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
