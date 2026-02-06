import { useState, useMemo } from "react";
import { Plus, Download, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeFilters } from "@/components/employees/EmployeeFilters";
import { EmployeeDialog } from "@/components/employees/EmployeeDialog";
import { useEmployees, Employee, EmployeeInsert } from "@/hooks/useEmployees";
import { Skeleton } from "@/components/ui/skeleton";

export default function Employees() {
  const { 
    employees, 
    loading, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee,
    generateEmployeeId 
  } = useEmployees();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [saving, setSaving] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        employee.first_name.toLowerCase().includes(searchLower) ||
        employee.last_name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.employee_id.toLowerCase().includes(searchLower);

      // Department filter
      const matchesDepartment =
        !departmentFilter ||
        departmentFilter === "all" ||
        employee.department === departmentFilter;

      // Status filter
      const matchesStatus =
        !statusFilter ||
        statusFilter === "all" ||
        employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchQuery, departmentFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setDepartmentFilter("");
    setStatusFilter("");
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setDialogOpen(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    // For now, just open edit dialog - could navigate to detail page
    setEditingEmployee(employee);
    setDialogOpen(true);
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    await deleteEmployee(employee.id, `${employee.first_name} ${employee.last_name}`);
  };

  const handleSaveEmployee = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    dateOfJoining: string;
    status: "active" | "inactive" | "on-leave";
  }) => {
    setSaving(true);
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          department: data.department,
          designation: data.designation,
          date_of_joining: data.dateOfJoining,
          status: data.status,
        });
      } else {
        const employeeId = await generateEmployeeId();
        const newEmployee: EmployeeInsert = {
          employee_id: employeeId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          department: data.department,
          designation: data.designation,
          date_of_joining: data.dateOfJoining,
          status: data.status,
          avatar_url: null,
        };
        await addEmployee(newEmployee);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  // Stats calculations
  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    onLeave: employees.filter((e) => e.status === "on-leave").length,
    inactive: employees.filter((e) => e.status === "inactive").length,
  }), [employees]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
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
            <h1 className="text-2xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground">
              Manage your organization's workforce
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddEmployee}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-primary">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-success">
              {stats.active}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-warning">
              {stats.onLeave}
            </div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-muted-foreground">
              {stats.inactive}
            </div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
        </div>

        {/* Filters */}
        <EmployeeFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>

        {/* Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onView={handleViewEmployee}
        />

        {/* Dialog */}
        <EmployeeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          saving={saving}
        />
      </div>
    </DashboardLayout>
  );
}
