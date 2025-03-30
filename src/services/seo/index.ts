
// Export all SEO services from a single entry point
export * from './types';

// Export content generation functions
export const generateContent = async (title: string, keywords: string[], topic: string, outline?: string) => {
  // This is just a wrapper to maintain backwards compatibility
  const { generateContentAI } = await import('../ai/contentGenerationAI');
  return generateContentAI(topic, keywords, title, outline || '');
};

export const fetchInternalLinks = async () => {
  // Mock function that returns some internal links
  return [
    { title: 'SEO Best Practices', url: '/blog/seo-best-practices' },
    { title: 'Content Marketing Guide', url: '/blog/content-marketing-guide' },
    { title: 'Digital Marketing Tips', url: '/blog/digital-marketing-tips' }
  ];
};

export const fetchRelatedExternalLinks = async (topic: string, keywords: string[] = []) => {
  // Mock function that returns some external links
  return [
    { title: 'Google SEO Guidelines', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
    { title: 'Moz SEO Learning Center', url: 'https://moz.com/learn/seo' },
    { title: 'Search Engine Land', url: 'https://searchengineland.com/' }
  ];
};

export const insertLinksIntoContent = (content: string, links: Array<{title: string, url: string}>, isExternal: boolean = false) => {
  // Simple implementation to insert links into content
  let modifiedContent = content;
  
  links.forEach(link => {
    const regex = new RegExp(`\\b${link.title}\\b`, 'i');
    const replacement = `<a href="${link.url}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a>`;
    
    // Only replace the first occurrence to avoid too many links
    modifiedContent = modifiedContent.replace(regex, replacement);
  });
  
  return modifiedContent;
};

// Re-export other service functions
export * from './keywordService';
export * from './titleService';
export * from './contentService';
export * from './linkService';
export * from './imageService';
export * from './campaignService';

// Export analyticsService separately to avoid name conflicts
export { fetchSEOAnalytics } from './analyticsService';
export type { SEOAnalytics } from './types';
