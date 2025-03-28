
// Mock service for fetching internal and external links

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
