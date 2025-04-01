
import { TopicCluster, TopicClusterContent } from './types';
import { generateContentAI } from '../ai/contentGenerationAI';

/**
 * Generate a topic cluster based on a main keyword
 */
export const generateTopicCluster = async (
  mainKeyword: string, 
  additionalKeywords: string[] = []
): Promise<TopicCluster> => {
  try {
    // Generate supporting keywords if not provided
    let supportingKeywords = additionalKeywords;
    if (supportingKeywords.length === 0) {
      supportingKeywords = await generateSupportingKeywords(mainKeyword);
    }
    
    // Generate content ideas for the cluster
    const contentPieces = await generateContentIdeas(mainKeyword, supportingKeywords);
    
    const cluster: TopicCluster = {
      id: `cluster_${Date.now()}`,
      name: `${mainKeyword} Cluster`,
      mainKeyword,
      supportingKeywords,
      contentPieces,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return cluster;
  } catch (error) {
    console.error("Error generating topic cluster:", error);
    throw error;
  }
};

/**
 * Generate supporting keywords for a main keyword
 */
async function generateSupportingKeywords(mainKeyword: string): Promise<string[]> {
  try {
    // In production, this would use keyword research APIs or AI
    
    // Mock supporting keywords
    return [
      `best ${mainKeyword}`,
      `${mainKeyword} guide`,
      `${mainKeyword} tips`,
      `${mainKeyword} strategies`,
      `${mainKeyword} for beginners`,
      `advanced ${mainKeyword}`,
      `${mainKeyword} tools`,
      `${mainKeyword} examples`
    ];
  } catch (error) {
    console.error("Error generating supporting keywords:", error);
    return [];
  }
}

/**
 * Generate content ideas for a topic cluster
 */
async function generateContentIdeas(
  mainKeyword: string, 
  supportingKeywords: string[]
): Promise<TopicClusterContent[]> {
  try {
    // In production, this would use AI to generate better title ideas
    
    // Generate content pieces for the cluster
    const contentPieces: TopicClusterContent[] = [];
    
    // Add pillar content
    contentPieces.push({
      id: `content_${Date.now()}_0`,
      title: `The Ultimate Guide to ${mainKeyword} [Pillar Content]`,
      keywords: [mainKeyword, ...supportingKeywords.slice(0, 3)],
      status: "planned",
      contentAge: 0
    });
    
    // Add supporting content pieces
    supportingKeywords.forEach((keyword, index) => {
      contentPieces.push({
        id: `content_${Date.now()}_${index + 1}`,
        title: generateTitle(keyword, mainKeyword),
        keywords: [keyword, mainKeyword],
        status: "planned",
        contentAge: 0
      });
    });
    
    return contentPieces;
  } catch (error) {
    console.error("Error generating content ideas:", error);
    return [];
  }
}

/**
 * Generate a title for a content piece
 */
function generateTitle(keyword: string, mainKeyword: string): string {
  const titleTemplates = [
    `How to Master ${keyword} in [Current Year]`,
    `${keyword}: A Complete Guide for Success`,
    `10 Proven ${keyword} Strategies That Actually Work`,
    `Why ${keyword} Matters for Your ${mainKeyword} Strategy`,
    `The Beginner's Guide to ${keyword}`,
    `${keyword} 101: Everything You Need to Know`
  ];
  
  const randomIndex = Math.floor(Math.random() * titleTemplates.length);
  return titleTemplates[randomIndex].replace('[Current Year]', new Date().getFullYear().toString());
}

/**
 * Get age of content piece in days
 */
export const getContentAge = (publishedDate: string): number => {
  const published = new Date(publishedDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - published.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if content needs updating (based on age and other factors)
 */
export const checkContentFreshness = async (
  url: string, 
  publishedDate: string,
  contentType: string = 'blog'
): Promise<{needsUpdate: boolean, reasons: string[]}> => {
  const age = getContentAge(publishedDate);
  const reasons: string[] = [];
  
  // Different content types have different freshness requirements
  const ageThresholds = {
    'blog': 180, // 6 months
    'news': 30,  // 1 month
    'guide': 365, // 1 year
    'product': 90 // 3 months
  };
  
  const threshold = ageThresholds[contentType] || 180;
  
  if (age > threshold) {
    reasons.push(`Content is ${age} days old (threshold: ${threshold} days)`);
  }
  
  // In production, would check more factors like:
  // - Performance changes
  // - Competitor updates
  // - Factual changes in the industry
  
  return {
    needsUpdate: reasons.length > 0,
    reasons
  };
};
