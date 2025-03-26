
import { supabase } from "@/integrations/supabase/client";

// Type definitions for analytics data
export interface AnalyticsData {
  id: string;
  user_id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_time_on_site: number;
  conversions: number;
  created_at: string;
  updated_at: string;
}

// Fetch analytics data for a date range
export const fetchAnalyticsData = async (startDate: Date, endDate: Date) => {
  try {
    console.log('Fetching analytics data:', { startDate, endDate });
    const { data, error } = await supabase
      .from('analytics_data')
      .select('*')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }

    return data as AnalyticsData[];
  } catch (error) {
    console.error('Error in fetchAnalyticsData:', error);
    throw error;
  }
};

// Insert analytics data point
export const addAnalyticsData = async (analyticsData: Omit<AnalyticsData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('analytics_data')
      .insert(analyticsData)
      .select()
      .single();

    if (error) {
      console.error('Error adding analytics data:', error);
      throw error;
    }

    return data as AnalyticsData;
  } catch (error) {
    console.error('Error in addAnalyticsData:', error);
    throw error;
  }
};

// Update analytics data
export const updateAnalyticsData = async (id: string, updates: Partial<AnalyticsData>) => {
  try {
    const { data, error } = await supabase
      .from('analytics_data')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating analytics data:', error);
      throw error;
    }

    return data as AnalyticsData;
  } catch (error) {
    console.error('Error in updateAnalyticsData:', error);
    throw error;
  }
};

// Get summary metrics
export const getAnalyticsSummary = async (period: 'day' | 'week' | 'month' = 'week') => {
  try {
    let startDate = new Date();
    
    if (period === 'day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    }
    
    const endDate = new Date();
    const data = await fetchAnalyticsData(startDate, endDate);
    
    // Calculate summary
    const summary = {
      totalPageViews: data.reduce((sum, item) => sum + item.page_views, 0),
      totalVisitors: data.reduce((sum, item) => sum + item.unique_visitors, 0),
      averageBounceRate: data.length > 0 ? data.reduce((sum, item) => sum + item.bounce_rate, 0) / data.length : 0,
      totalConversions: data.reduce((sum, item) => sum + item.conversions, 0),
      averageTimeOnSite: data.length > 0 ? data.reduce((sum, item) => sum + item.avg_time_on_site, 0) / data.length : 0,
    };
    
    return { summary, data };
  } catch (error) {
    console.error('Error in getAnalyticsSummary:', error);
    throw error;
  }
};
