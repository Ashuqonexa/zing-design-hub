import { Users, CalendarCheck, FileWarning } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { PayrollSummary } from "@/components/dashboard/PayrollSummary";
import { LeaveRequests } from "@/components/dashboard/LeaveRequests";
import { Announcements } from "@/components/dashboard/Announcements";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, Amit!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your team today.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Employees"
            value={24}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Today's Attendance"
            value={18}
            subtitle="Present"
            subtitleColor="success"
            icon={<CalendarCheck className="h-5 w-5" />}
          />
          <StatCard
            title="Pending Leave Requests"
            value={3}
            subtitleColor="warning"
            icon={<FileWarning className="h-5 w-5" />}
          />
          <StatCard
            title="Payroll Status"
            value="₹5.6L"
            subtitle="Processing"
            subtitleColor="warning"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AttendanceChart />
              <PayrollSummary />
            </div>
          </div>

          {/* Right Column - Requests & Announcements */}
          <div className="space-y-6">
            <LeaveRequests />
            <Announcements />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
