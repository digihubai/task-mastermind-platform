
// Mock SEO service functions

export const fetchInternalLinks = async (): Promise<Array<{ title: string, url: string }>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return [
    { title: "SEO Best Practices", url: "/blog/seo-best-practices" },
    { title: "Content Marketing Guide", url: "/blog/content-marketing-guide" },
    { title: "Technical SEO Checklist", url: "/blog/technical-seo-checklist" },
    { title: "Link Building Strategies", url: "/blog/link-building-strategies" },
    { title: "Mobile SEO Guide", url: "/blog/mobile-seo-guide" },
    { title: "Voice Search Optimization", url: "/blog/voice-search-optimization" },
    { title: "Local SEO Tips", url: "/blog/local-seo-tips" }
  ];
};

export const fetchRelatedExternalLinks = async (
  topic: string, 
  keywords: string[]
): Promise<Array<{ title: string, url: string }>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock data
  return [
    { title: "Google's SEO Starter Guide", url: "https://developers.google.com/search/docs/beginner/seo-starter-guide" },
    { title: "Moz's Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo" },
    { title: "Backlinko's On-Page SEO Guide", url: "https://backlinko.com/on-page-seo" },
    { title: "Ahrefs' Guide to Keyword Research", url: "https://ahrefs.com/blog/keyword-research" },
    { title: "Semrush's Technical SEO Checklist", url: "https://www.semrush.com/blog/technical-seo-checklist" }
  ];
};

export const insertLinksIntoContent = (
  content: string, 
  links: Array<{ title: string, url: string }>, 
  isExternal: boolean
): string => {
  let updatedContent = content;
  
  // This is a simplified implementation for demonstration
  // In a real implementation, you would use more sophisticated text analysis
  links.forEach(link => {
    const titleWords = link.title.split(' ');
    
    // Try to find a match for at least 3 consecutive words from the link title
    if (titleWords.length >= 3) {
      const searchTerm = titleWords.slice(0, 3).join(' ');
      if (content.includes(searchTerm)) {
        const linkHtml = isExternal 
          ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${searchTerm}</a>`
          : `<a href="${link.url}">${searchTerm}</a>`;
          
        updatedContent = updatedContent.replace(searchTerm, linkHtml);
      }
    }
    
    // Also check for matches of the first word as a fallback
    const firstWord = titleWords[0];
    if (content.includes(` ${firstWord} `)) {
      const linkHtml = isExternal 
        ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${firstWord}</a>`
        : `<a href="${link.url}">${firstWord}</a>`;
        
      updatedContent = updatedContent.replace(` ${firstWord} `, ` ${linkHtml} `);
    }
  });
  
  return updatedContent;
};

export const analyzeContentSEO = (content: string, keywords: string[]): any => {
  // Simple analysis of content (this would be more sophisticated in a real implementation)
  const wordCount = content.split(/\s+/).length;
  
  // Check keyword density
  const keywordOccurrences: Record<string, number> = {};
  let keywordDensity: Record<string, number> = {};
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = content.match(regex);
    const occurrences = matches ? matches.length : 0;
    keywordOccurrences[keyword] = occurrences;
    keywordDensity[keyword] = wordCount > 0 ? (occurrences / wordCount) * 100 : 0;
  });
  
  // Check readability (very simple approximation using average sentence length)
  const sentences = content.split(/[.!?]+/);
  const totalSentences = sentences.length;
  const totalWordsInSentences = sentences.reduce((total, sentence) => {
    return total + sentence.trim().split(/\s+/).length;
  }, 0);
  const averageSentenceLength = totalSentences > 0 ? totalWordsInSentences / totalSentences : 0;
  
  // Check heading structure
  const h1Count = (content.match(/<h1>/g) || []).length;
  const h2Count = (content.match(/<h2>/g) || []).length;
  const h3Count = (content.match(/<h3>/g) || []).length;
  
  // Check for images
  const imageCount = (content.match(/<img/g) || []).length;
  
  return {
    wordCount,
    keywordOccurrences,
    keywordDensity,
    readability: {
      averageSentenceLength,
      score: averageSentenceLength < 25 ? 'Good' : averageSentenceLength < 32 ? 'Fair' : 'Poor'
    },
    structure: {
      h1Count,
      h2Count,
      h3Count,
      imageCount
    },
    recommendations: [
      h1Count === 0 ? "Add an H1 heading for better SEO" : "Good: H1 heading present",
      wordCount < 300 ? "Content is too short. Aim for at least 300 words" : "Good: Content length meets minimum requirements",
      imageCount === 0 ? "Add images to make content more engaging" : "Good: Images included in content",
      averageSentenceLength > 25 ? "Shorten some sentences to improve readability" : "Good: Sentence length is appropriate"
    ]
  };
};
