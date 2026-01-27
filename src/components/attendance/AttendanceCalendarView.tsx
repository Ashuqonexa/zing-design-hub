import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWeekend,
  isFuture,
} from "date-fns";

const statusColors = {
  present: "bg-emerald-500",
  absent: "bg-red-500",
  late: "bg-amber-500",
  remote: "bg-blue-500",
  "half-day": "bg-orange-500",
  weekend: "bg-muted",
  future: "bg-transparent",
};

interface AttendanceCalendarViewProps {
  attendanceData?: Record<string, keyof typeof statusColors>;
}

export function AttendanceCalendarView({ attendanceData = {} }: AttendanceCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const getStatusForDate = (date: Date): keyof typeof statusColors => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (attendanceData[dateStr]) return attendanceData[dateStr];
    if (isFuture(date)) return "future";
    if (isWeekend(date)) return "weekend";
    // Random status for demo
    const statuses: (keyof typeof statusColors)[] = ["present", "present", "present", "late", "remote"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Attendance Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const status = getStatusForDate(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);

            return (
              <div
                key={idx}
                className={cn(
                  "relative aspect-square flex items-center justify-center rounded-md text-sm transition-colors",
                  !isCurrentMonth && "opacity-30",
                  isToday && "ring-2 ring-primary ring-offset-2",
                  status === "weekend" && "bg-muted/50",
                  status === "future" && "bg-transparent"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    status !== "weekend" && status !== "future" && statusColors[status],
                    status !== "weekend" && status !== "future" && "text-white font-medium"
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          {[
            { status: "present", label: "Present" },
            { status: "late", label: "Late" },
            { status: "absent", label: "Absent" },
            { status: "remote", label: "Remote" },
            { status: "half-day", label: "Half Day" },
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  statusColors[status as keyof typeof statusColors]
                )}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
