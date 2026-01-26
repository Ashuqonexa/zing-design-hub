import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leaveRequests = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    type: "Casual Leave",
    duration: "2 Days",
    status: "pending",
  },
  {
    id: 2,
    name: "Rohit Verma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohit",
    type: "Sick Leave",
    duration: "1 Day",
    status: "pending",
  },
  {
    id: 3,
    name: "Neha Kapoor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
    type: "Work From Home",
    duration: "3 Days",
    status: "pending",
  },
];

export function LeaveRequests() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Pending Leave Requests
      </h3>

      <div className="space-y-4">
        {leaveRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={request.avatar} />
              <AvatarFallback className="bg-primary-light text-primary text-sm font-medium">
                {request.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {request.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {request.type}, {request.duration}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-warning border-warning/30 bg-warning-light/50 text-xs"
            >
              Pending
            </Badge>
          </div>
        ))}
      </div>

      <Button className="w-full mt-4 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
        Approve All
      </Button>
    </div>
  );
}
