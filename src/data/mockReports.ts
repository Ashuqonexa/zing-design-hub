import { AttendanceReportData, LeaveReportData, PayrollReportData } from "@/types/reports";

export const mockAttendanceReportData: AttendanceReportData[] = [
  { month: "Aug", present: 20, absent: 1, late: 2, remote: 2 },
  { month: "Sep", present: 19, absent: 2, late: 3, remote: 1 },
  { month: "Oct", present: 21, absent: 0, late: 1, remote: 3 },
  { month: "Nov", present: 18, absent: 2, late: 3, remote: 2 },
  { month: "Dec", present: 19, absent: 1, late: 2, remote: 3 },
  { month: "Jan", present: 18, absent: 1, late: 2, remote: 1 },
];

export const mockLeaveReportData: LeaveReportData[] = [
  { type: "Annual", approved: 12, pending: 3, rejected: 2 },
  { type: "Sick", approved: 8, pending: 1, rejected: 1 },
  { type: "Personal", approved: 5, pending: 2, rejected: 0 },
  { type: "Maternity", approved: 1, pending: 0, rejected: 0 },
  { type: "Unpaid", approved: 2, pending: 1, rejected: 1 },
];

export const mockPayrollReportData: PayrollReportData[] = [
  { month: "Aug", grossPay: 720000, deductions: 86400, netPay: 633600 },
  { month: "Sep", grossPay: 735000, deductions: 88200, netPay: 646800 },
  { month: "Oct", grossPay: 745000, deductions: 89400, netPay: 655600 },
  { month: "Nov", grossPay: 750000, deductions: 90000, netPay: 660000 },
  { month: "Dec", grossPay: 780000, deductions: 93600, netPay: 686400 },
  { month: "Jan", grossPay: 795000, deductions: 95400, netPay: 699600 },
];

export const departmentOptions = [
  { value: "all", label: "All Departments" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
];
