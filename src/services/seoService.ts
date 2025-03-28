
import { supabase } from "@/lib/supabase";
import { json } from "@remix-run/server-runtime";

export interface SEOKeyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: string;
  position: number;
  change: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SEOContent {
  id: string;
  title: string;
  date: string;
  status: string;
  platform: string;
  keywords: string[];
  word_count: number;
  seo_score: number;
  url: string | null;
  content: string | null;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: string;
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}

export interface SEOAnalytics {
  id: string;
  timeframe: string;
  data: any;
  user_id?: string;
}

export const fetchSEOKeywords = async (): Promise<SEOKeyword[]> => {
  try {
    const { data, error } = await supabase
      .from("seo_keywords")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data as SEOKeyword[];
  } catch (error) {
    console.error("Error fetching SEO keywords:", error);
    return [];
  }
};

export const fetchSEOContent = async (): Promise<SEOContent[]> => {
  try {
    const { data, error } = await supabase
      .from("seo_content")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data as SEOContent[];
  } catch (error) {
    console.error("Error fetching SEO content:", error);
    return [];
  }
};

export const getSEOContentById = async (id: string): Promise<SEOContent | null> => {
  try {
    const { data, error } = await supabase
      .from("seo_content")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as SEOContent;
  } catch (error) {
    console.error("Error fetching SEO content by ID:", error);
    return null;
  }
};

export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  try {
    const { data, error } = await supabase
      .from("seo_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Convert from DB format to our interface format
    const campaigns = data.map(item => ({
      id: item.id,
      name: item.name,
      keywordCount: item.keyword_count,
      pageCount: item.page_count,
      status: item.status,
      startDate: item.start_date,
      endDate: item.end_date,
      metrics: {
        backlinks: item.backlinks,
        avgPosition: item.avg_position
      },
      userId: item.user_id
    }));

    return campaigns;
  } catch (error) {
    console.error("Error fetching SEO campaigns:", error);
    return [];
  }
};

export const createSEOCampaign = async (campaign: Omit<SEOCampaign, "id">): Promise<SEOCampaign | null> => {
  try {
    // Convert from our interface format to DB format
    const dbCampaign = {
      name: campaign.name,
      keyword_count: campaign.keywordCount,
      page_count: campaign.pageCount,
      status: campaign.status,
      start_date: campaign.startDate,
      end_date: campaign.endDate,
      backlinks: campaign.metrics.backlinks,
      avg_position: campaign.metrics.avgPosition,
      user_id: campaign.userId
    };

    const { data, error } = await supabase
      .from("seo_campaigns")
      .insert(dbCampaign)
      .select("*")
      .single();

    if (error) throw error;

    // Convert back to our interface format
    return {
      id: data.id,
      name: data.name,
      keywordCount: data.keyword_count,
      pageCount: data.page_count,
      status: data.status,
      startDate: data.start_date,
      endDate: data.end_date,
      metrics: {
        backlinks: data.backlinks,
        avgPosition: data.avg_position
      },
      userId: data.user_id
    };
  } catch (error) {
    console.error("Error creating SEO campaign:", error);
    return null;
  }
};

export const generateSEOContent = async (topic: string, keywords: string[]): Promise<string> => {
  try {
    // Call the Edge Function for generating SEO content
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-seo-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, keywords }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate SEO content');
    }

    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.error('Error generating SEO content:', error);
    return '';
  }
};

export const fetchSEOAnalytics = async (timeframe: string): Promise<SEOAnalytics | null> => {
  try {
    const { data, error } = await supabase
      .from("seo_analytics")
      .select("*")
      .eq("timeframe", timeframe)
      .single();

    if (error) throw error;

    return data as SEOAnalytics;
  } catch (error) {
    console.error("Error fetching SEO analytics:", error);
    return null;
  }
};

// Mock function to generate sample SEO content for the UI
export const generateMockSEOContent = (topic: string, keywords: string[] = []): string => {
  const keywordsStr = keywords.length > 0 ? keywords.join(', ') : 'SEO, optimization';
  
  return `# Comprehensive Guide to ${topic}

## Introduction
In this comprehensive guide, we'll explore everything you need to know about ${topic}. 
This guide covers the essential aspects of ${keywordsStr}.

## Understanding ${topic}
${topic} has become increasingly important in the digital landscape. 
As more businesses focus on online presence, implementing effective strategies for ${keywordsStr} is crucial.

## Best Practices for ${topic}
When implementing ${topic} strategies, consider these best practices:
1. Research your target audience thoroughly
2. Create high-quality content that addresses user needs
3. Optimize your content for search engines without sacrificing readability
4. Build a strong backlink profile with reputable websites
5. Regularly monitor and adjust your strategy based on performance data

## Key Metrics to Track
To measure the success of your ${topic} efforts, track these metrics:
- Organic traffic
- Keyword rankings
- Conversion rates
- Bounce rate
- Time on page
- Backlink quality and quantity

## Advanced ${topic} Strategies
For those looking to take their ${topic} to the next level:
- Implement structured data markup
- Create comprehensive topic clusters
- Develop a mobile-first approach
- Optimize for voice search
- Focus on user experience metrics

## Conclusion
${topic} continues to evolve, but the fundamentals remain constant: create value for users, optimize for search engines, and measure your results. By following the strategies outlined in this guide, you'll be well-positioned to succeed with ${keywordsStr}.`;
};
