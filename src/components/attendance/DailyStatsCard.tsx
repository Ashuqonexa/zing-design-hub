import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyStats } from "@/types/attendance";

interface DailyStatsCardProps {
  stats: DailyStats;
}

export function DailyStatsCard({ stats }: DailyStatsCardProps) {
  const total = stats.present + stats.absent + stats.late + stats.remote + stats.onLeave;

  const statItems = [
    { label: "Present", value: stats.present, color: "bg-emerald-500" },
    { label: "Absent", value: stats.absent, color: "bg-red-500" },
    { label: "Late", value: stats.late, color: "bg-amber-500" },
    { label: "Remote", value: stats.remote, color: "bg-blue-500" },
    { label: "On Leave", value: stats.onLeave, color: "bg-purple-500" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Today's Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-3 rounded-full overflow-hidden bg-muted">
          {statItems.map((item) => {
            const percentage = (item.value / total) * 100;
            if (percentage === 0) return null;
            return (
              <div
                key={item.label}
                className={`${item.color} transition-all`}
                style={{ width: `${percentage}%` }}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {statItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}:</span>
              <span className="text-sm font-semibold text-foreground ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Total Employees
            </span>
            <span className="text-lg font-bold text-foreground">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
