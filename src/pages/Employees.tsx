import { useState, useMemo } from "react";
import { Plus, Download, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeFilters } from "@/components/employees/EmployeeFilters";
import { EmployeeDialog } from "@/components/employees/EmployeeDialog";
import { Employee } from "@/types/employee";
import { mockEmployees } from "@/data/mockEmployees";
import { useToast } from "@/hooks/use-toast";

export default function Employees() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

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
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.employeeId.toLowerCase().includes(searchLower);

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
    toast({
      title: "View Employee",
      description: `Viewing ${employee.firstName} ${employee.lastName}'s profile`,
    });
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
    toast({
      title: "Employee Deleted",
      description: `${employee.firstName} ${employee.lastName} has been removed`,
      variant: "destructive",
    });
  };

  const handleSaveEmployee = (data: Omit<Employee, "id" | "employeeId">) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === editingEmployee.id
            ? { ...e, ...data }
            : e
        )
      );
      toast({
        title: "Employee Updated",
        description: `${data.firstName} ${data.lastName}'s information has been updated`,
      });
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: crypto.randomUUID(),
        employeeId: `EMP${String(employees.length + 1).padStart(3, "0")}`,
        ...data,
      };
      setEmployees((prev) => [...prev, newEmployee]);
      toast({
        title: "Employee Added",
        description: `${data.firstName} ${data.lastName} has been added to the team`,
      });
    }
  };

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
              {employees.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-success">
              {employees.filter((e) => e.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-warning">
              {employees.filter((e) => e.status === "on-leave").length}
            </div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-muted-foreground">
              {employees.filter((e) => e.status === "inactive").length}
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
        />
      </div>
    </DashboardLayout>
  );
}
