
/**
 * Fetches related external links
 */
export const fetchRelatedExternalLinks = async (topic: string, keywords: string[]): Promise<Array<{title: string, url: string}>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock external links related to the topic and keywords
  return [
    { 
      title: "The Complete Guide to SEO",
      url: "https://example.com/complete-seo-guide" 
    },
    { 
      title: `Top ${topic} Resources for 2023`,
      url: "https://example.com/top-resources" 
    },
    { 
      title: `${keywords[0] || topic} Best Practices`,
      url: "https://example.com/best-practices" 
    },
    { 
      title: `How to Implement ${topic} Strategies`,
      url: "https://example.com/implementation-strategies" 
    },
    { 
      title: `${keywords[1] || topic} Case Studies`,
      url: "https://example.com/case-studies" 
    }
  ];
};

/**
 * Fetches internal links from the user's site
 */
export const fetchInternalLinks = async (): Promise<Array<{title: string, url: string}>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock internal links from the user's site
  return [
    { 
      title: "Content Marketing Strategy",
      url: "/blog/content-marketing-strategy" 
    },
    { 
      title: "SEO for Beginners",
      url: "/blog/seo-beginners-guide" 
    },
    { 
      title: "Technical SEO Checklist",
      url: "/blog/technical-seo-checklist" 
    },
    { 
      title: "Keyword Research Guide",
      url: "/blog/keyword-research-guide" 
    },
    { 
      title: "On-Page SEO Techniques",
      url: "/blog/on-page-seo-techniques" 
    }
  ];
};

/**
 * Inserts links into content
 */
export const insertLinksIntoContent = (content: string, links: Array<{title: string, url: string}>, isExternal: boolean): string => {
  if (!links || links.length === 0) return content;
  
  // Convert content to paragraphs
  const paragraphs = content.split('\n\n');
  
  // Process only paragraphs that are not headings and don't already have links
  const processableParagraphs = paragraphs
    .filter(p => !p.startsWith('#') && !p.startsWith('-') && !p.startsWith('1.') && !p.includes(']('))
    .slice(0, Math.min(links.length, 5)); // Limit to 5 paragraphs or less
  
  if (processableParagraphs.length === 0) return content;
  
  // For each usable paragraph, insert a link
  let modifiedContent = content;
  for (let i = 0; i < Math.min(processableParagraphs.length, links.length); i++) {
    const paragraph = processableParagraphs[i];
    const link = links[i];
    
    // Find a suitable place to insert the link (after a sentence)
    const sentences = paragraph.split('. ');
    if (sentences.length < 2) continue;
    
    const sentenceIndex = Math.floor(sentences.length / 2); // Insert in the middle
    const linkText = isExternal ? 
      `${sentences[sentenceIndex]}. [Learn more about ${link.title}](${link.url}).` : 
      `${sentences[sentenceIndex]}. [Check out our guide on ${link.title}](${link.url}).`;
    
    const modifiedParagraph = [
      ...sentences.slice(0, sentenceIndex),
      linkText,
      ...sentences.slice(sentenceIndex + 1)
    ].join('. ');
    
    modifiedContent = modifiedContent.replace(paragraph, modifiedParagraph);
  }
  
  return modifiedContent;
};
