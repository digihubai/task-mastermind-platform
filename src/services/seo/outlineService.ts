
import { TopicCluster } from './types';

/**
 * Generate an outline for SEO content based on a topic, keywords, and title
 */
export const generateOutline = async (
  topic: string, 
  keywords: string[], 
  title: string
): Promise<{ sections: string[] }> => {
  try {
    // In a real implementation, this would call an AI service to generate the outline
    // For now, we'll return a mock outline
    const sections = [
      `## Introduction to ${topic}\n- What is ${topic}\n- Why ${topic} is important\n- Key benefits of mastering ${topic}`,
      `## Top ${keywords[0] || topic} Strategies\n- Strategy 1: Implementation tips\n- Strategy 2: Best practices\n- Strategy 3: Common pitfalls to avoid`,
      `## How ${keywords[1] || topic} Impacts Business\n- Measuring ROI\n- Case studies\n- Industry benchmarks`,
      `## Future Trends in ${topic}\n- Upcoming innovations\n- Industry shifts\n- Preparing for future changes`,
      `## Conclusion\n- Key takeaways\n- Next steps\n- Additional resources`
    ];
    
    return { sections };
  } catch (error) {
    console.error(`Error generating outline for ${topic}:`, error);
    throw error;
  }
};

/**
 * Generate multiple outline variations
 */
export const generateOutlineVariations = async (
  topic: string,
  keywords: string[],
  title: string,
  count: number = 3
): Promise<Array<{ sections: string[] }>> => {
  const outlines = [];
  
  for (let i = 0; i < count; i++) {
    outlines.push(await generateOutline(topic, keywords, title));
  }
  
  return outlines;
};

/**
 * Generate a topic cluster outline
 */
export const generateTopicClusterOutline = async (
  mainKeyword: string,
  supportingKeywords: string[]
): Promise<TopicCluster> => {
  const now = new Date().toISOString();
  
  // Generate content pieces based on supporting keywords with explicit status types
  const contentPieces = supportingKeywords.map((keyword, index) => ({
    id: `content_${index}`,
    title: `${mainKeyword}: Complete Guide to ${keyword}`,
    keywords: [mainKeyword, keyword],
    status: index < 2 ? "published" : "planned" as "published" | "planned" | "draft",
    contentAge: index < 2 ? Math.floor(Math.random() * 30) : undefined,
    url: index < 2 ? `/blog/${keyword.toLowerCase().replace(/\s+/g, '-')}` : undefined,
    publishedDate: index < 2 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  }));
  
  return {
    id: `cluster_${Date.now()}`,
    name: `${mainKeyword} Complete Guide`,
    mainKeyword,
    supportingKeywords,
    contentPieces,
    createdAt: now,
    updatedAt: now
  };
};

/**
 * Create a brief for SEO content
 */
export const createSEOBrief = async (
  title: string,
  targetKeywords: string[],
  outline: string
) => {
  return {
    id: `brief_${Date.now()}`,
    title,
    targetKeywords,
    secondaryKeywords: [],
    outline,
    wordCount: 1200,
    references: [
      "https://example.com/industry-research",
      "https://example.com/best-practices"
    ],
    competitorUrls: [
      "https://competitor1.com/similar-article",
      "https://competitor2.com/related-topic"
    ],
    createdAt: new Date().toISOString()
  };
};
