
-- Create user_plans table
CREATE TABLE public.user_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  plano text NOT NULL DEFAULT 'free',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;

-- Admin master full access
CREATE POLICY "Admin master full access on user_plans"
ON public.user_plans FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin_master'))
WITH CHECK (public.has_role(auth.uid(), 'admin_master'));

-- Users can view own plan
CREATE POLICY "Users can view own plan"
ON public.user_plans FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
