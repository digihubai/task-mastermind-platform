
import { supabase } from "@/integrations/supabase/client";

export interface SEOKeyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: string;
  position: number;
  change: number;
}

export interface SEOContent {
  id: string;
  title: string;
  date: string;
  status: "draft" | "published" | "scheduled";
  platform: string;
  keywords: string[];
  wordCount: number;
  seoScore: number;
  url: string | null;
  userId: string;
}

export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: "active" | "inactive" | "completed" | "in_progress";
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}

// Fetch SEO keywords
export const fetchKeywords = async (): Promise<SEOKeyword[]> => {
  try {
    const { data, error } = await supabase
      .from('seo_keywords')
      .select('*');

    if (error) throw error;
    
    const formattedData = data?.map(item => ({
      id: item.id,
      keyword: item.keyword,
      volume: item.volume,
      difficulty: item.difficulty,
      position: item.position,
      change: item.change
    })) || [];
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching SEO keywords:', error);
    return [];
  }
};

// Fetch SEO content (articles, pages, etc.)
export const fetchSEOContent = async (): Promise<SEOContent[]> => {
  try {
    const { data, error } = await supabase
      .from('seo_content')
      .select('*');

    if (error) throw error;
    
    const formattedData = data?.map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      status: item.status as "draft" | "published" | "scheduled",
      platform: item.platform,
      keywords: item.keywords,
      wordCount: item.word_count,
      seoScore: item.seo_score,
      url: item.url,
      userId: item.user_id
    })) || [];
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching SEO content:', error);
    return [];
  }
};

// Create new SEO content
export const createSEOContent = async (content: Omit<SEOContent, 'id'>): Promise<SEOContent | null> => {
  try {
    const { data, error } = await supabase
      .from('seo_content')
      .insert({
        title: content.title,
        date: content.date,
        status: content.status,
        platform: content.platform,
        keywords: content.keywords,
        word_count: content.wordCount,
        seo_score: content.seoScore,
        url: content.url,
        user_id: content.userId
      })
      .select()
      .single();

    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      date: data.date,
      status: data.status as "draft" | "published" | "scheduled",
      platform: data.platform,
      keywords: data.keywords,
      wordCount: data.word_count,
      seoScore: data.seo_score,
      url: data.url,
      userId: data.user_id
    };
  } catch (error) {
    console.error('Error creating SEO content:', error);
    return null;
  }
};

// Fetch SEO campaigns
export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  try {
    const { data, error } = await supabase
      .from('seo_campaigns')
      .select('*');

    if (error) throw error;
    
    const formattedData = data?.map(item => ({
      id: item.id,
      name: item.name,
      keywordCount: item.keyword_count,
      pageCount: item.page_count,
      status: item.status as "active" | "inactive" | "completed" | "in_progress",
      startDate: item.start_date,
      endDate: item.end_date,
      metrics: {
        backlinks: item.backlinks,
        avgPosition: item.avg_position
      },
      userId: item.user_id
    })) || [];
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching SEO campaigns:', error);
    return [];
  }
};

// Create new SEO campaign
export const createSEOCampaign = async (campaign: Omit<SEOCampaign, 'id'>): Promise<SEOCampaign | null> => {
  try {
    const { data, error } = await supabase
      .from('seo_campaigns')
      .insert({
        name: campaign.name,
        keyword_count: campaign.keywordCount,
        page_count: campaign.pageCount,
        status: campaign.status,
        start_date: campaign.startDate,
        end_date: campaign.endDate,
        backlinks: campaign.metrics.backlinks,
        avg_position: campaign.metrics.avgPosition,
        user_id: campaign.userId
      })
      .select()
      .single();

    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      name: data.name,
      keywordCount: data.keyword_count,
      pageCount: data.page_count,
      status: data.status as "active" | "inactive" | "completed" | "in_progress",
      startDate: data.start_date,
      endDate: data.end_date,
      metrics: {
        backlinks: data.backlinks,
        avgPosition: data.avg_position
      },
      userId: data.user_id
    };
  } catch (error) {
    console.error('Error creating SEO campaign:', error);
    return null;
  }
};

// Generate SEO-optimized content using AI
export const generateSEOContent = async (
  topic: string, 
  keywords: string[]
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-seo-content', {
      body: { topic, keywords }
    });

    if (error) throw error;
    return data?.content || '';
  } catch (error) {
    console.error('Error generating SEO content:', error);
    return '';
  }
};

// Analyze existing content for SEO improvements
export const analyzeSEOContent = async (url: string): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-seo', {
      body: { url }
    });

    if (error) throw error;
    return data || {};
  } catch (error) {
    console.error('Error analyzing SEO content:', error);
    return {};
  }
};

// Track keyword rankings
export const trackKeywordRankings = async (keywords: string[]): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('track-keyword-rankings', {
      body: { keywords }
    });

    if (error) throw error;
    return data || {};
  } catch (error) {
    console.error('Error tracking keyword rankings:', error);
    return {};
  }
};

// Fetch SEO analytics data
export const fetchSEOAnalytics = async (timeframe: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('seo_analytics')
      .select('*')
      .eq('timeframe', timeframe)
      .maybeSingle();

    if (error) throw error;
    return data?.data || {};
  } catch (error) {
    console.error('Error fetching SEO analytics:', error);
    return {};
  }
};
