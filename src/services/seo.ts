
import { toast } from "sonner";

export interface LinkSuggestion {
  title: string;
  url: string;
}

// Fetch internal links for cross-linking in content
export const fetchInternalLinks = async (): Promise<Array<LinkSuggestion>> => {
  // Simulated API call to get internal links
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Ultimate SEO Guide", url: "/blog/ultimate-seo-guide" },
        { title: "Content Marketing Strategy", url: "/blog/content-marketing-strategy" },
        { title: "Social Media SEO Tips", url: "/blog/social-media-seo" },
        { title: "Technical SEO Checklist", url: "/blog/technical-seo-checklist" },
        { title: "Local SEO Guide", url: "/blog/local-seo-guide" }
      ]);
    }, 1000);
  });
};

// Fetch external links based on topic and keywords
export const fetchRelatedExternalLinks = async (topic: string, keywords: string[]): Promise<Array<LinkSuggestion>> => {
  // Simulated API call to get external links
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Google's SEO Starter Guide", url: "https://developers.google.com/search/docs/beginner/seo-starter-guide" },
        { title: "Moz's Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo" },
        { title: "Ahrefs' SEO Blog", url: "https://ahrefs.com/blog" },
        { title: "Search Engine Journal", url: "https://www.searchenginejournal.com" },
        { title: "Backlinko's SEO Techniques", url: "https://backlinko.com/hub/seo/techniques" }
      ]);
    }, 1500);
  });
};

// Insert links into content
export const insertLinksIntoContent = (content: string, links: Array<LinkSuggestion>, isExternal: boolean): string => {
  let updatedContent = content;
  
  links.forEach(link => {
    // Only try to insert each link once
    const linkText = link.title;
    const regexp = new RegExp(`\\b${linkText}\\b(?![^<]*>|[^<>]*<\\/a>)`, 'i');
    
    if (regexp.test(updatedContent)) {
      const replacement = isExternal 
        ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        : `<a href="${link.url}">${linkText}</a>`;
      
      updatedContent = updatedContent.replace(regexp, replacement);
    }
  });
  
  return updatedContent;
};

// Get AI-generated high-quality content
export const generateContent = async (
  topic: string,
  keywords: string[],
  title: string,
  outline: string
): Promise<string> => {
  return new Promise((resolve) => {
    // Simulated API call to an AI service like GPT-4
    setTimeout(() => {
      // Advanced AI response with proper formatting and structure
      const content = `
<h1>${title}</h1>

<p>This comprehensive guide explores ${topic} with advanced insights and actionable strategies. We'll cover everything you need to know about ${keywords.slice(0, 3).join(", ")} and more.</p>

<h2>Introduction to ${topic}</h2>

<p>In today's digital landscape, understanding ${topic} is crucial for online success. With ${keywords[0]} becoming increasingly important in the industry, businesses must adapt their strategies to stay competitive.</p>

<p>Our research shows that companies implementing effective ${keywords[1]} strategies see a 43% increase in organic traffic and a 27% boost in conversion rates.</p>

<h2>Key Strategies for ${keywords[0]}</h2>

<p>When implementing ${keywords[0]} in your business, consider these proven approaches:</p>

<ul>
  <li><strong>Data-driven decision making</strong>: Use analytics to inform your ${topic} strategy</li>
  <li><strong>User-centric approach</strong>: Focus on solving real problems for your audience</li>
  <li><strong>Continuous optimization</strong>: Regularly test and refine your methods</li>
</ul>

<h2>Advanced ${keywords[1]} Techniques</h2>

<p>To maximize the effectiveness of your ${keywords[1]} efforts, implement these advanced techniques:</p>

<ol>
  <li>Conduct comprehensive competitive analysis to identify gaps and opportunities</li>
  <li>Develop a structured content calendar aligned with user search intent</li>
  <li>Utilize semantic keyword mapping to cover topic clusters</li>
  <li>Implement structured data for enhanced search visibility</li>
</ol>

<h2>The Future of ${topic}</h2>

<p>Industry experts predict significant changes in how ${topic} will evolve over the next 5 years. Key trends to watch include:</p>

<blockquote>
  <p>"The integration of AI and machine learning will revolutionize how we approach ${keywords[2]} in the coming years, creating both challenges and opportunities for forward-thinking organizations."</p>
</blockquote>

<h2>Implementing ${keywords[3]} in Your Business</h2>

<p>Follow this step-by-step framework to successfully implement ${keywords[3]} in your organization:</p>

<ol>
  <li><strong>Assessment</strong>: Evaluate your current state and identify gaps</li>
  <li><strong>Strategy</strong>: Develop a comprehensive roadmap with clear objectives</li>
  <li><strong>Implementation</strong>: Execute your plan with cross-functional collaboration</li>
  <li><strong>Measurement</strong>: Track key performance indicators and adjust as needed</li>
</ol>

<h2>Case Study: Success with ${topic}</h2>

<p>Company XYZ implemented our recommended ${topic} strategy and achieved remarkable results:</p>

<ul>
  <li>137% increase in organic search visibility</li>
  <li>64% growth in qualified leads</li>
  <li>42% reduction in customer acquisition costs</li>
  <li>87% improvement in user engagement metrics</li>
</ul>

<h2>Conclusion: Mastering ${topic}</h2>

<p>By implementing the strategies outlined in this guide, you'll be well-positioned to leverage ${topic} for sustainable business growth. Remember that success requires consistent effort, data-driven decision making, and a willingness to adapt to changing market conditions.</p>

<p>Start by focusing on the highest-impact areas for your specific business context, and gradually expand your efforts as you build momentum.</p>
      `;
      
      resolve(content);
    }, 2000);
  });
};

// Generate content with integrated images and links
export const generateContentWithImages = async (
  topic: string,
  keywords: string[],
  title: string,
  outline: string,
  images: string[],
  internalLinks: Array<LinkSuggestion>,
  externalLinks: Array<LinkSuggestion>
): Promise<string> => {
  try {
    // First, generate the base content
    let content = await generateContent(topic, keywords, title, outline);
    
    // Insert images if available
    if (images && images.length > 0) {
      // Find suitable places to insert images
      const h2Sections = content.match(/<h2>.*?<\/h2>/g);
      
      if (h2Sections && h2Sections.length > 0) {
        // Insert images after some h2 headings
        for (let i = 0; i < Math.min(images.length, h2Sections.length); i++) {
          const imageHtml = `
<figure>
  <img src="${images[i]}" alt="${title} - ${keywords[i] || 'related image'}" class="rounded-lg w-full my-6" />
  <figcaption class="text-center text-sm text-muted-foreground mt-2">${keywords[i] || topic} - Professional visualization</figcaption>
</figure>`;
          
          // Insert after h2 + following paragraph
          const sectionRegex = new RegExp(`(${h2Sections[i]}.*?</p>)`, 's');
          if (sectionRegex.test(content)) {
            content = content.replace(sectionRegex, `$1${imageHtml}`);
          }
        }
      }
    }
    
    // Insert internal links
    if (internalLinks && internalLinks.length > 0) {
      content = insertLinksIntoContent(content, internalLinks, false);
    }
    
    // Insert external links
    if (externalLinks && externalLinks.length > 0) {
      content = insertLinksIntoContent(content, externalLinks, true);
    }
    
    // Ensure proper spacing and structure
    content = content
      .replace(/<\/h([1-6])>\s*<p>/g, '</h$1>\n\n<p>') // Add space after headings
      .replace(/<\/p>\s*<h([1-6])>/g, '</p>\n\n<h$1>') // Add space before headings
      .replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>') // Add space after lists
      .replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>') // Add space after ordered lists
      .replace(/<\/blockquote>\s*<p>/g, '</blockquote>\n\n<p>') // Add space after blockquotes
      .replace(/<\/figure>\s*<p>/g, '</figure>\n\n<p>'); // Add space after figures
    
    return content;
  } catch (error) {
    console.error("Error generating content with images:", error);
    toast.error("Error generating content with images");
    throw error;
  }
};

// Generate optimized SEO meta tags based on content
export const generateSEOMetaTags = async (
  title: string,
  content: string,
  keywords: string[]
): Promise<{
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}> => {
  // Simulated API call to generate meta tags
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metaTitle: `${title} | Expert Guide to ${keywords[0]}`,
        metaDescription: `Learn everything about ${title} with our comprehensive guide. Expert tips on ${keywords.slice(0, 3).join(", ")} for better results.`,
        canonicalUrl: `/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
        ogTitle: title,
        ogDescription: `Master ${keywords[0]} with our expert guide on ${title}. Practical strategies and actionable insights.`,
        twitterTitle: title,
        twitterDescription: `${title}: A complete guide to ${keywords[0]} with expert insights and proven strategies.`
      });
    }, 1000);
  });
};
