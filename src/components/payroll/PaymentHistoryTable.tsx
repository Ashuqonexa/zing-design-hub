import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PayslipRecord, paymentStatusConfig } from "@/types/payroll";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PaymentHistoryTableProps {
  records: PayslipRecord[];
  onViewPayslip: (record: PayslipRecord) => void;
}

export function PaymentHistoryTable({ records, onViewPayslip }: PaymentHistoryTableProps) {
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = (record: PayslipRecord) => {
    // Generate payslip content
    const content = `
PAYSLIP
=====================================
Employee: ${record.employeeName}
Employee ID: ${record.employeeId}
Period: ${record.month} ${record.year}
Payment Date: ${record.paymentDate}

EARNINGS
-------------------------------------
Basic Salary:        ${formatCurrency(record.breakdown.basic)}
HRA:                 ${formatCurrency(record.breakdown.hra)}
Conveyance:          ${formatCurrency(record.breakdown.conveyance)}
Medical:             ${formatCurrency(record.breakdown.medical)}
Special Allowance:   ${formatCurrency(record.breakdown.special)}
-------------------------------------
Gross Salary:        ${formatCurrency(record.breakdown.grossSalary)}

DEDUCTIONS
-------------------------------------
Provident Fund:      ${formatCurrency(record.breakdown.pf)}
Professional Tax:    ${formatCurrency(record.breakdown.professionalTax)}
Income Tax (TDS):    ${formatCurrency(record.breakdown.incomeTax)}
-------------------------------------
Total Deductions:    ${formatCurrency(record.breakdown.totalDeductions)}

=====================================
NET SALARY:          ${formatCurrency(record.breakdown.netSalary)}
=====================================
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${record.employeeName.replace(" ", "_")}_${record.month}_${record.year}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ${record.month} ${record.year} has been downloaded.`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => {
              const statusConfig = paymentStatusConfig[record.status];
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {getInitials(record.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {record.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.employeeId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {record.month} {record.year}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {record.paymentDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(record.netSalary)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("font-medium", statusConfig.color)}
                    >
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onViewPayslip(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(record)}
                        disabled={record.status !== "paid"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
