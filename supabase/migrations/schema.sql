-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Counties table (all 47 counties)
CREATE TABLE IF NOT EXISTS counties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  region TEXT,
  population BIGINT,
  area_km2 NUMERIC,
  budget_2024 NUMERIC,
  budget_2023 NUMERIC,
  pending_bills NUMERIC DEFAULT 0,
  absorption_rate NUMERIC DEFAULT 0,
  debt NUMERIC DEFAULT 0,
  corruption_index NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for full-text search on counties
CREATE INDEX IF NOT EXISTS idx_counties_name_trgm ON counties USING gin(name gin_trgm_ops);

-- Exposes table (corruption exposés)
CREATE TABLE IF NOT EXISTS exposes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  author TEXT,
  source_url TEXT,
  county_id UUID REFERENCES counties(id),
  category TEXT,
  amount_involved NUMERIC,
  status TEXT DEFAULT 'pending',
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create full-text search index on exposes
CREATE INDEX IF NOT EXISTS idx_exposes_search ON exposes USING gin(to_tsvector('english', title || ' ' || content));
CREATE INDEX IF NOT EXISTS idx_exposes_slug ON exposes(slug);
CREATE INDEX IF NOT EXISTS idx_exposes_county ON exposes(county_id);
CREATE INDEX IF NOT EXISTS idx_exposes_created ON exposes(created_at DESC);

-- Submissions table (anonymous evidence)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  county_id UUID REFERENCES counties(id),
  category TEXT,
  file_urls TEXT[],
  submitter_email TEXT,
  status TEXT DEFAULT 'pending',
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscribers table (newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  unsubscribed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- National metrics table
CREATE TABLE IF NOT EXISTS national_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_key TEXT UNIQUE NOT NULL,
  metric_value NUMERIC,
  metric_text TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial national metrics
INSERT INTO national_metrics (metric_key, metric_value, metric_text) VALUES
  ('national_debt', 11500000000000, 'KSh 11.5 Trillion'),
  ('national_budget_2024', 3500000000000, 'KSh 3.5 Trillion'),
  ('county_debt_total', 250000000000, 'KSh 250 Billion')
ON CONFLICT (metric_key) DO NOTHING;

-- RLS Policies (Row Level Security)
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE exposes ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for counties" ON counties FOR SELECT USING (true);
CREATE POLICY "Public read access for exposes" ON exposes FOR SELECT USING (true);
CREATE POLICY "Public read access for national_metrics" ON national_metrics FOR SELECT USING (true);

-- Insert-only for submissions and subscribers
CREATE POLICY "Public insert for submissions" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for subscribers" ON subscribers FOR INSERT WITH CHECK (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_counties_updated_at BEFORE UPDATE ON counties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exposes_updated_at BEFORE UPDATE ON exposes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

