import { Briefcase, Building2, Calendar, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EmploymentInfo {
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: string;
  employmentType: string;
  reportingManager: string;
  workLocation: string;
  status: "active" | "on-leave" | "inactive";
}

interface EmploymentInfoCardProps {
  info: EmploymentInfo;
}

export function EmploymentInfoCard({ info }: EmploymentInfoCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">On Leave</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateTenure = (joiningDate: string) => {
    const start = new Date(joiningDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""}`;
    }
    return `${months > 0 ? months : 1} month${months > 1 ? "s" : ""}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Employment Details
        </CardTitle>
        <CardDescription>
          Your employment information and work details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Employee ID */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>
              <p className="font-medium">{info.employeeId}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              {getStatusBadge(info.status)}
            </div>
          </div>

          {/* Department */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{info.department}</p>
            </div>
          </div>

          {/* Designation */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Designation</p>
              <p className="font-medium">{info.designation}</p>
            </div>
          </div>

          {/* Joining Date */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joining Date</p>
              <p className="font-medium">{formatDate(info.joiningDate)}</p>
              <p className="text-xs text-muted-foreground">
                Tenure: {calculateTenure(info.joiningDate)}
              </p>
            </div>
          </div>

          {/* Employment Type */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employment Type</p>
              <p className="font-medium">{info.employmentType}</p>
            </div>
          </div>

          {/* Reporting Manager */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reporting Manager</p>
              <p className="font-medium">{info.reportingManager}</p>
            </div>
          </div>

          {/* Work Location */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Work Location</p>
              <p className="font-medium">{info.workLocation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
