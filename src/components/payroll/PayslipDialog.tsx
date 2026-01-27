import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PayslipRecord, paymentStatusConfig } from "@/types/payroll";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PayslipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payslip: PayslipRecord | null;
}

export function PayslipDialog({ open, onOpenChange, payslip }: PayslipDialogProps) {
  const { toast } = useToast();

  if (!payslip) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = () => {
    const content = `
PAYSLIP - ${payslip.month} ${payslip.year}
=====================================
Employee: ${payslip.employeeName}
Employee ID: ${payslip.employeeId}
Payment Date: ${payslip.paymentDate}

EARNINGS
-------------------------------------
Basic Salary:        ${formatCurrency(payslip.breakdown.basic)}
HRA:                 ${formatCurrency(payslip.breakdown.hra)}
Conveyance:          ${formatCurrency(payslip.breakdown.conveyance)}
Medical:             ${formatCurrency(payslip.breakdown.medical)}
Special Allowance:   ${formatCurrency(payslip.breakdown.special)}
-------------------------------------
Gross Salary:        ${formatCurrency(payslip.breakdown.grossSalary)}

DEDUCTIONS
-------------------------------------
Provident Fund:      ${formatCurrency(payslip.breakdown.pf)}
Professional Tax:    ${formatCurrency(payslip.breakdown.professionalTax)}
Income Tax (TDS):    ${formatCurrency(payslip.breakdown.incomeTax)}
-------------------------------------
Total Deductions:    ${formatCurrency(payslip.breakdown.totalDeductions)}

=====================================
NET SALARY:          ${formatCurrency(payslip.breakdown.netSalary)}
=====================================
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${payslip.employeeName.replace(" ", "_")}_${payslip.month}_${payslip.year}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ${payslip.month} ${payslip.year} has been downloaded.`,
    });
  };

  const statusConfig = paymentStatusConfig[payslip.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Payslip - {payslip.month} {payslip.year}</span>
            <Badge
              variant="secondary"
              className={cn("font-medium", statusConfig.color)}
            >
              {statusConfig.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Employee Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Employee Name</p>
                <p className="font-medium text-foreground">{payslip.employeeName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Employee ID</p>
                <p className="font-medium text-foreground">{payslip.employeeId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pay Period</p>
                <p className="font-medium text-foreground">{payslip.month} {payslip.year}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Date</p>
                <p className="font-medium text-foreground">{payslip.paymentDate}</p>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Earnings</h4>
            <div className="space-y-2">
              {[
                { label: "Basic Salary", value: payslip.breakdown.basic },
                { label: "HRA", value: payslip.breakdown.hra },
                { label: "Conveyance", value: payslip.breakdown.conveyance },
                { label: "Medical", value: payslip.breakdown.medical },
                { label: "Special Allowance", value: payslip.breakdown.special },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground">{formatCurrency(item.value)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Gross Salary</span>
                <span className="text-emerald-600">
                  {formatCurrency(payslip.breakdown.grossSalary)}
                </span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Deductions</h4>
            <div className="space-y-2">
              {[
                { label: "Provident Fund", value: payslip.breakdown.pf },
                { label: "Professional Tax", value: payslip.breakdown.professionalTax },
                { label: "Income Tax (TDS)", value: payslip.breakdown.incomeTax },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-red-600">-{formatCurrency(item.value)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Deductions</span>
                <span className="text-red-600">
                  -{formatCurrency(payslip.breakdown.totalDeductions)}
                </span>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-foreground">Net Salary</span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(payslip.breakdown.netSalary)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button
              className="flex-1"
              onClick={handleDownload}
              disabled={payslip.status !== "paid"}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Payslip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
