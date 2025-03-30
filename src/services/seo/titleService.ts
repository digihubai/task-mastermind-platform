
import { generateTitlesAI } from '../ai/contentGenerationAI';

/**
 * Generate title suggestions for a topic and keywords
 */
export const generateTitles = async (
  topic: string,
  keywords: string[],
  count: number = 5
): Promise<string[]> => {
  try {
    return await generateTitlesAI(topic, keywords, count);
  } catch (error) {
    console.error("Error generating titles:", error);
    throw error;
  }
};

/**
 * Score a title for SEO effectiveness
 */
export const scoreTitleSEO = (title: string, keywords: string[]): number => {
  let score = 50; // Start with a baseline score
  
  // Length factor (ideal: 50-60 characters)
  const length = title.length;
  if (length >= 50 && length <= 60) {
    score += 20;
  } else if (length > 40 && length < 70) {
    score += 10;
  } else {
    score -= 10;
  }
  
  // Keyword inclusion
  const titleLower = title.toLowerCase();
  let keywordsFound = 0;
  
  keywords.forEach(keyword => {
    if (titleLower.includes(keyword.toLowerCase())) {
      keywordsFound++;
      
      // Bonus for primary keyword at the beginning
      if (titleLower.indexOf(keyword.toLowerCase()) < 10) {
        score += 5;
      }
    }
  });
  
  // Score based on keyword density
  const keywordRatio = keywords.length > 0 ? keywordsFound / keywords.length : 0;
  score += keywordRatio * 20;
  
  // Power words bonus
  const powerWords = ['ultimate', 'guide', 'best', 'how to', 'tips', 'secrets', 'ways'];
  powerWords.forEach(word => {
    if (titleLower.includes(word)) {
      score += 5;
    }
  });
  
  // Cap the score at 100
  return Math.min(100, Math.max(0, score));
};

/**
 * Generate a meta description based on title and keywords
 */
export const generateMetaDescription = (title: string, keywords: string[]): string => {
  // In a real implementation, this would use AI
  // For now, return a template-based description
  const primaryKeyword = keywords[0] || '';
  const secondaryKeywords = keywords.slice(1, 3).join(' and ');
  
  return `Learn everything about ${primaryKeyword} in our guide to ${title.replace(/^The |Ultimate |Guide to /i, '')}. Discover ${secondaryKeywords} and more tips for success.`;
};

export default {
  generateTitles,
  scoreTitleSEO,
  generateMetaDescription
};
