export type ReportType = "attendance" | "leave" | "payroll";

export interface ReportFilters {
  reportType: ReportType;
  startDate: Date | undefined;
  endDate: Date | undefined;
  department?: string;
}

export interface AttendanceReportData {
  month: string;
  present: number;
  absent: number;
  late: number;
  remote: number;
}

export interface LeaveReportData {
  type: string;
  approved: number;
  pending: number;
  rejected: number;
}

export interface PayrollReportData {
  month: string;
  grossPay: number;
  deductions: number;
  netPay: number;
}
