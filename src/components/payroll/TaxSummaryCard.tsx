import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Receipt } from "lucide-react";

interface TaxSummaryCardProps {
  monthlyTax: number;
  yearlyTaxPaid: number;
  estimatedYearlyTax: number;
}

export function TaxSummaryCard({ monthlyTax, yearlyTaxPaid, estimatedYearlyTax }: TaxSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const taxProgress = Math.round((yearlyTaxPaid / estimatedYearlyTax) * 100);
  const remainingTax = estimatedYearlyTax - yearlyTaxPaid;
  const monthsRemaining = 12 - new Date().getMonth();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Tax Summary (FY 2025-26)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Monthly TDS</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(monthlyTax)}
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">YTD Tax Paid</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(yearlyTaxPaid)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax Progress</span>
            <span className="font-medium text-foreground">{taxProgress}%</span>
          </div>
          <Progress value={taxProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {formatCurrency(remainingTax)} remaining over {monthsRemaining} months
          </p>
        </div>

        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Yearly Tax</span>
            <span className="font-medium text-foreground">
              {formatCurrency(estimatedYearlyTax)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Avg. Monthly Deduction</span>
            <span className="font-medium text-foreground">
              {formatCurrency(Math.round(estimatedYearlyTax / 12))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
