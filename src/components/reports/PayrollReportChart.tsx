import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { mockPayrollReportData } from "@/data/mockReports";
import { IndianRupee, TrendingUp, Receipt, Wallet } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompact = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
  return `₹${value}`;
};

const totalGrossPay = mockPayrollReportData.reduce((acc, item) => acc + item.grossPay, 0);
const totalDeductions = mockPayrollReportData.reduce((acc, item) => acc + item.deductions, 0);
const totalNetPay = mockPayrollReportData.reduce((acc, item) => acc + item.netPay, 0);
const avgNetPay = totalNetPay / mockPayrollReportData.length;

export function PayrollReportChart() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Gross Pay</p>
                <p className="text-xl font-bold text-foreground">{formatCompact(totalGrossPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Receipt className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-xl font-bold text-foreground">{formatCompact(totalDeductions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Net Pay</p>
                <p className="text-xl font-bold text-foreground">{formatCompact(totalNetPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Monthly Net</p>
                <p className="text-xl font-bold text-foreground">{formatCompact(avgNetPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Payroll Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payroll Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPayrollReportData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs" 
                    tickFormatter={(value) => formatCompact(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="grossPay" 
                    name="Gross Pay"
                    stroke="hsl(217, 91%, 60%)" 
                    fill="hsl(217, 91%, 60%)" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="netPay" 
                    name="Net Pay"
                    stroke="hsl(142, 76%, 36%)" 
                    fill="hsl(142, 76%, 36%)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Deductions Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPayrollReportData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs" 
                    tickFormatter={(value) => formatCompact(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="deductions" 
                    name="Deductions" 
                    fill="hsl(0, 84%, 60%)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Gross Pay</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Deductions</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Net Pay</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Deduction %</th>
                </tr>
              </thead>
              <tbody>
                {mockPayrollReportData.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{item.month} 2025</td>
                    <td className="py-3 px-4 text-sm text-right text-foreground">{formatCurrency(item.grossPay)}</td>
                    <td className="py-3 px-4 text-sm text-right text-red-600">{formatCurrency(item.deductions)}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-emerald-600">{formatCurrency(item.netPay)}</td>
                    <td className="py-3 px-4 text-sm text-right text-muted-foreground">
                      {((item.deductions / item.grossPay) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
