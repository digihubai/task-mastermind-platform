/**
 * Fetches internal links relevant to the content
 * In a production environment, this would query your site's pages/posts
 */
export const fetchInternalLinks = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock internal links that would come from your own website
  return [
    {
      title: "Guide to AI-Powered Customer Service",
      url: "/blog/ai-customer-service",
    },
    {
      title: "How to Choose the Right Chatbot for Your Business",
      url: "/blog/choosing-chatbot",
    },
    {
      title: "Chatbot ROI: Measuring Success",
      url: "/blog/chatbot-roi",
    },
    {
      title: "Natural Language Processing Explained",
      url: "/blog/nlp-guide",
    },
    {
      title: "Conversational Design Best Practices",
      url: "/blog/conversational-design",
    }
  ];
};

/**
 * Fetches external links related to the topic and keywords
 * In a production environment, this would use a content recommendation API
 */
export const fetchRelatedExternalLinks = async (topic: string, keywords: string[]) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Use topic and keywords to create relevant mock external links
  const keywordString = keywords.join('-').toLowerCase();
  
  return [
    {
      title: "Gartner Research: The Future of Conversational AI",
      url: `https://example.com/research/${keywordString}-research`,
    },
    {
      title: `Latest ${topic} Statistics for ${new Date().getFullYear()}`,
      url: `https://example.com/stats/${topic.toLowerCase().replace(/\s+/g, '-')}`,
    },
    {
      title: `Case Study: How Company X Improved with ${keywords[0] || 'AI'}`,
      url: "https://example.com/case-studies/company-x",
    },
    {
      title: "Industry Report: Conversational AI Trends",
      url: "https://example.com/reports/conversational-ai-trends",
    },
    {
      title: `${topic} Tools and Resources`,
      url: `https://example.com/resources/${topic.toLowerCase().replace(/\s+/g, '-')}`,
    }
  ];
};

/**
 * Checks if a URL is from the current domain (internal) or external
 */
export const isExternalLink = (url: string): boolean => {
  // If the URL starts with http and doesn't contain the current domain
  return url.startsWith('http') && !url.includes(window.location.hostname);
};

/**
 * Formats a URL for display (truncates if too long)
 */
export const formatUrl = (url: string, maxLength: number = 40): string => {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
};

/**
 * Inserts links into content at appropriate positions
 * This is a simplified implementation that finds keywords and replaces them with links
 */
export const insertLinksIntoContent = (
  content: string, 
  links: Array<{title: string, url: string}>, 
  isExternal: boolean = false
): string => {
  if (!content || !links || links.length === 0) return content;
  
  let updatedContent = content;
  
  // For each link, try to find a suitable place to insert it
  links.forEach((link, index) => {
    // Only insert a few links to avoid over-linking
    if (index > 2) return;
    
    // Extract keywords from the link title to find in the content
    const keywords = link.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 4);
    
    // Try to find a match in the content
    for (const keyword of keywords) {
      // Skip short keywords
      if (keyword.length < 5) continue;
      
      // Create regex to find the keyword (case insensitive, whole word)
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      
      // Check if the keyword exists and hasn't already been linked
      if (regex.test(updatedContent) && !updatedContent.includes(`href="${link.url}"`)) {
        // Replace the first occurrence with a linked version
        updatedContent = updatedContent.replace(
          regex, 
          `<a href="${link.url}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${keyword}</a>`
        );
        
        // Once we've inserted this link, break the loop
        break;
      }
    }
  });
  
  return updatedContent;
};

/**
 * Find relevant internal link opportunities
 */
export const findInternalLinkOpportunities = async (content: string): Promise<{keyword: string, url: string}[]> => {
  // In a real implementation, this would analyze content and existing pages
  // For now, return mock data
  return [
    { keyword: 'SEO strategy', url: '/blog/seo-strategy' },
    { keyword: 'content marketing', url: '/blog/content-marketing' },
    { keyword: 'keyword research', url: '/blog/keyword-research' }
  ];
};

/**
 * Get recommendations for external link building
 */
export const getExternalLinkRecommendations = async (topic: string): Promise<{domain: string, relevance: number}[]> => {
  // In a real implementation, this would query a database or API
  // For now, return mock data
  return [
    { domain: 'moz.com', relevance: 95 },
    { domain: 'searchenginejournal.com', relevance: 92 },
    { domain: 'ahrefs.com', relevance: 90 },
    { domain: 'semrush.com', relevance: 88 }
  ];
};

export default {
  findInternalLinkOpportunities,
  getExternalLinkRecommendations
};
