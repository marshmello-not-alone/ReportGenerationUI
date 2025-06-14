import { Button } from "@/components/ui/button";

interface FormSummaryProps {
  formValues: {
    reportType: string;
    timeRange: string;
    mimeType: string;
    customRequest?: string;
  };
  formatValue: (value: string) => string;
  onCreateAnother: () => void;
}

const FormSummary = ({
  formValues,
  formatValue,
  onCreateAnother,
}: FormSummaryProps) => (
  <div className="space-y-4">
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="font-medium">Report Type:</span>
        <span>{formatValue(formValues.reportType)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Time Range:</span>
        <span>{formatValue(formValues.timeRange)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">File Type:</span>
        <span>{formatValue(formValues.mimeType)}</span>
      </div>
      {formValues.customRequest && (
        <div>
          <span className="font-medium">Requirements:</span>
          <p className="mt-1 text-muted-foreground">
            {formValues.customRequest}
          </p>
        </div>
      )}
    </div>

    <Button variant="outline" onClick={onCreateAnother} className="w-full">
      Create Another Report
    </Button>
  </div>
);

export default FormSummary;
