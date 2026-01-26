export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
}

export const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
] as const;

export const designations = [
  "Junior Developer",
  "Senior Developer",
  "Lead Developer",
  "UI/UX Designer",
  "Product Manager",
  "HR Manager",
  "Marketing Specialist",
  "Sales Executive",
  "Accountant",
  "Operations Manager",
] as const;
