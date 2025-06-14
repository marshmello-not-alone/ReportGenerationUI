import { FileText } from "lucide-react";

const PreviewContent = () => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
        <FileText className="w-15 h-15 text-primary stroke-[1.5]" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Let's get started!</strong> Choose the type of report and time
          range on the left, then click Generate Report. Your preview will show
          up here, as well the report will be available to download.
        </p>
      </div>
    </div>

    {/* Separator */}
    <div className="border-t border-border"></div>

    {/* How it works Section */}
    <div className="space-y-4">
      <h4 className="font-medium text-base">How it works</h4>
      <div className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="font-medium text-foreground mb-1">
            1. Choose your report settings
          </p>
          <p>
            Use the form on the left to select the report type, time range, and
            file format. You can also add any special requirements.
          </p>
        </div>

        <div>
          <p className="font-medium text-foreground mb-1">
            2. Generate the report
          </p>
          <p>
            Once your selections are made, click "Generate Report". The system
            will process your request. Takes 2-5 minutes to complete.
          </p>
        </div>

        <div>
          <p className="font-medium text-foreground mb-1">
            3. View a live preview
          </p>
          <p>
            A preview of your report will appear here with key highlights and
            insights. You will need to refresh the page.
          </p>
        </div>

        <div>
          <p className="font-medium text-foreground mb-1">
            4. Download or share
          </p>
          <p>
            You'll be able to download the report as a file or email it directly
            from this page.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PreviewContent;
