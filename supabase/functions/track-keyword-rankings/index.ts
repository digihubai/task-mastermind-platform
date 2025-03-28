
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { keywords } = await req.json();
    
    // Validate inputs
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keywords array is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate mock keyword ranking data
    const keywordRankings = keywords.map(keyword => generateMockKeywordRanking(keyword));
    
    return new Response(
      JSON.stringify({ rankings: keywordRankings }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to generate mock keyword ranking data
function generateMockKeywordRanking(keyword: string) {
  // Generate a random position between 1 and 100
  const position = Math.floor(Math.random() * 20) + 1;
  
  // Generate a random change between -5 and +5
  const change = Math.floor(Math.random() * 11) - 5;
  
  // Generate a random search volume between 500 and 10000
  const volume = Math.floor(Math.random() * 9500) + 500;
  
  // Random difficulty levels
  const difficulties = ["Low", "Medium", "High"];
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  
  return {
    keyword,
    position,
    previousPosition: position + change,
    change: change * -1,  // Invert change for proper display (negative means ranking improved)
    volume,
    difficulty,
    url: `https://example.com/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
    lastUpdated: new Date().toISOString()
  };
}
