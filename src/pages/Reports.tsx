import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportFiltersCard } from "@/components/reports/ReportFiltersCard";
import { ReportExportButtons } from "@/components/reports/ReportExportButtons";
import { AttendanceReportChart } from "@/components/reports/AttendanceReportChart";
import { LeaveReportChart } from "@/components/reports/LeaveReportChart";
import { PayrollReportChart } from "@/components/reports/PayrollReportChart";
import { ReportFilters, ReportType } from "@/types/reports";
import { FileBarChart } from "lucide-react";

export default function Reports() {
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: "attendance",
    startDate: undefined,
    endDate: undefined,
    department: "all",
  });

  const reportTitles: Record<ReportType, string> = {
    attendance: "Attendance Analytics",
    leave: "Leave Analytics",
    payroll: "Payroll Analytics",
  };

  const renderReportChart = () => {
    switch (filters.reportType) {
      case "attendance":
        return <AttendanceReportChart />;
      case "leave":
        return <LeaveReportChart />;
      case "payroll":
        return <PayrollReportChart />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileBarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports</h1>
              <p className="text-muted-foreground">
                Generate and download analytics reports
              </p>
            </div>
          </div>
          <ReportExportButtons reportType={filters.reportType} />
        </div>

        {/* Filters */}
        <ReportFiltersCard filters={filters} onFiltersChange={setFilters} />

        {/* Report Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {reportTitles[filters.reportType]}
          </h2>
        </div>

        {/* Report Content */}
        {renderReportChart()}
      </div>
    </DashboardLayout>
  );
}
