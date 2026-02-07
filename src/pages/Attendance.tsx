import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ClockInOutCard } from "@/components/attendance/ClockInOutCard";
import { AttendanceCalendarView } from "@/components/attendance/AttendanceCalendarView";
import { AttendanceStatsCards } from "@/components/attendance/AttendanceStatsCards";
import { DailyStatsCard } from "@/components/attendance/DailyStatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAttendance } from "@/hooks/useAttendance";
import { format } from "date-fns";

export default function Attendance() {
  const {
    todayRecord,
    loading,
    clockLoading,
    clockIn,
    clockOut,
    getCalendarData,
    getMonthlyStats,
  } = useAttendance();

  const monthlyStats = getMonthlyStats();
  const calendarData = getCalendarData();

  // Simple daily stats from the user's own today record
  const dailyStats = {
    present: todayRecord?.status === "present" ? 1 : 0,
    absent: !todayRecord ? 1 : 0,
    late: todayRecord?.status === "late" ? 1 : 0,
    remote: todayRecord?.status === "remote" ? 1 : 0,
    onLeave: 0,
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 animate-fade-in">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
          <Skeleton className="h-96" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Attendance Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your attendance, clock-in/out times, and view reports.
          </p>
        </div>

        <AttendanceStatsCards stats={monthlyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <ClockInOutCard
              todayRecord={todayRecord}
              onClockIn={clockIn}
              onClockOut={clockOut}
              loading={clockLoading}
            />
            <DailyStatsCard stats={dailyStats} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-4">
                <AttendanceCalendarView attendanceData={calendarData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
