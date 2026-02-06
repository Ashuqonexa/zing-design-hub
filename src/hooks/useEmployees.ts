import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  department: string;
  designation: string;
  date_of_joining: string;
  status: "active" | "inactive" | "on-leave";
  avatar_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type EmployeeInsert = Omit<Employee, "id" | "created_at" | "updated_at" | "created_by">;
export type EmployeeUpdate = Partial<EmployeeInsert>;

export function useEmployees() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setEmployees((data || []) as Employee[]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch employees";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addEmployee = useCallback(async (employee: EmployeeInsert) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error: insertError } = await supabase
        .from("employees")
        .insert({
          ...employee,
          created_by: userData.user?.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setEmployees((prev) => [data as Employee, ...prev]);
      
      toast({
        title: "Employee Added",
        description: `${employee.first_name} ${employee.last_name} has been added to the team`,
      });

      return data as Employee;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add employee";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const updateEmployee = useCallback(async (id: string, updates: EmployeeUpdate) => {
    try {
      const { data, error: updateError } = await supabase
        .from("employees")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? (data as Employee) : emp))
      );

      toast({
        title: "Employee Updated",
        description: `${updates.first_name || ""} ${updates.last_name || ""}'s information has been updated`.trim(),
      });

      return data as Employee;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update employee";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const deleteEmployee = useCallback(async (id: string, employeeName: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));

      toast({
        title: "Employee Deleted",
        description: `${employeeName} has been removed`,
        variant: "destructive",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete employee";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const generateEmployeeId = useCallback(async () => {
    const { count } = await supabase
      .from("employees")
      .select("*", { count: "exact", head: true });
    
    return `EMP${String((count || 0) + 1).padStart(3, "0")}`;
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    generateEmployeeId,
  };
}
