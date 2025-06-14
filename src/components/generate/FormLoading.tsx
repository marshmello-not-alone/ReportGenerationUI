import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormLoadingProps {
  formValues: {
    reportType: string;
    timeRange: string;
    mimeType: string;
    customRequest?: string;
  };
  formatValue: (value: string) => string;
}

const FormLoading = ({ formValues, formatValue }: FormLoadingProps) => (
  <div className="space-y-6">
    {[
      {
        label: "Select Report type",
        value: formatValue(formValues.reportType),
      },
      { label: "Select Time Range", value: formatValue(formValues.timeRange) },
      { label: "Select file type", value: formatValue(formValues.mimeType) },
      ...(formValues.customRequest
        ? [
            {
              label: "Additional requirements",
              value: formValues.customRequest,
            },
          ]
        : []),
    ].map((field, index) => (
      <div key={index}>
        <label className="text-sm font-medium text-muted-foreground">
          {field.label}
        </label>
        <div className="mt-1 p-3 bg-muted rounded-md text-sm">
          {field.value}
        </div>
      </div>
    ))}

    <Button disabled className="w-full">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  </div>
);

export default FormLoading;
