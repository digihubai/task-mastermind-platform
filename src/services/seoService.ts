
import { generateKeywords } from './seo/keywordService';
import { generateTitles } from './seo/titleService';
import { generateSEOContent } from './seo/contentService';
import { fetchSEOAnalytics } from './seo/analyticsService';
import { fetchSEOCampaigns } from './seo/campaignService';

// Export everything for backwards compatibility
export {
  generateKeywords,
  generateTitles,
  generateSEOContent,
  fetchSEOAnalytics,
  fetchSEOCampaigns
};

/**
 * Generate mock SEO content for previewing
 * This function is used specifically in the AISEOWriterPage
 */
export const generateMockSEOContent = (keyword: string, keywords: string[]): string => {
  // Create sample content based on the keywords
  const title = `Ultimate Guide to ${keyword}`;
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
<h1>${title}</h1>
<p class="meta">Published on ${date} | 8 min read</p>

<p>This comprehensive guide explores ${keyword} with advanced insights and actionable strategies. We'll cover everything you need to know about ${keywords.slice(0, 3).join(", ")} and more.</p>

<h2>Introduction to ${keyword}</h2>

<p>In today's digital landscape, understanding ${keyword} is crucial for online success. With ${keywords[0] || keyword} becoming increasingly important in the industry, businesses must adapt their strategies to stay competitive.</p>

<p>Our research shows that companies implementing effective ${keywords[1] || keyword} strategies see a 43% increase in organic traffic and a 27% boost in conversion rates.</p>

<h2>Key Strategies for ${keywords[0] || keyword}</h2>

<p>When implementing ${keywords[0] || keyword} in your business, consider these proven approaches:</p>

<ul>
  <li><strong>Data-driven decision making</strong>: Use analytics to inform your ${keyword} strategy</li>
  <li><strong>User-centric approach</strong>: Focus on solving real problems for your audience</li>
  <li><strong>Continuous optimization</strong>: Regularly test and refine your methods</li>
</ul>

<h2>Advanced ${keywords[1] || keyword} Techniques</h2>

<p>To maximize the effectiveness of your ${keywords[1] || keyword} efforts, implement these advanced techniques:</p>

<ol>
  <li>Conduct comprehensive competitive analysis to identify gaps and opportunities</li>
  <li>Develop a structured content calendar aligned with user search intent</li>
  <li>Utilize semantic keyword mapping to cover topic clusters</li>
  <li>Implement structured data for enhanced search visibility</li>
</ol>

<blockquote>
  <p>"The integration of AI and machine learning will revolutionize how we approach ${keywords[2] || keyword} in the coming years, creating both challenges and opportunities for forward-thinking organizations."</p>
</blockquote>

<h2>Conclusion: Mastering ${keyword}</h2>

<p>By implementing the strategies outlined in this guide, you'll be well-positioned to leverage ${keyword} for sustainable business growth. Remember that success requires consistent effort, data-driven decision making, and a willingness to adapt to changing market conditions.</p>
`;
};

// Add a helper function to replace the missing generateContentWithImages
export const generateContentWithImages = async (
  topic: string, 
  keywords: string[], 
  title: string, 
  outline: string, 
  images: string[] = []
): Promise<string> => {
  // In a real implementation, this would generate content with images
  // For now, call our mock content generator
  let content = generateMockSEOContent(topic, keywords);
  
  // Insert some mock images if provided
  if (images && images.length > 0) {
    const sections = content.split('<h2>');
    if (sections.length > 1) {
      for (let i = 1; i < Math.min(sections.length, images.length + 1); i++) {
        const imageHtml = `
<figure>
  <img src="${images[i-1]}" alt="${title} - ${keywords[i-1] || ''}" class="w-full rounded-lg my-4" />
  <figcaption class="text-center text-sm text-muted-foreground">Image related to ${keywords[i-1] || title}</figcaption>
</figure>
`;
        sections[i] = '<h2>' + sections[i];
        const splitIndex = sections[i].indexOf('</p>') + 4;
        if (splitIndex > 3) {
          sections[i] = sections[i].slice(0, splitIndex) + imageHtml + sections[i].slice(splitIndex);
        }
      }
      content = sections.join('');
    }
  }
  
  return content;
};
