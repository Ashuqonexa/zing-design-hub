import { Users, Clock, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AttendanceStatsCardsProps {
  stats: {
    totalWorkingDays: number;
    daysPresent: number;
    daysAbsent: number;
    daysLate: number;
    daysRemote: number;
    totalWorkHours: number;
    averageWorkHours: number;
    totalOvertime: number;
  };
}

export function AttendanceStatsCards({ stats }: AttendanceStatsCardsProps) {
  const attendanceRate = Math.round((stats.daysPresent / stats.totalWorkingDays) * 100);

  const statCards = [
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      subtitle: `${stats.daysPresent}/${stats.totalWorkingDays} days`,
      icon: Users,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Work Hours",
      value: `${stats.totalWorkHours}h`,
      subtitle: `Avg ${stats.averageWorkHours}h/day`,
      icon: Clock,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Overtime Hours",
      value: `${stats.totalOvertime}h`,
      subtitle: "This month",
      icon: TrendingUp,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Days Late",
      value: stats.daysLate,
      subtitle: `${stats.daysRemote} remote days`,
      icon: Calendar,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
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
