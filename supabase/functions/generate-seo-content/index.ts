
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { topic, keywords, title, outline } = await req.json();
    
    console.log("Generating content for:", { topic, title, keywordCount: keywords?.length });
    
    if (!topic || !title || !keywords || keywords.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          details: "Topic, title, and keywords are required" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // This is a simulation for now - in production, you would connect to OpenAI or another AI service
    // Create a nicely formatted HTML content for SEO
    const content = generateSEOContent(topic, keywords, title, outline);
    
    console.log("Content generated successfully, content length:", content.length);
    
    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in generate-seo-content function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Utility function to generate formatted SEO content
function generateSEOContent(topic: string, keywords: string[], title: string, outline: string) {
  // Format keywords for better text generation
  const primaryKeyword = keywords[0] || topic;
  const secondaryKeywords = keywords.slice(1, 5);
  
  // Parse the outline if it's provided
  let outlineSections: string[] = [];
  if (outline) {
    // Simple parsing of outline sections (assumes clean formatting)
    outlineSections = outline.split(/\n+/).filter(line => line.trim().length > 0);
  } else {
    // Generate some default sections if no outline is provided
    outlineSections = [
      "Introduction to " + topic,
      "Benefits of " + topic,
      "How to implement " + topic,
      primaryKeyword + " best practices",
      "Case studies",
      "Conclusion"
    ];
  }

  // Start building the content
  let content = `<h1>${title}</h1>

<p>Welcome to our comprehensive guide on ${topic}. This article provides in-depth information about ${primaryKeyword} and explores how ${secondaryKeywords.join(", ")} can benefit your business. Our expert insights will help you implement effective strategies and achieve better results.</p>

`;

  // Add introduction section
  content += `<h2>Introduction to ${topic}</h2>

<p>Understanding ${primaryKeyword} is crucial in today's competitive landscape. With the right approach to ${secondaryKeywords[0] || keywords[0]}, organizations can significantly improve their performance and achieve sustainable growth.</p>

<p>Recent studies show that companies effectively implementing ${primaryKeyword} strategies see an average of 37% increase in relevant metrics and a 42% improvement in overall performance.</p>

`;

  // Generate content for each section in the outline
  outlineSections.forEach((section, index) => {
    if (index === 0) return; // Skip first section as we've already created the intro
    
    const keywordToUse = keywords[index % keywords.length] || primaryKeyword;
    
    content += `<h2>${section}</h2>

<p>When it comes to ${section.toLowerCase()}, experts recommend focusing on ${keywordToUse} as a primary consideration. This approach ensures you'll achieve optimal results while maintaining efficiency.</p>

`;

    // Add subsections to longer sections
    if (index % 2 === 0) {
      content += `<h3>Key aspects of ${keywordToUse}</h3>

<p>There are several important factors to consider when implementing ${keywordToUse} in your strategy:</p>

<ul>
  <li><strong>Data-driven decision making</strong>: Use analytics to inform your approach</li>
  <li><strong>User-centric focus</strong>: Prioritize user needs and expectations</li>
  <li><strong>Continuous improvement</strong>: Regularly evaluate and refine your methods</li>
  <li><strong>Competitive analysis</strong>: Stay aware of industry trends and competitor strategies</li>
</ul>

`;
    } else {
      content += `<p>Industry leaders implementing ${keywordToUse} typically follow these steps:</p>

<ol>
  <li>Conduct a comprehensive assessment of current capabilities and opportunities</li>
  <li>Develop a strategic roadmap with clear objectives and milestones</li>
  <li>Implement solutions with cross-functional collaboration</li>
  <li>Measure results against established KPIs and adjust as needed</li>
</ol>

<blockquote>
  <p>"The most successful organizations don't just implement ${keywordToUse} as a one-time initiative; they integrate it into their operational DNA and continuously evolve their approach based on results and changing market conditions."</p>
</blockquote>

`;
    }
  });

  // Add a conclusion section
  content += `<h2>Conclusion: Mastering ${topic}</h2>

<p>By implementing the strategies outlined in this guide, you'll be well-positioned to leverage ${primaryKeyword} for sustainable growth and competitive advantage. Remember that success requires consistent effort, data-driven decision making, and a willingness to adapt to changing market conditions.</p>

<p>Start by focusing on the highest-impact areas for your specific business context, and gradually expand your efforts as you build momentum. With a strategic approach to ${secondaryKeywords.join(", ")}, you'll achieve exceptional results and position your organization for long-term success.</p>
`;

  return content;
}
