-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create table for satellite data
CREATE TABLE IF NOT EXISTS public.satellite_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  acquisition_time TIMESTAMP WITH TIME ZONE NOT NULL,
  cloud_coverage DECIMAL(5, 2),
  vegetation_index DECIMAL(5, 2),
  water_index DECIMAL(5, 2),
  temperature DECIMAL(6, 2),
  risk_indicators JSONB,
  source TEXT DEFAULT 'copernicus',
  processing_status TEXT DEFAULT 'processed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster location-based queries
CREATE INDEX IF NOT EXISTS idx_satellite_data_location ON public.satellite_data (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_satellite_data_acquisition ON public.satellite_data (acquisition_time DESC);

-- Enable RLS
ALTER TABLE public.satellite_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (satellite data is public information)
CREATE POLICY "Satellite data is publicly readable"
  ON public.satellite_data
  FOR SELECT
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_satellite_data_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER satellite_data_updated_at
  BEFORE UPDATE ON public.satellite_data
  FOR EACH ROW
  EXECUTE FUNCTION update_satellite_data_updated_at();

-- Schedule satellite data ingestion every 30 minutes
SELECT cron.schedule(
  'ingest-satellite-data-every-30min',
  '*/30 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://shuzruoujtztngwzdffo.supabase.co/functions/v1/ingest-satellite-data',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodXpydW91anR6dG5nd3pkZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODQ1MjYsImV4cCI6MjA3ODI2MDUyNn0.5xNrQRUabslMipK5DNj95j9B7yR6UoW6yeMKTQDjGbc"}'::jsonb,
    body := '{"trigger": "cron", "source": "scheduled"}'::jsonb
  ) as request_id;
  $$
);