export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: "present" | "absent" | "late" | "half-day" | "remote";
  workHours: number;
  overtime: number;
}

export interface DailyStats {
  present: number;
  absent: number;
  late: number;
  remote: number;
  onLeave: number;
}

export const attendanceStatusConfig = {
  present: { label: "Present", color: "bg-emerald-100 text-emerald-700" },
  absent: { label: "Absent", color: "bg-red-100 text-red-700" },
  late: { label: "Late", color: "bg-amber-100 text-amber-700" },
  "half-day": { label: "Half Day", color: "bg-orange-100 text-orange-700" },
  remote: { label: "Remote", color: "bg-blue-100 text-blue-700" },
} as const;
