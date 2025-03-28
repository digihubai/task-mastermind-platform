
/**
 * Generates mock SEO content for previewing purposes
 */
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
 * Generates content with images
 */
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
