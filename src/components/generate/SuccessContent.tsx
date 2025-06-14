import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SuccessContent = () => (
  <div className="space-y-4 text-sm text-green-700">
    <p>
      Our system is now processing your request, which typically takes between 2
      to 5 minutes. Once completed, your report will be available for{" "}
      <Link
        to="/user/reports"
        className="text-blue-600 underline hover:text-blue-800"
      >
        download in the Reports
      </Link>{" "}
      section.
    </p>

    <p>
      In the meantime, feel free to navigate to the Reports tab to track the
      real-time status of your request. From there, you can also view a history
      of all previously generated reports, along with their current statuses and
      download options.
    </p>

    <p>
      You'll be notified once the report is ready. If needed, simply refresh the
      page after a few minutes to access the latest updates.
    </p>

    <div className="pt-4">
      <Link to="/user/reports">
        <Button className="w-full">
          View Reports
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
);

export default SuccessContent;
