export interface SalaryBreakdown {
  basic: number;
  hra: number;
  conveyance: number;
  medical: number;
  special: number;
  bonus: number;
  grossSalary: number;
  pf: number;
  professionalTax: number;
  incomeTax: number;
  totalDeductions: number;
  netSalary: number;
}

export interface PayslipRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  paymentDate: string;
  status: "paid" | "pending" | "processing";
  netSalary: number;
  breakdown: SalaryBreakdown;
}

export interface PayrollSummaryStats {
  totalPayroll: number;
  totalEmployees: number;
  pendingPayments: number;
  processedThisMonth: number;
  averageSalary: number;
  totalTaxDeducted: number;
}

export const paymentStatusConfig = {
  paid: { label: "Paid", color: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700" },
} as const;
