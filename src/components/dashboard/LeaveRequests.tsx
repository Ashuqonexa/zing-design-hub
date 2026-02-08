import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useUserRole } from "@/hooks/useUserRole";

export function LeaveRequests() {
  const { requests, approveRequest } = useLeaveRequests();
  const { isAdminOrManager } = useUserRole();

  const pendingRequests = requests.filter((r) => r.status === "pending").slice(0, 3);

  if (pendingRequests.length === 0) {
    return (
      <div className="bg-card rounded-xl p-5 border border-border shadow-card">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Pending Leave Requests
        </h3>
        <p className="text-sm text-muted-foreground">No pending requests</p>
      </div>
    );
  }

  const handleApproveAll = async () => {
    for (const req of pendingRequests) {
      await approveRequest(req.id, req.employeeName);
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Pending Leave Requests
      </h3>

      <div className="space-y-4">
        {pendingRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {request.employeeName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {request.employeeName}
              </p>
              <p className="text-xs text-muted-foreground">
                {request.leaveType}, {request.days} {request.days === 1 ? "day" : "days"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-warning border-warning/30 bg-warning/10 text-xs"
            >
              Pending
            </Badge>
          </div>
        ))}
      </div>

      {isAdminOrManager && (
        <Button
          className="w-full mt-4"
          onClick={handleApproveAll}
        >
          Approve All
        </Button>
      )}
    </div>
  );
}
