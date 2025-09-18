import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check API key for external integrations
    const apiKey = req.headers.get('x-api-key');
    let userId = null;

    if (apiKey) {
      // Validate API key
      const { data: integration } = await supabase
        .from('api_integrations')
        .select('user_id, is_active')
        .eq('api_key', apiKey)
        .eq('is_active', true)
        .single();

      if (!integration) {
        throw new Error('Invalid API key');
      }

      userId = integration.user_id;

      // Update usage count
      await supabase
        .from('api_integrations')
        .update({ 
          usage_count: supabase.sql`usage_count + 1`,
          last_used_at: new Date().toISOString()
        })
        .eq('api_key', apiKey);
    } else {
      // Use regular auth
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        throw new Error('No authorization provided');
      }

      const { data: { user }, error: authError } = await supabase.auth.getUser(
        authHeader.replace('Bearer ', '')
      );

      if (authError || !user) {
        throw new Error('Invalid token');
      }

      userId = user.id;
    }

    const { code, language, fileName } = await req.json();

    if (!code || !language) {
      throw new Error('Code and language are required');
    }

    // Simulate code analysis based on language and content
    const issues = await analyzeCode(code, language, fileName || 'untitled');

    // Get relevant knowledge base entries
    const { data: knowledgeEntries } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('language', language)
      .order('usage_count', { ascending: false })
      .limit(10);

    const response = {
      success: true,
      analysis: {
        fileName: fileName || 'untitled',
        language,
        issues,
        metrics: {
          totalIssues: issues.length,
          criticalIssues: issues.filter(i => i.severity === 'critical').length,
          warningIssues: issues.filter(i => i.severity === 'warning').length,
          infoIssues: issues.filter(i => i.severity === 'info').length
        },
        knowledgeBase: knowledgeEntries || []
      },
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function analyzeCode(code: string, language: string, fileName: string) {
  const issues = [];
  const lines = code.split('\n');

  // Basic analysis patterns
  const patterns = {
    javascript: [
      { pattern: /var\s+/, type: 'syntax', severity: 'warning', message: 'Use let or const instead of var', suggestion: 'Replace var with let or const' },
      { pattern: /==\s*/, type: 'syntax', severity: 'warning', message: 'Use strict equality (===)', suggestion: 'Replace == with ===' },
      { pattern: /console\.log/, type: 'debug', severity: 'info', message: 'Remove console.log statements', suggestion: 'Remove or replace with proper logging' }
    ],
    python: [
      { pattern: /^\s*print\(/, type: 'debug', severity: 'info', message: 'Consider using logging instead of print', suggestion: 'Use logging module' },
      { pattern: /except:\s*$/, type: 'error-handling', severity: 'critical', message: 'Bare except clause', suggestion: 'Specify exception type' }
    ],
    typescript: [
      { pattern: /:\s*any/, type: 'typing', severity: 'warning', message: 'Avoid using any type', suggestion: 'Use specific types' },
      { pattern: /var\s+/, type: 'syntax', severity: 'warning', message: 'Use let or const instead of var', suggestion: 'Replace var with let or const' }
    ]
  };

  const languagePatterns = patterns[language.toLowerCase()] || patterns.javascript;

  lines.forEach((line, index) => {
    languagePatterns.forEach(({ pattern, type, severity, message, suggestion }) => {
      if (pattern.test(line)) {
        issues.push({
          id: `${fileName}-${index}-${type}`,
          type,
          severity,
          message,
          suggestion,
          line: index + 1,
          column: line.search(pattern) + 1
        });
      }
    });
  });

  return issues;
}