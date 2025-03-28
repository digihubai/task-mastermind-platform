export const generateKeywords = async (topic: string, count: number = 10) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
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
