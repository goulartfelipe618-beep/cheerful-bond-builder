
DROP POLICY IF EXISTS "Users can view own slides" ON public.slides;
DROP POLICY IF EXISTS "Users can insert own slides" ON public.slides;
DROP POLICY IF EXISTS "Users can update own slides" ON public.slides;
DROP POLICY IF EXISTS "Users can delete own slides" ON public.slides;

CREATE POLICY "All authenticated can view slides" ON public.slides FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin master can insert slides" ON public.slides FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin_master'));
CREATE POLICY "Admin master can update slides" ON public.slides FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin_master'));
CREATE POLICY "Admin master can delete slides" ON public.slides FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin_master'));
