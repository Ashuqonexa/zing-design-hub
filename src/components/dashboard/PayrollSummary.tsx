import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

export function PayrollSummary() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Payroll Summary
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Payroll:</span>
          <div className="flex items-center gap-1 text-lg font-bold text-foreground">
            <IndianRupee className="h-4 w-4" />
            5,60,000
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Payday:</span>
          <span className="text-sm font-semibold text-foreground">31 July</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-warning-light text-warning">
            Processing
          </span>
        </div>

        <Button className="w-full mt-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Run Payroll
        </Button>
      </div>
    </div>
  );
}
