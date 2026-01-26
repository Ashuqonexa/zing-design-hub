import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: "success" | "warning" | "destructive" | "primary" | "muted";
  icon?: ReactNode;
  className?: string;
}

const subtitleColors = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  primary: "text-primary",
  muted: "text-muted-foreground",
};

export function StatCard({
  title,
  value,
  subtitle,
  subtitleColor = "muted",
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </h3>
            {subtitle && (
              <span className={cn("text-sm font-medium", subtitleColors[subtitleColor])}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary-light text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
