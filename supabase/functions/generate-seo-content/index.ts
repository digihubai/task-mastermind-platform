
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
      "The Importance of " + topic + " in Today's Market",
      "Key Strategies for " + primaryKeyword,
      "Best Practices for " + (secondaryKeywords[0] || primaryKeyword),
      "How to Implement " + topic + " Successfully",
      "Common Challenges with " + primaryKeyword + " and How to Overcome Them",
      "Case Studies: Success Stories with " + topic,
      "Future Trends in " + topic,
      "Tools and Resources for " + primaryKeyword,
      "Conclusion: Taking Your " + topic + " Strategy to the Next Level"
    ];
  }

  // The current year for relevance
  const currentYear = new Date().getFullYear();

  // Start building the content
  let content = `<h1>${title}</h1>

<p class="introduction">Welcome to our comprehensive guide on ${topic}. This article provides in-depth information about ${primaryKeyword} and explores how ${secondaryKeywords.join(", ")} can benefit your business in ${currentYear}. Our expert insights will help you implement effective strategies and achieve better results.</p>

`;

  // Generate content for each section in the outline
  outlineSections.forEach((section, index) => {
    if (section.toLowerCase().includes('introduction') && index === 0) {
      content += `<h2>${section}</h2>

<p>In today's rapidly evolving digital landscape, mastering ${primaryKeyword} has become essential for businesses aiming to stay competitive. Organizations effectively implementing ${secondaryKeywords[0] || primaryKeyword} strategies see an average of 37% increase in relevant metrics and a 42% improvement in overall performance.</p>

<p>This comprehensive guide will walk you through everything you need to know about ${topic}, from fundamental concepts to advanced implementation strategies. Whether you're new to ${primaryKeyword} or looking to enhance your existing approach, you'll find actionable insights to drive meaningful results.</p>

`;
    } else if (section.toLowerCase().includes('conclusion') || section.toLowerCase().includes('summary')) {
      // Conclusion section
      content += `<h2>${section}</h2>

<p>By implementing the strategies outlined in this guide, you'll be well-positioned to leverage ${topic} for sustainable growth and competitive advantage. Remember that success requires consistent effort, data-driven decision making, and a willingness to adapt to changing market conditions.</p>

<p>Start by focusing on the highest-impact areas for your specific business context, and gradually expand your efforts as you build momentum. With a strategic approach to ${secondaryKeywords.join(", ")}, you'll achieve exceptional results and position your organization for long-term success.</p>

<p>Remember that ${primaryKeyword} is not a one-time initiative but an ongoing journey of improvement and optimization. By staying committed to excellence and continuing to refine your approach based on performance data, you'll establish a strong foundation for sustainable growth in the competitive landscape of ${currentYear} and beyond.</p>
`;
    } else {
      // Standard content section
      const keywordToUse = keywords[index % keywords.length] || primaryKeyword;
      
      content += `<h2>${section}</h2>

<p>When it comes to ${section.toLowerCase()}, industry leaders recommend focusing on ${keywordToUse} as a primary consideration. This approach ensures optimal results while maintaining operational efficiency and scalability.</p>

`;

      // Add subsections to some sections
      if (index % 3 === 0) {
        content += `<h3>Key elements of successful ${keywordToUse} implementation</h3>

<p>Implementing effective ${keywordToUse} strategies requires attention to several critical factors:</p>

<ul>
  <li><strong>Strategic alignment</strong>: Ensure your ${keywordToUse} initiatives support broader business objectives</li>
  <li><strong>Data-driven approach</strong>: Use analytics to inform and refine your strategy</li>
  <li><strong>Customer-centric focus</strong>: Prioritize user needs and expectations</li>
  <li><strong>Continuous improvement</strong>: Regularly evaluate and optimize your methods</li>
  <li><strong>Cross-functional collaboration</strong>: Involve stakeholders from different departments</li>
</ul>

<p>Organizations that excel in these areas typically see ${25 + Math.floor(Math.random() * 30)}% better outcomes compared to those taking a less structured approach.</p>

`;
      } else if (index % 3 === 1) {
        content += `<h3>Implementation framework for ${keywordToUse}</h3>

<p>Follow this proven step-by-step process to successfully implement ${keywordToUse} in your organization:</p>

<ol>
  <li><strong>Assessment</strong>: Evaluate your current capabilities, challenges, and opportunities</li>
  <li><strong>Strategy development</strong>: Create a comprehensive roadmap with clear objectives and KPIs</li>
  <li><strong>Resource allocation</strong>: Ensure you have the necessary tools, technology, and talent</li>
  <li><strong>Implementation</strong>: Execute your plan with cross-functional collaboration</li>
  <li><strong>Measurement</strong>: Track performance against established metrics</li>
  <li><strong>Optimization</strong>: Refine your approach based on results and feedback</li>
</ol>

<blockquote>
  <p>"The most successful organizations don't implement ${keywordToUse} as a one-time project but integrate it into their operational DNA, creating a culture of continuous improvement and adaptation."</p>
</blockquote>

`;
      } else {
        content += `<h3>Case study: Achieving excellence with ${keywordToUse}</h3>

<p>A leading organization in the ${Math.random() > 0.5 ? 'B2B' : 'B2C'} sector implemented a comprehensive ${keywordToUse} strategy that transformed their business outcomes. Here's what they achieved:</p>

<ul>
  <li>${40 + Math.floor(Math.random() * 40)}% increase in key performance indicators</li>
  <li>${20 + Math.floor(Math.random() * 30)}% reduction in operational costs</li>
  <li>${70 + Math.floor(Math.random() * 20)}% improvement in customer satisfaction scores</li>
  <li>Significant competitive advantage in their market segment</li>
</ul>

<p>Their approach focused on ${secondaryKeywords[Math.floor(Math.random() * secondaryKeywords.length)] || keywordToUse} as a core component, with particular emphasis on data-driven decision making and cross-functional collaboration.</p>

<h3>Best practices for optimizing your ${keywordToUse} strategy</h3>

<p>To maximize the effectiveness of your ${keywordToUse} initiatives, consider these industry-proven best practices:</p>

<ul>
  <li>Establish clear governance and ownership structures</li>
  <li>Invest in ongoing training and capability development</li>
  <li>Leverage technology and automation where appropriate</li>
  <li>Create feedback loops for continuous improvement</li>
  <li>Benchmark against industry leaders and adopt relevant practices</li>
</ul>

`;
      }
    }
  });

  return content;
}
