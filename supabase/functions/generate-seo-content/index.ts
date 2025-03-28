
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
    const { topic, keywords, title, outline, images, internalLinks, externalLinks } = await req.json();
    
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
    const seoContent = generateEnhancedSEOContent(formattedTopic, formattedKeywords, title, outline, images, internalLinks, externalLinks);
    
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
function generateEnhancedSEOContent(
  topic, 
  keywords = [], 
  title = "", 
  outline = null, 
  images = [],
  internalLinks = [],
  externalLinks = []
): string {
  const formattedKeywords = keywords.length > 0 ? keywords.join(', ') : 'SEO, optimization';
  const currentYear = new Date().getFullYear();
  const contentTitle = title || `Complete Guide to ${topic} in ${currentYear}`;
  
  let content = `# ${contentTitle}

## Introduction
In this comprehensive guide, we'll explore everything you need to know about ${topic}. 
This guide covers the essential aspects of ${formattedKeywords}, with strategies that have proven effective in ${currentYear}.

`;

  // Add first image if available
  if (images && images.length > 0) {
    content += `![${topic} overview image](${images[0]})\n\n`;
  }

  content += `## Understanding ${topic}
${topic} has become increasingly important in today's digital landscape. 
As more businesses focus on online presence, implementing effective strategies for ${formattedKeywords} is crucial for success and competitive advantage.

`;

  // Add outline-based content if available
  if (outline) {
    if (typeof outline === 'object' && outline.sections) {
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
    } else if (typeof outline === 'string') {
      // Parse string outline
      const outlineLines = outline.split('\n').filter(line => line.trim());
      
      let currentMainSection = null;
      
      for (let i = 0; i < outlineLines.length; i++) {
        const line = outlineLines[i].trim();
        
        if (line.startsWith('# ')) {
          // Main title (skip)
          continue;
        } else if (line.startsWith('## ')) {
          // Main section
          currentMainSection = line.replace('## ', '');
          content += `## ${currentMainSection}\n\n`;
          content += `This section explores key aspects of ${currentMainSection} and how it relates to ${topic}. Understanding these principles will help you develop more effective strategies.\n\n`;
          
          // Add image to some sections if available
          if (images && images.length > 1 && Math.random() > 0.7) {
            const imageIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
            if (images[imageIndex]) {
              content += `![${currentMainSection} visualization](${images[imageIndex]})\n\n`;
            }
          }
        } else if (line.startsWith('### ') && currentMainSection) {
          // Subsection
          const subsection = line.replace('### ', '');
          content += `### ${subsection}\n\n`;
          content += `${subsection} is a crucial component of ${currentMainSection} that can significantly impact your ${topic} results. Companies that excel in this area typically see higher engagement rates and better ROI.\n\n`;
        }
      }
    }
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

    // Add second image if available
    if (images && images.length > 1) {
      content += `![${topic} strategies visualization](${images[1]})\n\n`;
    }
  }

  content += `## Case Studies: Real Results
### Enterprise Implementation
A Fortune 500 company implementing these ${topic} strategies saw a 67% increase in organic traffic and a 43% boost in conversion rates within just six months.

### Small Business Success
A local business focusing on ${keywords[0] || topic} achieved first-page rankings for 80% of their target keywords, resulting in a 115% revenue increase year-over-year.

## Conclusion
${topic} continues to evolve, but the fundamentals remain constant: create value for users, optimize for search engines, and measure your results. By following the strategies outlined in this guide, you'll be well-positioned to succeed with ${formattedKeywords} in ${currentYear} and beyond.`;

  // Insert links if available
  if (internalLinks && internalLinks.length > 0) {
    // Find keywords in the content and replace with links
    internalLinks.forEach((link: any) => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter((word: string) => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }
  
  if (externalLinks && externalLinks.length > 0) {
    // Add external links with proper attribution
    externalLinks.forEach((link: any) => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter((word: string) => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href="${link.url}"`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }

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
