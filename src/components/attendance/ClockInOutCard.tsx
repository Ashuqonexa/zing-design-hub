import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { AttendanceRecord } from "@/hooks/useAttendance";

interface ClockInOutCardProps {
  todayRecord: AttendanceRecord | null;
  onClockIn: () => Promise<void>;
  onClockOut: () => Promise<void>;
  loading: boolean;
}

export function ClockInOutCard({ todayRecord, onClockIn, onClockOut, loading }: ClockInOutCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  const isClockedIn = !!todayRecord?.clock_in && !todayRecord?.clock_out;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isClockedIn && todayRecord?.clock_in) {
      const timer = setInterval(() => {
        const diff = new Date().getTime() - new Date(todayRecord.clock_in!).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setElapsedTime("00:00:00");
    }
  }, [isClockedIn, todayRecord?.clock_in]);

  const alreadyClockedOut = !!todayRecord?.clock_out;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Time Clock
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {format(currentTime, "EEEE, MMMM d, yyyy")}
          </p>
          <p className="text-4xl font-bold text-foreground mt-1">
            {format(currentTime, "HH:mm:ss")}
          </p>
        </div>

        {isClockedIn && (
          <div className="bg-card rounded-lg p-4 text-center border border-border">
            <p className="text-sm text-muted-foreground">Time Worked Today</p>
            <p className="text-2xl font-semibold text-primary">{elapsedTime}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Clocked in at {format(new Date(todayRecord!.clock_in!), "HH:mm")}
            </p>
          </div>
        )}

        {alreadyClockedOut && (
          <div className="bg-card rounded-lg p-4 text-center border border-border">
            <p className="text-sm text-muted-foreground">Today's Session Complete</p>
            <p className="text-2xl font-semibold text-primary">{todayRecord!.work_hours}h</p>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(todayRecord!.clock_in!), "HH:mm")} — {format(new Date(todayRecord!.clock_out!), "HH:mm")}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {!todayRecord ? (
            <Button
              onClick={onClockIn}
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              size="lg"
            >
              <LogIn className="h-5 w-5 mr-2" />
              {loading ? "Clocking In..." : "Clock In"}
            </Button>
          ) : isClockedIn ? (
            <Button
              onClick={onClockOut}
              disabled={loading}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              {loading ? "Clocking Out..." : "Clock Out"}
            </Button>
          ) : (
            <Button disabled className="flex-1" variant="secondary" size="lg">
              Session Complete
            </Button>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {alreadyClockedOut
            ? "You've completed your shift for today"
            : isClockedIn
              ? "Don't forget to clock out when you leave"
              : "Click 'Clock In' to start your workday"}
        </p>
      </CardContent>
    </Card>
  );
}
