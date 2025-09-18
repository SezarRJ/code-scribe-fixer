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

    const url = new URL(req.url);
    const batchId = url.searchParams.get('batchId');
    const type = url.searchParams.get('type'); // 'single' or 'bulk' or 'report'
    const fileName = url.searchParams.get('fileName');

    if (!batchId) {
      throw new Error('Batch ID is required');
    }

    if (type === 'report') {
      // Download fix report
      const { data, error } = await supabase.storage
        .from('fix-reports')
        .download(`${user.id}/${batchId}/report.json`);

      if (error) throw error;

      return new Response(data, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="fix-report-${batchId}.json"`
        }
      });
    }

    if (type === 'single' && fileName) {
      // Download single fixed file
      const { data, error } = await supabase.storage
        .from('fixed-files')
        .download(`${user.id}/${batchId}/${fileName}`);

      if (error) throw error;

      return new Response(data, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="${fileName}"`
        }
      });
    }

    if (type === 'bulk') {
      // Create ZIP file with all fixed files
      const { data: files, error: listError } = await supabase.storage
        .from('fixed-files')
        .list(`${user.id}/${batchId}`);

      if (listError) throw listError;

      // For now, return JSON with file URLs
      // In production, you'd want to create an actual ZIP file
      const fileUrls = [];
      for (const file of files || []) {
        const { data: signedURL } = await supabase.storage
          .from('fixed-files')
          .createSignedUrl(`${user.id}/${batchId}/${file.name}`, 3600);
        
        if (signedURL) {
          fileUrls.push({
            name: file.name,
            url: signedURL.signedUrl
          });
        }
      }

      return new Response(
        JSON.stringify({
          batchId,
          files: fileUrls,
          downloadType: 'bulk'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    throw new Error('Invalid download type');

  } catch (error) {
    console.error('Download error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});