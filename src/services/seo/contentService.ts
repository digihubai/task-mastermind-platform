
/**
 * Generates mock SEO content for previewing purposes
 */
export const generateMockSEOContent = (topic: string, keywords: string[]) => {
  // Process the topic for better formatting
  const processedTopic = topic.trim();
  const formattedTopic = processedTopic.charAt(0).toUpperCase() + processedTopic.slice(1).toLowerCase();
  
  // Format keywords properly
  const formattedKeywords = keywords.map(k => k.trim()).filter(k => k.length > 0);
  const keywordText = formattedKeywords.length > 0 ? ` focusing on ${formattedKeywords.join(", ")}` : "";
  
  // Generate current year for relevance
  const currentYear = new Date().getFullYear();
  
  return `# ${formattedTopic}

## Introduction

This comprehensive guide covers everything you need to know about ${formattedTopic}${keywordText}. We'll explore the latest trends, best practices, and expert strategies to help you succeed in ${currentYear} and beyond.

## Why ${formattedTopic} Matters

In today's digital landscape, ${formattedTopic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${formattedTopic} effectively can lead to improved results and competitive advantage.

## Key Strategies for ${formattedTopic}

1. **Research and Planning**: Start with thorough research to understand your audience and competition.
2. **Implementation**: Follow best practices when implementing your ${formattedTopic} strategy.
3. **Optimization**: Continuously test and refine your approach based on performance data.
4. **Measurement**: Track key metrics to evaluate the success of your ${formattedTopic} initiatives.

## Advanced Techniques

For those looking to take their ${formattedTopic} efforts to the next level, consider these advanced techniques:

- Leverage AI and automation tools
- Implement cross-channel strategies
- Focus on user experience optimization
- Develop comprehensive analytics frameworks

## Case Studies: ${formattedTopic} Success Stories

### Company A: 200% Growth in 6 Months

Company A implemented a comprehensive ${formattedTopic} strategy that resulted in a 200% increase in conversion rates within just 6 months. Their approach focused on user experience optimization and data-driven decision making.

### Company B: Market Leader in ${currentYear}

By prioritizing ${formattedTopic}, Company B established themselves as a market leader in their industry. Their innovative approach to ${formattedKeywords[0] || formattedTopic} set them apart from competitors.

## Conclusion

Mastering ${formattedTopic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

`;
};

/**
 * Analyzes SEO content and returns analytics
 */
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

/**
 * Generates content with images and links
 */
export const generateContentWithImages = async (
  topic: string,
  keywords: string[],
  title: string,
  outline: any,
  images: string[],
  internalLinks: any[] = [],
  externalLinks: any[] = []
) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Clean up and format inputs
  const cleanTopic = topic.trim();
  const formattedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1).toLowerCase();
  const formattedKeywords = keywords.map(k => k.trim()).filter(k => k.length > 0);
  const currentYear = new Date().getFullYear();
  
  // Generate a more comprehensive and professional content based on the input parameters
  let content = `# ${title || formattedTopic}

## Introduction

This comprehensive guide covers everything you need to know about ${formattedTopic} focusing on ${formattedKeywords.join(", ")}. We'll explore the latest trends, best practices, and expert strategies to help you succeed in ${currentYear}.

## Why ${formattedTopic} Matters

In today's digital landscape, ${formattedTopic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${formattedTopic} effectively can lead to improved results and competitive advantage.

`;

  // Add image after introduction if available
  if (images && images.length > 0) {
    content += `\n![${formattedTopic} image](${images[0]})\n\n`;
  }

  // Add outline content if available
  if (outline && outline.sections) {
    content += Object.entries(outline.sections).map(([key, section]: [string, any]) => {
      let sectionContent = `## ${section.title}

${section.content || `This section explores the critical aspects of ${section.title} and how it relates to ${formattedTopic}. By understanding these principles, you can develop more effective strategies for your business.`}

${section.subsections ? section.subsections.map((subsection: any) => {
  return `### ${subsection.title}

${subsection.content || `${subsection.title} is a crucial component of ${formattedTopic} strategy that can significantly impact your results. Companies that excel in this area typically see higher engagement rates and better ROI.`}
`;
}).join('\n') : ''}`;

      // Add an image to a random section if available
      if (images && images.length > 1 && Math.random() > 0.5) {
        const imageIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
        if (images[imageIndex]) {
          sectionContent += `\n![${section.title} visualization](${images[imageIndex]})\n\n`;
        }
      }

      return sectionContent;
    }).join('\n\n');
  } else if (outline) {
    // If outline is a string (from the outline step)
    const outlineLines = outline.split('\n').filter((line: string) => line.trim());
    
    // Process the outline
    let currentMainSection = null;
    
    for (let i = 0; i < outlineLines.length; i++) {
      const line = outlineLines[i].trim();
      
      if (line.startsWith('# ')) {
        // Main title (skip)
        continue;
      } else if (line.startsWith('## ')) {
        // Main section
        currentMainSection = line.replace('## ', '');
        content += `\n## ${currentMainSection}\n\n`;
        content += `This section explores key aspects of ${currentMainSection} and how it relates to ${formattedTopic}. Understanding these principles will help you develop more effective strategies.\n\n`;
        
        // Add image to some sections if available
        if (images && images.length > 1 && Math.random() > 0.7) {
          const imageIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
          if (images[imageIndex]) {
            content += `![${currentMainSection} visualization](${images[imageIndex]})\n\n`;
          }
        }
      } else if (line.startsWith('### ') && currentMainSection) {
        // Subsection
        const subsection = line.replace('### ', '');
        content += `### ${subsection}\n\n`;
        content += `${subsection} is a crucial component of ${currentMainSection} that can significantly impact your ${formattedTopic} results. Companies that excel in this area typically see higher engagement rates and better ROI.\n\n`;
      }
    }
  }

  // Add more substantive content
  content += `
## Best Practices for ${formattedTopic}

1. **Research and Planning**: Start with thorough research to understand your audience and competition. This foundation will guide all your future decisions.

2. **Implementation**: Follow best practices when implementing your ${formattedTopic} strategy, ensuring alignment with your overall business objectives.

3. **Optimization**: Continuously test and refine your approach based on performance data. The most successful organizations treat optimization as an ongoing process, not a one-time event.

4. **Measurement**: Track key metrics to evaluate the success of your ${formattedTopic} initiatives. Establish KPIs that directly connect to your business goals.

## Advanced Techniques for ${formattedTopic}

For those looking to take their ${formattedTopic} efforts to the next level, consider these advanced techniques:

- **Leverage AI and automation tools**: Artificial intelligence can analyze patterns and predict outcomes that would be impossible for humans to identify manually.

- **Implement cross-channel strategies**: Ensure consistency and synergy across all your digital touchpoints.

- **Focus on user experience optimization**: User satisfaction remains the ultimate goal of any effective ${formattedTopic} strategy.

- **Develop comprehensive analytics frameworks**: Data-driven decision making separates industry leaders from followers.

## Case Studies: Success Stories

### Enterprise Implementation

A Fortune 500 company implemented a comprehensive ${formattedTopic} strategy that resulted in a 43% increase in conversion rates within just three months. Their approach focused on personalization and data-driven decision making.

### Small Business Growth

A boutique agency specializing in ${formattedKeywords[0] || formattedTopic} saw their client base grow by 78% after implementing the strategies outlined in this guide. Their success demonstrates that these techniques work for organizations of all sizes.

## Conclusion

Mastering ${formattedTopic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results in ${currentYear} and beyond.

`;

  // Insert links if available
  if (internalLinks && internalLinks.length > 0) {
    // Find keywords in the content and replace with links
    internalLinks.forEach(link => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter(word => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }
  
  if (externalLinks && externalLinks.length > 0) {
    // Add external links with proper attribution
    externalLinks.forEach(link => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter(word => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href="${link.url}"`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }

  return content;
};

