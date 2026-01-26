import { format } from "date-fns";
import { Check, X, Eye, MoreHorizontal, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LeaveRequest, leaveTypes, leaveStatusColors } from "@/types/leave";

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  onApprove: (request: LeaveRequest) => void;
  onReject: (request: LeaveRequest) => void;
  onView: (request: LeaveRequest) => void;
  showActions?: boolean;
}

export function LeaveRequestsTable({
  requests,
  onApprove,
  onReject,
  onView,
  showActions = true,
}: LeaveRequestsTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  const getLeaveTypeLabel = (type: string) => {
    return leaveTypes.find((t) => t.value === type)?.label || type;
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No leave requests</h3>
        <p className="text-muted-foreground mt-1">
          There are no leave requests to display
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[200px]">Employee</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead className="w-[100px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials(request.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{request.employeeName}</div>
                    <div className="text-xs text-muted-foreground">
                      {request.employeeId}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {getLeaveTypeLabel(request.leaveType)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="text-sm">
                  {format(new Date(request.startDate), "MMM dd")} -{" "}
                  {format(new Date(request.endDate), "MMM dd, yyyy")}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">{request.days}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  {request.days === 1 ? "day" : "days"}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(request.appliedOn), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={leaveStatusColors[request.status]}
                >
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </Badge>
              </TableCell>
              {showActions && (
                <TableCell>
                  {request.status === "pending" ? (
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                            onClick={() => onApprove(request)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Approve</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onReject(request)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reject</TooltipContent>
                      </Tooltip>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(request)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onView(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
