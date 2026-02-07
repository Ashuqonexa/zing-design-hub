import { useState, useMemo } from "react";
import { Plus, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveBalanceCard } from "@/components/leave/LeaveBalanceCard";
import { LeaveRequestsTable } from "@/components/leave/LeaveRequestsTable";
import { LeaveFilters } from "@/components/leave/LeaveFilters";
import { LeaveRequestDialog } from "@/components/leave/LeaveRequestDialog";
import { LeaveType } from "@/types/leave";
import { useLeaveRequests, LeaveRequestView } from "@/hooks/useLeaveRequests";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leave() {
  const {
    requests,
    balances,
    loading,
    submitRequest,
    approveRequest,
    rejectRequest,
  } = useLeaveRequests();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [saving, setSaving] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Stats
  const stats = useMemo(() => ({
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    total: requests.length,
  }), [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    let filtered = requests;

    if (activeTab === "pending") {
      filtered = filtered.filter((r) => r.status === "pending");
    } else if (activeTab === "history") {
      filtered = filtered.filter((r) => r.status !== "pending");
    }

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((r) =>
        r.employeeName.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter((r) => r.leaveType === typeFilter);
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    return filtered;
  }, [requests, activeTab, searchQuery, typeFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("");
    setStatusFilter("");
  };

  const handleApprove = async (request: LeaveRequestView) => {
    await approveRequest(request.id, request.employeeName);
  };

  const handleReject = async (request: LeaveRequestView) => {
    await rejectRequest(request.id, request.employeeName);
  };

  const handleSubmitRequest = async (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
  }) => {
    setSaving(true);
    try {
      await submitRequest(data);
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Leave Management
            </h1>
            <p className="text-muted-foreground">
              Manage leave requests and track balances
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Request Leave
          </Button>
        </div>

        {/* Leave Balances */}
        {balances.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Leave Balance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {balances.map((balance) => (
                <LeaveBalanceCard key={balance.type} balance={balance} />
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                Pending
                {stats.pending > 0 && (
                  <span className="bg-warning text-warning-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {stats.pending}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <LeaveFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onClearFilters={handleClearFilters}
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>

            <TabsContent value="all" className="mt-4">
              <LeaveRequestsTable
                requests={filteredRequests}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <LeaveRequestsTable
                requests={filteredRequests}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <LeaveRequestsTable
                requests={filteredRequests}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Request Dialog */}
        <LeaveRequestDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmitRequest}
          saving={saving}
        />
      </div>
    </DashboardLayout>
  );
}
