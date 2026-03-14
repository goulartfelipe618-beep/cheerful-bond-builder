
-- Allow admin_master to manage user_roles
CREATE POLICY "Admin master can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin_master'));
CREATE POLICY "Admin master can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin_master'));
CREATE POLICY "Admin master can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin_master'));
CREATE POLICY "Admin master can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin_master'));
