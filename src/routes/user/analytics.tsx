import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/user/analytics")({
  component: RouteComponent,
});

// Mock data - replace with real API call
const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      // const response = await fetch("/api/reports/analytics", { credentials: "include" });
      // return response.json();

      // Mock data for now
      return {
        overview: {
          totalReports: 47,
          reportsThisMonth: 12,
          successRate: 89.4,
          avgGenerationTime: "2.3 minutes",
        },
        chartData: {
          monthlyReports: [
            { month: "Jul", reports: 8, successful: 7, failed: 1 },
            { month: "Aug", reports: 15, successful: 14, failed: 1 },
            { month: "Sep", reports: 12, successful: 10, failed: 2 },
            { month: "Oct", reports: 18, successful: 16, failed: 2 },
            { month: "Nov", reports: 22, successful: 20, failed: 2 },
            { month: "Dec", reports: 12, successful: 11, failed: 1 },
          ],
          reportTypes: [
            { type: "Financial", count: 18, percentage: 38.3 },
            { type: "Marketing", count: 15, percentage: 31.9 },
            { type: "Operations", count: 14, percentage: 29.8 },
          ],
        },
        recentActivity: [
          {
            id: 1,
            name: "Q4 Financial Report",
            status: "completed",
            createdAt: "2024-12-01T10:30:00Z",
            duration: "1.2 min",
          },
          {
            id: 2,
            name: "Marketing Analysis",
            status: "failed",
            createdAt: "2024-12-01T09:15:00Z",
            error: "Data source unavailable",
          },
          {
            id: 3,
            name: "Sales Performance",
            status: "completed",
            createdAt: "2024-11-30T16:45:00Z",
            duration: "3.1 min",
          },
          {
            id: 4,
            name: "Customer Insights",
            status: "completed",
            createdAt: "2024-11-30T14:20:00Z",
            duration: "2.8 min",
          },
        ],
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

function RouteComponent() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { overview, chartData, recentActivity } = analytics || {};

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="space-y-6 -mt-16">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Reports
                  </p>
                  <p className="text-3xl font-bold">{overview?.totalReports}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    This Month
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.reportsThisMonth}
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +23% from last month
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold">{overview?.successRate}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Excellent performance
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Generation Time
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.avgGenerationTime}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    -15% faster
                  </p>
                </div>
                <Activity className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Reports Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Reports Generated Over Time</CardTitle>
              <CardDescription>
                Monthly report generation trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData?.monthlyReports.map((month) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">
                        {month.month}
                      </span>
                      <div className="flex gap-2">
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          {month.successful} ✓
                        </Badge>
                        {month.failed > 0 && (
                          <Badge
                            variant="destructive"
                            className="bg-red-100 text-red-800"
                          >
                            {month.failed} ✗
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {month.reports} total
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Types Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
              <CardDescription>Breakdown by report category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData?.reportTypes.map((type) => (
                  <div key={type.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{type.type}</span>
                      <span className="text-muted-foreground">
                        {type.count} ({type.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest report generation activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleDateString()} at{" "}
                        {new Date(activity.createdAt).toLocaleTimeString()}
                      </p>
                      {activity.error && (
                        <p className="text-sm text-red-600">{activity.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {activity.status}
                    </Badge>
                    {activity.duration && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.duration}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
