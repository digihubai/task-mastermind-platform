
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the user ID from the request
    const { userId, days = 30 } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Generate sample data for the past X days
    const today = new Date();
    const sampleData = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Create random but realistic metrics
      // Page views increase over time with some randomness
      const trendFactor = 1 + (days - i) / 100; // Small upward trend
      const randomization = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2
      
      const basePageViews = 100 * trendFactor * randomization;
      const pageViews = Math.floor(basePageViews);
      
      // Unique visitors is related to page views
      const uniqueVisitors = Math.floor(pageViews * (0.4 + Math.random() * 0.2)); // 40-60% of page views
      
      // Bounce rate fluctuates but trends downward (improvement)
      const bounceRate = 60 - (days - i) / 10 + (Math.random() * 10 - 5);
      
      // Average time increases slightly over time (improvement)
      const avgTimeOnSite = 120 + (days - i) / 5 + (Math.random() * 30 - 15);
      
      // Conversions related to visitors but with randomness
      const conversions = Math.floor(uniqueVisitors * (0.02 + Math.random() * 0.02));

      sampleData.push({
        user_id: userId,
        date: date.toISOString().split('T')[0],
        page_views: pageViews,
        unique_visitors: uniqueVisitors,
        bounce_rate: parseFloat(bounceRate.toFixed(2)),
        avg_time_on_site: parseFloat(avgTimeOnSite.toFixed(2)),
        conversions: conversions,
      });
    }

    // Insert the sample data
    const { data, error } = await supabase
      .from('analytics_data')
      .upsert(sampleData, { onConflict: 'user_id,date' })
      .select();

    if (error) {
      console.error("Error inserting sample data:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${sampleData.length} days of sample data`,
        data: sampleData 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in generate-analytics-sample function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
