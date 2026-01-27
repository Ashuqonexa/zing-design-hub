import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PayrollStatsCards } from "@/components/payroll/PayrollStatsCards";
import { SalaryBreakdownCard } from "@/components/payroll/SalaryBreakdownCard";
import { PaymentHistoryTable } from "@/components/payroll/PaymentHistoryTable";
import { PayslipDialog } from "@/components/payroll/PayslipDialog";
import { TaxSummaryCard } from "@/components/payroll/TaxSummaryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockPayslips,
  mockPayrollStats,
  currentUserSalary,
} from "@/data/mockPayroll";
import { PayslipRecord } from "@/types/payroll";

export default function Payroll() {
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipRecord | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewPayslip = (record: PayslipRecord) => {
    setSelectedPayslip(record);
    setDialogOpen(true);
  };

  // Filter records for different tabs
  const currentMonthRecords = mockPayslips.filter(
    (r) => r.month === "January" && r.year === 2026
  );
  const paidRecords = mockPayslips.filter((r) => r.status === "paid");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Payroll Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage salaries, view payment history, and download payslips.
          </p>
        </div>

        {/* Stats Cards */}
        <PayrollStatsCards stats={mockPayrollStats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Salary Breakdown and Tax */}
          <div className="space-y-6">
            <SalaryBreakdownCard breakdown={currentUserSalary} />
            <TaxSummaryCard
              monthlyTax={currentUserSalary.incomeTax}
              yearlyTaxPaid={currentUserSalary.incomeTax * 10}
              estimatedYearlyTax={currentUserSalary.incomeTax * 12}
            />
          </div>

          {/* Right Column - Payment History */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="current">Current Month</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <PaymentHistoryTable
                  records={mockPayslips}
                  onViewPayslip={handleViewPayslip}
                />
              </TabsContent>

              <TabsContent value="current" className="mt-4">
                <PaymentHistoryTable
                  records={currentMonthRecords}
                  onViewPayslip={handleViewPayslip}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <PaymentHistoryTable
                  records={paidRecords}
                  onViewPayslip={handleViewPayslip}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Payslip Dialog */}
        <PayslipDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          payslip={selectedPayslip}
        />
      </div>
    </DashboardLayout>
  );
}
