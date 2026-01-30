-- Create storage bucket for employee documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('employee-documents', 'employee-documents', false);

-- Create table to track uploaded documents
CREATE TABLE public.employee_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  document_type TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.employee_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employee_documents
CREATE POLICY "Users can view their own documents"
ON public.employee_documents
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own documents"
ON public.employee_documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON public.employee_documents
FOR DELETE
USING (auth.uid() = user_id);

-- Storage policies for employee-documents bucket
CREATE POLICY "Users can view their own files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'employee-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'employee-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'employee-documents' AND auth.uid()::text = (storage.foldername(name))[1]);