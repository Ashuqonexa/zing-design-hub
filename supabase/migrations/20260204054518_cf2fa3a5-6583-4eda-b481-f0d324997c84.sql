-- Add additional personal info columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS pincode text,
ADD COLUMN IF NOT EXISTS pan_number text,
ADD COLUMN IF NOT EXISTS aadhar_number text;

-- Add emergency contact columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS emergency_contact_name text,
ADD COLUMN IF NOT EXISTS emergency_contact_relationship text,
ADD COLUMN IF NOT EXISTS emergency_contact_phone text,
ADD COLUMN IF NOT EXISTS emergency_contact_alternate_phone text,
ADD COLUMN IF NOT EXISTS emergency_contact_address text;

-- Add bank details columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bank_account_holder_name text,
ADD COLUMN IF NOT EXISTS bank_account_number text,
ADD COLUMN IF NOT EXISTS bank_name text,
ADD COLUMN IF NOT EXISTS bank_branch_name text,
ADD COLUMN IF NOT EXISTS bank_ifsc_code text,
ADD COLUMN IF NOT EXISTS bank_account_type text,
ADD COLUMN IF NOT EXISTS bank_verified boolean DEFAULT false;

-- Add employment info columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS employee_id text,
ADD COLUMN IF NOT EXISTS designation text,
ADD COLUMN IF NOT EXISTS joining_date date,
ADD COLUMN IF NOT EXISTS employment_type text,
ADD COLUMN IF NOT EXISTS reporting_manager text,
ADD COLUMN IF NOT EXISTS work_location text,
ADD COLUMN IF NOT EXISTS employment_status text DEFAULT 'active';