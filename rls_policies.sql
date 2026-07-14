-- Enable RLS for all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for tools
CREATE POLICY "Public can view tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert tools" ON public.tools FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update tools" ON public.tools FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete tools" ON public.tools FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for uses (if used)
CREATE POLICY "Public can view uses" ON public.uses FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert uses" ON public.uses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update uses" ON public.uses FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete uses" ON public.uses FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for blogs
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert blogs" ON public.blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blogs" ON public.blogs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blogs" ON public.blogs FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for jobs
CREATE POLICY "Public can view jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert jobs" ON public.jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update jobs" ON public.jobs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete jobs" ON public.jobs FOR DELETE USING (auth.role() = 'authenticated');
