-- Criar tabela de leads com política RLS ativada
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'em_contato', 'convertido', 'desqualificado')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Índices para melhorar performance
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Criar índices para melhorar queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT para todas as aplicações anônimas (landing page)
CREATE POLICY "Allow anonymous insert into leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir SELECT apenas para usuários autenticados da aplicação
CREATE POLICY "Allow authenticated select leads"
  ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política: Permitir UPDATE apenas para usuários autenticados
CREATE POLICY "Allow authenticated update leads"
  ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Permitir DELETE apenas para usuários autenticados
CREATE POLICY "Allow authenticated delete leads"
  ON leads
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários na tabela para documentação
COMMENT ON TABLE leads IS 'Tabela de leads capturados da landing page /ima com status de acompanhamento';
COMMENT ON COLUMN leads.id IS 'Identificador único do lead (UUID)';
COMMENT ON COLUMN leads.name IS 'Nome do lead - obrigatório';
COMMENT ON COLUMN leads.email IS 'E-mail do lead - obrigatório e validado';
COMMENT ON COLUMN leads.whatsapp IS 'Número de WhatsApp - obrigatório (mínimo 10 dígitos)';
COMMENT ON COLUMN leads.status IS 'Status atual do lead: novo, em_contato, convertido, desqualificado';
COMMENT ON COLUMN leads.notes IS 'Notas internas sobre o lead';
COMMENT ON COLUMN leads.created_at IS 'Data/hora de criação do lead';
COMMENT ON COLUMN leads.updated_at IS 'Data/hora da última atualização';
