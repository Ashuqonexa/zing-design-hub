import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronRight } from "lucide-react";

const data = [
  { name: "Present", value: 18, color: "hsl(142, 76%, 36%)" },
  { name: "Remote", value: 4, color: "hsl(38, 92%, 50%)" },
  { name: "Absent", value: 2, color: "hsl(0, 84%, 60%)" },
];

const total = data.reduce((acc, item) => acc + item.value, 0);
const presentPercentage = Math.round((data[0].value / total) * 100);

export function AttendanceChart() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Attendance Overview
      </h3>

      <div className="flex items-center gap-6">
        {/* Chart */}
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {presentPercentage}%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}:</span>
              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
        View Details
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
