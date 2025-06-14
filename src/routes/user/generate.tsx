import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";
import { createReportSchema, type CreateReportInput } from "@/lib/schema";
import { createReport } from "@/lib/api";
import {
  GenerateLoading,
  PreviewContent,
  SuccessContent,
  FormSummary,
  FormContent,
  FormLoading,
} from "@/components/generate";
import { formatValue } from "@/lib/utils";
``;

export const Route = createFileRoute("/user/generate")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateReportInput>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      reportType: "STOCK_SUMMARY",
      timeRange: "TODAY",
      mimeType: "APPLICATION_PDF",
      customRequest: "",
    },
  });

  const createReportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (error) => {
      console.error("Failed to generate report:", error);
    },
  });

  const onSubmit = (data: CreateReportInput) => {
    createReportMutation.mutate(data);
  };

  const handleCreateAnother = () => {
    setIsSuccess(false);
    form.reset();
    createReportMutation.reset();
  };

  const isLoading = createReportMutation.isPending;
  const formValues = form.getValues();

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 -mt-16">
        {/* LEFT CARD - Form or Summary */}
        <Card className={`lg:col-span-2 ${isLoading ? "opacity-75" : ""}`}>
          <CardHeader>
            <CardTitle>
              {isSuccess ? "Report Configuration" : "Generate Report"}
            </CardTitle>
            <CardDescription>
              {isSuccess
                ? "Your selected settings"
                : isLoading
                ? "Processing your request..."
                : "Configure your report settings and generate a new report"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <FormSummary
                formValues={formValues}
                formatValue={formatValue}
                onCreateAnother={handleCreateAnother}
              />
            ) : isLoading ? (
              <FormLoading formValues={formValues} formatValue={formatValue} />
            ) : (
              <FormContent
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
        {/* RIGHT CARD - Preview/Loading/Success */}
        <Card
          className={`lg:col-span-3 ${
            isSuccess ? "border-green-200 bg-green-50" : ""
          }`}
        >
          <CardHeader className={isSuccess ? "text-center" : ""}>
            {isSuccess && (
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            )}
            <CardTitle
              className={`flex items-center ${
                isSuccess ? "text-green-800 justify-center" : ""
              }`}
            >
              {isSuccess ? (
                "Report request submitted successfully!"
              ) : isLoading ? (
                "Sending request..."
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Preview & download your report
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <SuccessContent />
            ) : isLoading ? (
              <GenerateLoading />
            ) : (
              <PreviewContent />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
