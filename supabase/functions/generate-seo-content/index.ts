
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const { topic, keywords } = await req.json();
    
    // Validate inputs
    if (!topic) {
      return new Response(
        JSON.stringify({ error: 'Topic is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // In a real implementation, you would call an AI model API here
    // For this example, we'll return mock data
    const seoContent = generateMockSEOContent(topic, keywords);
    
    // Create a response with the generated content
    return new Response(
      JSON.stringify({ 
        content: seoContent,
        metadata: {
          wordCount: seoContent.split(' ').length,
          keywordDensity: calculateKeywordDensity(seoContent, keywords),
          readabilityScore: 85 // Mock score
        }
      }),
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

// Helper function to generate mock SEO content
function generateMockSEOContent(topic: string, keywords: string[] = []): string {
  const keywordsStr = keywords.length > 0 ? keywords.join(', ') : 'SEO, optimization';
  
  return `# Comprehensive Guide to ${topic}

## Introduction
In this comprehensive guide, we'll explore everything you need to know about ${topic}. 
This guide covers the essential aspects of ${keywordsStr}.

## Understanding ${topic}
${topic} has become increasingly important in the digital landscape. 
As more businesses focus on online presence, implementing effective strategies for ${keywordsStr} is crucial.

## Best Practices for ${topic}
When implementing ${topic} strategies, consider these best practices:
1. Research your target audience thoroughly
2. Create high-quality content that addresses user needs
3. Optimize your content for search engines without sacrificing readability
4. Build a strong backlink profile with reputable websites
5. Regularly monitor and adjust your strategy based on performance data

## Key Metrics to Track
To measure the success of your ${topic} efforts, track these metrics:
- Organic traffic
- Keyword rankings
- Conversion rates
- Bounce rate
- Time on page
- Backlink quality and quantity

## Advanced ${topic} Strategies
For those looking to take their ${topic} to the next level:
- Implement structured data markup
- Create comprehensive topic clusters
- Develop a mobile-first approach
- Optimize for voice search
- Focus on user experience metrics

## Conclusion
${topic} continues to evolve, but the fundamentals remain constant: create value for users, optimize for search engines, and measure your results. By following the strategies outlined in this guide, you'll be well-positioned to succeed with ${keywordsStr}.`;
}

// Calculate keyword density
function calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    let count = 0;
    
    for (let i = 0; i <= words.length - keywordLower.split(/\s+/).length; i++) {
      if (words.slice(i, i + keywordLower.split(/\s+/).length).join(' ') === keywordLower) {
        count++;
      }
    }
    
    result[keyword] = Number(((count / totalWords) * 100).toFixed(2));
  }
  
  return result;
}
