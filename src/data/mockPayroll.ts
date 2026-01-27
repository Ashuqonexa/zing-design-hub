import { PayslipRecord, PayrollSummaryStats, SalaryBreakdown } from "@/types/payroll";

const generateBreakdown = (basic: number): SalaryBreakdown => {
  const hra = Math.round(basic * 0.4);
  const conveyance = 1600;
  const medical = 1250;
  const special = Math.round(basic * 0.15);
  const bonus = 0;
  const grossSalary = basic + hra + conveyance + medical + special + bonus;
  
  const pf = Math.round(basic * 0.12);
  const professionalTax = 200;
  const incomeTax = Math.round(grossSalary * 0.1);
  const totalDeductions = pf + professionalTax + incomeTax;
  
  const netSalary = grossSalary - totalDeductions;
  
  return {
    basic,
    hra,
    conveyance,
    medical,
    special,
    bonus,
    grossSalary,
    pf,
    professionalTax,
    incomeTax,
    totalDeductions,
    netSalary,
  };
};

export const mockPayslips: PayslipRecord[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    month: "January",
    year: 2026,
    paymentDate: "2026-01-31",
    status: "processing",
    netSalary: 72450,
    breakdown: generateBreakdown(45000),
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    month: "January",
    year: 2026,
    paymentDate: "2026-01-31",
    status: "processing",
    netSalary: 58360,
    breakdown: generateBreakdown(35000),
  },
  {
    id: "3",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    month: "December",
    year: 2025,
    paymentDate: "2025-12-31",
    status: "paid",
    netSalary: 72450,
    breakdown: generateBreakdown(45000),
  },
  {
    id: "4",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    month: "December",
    year: 2025,
    paymentDate: "2025-12-31",
    status: "paid",
    netSalary: 58360,
    breakdown: generateBreakdown(35000),
  },
  {
    id: "5",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    month: "December",
    year: 2025,
    paymentDate: "2025-12-31",
    status: "paid",
    netSalary: 48290,
    breakdown: generateBreakdown(28000),
  },
  {
    id: "6",
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    month: "December",
    year: 2025,
    paymentDate: "2025-12-31",
    status: "paid",
    netSalary: 85540,
    breakdown: generateBreakdown(55000),
  },
  {
    id: "7",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    month: "December",
    year: 2025,
    paymentDate: "2025-12-31",
    status: "pending",
    netSalary: 52325,
    breakdown: generateBreakdown(32000),
  },
  {
    id: "8",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    month: "November",
    year: 2025,
    paymentDate: "2025-11-30",
    status: "paid",
    netSalary: 72450,
    breakdown: generateBreakdown(45000),
  },
];

export const mockPayrollStats: PayrollSummaryStats = {
  totalPayroll: 560000,
  totalEmployees: 8,
  pendingPayments: 1,
  processedThisMonth: 7,
  averageSalary: 70000,
  totalTaxDeducted: 56000,
};

export const currentUserSalary: SalaryBreakdown = generateBreakdown(45000);
