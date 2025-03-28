
import { SEOCampaign } from "./types";

/**
 * Generates keyword suggestions based on a topic
 */
export const generateKeywords = async (topic: string, count: number = 10) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Process the topic to handle spacing issues
  const processedTopic = topic.trim().toLowerCase();
  
  // Check if topic includes "AI chatbot" and return more specific keywords
  if (processedTopic.includes("ai chatbot") || processedTopic.includes("ai") || processedTopic.includes("chatbot")) {
    return [
      "ai chatbot", "conversational ai", "chatbot development", 
      "natural language processing", "customer service automation",
      "ai assistant", "chatbot platform", "virtual assistant",
      "chat automation", "machine learning chatbot", "nlp technology",
      "enterprise chatbot", "ai solutions", "customer experience", 
      "chatbot integration", "intelligent assistant", "digital transformation"
    ].slice(0, count);
  }
  
  // For other topics, generate more relevant keywords
  const topicWords = processedTopic.split(/\s+/);
  const generatedKeywords = [
    processedTopic,
    ...topicWords,
    `${processedTopic} guide`,
    `${processedTopic} software`,
    `${processedTopic} solutions`,
    `${processedTopic} best practices`,
    `${processedTopic} strategies`,
    `${processedTopic} tools`,
    `${processedTopic} platform`,
    `${processedTopic} service`,
    `${processedTopic} technology`,
    `${processedTopic} trends`,
    `${processedTopic} benefits`,
    `${processedTopic} implementation`,
    `best ${processedTopic} tools`,
    `how to use ${processedTopic}`,
    `${processedTopic} examples`
  ].slice(0, count);
  
  return generatedKeywords;
};

/**
 * Fetches SEO keyword rankings
 */
export const fetchSEOKeywords = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock SEO keywords
  return [
    {
      id: "keyword-1",
      keyword: "digital marketing software",
      position: 3,
      volume: 1240,
      difficulty: "Medium",
      change: 2
    },
    {
      id: "keyword-2",
      keyword: "AI content creation",
      position: 1,
      volume: 980,
      difficulty: "High",
      change: 1
    },
    {
      id: "keyword-3",
      keyword: "marketing automation",
      position: 4,
      volume: 820,
      difficulty: "High",
      change: 3
    }
  ];
};
