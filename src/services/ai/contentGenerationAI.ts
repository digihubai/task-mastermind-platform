
import { toast } from "sonner";

export const getOpenAIApiKey = (): string | null => {
  return localStorage.getItem('openai_api_key');
};

export const setOpenAIApiKey = (key: string): void => {
  localStorage.setItem('openai_api_key', key);
};

export const validateAPIKey = async (apiKey: string): Promise<boolean> => {
  try {
    // For the demo, we'll just check if it starts with "sk-" to simulate validation
    if (!apiKey.startsWith('sk-')) {
      toast.error('Invalid API key format. OpenAI keys start with "sk-"');
      return false;
    }
    
    // Store the key if it passes the format validation
    setOpenAIApiKey(apiKey);
    toast.success('API key saved successfully');
    return true;
  } catch (error) {
    console.error('Error validating API key:', error);
    toast.error('Failed to validate API key');
    return false;
  }
};

export const generateContent = async (
  topic: string, 
  keywords: string[], 
  contentType: string,
  tone: string,
  audience: string,
  wordCount: string,
  outline: string[]
): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error('No API key found. Please add your OpenAI API key in settings.');
  }
  
  // In a real implementation, you would call the OpenAI API here
  // For the demo, we'll return a mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
# ${topic}: A Comprehensive Guide

## Introduction
${topic} has become increasingly important in today's digital landscape. This guide will help you understand how to effectively implement ${topic} strategies.

## What is ${topic}?
${topic} refers to the practice of optimizing your website and content to improve visibility in search engine results pages (SERPs).

## Key Benefits of ${topic}
- Increased organic traffic
- Better user experience
- Higher conversion rates
- Improved brand visibility
- Cost-effective marketing strategy

## Best Practices for ${topic}
1. Conduct thorough keyword research focusing on ${keywords.join(', ')}
2. Create high-quality, valuable content
3. Optimize your website's technical elements
4. Build high-quality backlinks
5. Monitor and analyze your performance

## Common Challenges and Solutions
Many businesses struggle with implementing effective ${topic} strategies. Here are some common challenges and how to overcome them...

## Conclusion
By implementing these strategies and continuously learning about ${topic}, you can significantly improve your online presence and reach your target audience more effectively.
      `);
    }, 2000);
  });
};

export const suggestKeywords = async (topic: string): Promise<string[]> => {
  // Mock function to simulate keyword suggestions
  const mockKeywords = [
    `${topic} strategies`,
    `${topic} best practices`,
    `${topic} tools`,
    `${topic} examples`,
    `${topic} benefits`,
    `${topic} for beginners`,
    `${topic} advanced techniques`,
    `${topic} trends`,
    `${topic} analysis`,
    `${topic} optimization`,
    `improve ${topic}`,
    `${topic} tips`,
    `${topic} guide`
  ];
  
  return Promise.resolve(mockKeywords.slice(0, 10));
};

export const generateTitle = async (topic: string, content: string): Promise<string> => {
  return Promise.resolve(`The Ultimate Guide to ${topic}: Strategies for Success`);
};

export const generateMetaDescription = async (topic: string, content: string): Promise<string> => {
  return Promise.resolve(`Learn the most effective ${topic} strategies in our comprehensive guide. Discover best practices, tips, and techniques to improve your ${topic} efforts and achieve better results.`);
};
