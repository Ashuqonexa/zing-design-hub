import { AttendanceRecord, DailyStats } from "@/types/attendance";

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    date: "2026-01-27",
    clockIn: "09:02",
    clockOut: "18:15",
    status: "present",
    workHours: 9.2,
    overtime: 0.2,
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    date: "2026-01-27",
    clockIn: "09:45",
    clockOut: "18:00",
    status: "late",
    workHours: 8.25,
    overtime: 0,
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    date: "2026-01-27",
    clockIn: null,
    clockOut: null,
    status: "absent",
    workHours: 0,
    overtime: 0,
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    date: "2026-01-27",
    clockIn: "08:55",
    clockOut: "17:30",
    status: "present",
    workHours: 8.58,
    overtime: 0,
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    date: "2026-01-27",
    clockIn: "09:00",
    clockOut: null,
    status: "remote",
    workHours: 0,
    overtime: 0,
  },
  {
    id: "6",
    employeeId: "EMP006",
    employeeName: "Ananya Gupta",
    date: "2026-01-27",
    clockIn: "09:00",
    clockOut: "13:00",
    status: "half-day",
    workHours: 4,
    overtime: 0,
  },
  {
    id: "7",
    employeeId: "EMP007",
    employeeName: "Karthik Nair",
    date: "2026-01-27",
    clockIn: "08:30",
    clockOut: "19:30",
    status: "present",
    workHours: 11,
    overtime: 2,
  },
  {
    id: "8",
    employeeId: "EMP008",
    employeeName: "Meera Joshi",
    date: "2026-01-27",
    clockIn: "09:05",
    clockOut: "18:00",
    status: "present",
    workHours: 8.92,
    overtime: 0,
  },
];

export const mockDailyStats: DailyStats = {
  present: 5,
  absent: 1,
  late: 1,
  remote: 1,
  onLeave: 0,
};

// Generate calendar data for the current month
export const generateCalendarAttendance = (): Record<string, "present" | "absent" | "late" | "remote" | "half-day" | "weekend" | "future"> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendarData: Record<string, "present" | "absent" | "late" | "remote" | "half-day" | "weekend" | "future"> = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    
    if (date > today) {
      calendarData[dateStr] = "future";
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      calendarData[dateStr] = "weekend";
    } else {
      const statuses: ("present" | "late" | "remote")[] = ["present", "present", "present", "present", "late", "remote"];
      calendarData[dateStr] = statuses[Math.floor(Math.random() * statuses.length)];
    }
  }
  
  return calendarData;
};

export const monthlyStats = {
  totalWorkingDays: 22,
  daysPresent: 18,
  daysAbsent: 1,
  daysLate: 2,
  daysRemote: 1,
  totalWorkHours: 162,
  averageWorkHours: 9,
  totalOvertime: 8,
};
