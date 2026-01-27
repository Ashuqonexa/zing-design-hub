import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AttendanceRecord, attendanceStatusConfig } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  title?: string;
}

export function AttendanceTable({ records, title = "Today's Attendance" }: AttendanceTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Work Hours</TableHead>
              <TableHead>Overtime</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => {
              const statusConfig = attendanceStatusConfig[record.status];
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {getInitials(record.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {record.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.employeeId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">
                      {record.clockIn || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">
                      {record.clockOut || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {record.workHours > 0 ? `${record.workHours}h` : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        record.overtime > 0 ? "text-purple-600" : "text-muted-foreground"
                      )}
                    >
                      {record.overtime > 0 ? `+${record.overtime}h` : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("font-medium", statusConfig.color)}
                    >
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
