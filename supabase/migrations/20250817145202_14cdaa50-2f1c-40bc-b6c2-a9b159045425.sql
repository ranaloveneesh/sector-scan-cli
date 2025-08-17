-- Create submission_counter table
CREATE TABLE public.submission_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 75,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial row
INSERT INTO public.submission_counter (id, count) VALUES (1, 75);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_submission_counter_updated_at
  BEFORE UPDATE ON public.submission_counter
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();