
/**
 * Fetches internal links for SEO content
 */
export const fetchInternalLinks = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock internal links
  return [
    { title: "AI Chatbot Development Guide", url: "/blog/ai-chatbot-development-guide" },
    { title: "Conversational AI Implementation", url: "/blog/conversational-ai-implementation" },
    { title: "Customer Service Automation", url: "/blog/customer-service-automation" },
    { title: "Machine Learning for Chatbots", url: "/blog/machine-learning-chatbots" },
    { title: "NLP Technology Overview", url: "/blog/nlp-technology-overview" },
    { title: "Digital Marketing Strategy", url: "/blog/digital-marketing-strategy" },
    { title: "Content Optimization Guide", url: "/blog/content-optimization-guide" }
  ];
};

/**
 * Fetches related external links based on topic and keywords
 */
export const fetchRelatedExternalLinks = async (topic: string, keywords: string[] = []) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Process inputs
  const processedTopic = topic.toLowerCase().trim();
  const processedKeywords = keywords.map(k => k.toLowerCase().trim());
  
  // Default external links
  const defaultLinks = [
    { title: "The Ultimate Guide to SEO", url: "https://example.com/seo-guide" },
    { title: "Content Marketing Best Practices", url: "https://example.com/content-marketing" },
    { title: "Digital Marketing Statistics 2023", url: "https://example.com/marketing-stats" },
    { title: "Search Engine Optimization Tips", url: "https://example.com/seo-tips" }
  ];
  
  // AI chatbot specific links
  const aiChatbotLinks = [
    { title: "Building Conversational AI", url: "https://example.com/conversational-ai" },
    { title: "NLP Research Papers", url: "https://example.com/nlp-research" },
    { title: "Chatbot Optimization Guide", url: "https://example.com/chatbot-optimization" },
    { title: "Customer Service Automation Case Studies", url: "https://example.com/automation-case-studies" },
    { title: "AI Assistant Development", url: "https://example.com/ai-assistant-development" }
  ];
  
  // Check if topic or keywords relate to AI chatbots
  const isAIChatbotRelated = 
    processedTopic.includes("ai chatbot") || 
    processedTopic.includes("chatbot") ||
    processedKeywords.some(k => k.includes("ai") || k.includes("chatbot") || k.includes("assistant"));
  
  return isAIChatbotRelated ? aiChatbotLinks : defaultLinks;
};

/**
 * Insert links into content for SEO
 */
export const insertLinksIntoContent = (content: string, links: Array<{title: string, url: string}>, isExternal: boolean) => {
  if (!content || !Array.isArray(links) || links.length === 0) {
    return content;
  }
  
  let updatedContent = content;
  
  links.forEach(link => {
    const linkText = link.title;
    // Extract words from the link title to look for in the content
    const linkWords = linkText.toLowerCase().split(/\s+/).filter(word => word.length > 4);
    
    // For each significant word in the link title
    for (const word of linkWords) {
      // Find if this word exists in the content
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      const match = updatedContent.match(regex);
      
      if (match && match.index !== undefined) {
        // Get the sentence containing the match
        const sentenceStart = updatedContent.lastIndexOf('.', match.index) + 1;
        const sentenceEnd = updatedContent.indexOf('.', match.index + 1);
        const sentence = updatedContent.substring(sentenceStart, sentenceEnd + 1);
        
        // Don't add link if the sentence already contains a link
        if (sentence.includes('<a href')) {
          continue;
        }
        
        // Get context around the matched word
        const startIndex = match.index;
        const endIndex = startIndex + word.length;
        const contextBefore = updatedContent.substring(0, startIndex);
        const matchedWord = updatedContent.substring(startIndex, endIndex);
        const contextAfter = updatedContent.substring(endIndex);
        
        // Create the link with appropriate attributes
        const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        const linkedText = `<a href="${link.url}"${externalAttrs}>${matchedWord}</a>`;
        
        // Replace the original text with the linked version
        updatedContent = contextBefore + linkedText + contextAfter;
        
        // Only add one link per link object
        break;
      }
    }
  });
  
  return updatedContent;
};
