-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  applied_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_by UUID REFERENCES auth.users(id),
  approved_on TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Create leave_balances table for tracking entitlements
CREATE TABLE public.leave_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid')),
  total INTEGER NOT NULL DEFAULT 0,
  used INTEGER NOT NULL DEFAULT 0,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, leave_type, year)
);

-- Enable RLS
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;

-- Leave requests policies: users can see all leave requests (for team visibility)
CREATE POLICY "Users can view all leave requests"
ON public.leave_requests
FOR SELECT
TO authenticated
USING (true);

-- Users can create their own leave requests
CREATE POLICY "Users can create their own leave requests"
ON public.leave_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending requests (cancel) or managers can approve/reject
CREATE POLICY "Users can update leave requests"
ON public.leave_requests
FOR UPDATE
TO authenticated
USING (true);

-- Users can delete their own pending requests
CREATE POLICY "Users can delete their own pending requests"
ON public.leave_requests
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending');

-- Leave balances policies: users can view their own balances
CREATE POLICY "Users can view their own leave balances"
ON public.leave_balances
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- System can insert/update balances (for now allow authenticated users)
CREATE POLICY "Users can insert their own leave balances"
ON public.leave_balances
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leave balances"
ON public.leave_balances
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_leave_requests_updated_at
BEFORE UPDATE ON public.leave_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_balances_updated_at
BEFORE UPDATE ON public.leave_balances
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to initialize leave balances for a new user
CREATE OR REPLACE FUNCTION public.initialize_leave_balances()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert default leave balances for the new user
  INSERT INTO public.leave_balances (user_id, leave_type, total, used, year)
  VALUES
    (NEW.id, 'annual', 20, 0, EXTRACT(YEAR FROM CURRENT_DATE)),
    (NEW.id, 'sick', 10, 0, EXTRACT(YEAR FROM CURRENT_DATE)),
    (NEW.id, 'personal', 5, 0, EXTRACT(YEAR FROM CURRENT_DATE)),
    (NEW.id, 'unpaid', 30, 0, EXTRACT(YEAR FROM CURRENT_DATE));
  RETURN NEW;
END;
$$;

-- Trigger to auto-create leave balances when a new user signs up
CREATE TRIGGER on_auth_user_created_leave_balances
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.initialize_leave_balances();

-- Function to update leave balance when a leave request is approved
CREATE OR REPLACE FUNCTION public.update_leave_balance_on_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only process when status changes to approved
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    UPDATE public.leave_balances
    SET used = used + NEW.days
    WHERE user_id = NEW.user_id 
      AND leave_type = NEW.leave_type
      AND year = EXTRACT(YEAR FROM NEW.start_date);
  END IF;
  
  -- If status changes from approved to something else, restore the balance
  IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
    UPDATE public.leave_balances
    SET used = used - OLD.days
    WHERE user_id = NEW.user_id 
      AND leave_type = NEW.leave_type
      AND year = EXTRACT(YEAR FROM OLD.start_date);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to update balances when leave is approved
CREATE TRIGGER on_leave_request_status_change
AFTER UPDATE ON public.leave_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_leave_balance_on_approval();