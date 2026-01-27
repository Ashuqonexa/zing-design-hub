import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SalaryBreakdown } from "@/types/payroll";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SalaryBreakdownCardProps {
  breakdown: SalaryBreakdown;
  month?: string;
  year?: number;
}

export function SalaryBreakdownCard({ breakdown, month = "January", year = 2026 }: SalaryBreakdownCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const earningsItems = [
    { label: "Basic Salary", value: breakdown.basic },
    { label: "House Rent Allowance (HRA)", value: breakdown.hra },
    { label: "Conveyance Allowance", value: breakdown.conveyance },
    { label: "Medical Allowance", value: breakdown.medical },
    { label: "Special Allowance", value: breakdown.special },
  ];

  const deductionItems = [
    { label: "Provident Fund (PF)", value: breakdown.pf },
    { label: "Professional Tax", value: breakdown.professionalTax },
    { label: "Income Tax (TDS)", value: breakdown.incomeTax },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Salary Breakdown</span>
          <span className="text-sm font-normal text-muted-foreground">
            {month} {year}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earnings Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <h4 className="font-medium text-foreground">Earnings</h4>
          </div>
          <div className="space-y-2">
            {earningsItems.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-foreground">Gross Salary</span>
            <span className="text-emerald-600">
              {formatCurrency(breakdown.grossSalary)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Deductions Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <h4 className="font-medium text-foreground">Deductions</h4>
          </div>
          <div className="space-y-2">
            {deductionItems.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-red-600">
                  -{formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-foreground">Total Deductions</span>
            <span className="text-red-600">
              -{formatCurrency(breakdown.totalDeductions)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Net Salary */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Net Salary</span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(breakdown.netSalary)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
