-- Enable RLS on submission_counter table
ALTER TABLE public.submission_counter ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read the submission counter (public data)
CREATE POLICY "Allow public read access to submission counter" 
ON public.submission_counter 
FOR SELECT 
USING (true);

-- Allow everyone to update the submission counter (public data)
CREATE POLICY "Allow public update access to submission counter" 
ON public.submission_counter 
FOR UPDATE 
USING (true);

-- Set search_path for the update function to fix security warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;