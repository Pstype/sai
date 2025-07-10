ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable select for users based on owner_id" ON "public"."projects" FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Enable insert for users based on owner_id" ON "public"."projects" FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Enable update for users based on owner_id" ON "public"."projects" FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Enable delete for users based on owner_id" ON "public"."projects" FOR DELETE USING (auth.uid() = owner_id);

CREATE POLICY "Enable access for project owners" ON "public"."videos" FOR ALL USING (auth.uid() IN (SELECT owner_id FROM projects WHERE projects.id = videos.project_id));
CREATE POLICY "Enable access for project owners" ON "public"."audio_layers" FOR ALL USING (auth.uid() IN (SELECT owner_id FROM projects WHERE projects.id = audio_layers.project_id));

CREATE POLICY "Enable select for project owners" ON "public"."processing_jobs" FOR SELECT USING (auth.uid() IN (SELECT owner_id FROM projects WHERE projects.id = processing_jobs.project_id));
CREATE POLICY "Enable all for service_role" ON "public"."processing_jobs" FOR ALL TO service_role;

CREATE POLICY "Enable select for video owners" ON "public"."video_analysis" FOR SELECT USING (auth.uid() IN (SELECT p.owner_id FROM projects p JOIN videos v ON p.id = v.project_id WHERE v.id = video_analysis.video_id));
CREATE POLICY "Enable insert/update for service_role" ON "public"."video_analysis" FOR ALL TO service_role;

CREATE POLICY "Enable upload for authenticated users" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'videos' AND auth.uid() IS NOT NULL );
CREATE POLICY "Enable download for authenticated users" ON storage.objects FOR SELECT USING ( bucket_id = 'audio' AND auth.uid() IS NOT NULL );
