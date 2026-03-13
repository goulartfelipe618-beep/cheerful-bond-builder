
-- Solicitações de Transfer (vindas de webhook externo)
CREATE TABLE public.solicitacoes_transfer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  nome_cliente text NOT NULL,
  contato text,
  tipo text,
  embarque text,
  desembarque text,
  data_viagem date,
  num_passageiros integer,
  mensagem text,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.solicitacoes_transfer ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transfer requests" ON public.solicitacoes_transfer FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transfer requests" ON public.solicitacoes_transfer FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transfer requests" ON public.solicitacoes_transfer FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transfer requests" ON public.solicitacoes_transfer FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Solicitações de Grupos (vindas de webhook externo)
CREATE TABLE public.solicitacoes_grupos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  nome_cliente text NOT NULL,
  whatsapp text,
  tipo_veiculo text,
  embarque text,
  destino text,
  data_ida date,
  num_passageiros integer,
  mensagem text,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.solicitacoes_grupos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own group requests" ON public.solicitacoes_grupos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own group requests" ON public.solicitacoes_grupos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own group requests" ON public.solicitacoes_grupos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own group requests" ON public.solicitacoes_grupos FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Solicitações de Motoristas (vindas de webhook externo)
CREATE TABLE public.solicitacoes_motoristas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  nome text NOT NULL,
  email text,
  telefone text,
  cpf text,
  cnh text,
  cidade text,
  mensagem text,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.solicitacoes_motoristas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own driver requests" ON public.solicitacoes_motoristas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own driver requests" ON public.solicitacoes_motoristas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own driver requests" ON public.solicitacoes_motoristas FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own driver requests" ON public.solicitacoes_motoristas FOR DELETE TO authenticated USING (auth.uid() = user_id);
