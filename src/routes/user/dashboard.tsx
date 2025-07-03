import { SuspenseWithError } from "@/components/SuspenseWithError";
import { PageError } from "@/components/ui/error";
import { PageLoading } from "@/components/ui/loading";
import { createFileRoute, Link, useRouteContext } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  TrendingUp,
  Clock,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Upload,
  Plus,
} from "lucide-react";
import { getReports } from "@/lib/api";
import {
  formatReportType,
  formatDate,
  formatStatus,
  formatMimeType,
} from "@/lib/utils";

export const Route = createFileRoute("/user/dashboard")({
  component: () => (
    <SuspenseWithError
      fallback={<PageLoading />}
      errorFallback={({ error, resetErrorBoundary }) => (
        <div className="container mx-auto py-6">
          <PageError
            message={`Failed to load dashboard: ${error.message}`}
            onRetry={resetErrorBoundary}
          />
        </div>
      )}
    >
      <RouteComponent />
    </SuspenseWithError>
  ),
});

function RouteComponent() {
  const { user } = useRouteContext({ from: "/user/dashboard" });
  const { data: reportData } = useSuspenseQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  // Calculate stats from real data
  const stats = {
    totalReports: reportData?.length || 0,
    reportsThisMonth:
      reportData?.filter((report) => {
        const reportDate = new Date(report.createdAt);
        const now = new Date();
        return (
          reportDate.getMonth() === now.getMonth() &&
          reportDate.getFullYear() === now.getFullYear()
        );
      }).length || 0,
    successRate:
      reportData?.length > 0
        ? (
            (reportData.filter((report) => report.status === "READY").length /
              reportData.length) *
            100
          ).toFixed(1)
        : 0,
  };

  // Get recent reports (last 4)
  const recentReports = reportData?.slice(0, 4) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "READY":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "PROCESSING":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const formattedStatus = formatStatus(status);
    switch (status) {
      case "READY":
        return (
          <Badge className="bg-green-100 text-green-800">
            {formattedStatus}
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-blue-100 text-blue-800">{formattedStatus}</Badge>
        );
      case "FAILED":
        return <Badge variant="destructive">{formattedStatus}</Badge>;
      default:
        return <Badge variant="secondary">{formattedStatus}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="space-y-6 -mt-16">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{user?.name}, here are some Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 justify-start"
                asChild
              >
                <Link to="/user/generate">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">
                        Generate comprehensive analysis
                      </p>
                      <p className="text-sm text-gray-600">
                        Financial reports in minutes
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 justify-start"
                asChild
              >
                <Link to="/user/generate">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">Upload & Analyze</p>
                      <p className="text-sm text-gray-600">
                        Upload data for instant insights
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 justify-start"
                asChild
              >
                <Link to="/user/analytics">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium">View Analytics</p>
                      <p className="text-sm text-gray-600">
                        See your report trends
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Reports
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalReports}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.reportsThisMonth}
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Keep it up!
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.successRate}%
                  </p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Excellent performance
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Your latest report generation activity
                </CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link to="/user/reports">View All Reports</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentReports.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No reports generated yet</p>
                <Button asChild>
                  <Link to="/user/generate">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Your First Report
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(report.status)}
                      <div>
                        <p className="font-medium">{report.reportName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">
                            {formatDate(report.createdAt)}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {formatReportType(report.reportType)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {formatMimeType(report.mimeType)}
                          </Badge>
                        </div>
                        {report.errorMessage && (
                          <p className="text-sm text-red-600 mt-1">
                            {report.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      {report.status === "READY" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">
                  {stats.totalReports === 0
                    ? "Ready to generate your first report?"
                    : "Haven't generated a report recently?"}
                </h3>
                <p className="text-blue-700 text-sm mt-1">
                  {stats.totalReports === 0
                    ? "Get started with AI-powered financial insights in minutes."
                    : "Upload your latest financial data and get AI-powered insights in minutes."}
                </p>
              </div>
              <Button asChild>
                <Link to="/user/generate">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
