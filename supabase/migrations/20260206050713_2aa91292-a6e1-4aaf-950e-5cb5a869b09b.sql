-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  date_of_joining DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave')),
  avatar_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policies - all authenticated users can view employees
CREATE POLICY "Authenticated users can view employees"
ON public.employees
FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can create employees
CREATE POLICY "Authenticated users can create employees"
ON public.employees
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users can update employees
CREATE POLICY "Authenticated users can update employees"
ON public.employees
FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete employees
CREATE POLICY "Authenticated users can delete employees"
ON public.employees
FOR DELETE
TO authenticated
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();