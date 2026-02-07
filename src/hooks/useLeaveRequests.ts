import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeaveType, LeaveStatus, LeaveBalance } from "@/types/leave";

export interface DbLeaveRequest {
  id: string;
  user_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  applied_on: string;
  approved_by: string | null;
  approved_on: string | null;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

// Mapped type for UI compatibility
export interface LeaveRequestView {
  id: string;
  userId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  comments?: string;
}

const leaveBalanceDefaults: Record<string, { label: string; color: string }> = {
  annual: { label: "Annual Leave", color: "bg-primary" },
  sick: { label: "Sick Leave", color: "bg-destructive" },
  personal: { label: "Personal Leave", color: "bg-warning" },
  maternity: { label: "Maternity Leave", color: "bg-accent" },
  paternity: { label: "Paternity Leave", color: "bg-accent" },
  unpaid: { label: "Unpaid Leave", color: "bg-muted-foreground" },
};

export function useLeaveRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<LeaveRequestView[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      // Fetch leave requests with profile info
      const { data: requestsData, error: reqError } = await supabase
        .from("leave_requests")
        .select("*")
        .order("applied_on", { ascending: false });

      if (reqError) throw reqError;

      // Fetch profiles for employee names
      const userIds = [...new Set((requestsData || []).map((r: DbLeaveRequest) => r.user_id))];
      
      let profilesMap: Record<string, string> = {};
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, first_name, last_name")
          .in("user_id", userIds);
        
        if (profiles) {
          profilesMap = Object.fromEntries(
            profiles.map((p) => [
              p.user_id,
              `${p.first_name || ""} ${p.last_name || ""}`.trim() || "Unknown",
            ])
          );
        }
      }

      const mapped: LeaveRequestView[] = (requestsData || []).map((r: DbLeaveRequest) => ({
        id: r.id,
        userId: r.user_id,
        employeeName: profilesMap[r.user_id] || "Current User",
        leaveType: r.leave_type as LeaveType,
        startDate: r.start_date,
        endDate: r.end_date,
        days: r.days,
        reason: r.reason,
        status: r.status as LeaveStatus,
        appliedOn: r.applied_on,
        approvedBy: r.approved_by || undefined,
        approvedOn: r.approved_on || undefined,
        comments: r.comments || undefined,
      }));

      setRequests(mapped);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch leave requests";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchBalances = useCallback(async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const currentYear = new Date().getFullYear();
      const { data, error } = await supabase
        .from("leave_balances")
        .select("*")
        .eq("user_id", userData.user.id)
        .eq("year", currentYear);

      if (error) throw error;

      if (!data || data.length === 0) {
        // Initialize balances for existing users who don't have them yet
        const defaultBalances = [
          { user_id: userData.user.id, leave_type: "annual", total: 20, used: 0, year: currentYear },
          { user_id: userData.user.id, leave_type: "sick", total: 10, used: 0, year: currentYear },
          { user_id: userData.user.id, leave_type: "personal", total: 5, used: 0, year: currentYear },
          { user_id: userData.user.id, leave_type: "unpaid", total: 30, used: 0, year: currentYear },
        ];
        
        const { data: inserted, error: insertError } = await supabase
          .from("leave_balances")
          .insert(defaultBalances)
          .select();
        
        if (insertError) throw insertError;
        data?.push(...(inserted || []));
      }

      // Count pending days per leave type for this user
      const { data: pendingRequests } = await supabase
        .from("leave_requests")
        .select("leave_type, days")
        .eq("user_id", userData.user.id)
        .eq("status", "pending");

      const pendingMap: Record<string, number> = {};
      (pendingRequests || []).forEach((r: { leave_type: string; days: number }) => {
        pendingMap[r.leave_type] = (pendingMap[r.leave_type] || 0) + r.days;
      });

      const balances: LeaveBalance[] = (data || []).map((b) => {
        const defaults = leaveBalanceDefaults[b.leave_type] || { label: b.leave_type, color: "bg-muted" };
        const pending = pendingMap[b.leave_type] || 0;
        return {
          type: b.leave_type as LeaveType,
          label: defaults.label,
          total: b.total,
          used: b.used,
          pending,
          available: b.total - b.used - pending,
          color: defaults.color,
        };
      });

      setBalances(balances);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch leave balances";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  }, [toast]);

  const submitRequest = useCallback(async (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
  }) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("leave_requests")
        .insert({
          user_id: userData.user.id,
          leave_type: data.leaveType,
          start_date: data.startDate,
          end_date: data.endDate,
          days: data.days,
          reason: data.reason,
          status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Leave Request Submitted",
        description: `Your ${data.days}-day leave request has been submitted for approval`,
      });

      await fetchRequests();
      await fetchBalances();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit leave request";
      toast({ title: "Error", description: message, variant: "destructive" });
      throw err;
    }
  }, [toast, fetchRequests, fetchBalances]);

  const approveRequest = useCallback(async (requestId: string, employeeName: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "approved",
          approved_by: userData.user?.id,
          approved_on: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Leave Approved",
        description: `${employeeName}'s leave request has been approved`,
      });

      await fetchRequests();
      await fetchBalances();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to approve request";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  }, [toast, fetchRequests, fetchBalances]);

  const rejectRequest = useCallback(async (requestId: string, employeeName: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "rejected",
          approved_by: userData.user?.id,
          approved_on: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Leave Rejected",
        description: `${employeeName}'s leave request has been rejected`,
        variant: "destructive",
      });

      await fetchRequests();
      await fetchBalances();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to reject request";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  }, [toast, fetchRequests, fetchBalances]);

  useEffect(() => {
    fetchRequests();
    fetchBalances();
  }, [fetchRequests, fetchBalances]);

  return {
    requests,
    balances,
    loading,
    submitRequest,
    approveRequest,
    rejectRequest,
    fetchRequests,
    fetchBalances,
  };
}
