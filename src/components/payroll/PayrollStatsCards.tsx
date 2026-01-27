import { DollarSign, Users, Clock, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PayrollSummaryStats } from "@/types/payroll";

interface PayrollStatsCardsProps {
  stats: PayrollSummaryStats;
}

export function PayrollStatsCards({ stats }: PayrollStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Payroll",
      value: formatCurrency(stats.totalPayroll),
      subtitle: "This month",
      icon: DollarSign,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      subtitle: `${stats.processedThisMonth} processed`,
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      subtitle: "Awaiting approval",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Tax Deducted",
      value: formatCurrency(stats.totalTaxDeducted),
      subtitle: "TDS this month",
      icon: Receipt,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
