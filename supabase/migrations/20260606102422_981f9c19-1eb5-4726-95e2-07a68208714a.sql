CREATE OR REPLACE FUNCTION public.handle_new_user_admin_link()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'anchorditgitalscale@gmail.com' THEN
    INSERT INTO public.admin_users (user_id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (email) DO UPDATE SET user_id = EXCLUDED.user_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin_link ON auth.users;
CREATE TRIGGER on_auth_user_created_admin_link
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_admin_link();