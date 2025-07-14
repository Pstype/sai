-- Add owner-based access to audio_layers
CREATE POLICY "User access to own audio layers" ON audio_layers
  FOR ALL USING (
    project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid())
  );

-- Fix video access policy
DROP POLICY "Enable access for project owners" ON videos;
CREATE POLICY "User access to own videos" ON videos
  FOR ALL USING (
    project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid())
  );
