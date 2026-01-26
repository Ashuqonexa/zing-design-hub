import { UserPlus, Calculator, CheckSquare, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: UserPlus,
    label: "Add Employee",
    color: "text-primary",
    bgColor: "bg-primary-light",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: Calculator,
    label: "Run Payroll",
    color: "text-primary",
    bgColor: "bg-primary-light",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: CheckSquare,
    label: "Approve Leaves",
    color: "text-success",
    bgColor: "bg-success-light",
    hoverBg: "hover:bg-success/10",
  },
  {
    icon: Upload,
    label: "Upload Documents",
    color: "text-primary",
    bgColor: "bg-primary-light",
    hoverBg: "hover:bg-primary/10",
  },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <h3 className="text-base font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border border-border transition-all duration-200",
              action.hoverBg,
              "hover:border-primary/30 hover:shadow-md group"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-xl transition-transform duration-200 group-hover:scale-110",
                action.bgColor
              )}
            >
              <action.icon className={cn("h-5 w-5", action.color)} />
            </div>
            <span className="text-sm font-medium text-foreground text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
