import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ClockInOutCard } from "@/components/attendance/ClockInOutCard";
import { AttendanceCalendarView } from "@/components/attendance/AttendanceCalendarView";
import { AttendanceStatsCards } from "@/components/attendance/AttendanceStatsCards";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { DailyStatsCard } from "@/components/attendance/DailyStatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockAttendanceRecords,
  mockDailyStats,
  monthlyStats,
  generateCalendarAttendance,
} from "@/data/mockAttendance";

export default function Attendance() {
  const [calendarData] = useState(() => generateCalendarAttendance());

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Attendance Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Track employee attendance, clock-in/out times, and view reports.
          </p>
        </div>

        {/* Monthly Stats */}
        <AttendanceStatsCards stats={monthlyStats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Clock In/Out and Daily Stats */}
          <div className="space-y-6">
            <ClockInOutCard />
            <DailyStatsCard stats={mockDailyStats} />
          </div>

          {/* Right Column - Calendar and Table */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="daily">Daily Report</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-4">
                <AttendanceCalendarView attendanceData={calendarData} />
              </TabsContent>

              <TabsContent value="daily" className="mt-4">
                <AttendanceTable
                  records={mockAttendanceRecords}
                  title="Today's Attendance - January 27, 2026"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
