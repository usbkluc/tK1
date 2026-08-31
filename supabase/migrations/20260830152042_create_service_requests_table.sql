CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id text NOT NULL,
  category_name text NOT NULL,
  subcategory_id text NOT NULL,
  subcategory_name text NOT NULL,
  service_id text NOT NULL,
  service_name text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text NOT NULL DEFAULT '',
  speed text NOT NULL DEFAULT 'standard',
  material text NOT NULL DEFAULT 'self',
  risk_accepted boolean NOT NULL DEFAULT false,
  files jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_requests" ON service_requests;
CREATE POLICY "anon_select_requests" ON service_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_requests" ON service_requests;
CREATE POLICY "anon_insert_requests" ON service_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_requests" ON service_requests;
CREATE POLICY "anon_update_requests" ON service_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_requests" ON service_requests;
CREATE POLICY "anon_delete_requests" ON service_requests FOR DELETE
  TO anon, authenticated USING (true);