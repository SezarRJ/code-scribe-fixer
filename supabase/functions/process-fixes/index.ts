import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid token');
    }

    const { files, batchId } = await req.json();

    let totalFiles = 0;
    let totalIssues = 0;
    let totalFixesApplied = 0;
    const processedFiles = [];

    // Process each file
    for (const file of files) {
      const { fileName, content, fixes, language } = file;
      
      // Apply fixes to content
      let fixedContent = content;
      let appliedFixes = [];
      
      for (const fix of fixes) {
        // Simulate applying fix
        if (fix.suggestion) {
          fixedContent = fixedContent.replace(
            new RegExp(fix.message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            fix.suggestion
          );
          appliedFixes.push(fix);
          totalFixesApplied++;
        }
      }

      totalFiles++;
      totalIssues += fixes.length;

      // Store fixed file
      const { data: fileData, error: fileError } = await supabase.storage
        .from('fixed-files')
        .upload(`${user.id}/${batchId}/${fileName}`, fixedContent, {
          contentType: 'text/plain',
          upsert: true
        });

      if (fileError) {
        console.error('File upload error:', fileError);
        continue;
      }

      // Save to code_fixes table
      const { error: fixError } = await supabase
        .from('code_fixes')
        .insert({
          user_id: user.id,
          original_file_name: fileName,
          original_file_content: content,
          fixed_file_content: fixedContent,
          fixes_applied: appliedFixes,
          fix_summary: `Applied ${appliedFixes.length} fixes`,
          language: language
        });

      if (fixError) {
        console.error('Database insert error:', fixError);
      }

      // Update knowledge base
      for (const fix of appliedFixes) {
        await supabase.rpc('upsert_knowledge_base_entry', {
          p_issue_type: fix.type,
          p_issue_pattern: fix.message,
          p_solution_pattern: fix.suggestion || '',
          p_language: language,
          p_severity: fix.severity,
          p_description: `Auto-generated from fix application`
        });
      }

      processedFiles.push({
        fileName,
        fixesApplied: appliedFixes.length,
        downloadUrl: fileData?.path
      });
    }

    // Generate report
    const reportData = {
      batchId,
      summary: {
        totalFiles,
        totalIssues,
        totalFixesApplied,
        successRate: ((totalFixesApplied / Math.max(totalIssues, 1)) * 100).toFixed(2)
      },
      files: processedFiles,
      timestamp: new Date().toISOString()
    };

    // Upload report
    const reportContent = JSON.stringify(reportData, null, 2);
    const { data: reportFileData } = await supabase.storage
      .from('fix-reports')
      .upload(`${user.id}/${batchId}/report.json`, reportContent, {
        contentType: 'application/json',
        upsert: true
      });

    // Save report to database
    await supabase
      .from('fix_reports')
      .insert({
        user_id: user.id,
        batch_id: batchId,
        total_files: totalFiles,
        total_issues: totalIssues,
        total_fixes_applied: totalFixesApplied,
        report_data: reportData,
        report_file_url: reportFileData?.path
      });

    return new Response(
      JSON.stringify({
        success: true,
        batchId,
        summary: reportData.summary,
        files: processedFiles
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing fixes:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});