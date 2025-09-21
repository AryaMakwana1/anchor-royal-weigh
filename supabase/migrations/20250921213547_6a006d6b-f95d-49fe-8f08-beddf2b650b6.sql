-- Extend products table with new fields
ALTER TABLE public.products 
ADD COLUMN category text,
ADD COLUMN product_code text,
ADD COLUMN model_name text,
ADD COLUMN capacity text,
ADD COLUMN accuracy text,
ADD COLUMN platform text,
ADD COLUMN gst_note text DEFAULT 'GST Extra',
ADD COLUMN is_best_seller boolean DEFAULT false;

-- Create contacts table for contact form
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contacts table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
CREATE POLICY "Anyone can insert contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view contacts" 
ON public.contacts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid()
));

-- Insert default admin user
INSERT INTO public.admin_users (user_id, email) 
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid, 
  'anchorditgitalscale@gmail.com'
);

-- Update existing products with sample data
UPDATE public.products SET
  category = 'Platform Scales',
  product_code = 'AD-P' || SUBSTRING(id::text, 1, 2),
  model_name = name || ' - Electronic Weighing Scale',
  capacity = '100Kg',
  accuracy = '10gm',
  platform = '400-500-600Sqmm',
  is_best_seller = (random() > 0.7)
WHERE category IS NULL;