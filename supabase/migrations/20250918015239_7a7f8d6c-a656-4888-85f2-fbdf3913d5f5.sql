-- Create code_fixes table for tracking applied fixes
CREATE TABLE public.code_fixes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  original_file_name TEXT NOT NULL,
  original_file_content TEXT NOT NULL,
  fixed_file_content TEXT NOT NULL,
  fixes_applied JSONB NOT NULL DEFAULT '[]'::jsonb,
  fix_summary TEXT NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fix_reports table for detailed fix reporting
CREATE TABLE public.fix_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  batch_id UUID NOT NULL,
  total_files INTEGER NOT NULL DEFAULT 0,
  total_issues INTEGER NOT NULL DEFAULT 0,
  total_fixes_applied INTEGER NOT NULL DEFAULT 0,
  report_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  report_file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create knowledge_base table for storing fix patterns and solutions
CREATE TABLE public.knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_type TEXT NOT NULL,
  issue_pattern TEXT NOT NULL,
  solution_pattern TEXT NOT NULL,
  language TEXT NOT NULL,
  severity TEXT NOT NULL,
  usage_count INTEGER NOT NULL DEFAULT 1,
  success_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  example_before TEXT,
  example_after TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create api_integrations table for external API access
CREATE TABLE public.api_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  api_key TEXT NOT NULL,
  api_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  usage_count INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.code_fixes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fix_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_integrations ENABLE ROW LEVEL SECURITY;

-- RLS policies for code_fixes
CREATE POLICY "Users can manage their own code fixes" 
ON public.code_fixes 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS policies for fix_reports
CREATE POLICY "Users can view their own fix reports" 
ON public.fix_reports 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create fix reports" 
ON public.fix_reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS policies for knowledge_base (readable by all, managed by system)
CREATE POLICY "Knowledge base is readable by all authenticated users" 
ON public.knowledge_base 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- RLS policies for api_integrations
CREATE POLICY "Users can manage their own API integrations" 
ON public.api_integrations 
FOR ALL 
USING (auth.uid() = user_id);

-- Create storage buckets for fixed files and reports
INSERT INTO storage.buckets (id, name, public) VALUES ('fixed-files', 'fixed-files', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('fix-reports', 'fix-reports', false);

-- Storage policies for fixed-files bucket
CREATE POLICY "Users can upload their own fixed files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'fixed-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own fixed files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'fixed-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for fix-reports bucket
CREATE POLICY "Users can upload their own fix reports" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'fix-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own fix reports" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'fix-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create triggers for updated_at columns
CREATE TRIGGER update_code_fixes_updated_at
BEFORE UPDATE ON public.code_fixes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at
BEFORE UPDATE ON public.knowledge_base
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();