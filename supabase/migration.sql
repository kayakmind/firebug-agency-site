-- Firebug Agency: Leads table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  org_name TEXT,
  phone TEXT,
  newsletter_optin BOOLEAN DEFAULT true,
  
  -- Assessment answers
  org_type TEXT,
  org_size TEXT,
  role TEXT,
  priorities TEXT[],
  ai_level TEXT,
  opportunity_areas TEXT[],
  automate_wish TEXT,
  blockers TEXT[],
  
  -- Generated results
  snapshot_results JSONB,
  
  -- CRM fields
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  notes TEXT,
  follow_up_date DATE,
  
  -- Notion sync
  notion_page_id TEXT
);

-- Index for quick lookups
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Row-level security (optional but recommended)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for the API route)
CREATE POLICY "Service role has full access" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');


-- ============================================================
-- Full assessments table (for Form 2 - client onboarding)
-- ============================================================

CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Link to lead if they converted
  lead_id UUID REFERENCES leads(id),
  
  -- All answers stored as JSON
  answers JSONB NOT NULL,
  
  -- Computed scores
  scores JSONB,
  
  -- Generated recommendations
  recommendations JSONB,
  
  -- Suggested 90-day engagement roadmap
  engagement_roadmap JSONB,
  
  -- Audio recording URLs
  audio_urls TEXT[],
  
  -- Notes
  notes TEXT
);

CREATE INDEX idx_assessments_lead ON assessments(lead_id);
