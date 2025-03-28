
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
    const { topic, keywords, title, outline } = await req.json();
    
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

    // Process inputs to ensure they're formatted correctly
    const cleanTopic = topic.trim();
    const formattedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1).toLowerCase();
    const formattedKeywords = keywords ? keywords.filter(k => k && k.trim().length > 0) : [];
    const currentYear = new Date().getFullYear();

    // In a real implementation, you would call an AI model API here
    // For this example, we'll return enhanced mock data
    const seoContent = generateEnhancedSEOContent(formattedTopic, formattedKeywords, title, outline);
    
    // Create a response with the generated content
    return new Response(
      JSON.stringify({ 
        content: seoContent,
        metadata: {
          wordCount: seoContent.split(/\s+/).length,
          keywordDensity: calculateKeywordDensity(seoContent, formattedKeywords),
          readabilityScore: 85, // Mock score
          seoScore: 92 // Enhanced mock score
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

// Enhanced helper function to generate mock SEO content
function generateEnhancedSEOContent(topic, keywords = [], title = "", outline = null): string {
  const formattedKeywords = keywords.length > 0 ? keywords.join(', ') : 'SEO, optimization';
  const currentYear = new Date().getFullYear();
  const contentTitle = title || `Complete Guide to ${topic} in ${currentYear}`;
  
  let content = `# ${contentTitle}

## Introduction
In this comprehensive guide, we'll explore everything you need to know about ${topic}. 
This guide covers the essential aspects of ${formattedKeywords}, with strategies that have proven effective in ${currentYear}.

## Understanding ${topic}
${topic} has become increasingly important in today's digital landscape. 
As more businesses focus on online presence, implementing effective strategies for ${formattedKeywords} is crucial for success and competitive advantage.

`;

  // Add outline-based content if available
  if (outline && outline.sections) {
    Object.entries(outline.sections).forEach(([key, section]: [string, any]) => {
      content += `## ${section.title}\n\n`;
      content += `${section.content || `This section explores key aspects of ${section.title} and its significant impact on ${topic} strategy. Understanding these elements is critical for achieving optimal results.`}\n\n`;
      
      if (section.subsections && section.subsections.length > 0) {
        section.subsections.forEach((subsection: any) => {
          content += `### ${subsection.title}\n\n`;
          content += `${subsection.content || `${subsection.title} represents a crucial component of effective ${topic} strategy. Organizations that master this element typically see superior performance metrics and stronger market positioning.`}\n\n`;
        });
      }
    });
  } else {
    // Add default sections if no outline provided
    content += `## Best Practices for ${topic}
When implementing ${topic} strategies, consider these best practices:
1. Research your target audience thoroughly to understand their needs and preferences
2. Create high-quality content that addresses specific user questions and pain points
3. Optimize your content for search engines without sacrificing readability or user experience
4. Build a strong backlink profile with reputable websites in your industry
5. Regularly monitor and adjust your strategy based on performance data and market changes

## Key Metrics to Track
To measure the success of your ${topic} efforts, track these metrics:
- Organic traffic growth over time
- Keyword rankings for primary and secondary terms
- Conversion rates from organic search visitors
- Bounce rate and engagement metrics
- Time on page and scroll depth
- Backlink quality and quantity

## Advanced ${topic} Strategies
For those looking to take their ${topic} to the next level:
- Implement structured data markup to enhance search visibility
- Create comprehensive topic clusters to demonstrate authority
- Develop a mobile-first approach for all content
- Optimize for voice search and featured snippets
- Focus on Core Web Vitals and technical performance metrics

`;
  }

  content += `## Case Studies: Real Results
### Enterprise Implementation
A Fortune 500 company implementing these ${topic} strategies saw a 67% increase in organic traffic and a 43% boost in conversion rates within just six months.

### Small Business Success
A local business focusing on ${keywords[0] || topic} achieved first-page rankings for 80% of their target keywords, resulting in a 115% revenue increase year-over-year.

## Conclusion
${topic} continues to evolve, but the fundamentals remain constant: create value for users, optimize for search engines, and measure your results. By following the strategies outlined in this guide, you'll be well-positioned to succeed with ${formattedKeywords} in ${currentYear} and beyond.`;

  return content;
}

// Calculate keyword density
function calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  for (const keyword of keywords) {
    if (!keyword) continue;
    
    const keywordLower = keyword.toLowerCase();
    let count = 0;
    const keywordWords = keywordLower.split(/\s+/);
    
    // For multi-word keywords
    if (keywordWords.length > 1) {
      for (let i = 0; i <= words.length - keywordWords.length; i++) {
        if (words.slice(i, i + keywordWords.length).join(' ') === keywordLower) {
          count++;
        }
      }
    } else {
      // For single-word keywords
      count = words.filter(word => word === keywordLower).length;
    }
    
    result[keyword] = Number(((count / totalWords) * 100).toFixed(2));
  }
  
  return result;
}
