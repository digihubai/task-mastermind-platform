
// Define the SEOCampaign type
export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: "active" | "in_progress" | "completed" | "inactive";
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}

export const generateKeywords = async (topic: string, count: number = 10) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if topic includes "AI chatbot" and return more specific keywords
  if (topic.toLowerCase().includes("ai chatbot")) {
    return [
      "ai chatbot", "conversational ai", "chatbot development", 
      "natural language processing", "customer service automation",
      "ai assistant", "chatbot platform", "virtual assistant",
      "chat automation", "machine learning chatbot", "nlp technology",
      "enterprise chatbot"
    ].slice(0, count);
  }
  
  // For demonstration, return dummy keywords
  return [
    "digital marketing", "content strategy", "SEO optimization", 
    "keyword research", "search rankings", "meta descriptions",
    "backlink strategy", "on-page SEO", "technical SEO", 
    "content marketing", "SEO tools", "Google algorithm"
  ].slice(0, count);
};

export const generateSEOTitles = async (
  topic: string,
  keywords: string[],
  count: number = 5,
  titleType: string = "mixed"
) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate appropriate titles based on type
  if (topic.toLowerCase().includes("ai chatbot")) {
    switch (titleType) {
      case "howto":
        return [
          "How to Build an AI Chatbot in 7 Simple Steps",
          "How to Implement Conversational AI for Better Customer Experience",
          "How to Increase ROI by 47% with AI-Powered Customer Support",
          "How to Choose the Right NLP Framework for Your Chatbot",
          "How to Design an AI Chatbot That Customers Actually Love"
        ].slice(0, count);
      case "listicle":
        return [
          "10 Game-Changing AI Chatbot Features Your Business Needs in 2023",
          "7 Ways AI Chatbots Are Revolutionizing Customer Service",
          "5 Enterprise-Grade Chatbot Platforms Worth Investing In",
          "12 AI Chatbot Metrics That Actually Matter for Business Growth",
          "8 Common Mistakes Companies Make When Implementing Chatbots"
        ].slice(0, count);
      case "question":
        return [
          "Can AI Chatbots Really Replace Human Customer Service Agents?",
          "Why Are AI Chatbots Transforming Business Communication?",
          "What Makes a Chatbot Truly Intelligent in 2023?",
          "Is Your Business Ready for an AI-Powered Conversational Interface?",
          "When Should You Invest in Custom NLP for Your Chatbot?"
        ].slice(0, count);
      default: // mixed
        return [
          "10 Ways AI Chatbots Are Revolutionizing Customer Support",
          "How to Implement an AI Chatbot That Boosts Conversions by 35%",
          "The Ultimate Guide to Building Enterprise-Grade Conversational AI",
          "Why 73% of Businesses Are Switching to AI-Powered Support Solutions",
          "5 Critical Features Your AI Chatbot Must Have to Succeed"
        ].slice(0, count);
    }
  }
  
  // For other topics, return generic titles
  return [
    `The Ultimate Guide to ${topic}`,
    `10 Ways to Improve Your ${topic} Strategy`,
    `How to Master ${topic} in 2023`,
    `Why ${topic} Matters for Your Business Growth`,
    `${topic}: Best Practices and Expert Tips`
  ].slice(0, count);
};

export const generateMockSEOContent = (topic: string, keywords: string[]) => {
  // Generate mock SEO content for previewing purposes
  const keywordText = keywords.length > 0 ? ` focusing on ${keywords.join(", ")}` : "";
  
  return `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}

## Introduction

This comprehensive guide covers everything you need to know about ${topic}${keywordText}. We'll explore the latest trends, best practices, and expert strategies to help you succeed.

## Why ${topic} Matters

In today's digital landscape, ${topic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${topic} effectively can lead to improved results and competitive advantage.

## Key Strategies for ${topic}

1. **Research and Planning**: Start with thorough research to understand your audience and competition.
2. **Implementation**: Follow best practices when implementing your ${topic} strategy.
3. **Optimization**: Continuously test and refine your approach based on performance data.
4. **Measurement**: Track key metrics to evaluate the success of your ${topic} initiatives.

## Advanced Techniques

For those looking to take their ${topic} efforts to the next level, consider these advanced techniques:

- Leverage AI and automation tools
- Implement cross-channel strategies
- Focus on user experience optimization
- Develop comprehensive analytics frameworks

## Conclusion

Mastering ${topic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

`;
};

export const fetchSEOAnalytics = async (contentId: string) => {
  // Mock function to fetch SEO analytics data
  return {
    keywordDensity: 92,
    readabilityScore: 87,
    structureScore: 94,
    originalityScore: 85,
    overallScore: 90,
    recommendations: [
      "Add more internal links to improve site structure",
      "Consider adding more examples to illustrate key points",
      "Optimize meta description to improve CTR"
    ]
  };
};

// Add the missing function to fetch SEO campaigns
export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock SEO campaigns
  return [
    {
      id: "campaign-1",
      name: "Q4 Product Launch SEO",
      keywordCount: 23,
      pageCount: 8,
      status: "active",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      metrics: {
        backlinks: 45,
        avgPosition: 3
      },
      userId: "user123"
    },
    {
      id: "campaign-2",
      name: "Blog Content Optimization",
      keywordCount: 18,
      pageCount: 12,
      status: "in_progress",
      startDate: "2023-09-15",
      endDate: null,
      metrics: {
        backlinks: 27,
        avgPosition: 5
      },
      userId: "user123"
    },
    {
      id: "campaign-3",
      name: "Local SEO Initiative",
      keywordCount: 14,
      pageCount: 6,
      status: "completed",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      metrics: {
        backlinks: 32,
        avgPosition: 2
      },
      userId: "user123"
    }
  ];
};

// Add the missing function to generate content with images
export const generateContentWithImages = async (
  topic: string,
  keywords: string[],
  title: string,
  outline: any,
  images: string[]
) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock content based on the input parameters
  const content = `# ${title}

## Introduction

This comprehensive guide covers everything you need to know about ${topic} focusing on ${keywords.join(", ")}. We'll explore the latest trends, best practices, and expert strategies to help you succeed.

## Why ${topic} Matters

In today's digital landscape, ${topic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${topic} effectively can lead to improved results and competitive advantage.

${outline ? Object.entries(outline.sections).map(([key, section]: [string, any]) => {
  return `## ${section.title}

${section.content || `This section discusses the important aspects of ${section.title} and how it relates to ${topic}.`}

${section.subsections ? section.subsections.map((subsection: any) => {
  return `### ${subsection.title}

${subsection.content || `${subsection.title} is a crucial component of ${topic} strategy that can significantly impact your results.`}
`;
}).join('\n') : ''}`;
}).join('\n\n') : ''}

## Best Practices for ${topic}

1. **Research and Planning**: Start with thorough research to understand your audience and competition.
2. **Implementation**: Follow best practices when implementing your ${topic} strategy.
3. **Optimization**: Continuously test and refine your approach based on performance data.
4. **Measurement**: Track key metrics to evaluate the success of your ${topic} initiatives.

## Advanced Techniques for ${topic}

For those looking to take their ${topic} efforts to the next level, consider these advanced techniques:

- Leverage AI and automation tools
- Implement cross-channel strategies
- Focus on user experience optimization
- Develop comprehensive analytics frameworks

## Conclusion

Mastering ${topic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

`;

  return content;
};

// Add a function to fetch related external links
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

// Add a function to fetch internal links from the user's site
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

// Function to insert links into content
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
