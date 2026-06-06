-- Create products table
CREATE TABLE public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    image_url TEXT,
    category TEXT,
    product_code TEXT,
    model_name TEXT,
    capacity TEXT,
    accuracy TEXT,
    platform TEXT,
    gst_note TEXT DEFAULT 'GST Extra',
    is_best_seller BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart table
CREATE TABLE public.cart (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Create admin_users table
CREATE TABLE public.admin_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE public.contacts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- GRANT permissions
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart TO authenticated;
GRANT ALL ON public.cart TO service_role;

GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;

GRANT SELECT, INSERT ON public.contacts TO anon;
GRANT SELECT, INSERT ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Admins can update products" 
ON public.products 
FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Admins can delete products" 
ON public.products 
FOR DELETE 
USING (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    )
);

-- Cart policies (users can only access their own cart)
CREATE POLICY "Users can view their own cart" 
ON public.cart 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own cart" 
ON public.cart 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" 
ON public.cart 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart" 
ON public.cart 
FOR DELETE 
USING (auth.uid() = user_id);

-- Admin users policies
CREATE POLICY "Admin users are viewable by admins" 
ON public.admin_users 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    )
);

-- Contacts policies
CREATE POLICY "Anyone can insert contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view contacts" 
ON public.contacts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE admin_users.user_id = auth.uid()
));

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, product_code, model_name, capacity, accuracy, platform, gst_note, is_best_seller) VALUES
('Electronic Digital Scale - 100kg', 'High precision electronic digital weighing scale with 100kg capacity, suitable for commercial use.', 15500, '/src/assets/products/platform-scale.png', 'Platform Scales', 'AD-P01', 'Electronic Digital Scale - Electronic Weighing Scale', '100Kg', '10gm', '400-500-600Sqmm', 'GST Extra', true),
('Table Top Digital Scale - 20kg', 'Compact table top digital weighing scale with 20kg capacity, perfect for retail shops.', 8500, '/src/assets/products/table-top-scale.png', 'Table Top Scales', 'AD-T01', 'Table Top Digital Scale - Electronic Weighing Scale', '20Kg', '1gm', '200-250-300Sqmm', 'GST Extra', false),
('Hanging Digital Scale - 500kg', 'Heavy duty hanging digital scale with 500kg capacity for industrial applications.', 25000, '/src/assets/products/hanging-scale.png', 'Hanging Scales', 'AD-H01', 'Hanging Digital Scale - Electronic Weighing Scale', '500Kg', '100gm', 'N/A', 'GST Extra', true),
('Jewelry Precision Scale - 1kg', 'Ultra precise jewelry weighing scale with 0.01g accuracy for gold and precious metals.', 12000, '/src/assets/products/compact-scale.png', 'Precision Scales', 'AD-J01', 'Jewelry Precision Scale - Electronic Weighing Scale', '1Kg', '0.01gm', '100-100-100Sqmm', 'GST Extra', false),
('Baby Weighing Scale - 50kg', 'Medical grade baby weighing scale with gentle weighing surface and accurate measurements.', 18000, '/src/assets/products/baby-scale.png', 'Medical Scales', 'AD-B01', 'Baby Weighing Scale - Electronic Weighing Scale', '50Kg', '5gm', '300-400-500Sqmm', 'GST Extra', false),
('Platform Scale - 200kg', 'Industrial platform weighing scale with stainless steel surface and digital display.', 22000, '/src/assets/products/platform-scale.png', 'Platform Scales', 'AD-P02', 'Platform Scale - Electronic Weighing Scale', '200Kg', '20gm', '500-600-700Sqmm', 'GST Extra', true);