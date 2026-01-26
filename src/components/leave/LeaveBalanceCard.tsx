import { LeaveBalance } from "@/types/leave";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
}

export function LeaveBalanceCard({ balance }: LeaveBalanceCardProps) {
  const usedPercentage = (balance.used / balance.total) * 100;
  const pendingPercentage = (balance.pending / balance.total) * 100;

  return (
    <div className="bg-card rounded-xl border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">{balance.label}</h3>
        <span className="text-2xl font-bold text-primary">
          {balance.available}
        </span>
      </div>

      <div className="space-y-2">
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("absolute left-0 top-0 h-full rounded-full", balance.color)}
            style={{ width: `${usedPercentage}%` }}
          />
          <div
            className="absolute top-0 h-full bg-warning/50 rounded-full"
            style={{ 
              left: `${usedPercentage}%`,
              width: `${pendingPercentage}%` 
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Used: {balance.used}</span>
          {balance.pending > 0 && (
            <span className="text-warning">Pending: {balance.pending}</span>
          )}
          <span>Total: {balance.total}</span>
        </div>
      </div>
    </div>
  );
}
