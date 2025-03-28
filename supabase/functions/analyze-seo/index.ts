
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
    const { url } = await req.json();
    
    // Validate inputs
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // In a real implementation, you would fetch the URL and analyze its content
    // For this example, we'll return mock analysis data
    const mockAnalysis = generateMockSEOAnalysis(url);
    
    return new Response(
      JSON.stringify(mockAnalysis),
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

// Helper function to generate mock SEO analysis
function generateMockSEOAnalysis(url: string) {
  return {
    url,
    analysisDate: new Date().toISOString(),
    overallScore: 76,
    metrics: {
      titleTag: {
        score: 85,
        title: "Example Title - This is a sample title for analysis",
        length: 48,
        recommendations: "Your title is good but could be more compelling."
      },
      metaDescription: {
        score: 70,
        description: "This is a sample meta description for SEO analysis purposes. It demonstrates what a meta description might look like.",
        length: 102,
        recommendations: "Your meta description is a good length but could include more keywords."
      },
      headings: {
        score: 80,
        h1Count: 1,
        h2Count: 5,
        h3Count: 8,
        recommendations: "Good heading structure. Consider adding more descriptive keywords to H2s."
      },
      content: {
        score: 75,
        wordCount: 1250,
        keywordDensity: {
          "seo": 2.3,
          "analysis": 1.8,
          "optimization": 1.2
        },
        recommendations: "Content length is good. Consider increasing keyword density slightly."
      },
      images: {
        score: 65,
        count: 8,
        withAlt: 6,
        withoutAlt: 2,
        recommendations: "Add alt text to all images for better accessibility and SEO."
      },
      links: {
        score: 82,
        internal: 12,
        external: 5,
        broken: 0,
        recommendations: "Good link structure. Consider adding more authoritative external links."
      },
      performance: {
        score: 72,
        loadTime: 2.4,
        recommendations: "Page load time is acceptable but could be improved by optimizing images."
      },
      mobileOptimization: {
        score: 78,
        isMobileFriendly: true,
        recommendations: "Site is mobile-friendly but could improve tap target spacing."
      }
    },
    topKeywords: [
      { keyword: "seo analysis", count: 15 },
      { keyword: "website optimization", count: 12 },
      { keyword: "content marketing", count: 9 },
      { keyword: "digital strategy", count: 7 }
    ],
    recommendations: [
      "Improve meta description with more targeted keywords",
      "Optimize image sizes to improve page load speed",
      "Add alt text to all images",
      "Increase keyword density for primary keywords",
      "Add more internal links to related content"
    ]
  };
}
