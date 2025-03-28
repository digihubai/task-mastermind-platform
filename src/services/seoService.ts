
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
    return data || [];
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
    return data || [];
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
      .insert(content)
      .select()
      .single();

    if (error) throw error;
    return data;
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
    return data || [];
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
      .insert(campaign)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .single();

    if (error) throw error;
    return data || {};
  } catch (error) {
    console.error('Error fetching SEO analytics:', error);
    return {};
  }
};
