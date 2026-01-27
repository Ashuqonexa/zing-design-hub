import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export function ClockInOutCard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isClockedIn && clockInTime) {
      const timer = setInterval(() => {
        const diff = new Date().getTime() - clockInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isClockedIn, clockInTime]);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(new Date());
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setClockInTime(null);
    setElapsedTime("00:00:00");
  };

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
              Clocked in at {clockInTime && format(clockInTime, "HH:mm")}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {!isClockedIn ? (
            <Button
              onClick={handleClockIn}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              size="lg"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Clock In
            </Button>
          ) : (
            <Button
              onClick={handleClockOut}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Clock Out
            </Button>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {isClockedIn
            ? "Don't forget to clock out when you leave"
            : "Click 'Clock In' to start your workday"}
        </p>
      </CardContent>
    </Card>
  );
}
