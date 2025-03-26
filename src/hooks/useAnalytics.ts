
import { useState, useEffect } from 'react';
import { fetchAnalyticsData, getAnalyticsSummary, AnalyticsData } from '@/services/analyticsService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AnalyticsSummary {
  totalPageViews: number;
  totalVisitors: number;
  averageBounceRate: number;
  totalConversions: number;
  averageTimeOnSite: number;
}

interface UseAnalyticsReturn {
  data: AnalyticsData[];
  summary: AnalyticsSummary | null;
  loading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
  generateSampleData: () => Promise<void>;
}

export function useAnalytics(period: 'day' | 'week' | 'month' = 'week'): UseAnalyticsReturn {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getAnalyticsSummary(period);
      setData(result.data);
      setSummary(result.summary);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = async () => {
    if (!user) {
      toast.error('You must be logged in to generate sample data');
      return;
    }

    setLoading(true);
    try {
      // Call the Edge Function to generate sample data
      const { data, error } = await supabase.functions.invoke('generate-analytics-sample', {
        body: { userId: user.id, days: 30 },
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Sample data generated successfully');
      await fetchData(); // Refresh data after generation
    } catch (err) {
      console.error('Error generating sample data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Failed to generate sample data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, period]);

  return {
    data,
    summary,
    loading,
    error,
    refreshData: fetchData,
    generateSampleData,
  };
}
