
import { SEOCampaign } from "./types";

/**
 * Generates keyword suggestions based on a topic
 */
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
