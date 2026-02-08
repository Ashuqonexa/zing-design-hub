import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format, startOfMonth, endOfMonth, isWeekend, isFuture, parseISO } from "date-fns";

export interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  status: string;
  work_hours: number;
  overtime: number;
  notes: string | null;
}

export function useAttendance() {
  const { user } = useAuth();
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [monthRecords, setMonthRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [clockLoading, setClockLoading] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  const fetchTodayRecord = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("attendance_records")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();
    setTodayRecord(data);
  }, [user, today]);

  const fetchMonthRecords = useCallback(async (monthDate: Date = new Date()) => {
    if (!user) return;
    const start = format(startOfMonth(monthDate), "yyyy-MM-dd");
    const end = format(endOfMonth(monthDate), "yyyy-MM-dd");
    const { data } = await supabase
      .from("attendance_records")
      .select("*")
      .gte("date", start)
      .lte("date", end)
      .order("date", { ascending: true });
    // RLS handles filtering: regular users see only their own, admins/managers see all
    setMonthRecords(data || []);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([fetchTodayRecord(), fetchMonthRecords()]).finally(() => setLoading(false));
  }, [user, fetchTodayRecord, fetchMonthRecords]);

  const clockIn = async () => {
    if (!user) return;
    setClockLoading(true);
    try {
      const now = new Date();
      const clockInTime = now.toISOString();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      // Late if after 9:15 AM
      const isLate = hour > 9 || (hour === 9 && minutes > 15);

      const { error } = await supabase.from("attendance_records").insert({
        user_id: user.id,
        date: today,
        clock_in: clockInTime,
        status: isLate ? "late" : "present",
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("You have already clocked in today");
        } else {
          toast.error("Failed to clock in");
        }
        return;
      }
      toast.success("Clocked in successfully!");
      await fetchTodayRecord();
      await fetchMonthRecords();
    } finally {
      setClockLoading(false);
    }
  };

  const clockOut = async () => {
    if (!user || !todayRecord) return;
    setClockLoading(true);
    try {
      const now = new Date();
      const clockOutTime = now.toISOString();

      let workHours = 0;
      let overtime = 0;
      if (todayRecord.clock_in) {
        const diffMs = now.getTime() - new Date(todayRecord.clock_in).getTime();
        workHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
        overtime = Math.max(0, Math.round((workHours - 9) * 100) / 100);
      }

      const { error } = await supabase
        .from("attendance_records")
        .update({
          clock_out: clockOutTime,
          work_hours: workHours,
          overtime: overtime,
        })
        .eq("id", todayRecord.id);

      if (error) {
        toast.error("Failed to clock out");
        return;
      }
      toast.success("Clocked out successfully!");
      await fetchTodayRecord();
      await fetchMonthRecords();
    } finally {
      setClockLoading(false);
    }
  };

  // Build calendar data from month records
  const getCalendarData = (monthDate: Date = new Date()): Record<string, "present" | "absent" | "late" | "remote" | "half-day" | "weekend" | "future"> => {
    const data: Record<string, "present" | "absent" | "late" | "remote" | "half-day" | "weekend" | "future"> = {};
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    let d = new Date(monthStart);
    while (d <= monthEnd) {
      const dateStr = format(d, "yyyy-MM-dd");
      if (isFuture(d)) {
        data[dateStr] = "future";
      } else if (isWeekend(d)) {
        data[dateStr] = "weekend";
      } else {
        const record = monthRecords.find((r) => r.date === dateStr);
        const status = record?.status as "present" | "absent" | "late" | "remote" | "half-day" | undefined;
        data[dateStr] = status || "absent";
      }
      d = new Date(d.getTime() + 86400000);
    }
    return data;
  };

  // Compute monthly stats
  const getMonthlyStats = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    let totalWorkingDays = 0;
    let d = new Date(monthStart);
    while (d <= monthEnd && !isFuture(d)) {
      if (!isWeekend(d)) totalWorkingDays++;
      d = new Date(d.getTime() + 86400000);
    }

    const present = monthRecords.filter((r) => r.status === "present").length;
    const late = monthRecords.filter((r) => r.status === "late").length;
    const remote = monthRecords.filter((r) => r.status === "remote").length;
    const halfDay = monthRecords.filter((r) => r.status === "half-day").length;
    const daysPresent = present + late + remote + halfDay;
    const daysAbsent = totalWorkingDays - daysPresent;
    const totalWorkHours = Math.round(monthRecords.reduce((sum, r) => sum + Number(r.work_hours), 0) * 100) / 100;
    const totalOvertime = Math.round(monthRecords.reduce((sum, r) => sum + Number(r.overtime), 0) * 100) / 100;
    const averageWorkHours = daysPresent > 0 ? Math.round((totalWorkHours / daysPresent) * 10) / 10 : 0;

    return {
      totalWorkingDays,
      daysPresent,
      daysAbsent: Math.max(0, daysAbsent),
      daysLate: late,
      daysRemote: remote,
      totalWorkHours,
      averageWorkHours,
      totalOvertime,
    };
  };

  return {
    todayRecord,
    monthRecords,
    loading,
    clockLoading,
    clockIn,
    clockOut,
    fetchMonthRecords,
    getCalendarData,
    getMonthlyStats,
  };
}
