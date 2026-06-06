GRANT DELETE ON public.admin_users TO authenticated;

CREATE POLICY "Admins can delete admin users"
ON public.admin_users
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a
    WHERE a.user_id = auth.uid()
  )
);