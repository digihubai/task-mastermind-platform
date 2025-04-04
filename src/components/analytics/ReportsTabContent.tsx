
import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import MetricsCard from '@/components/analytics/MetricsCard';
import { AnalyticsChartCard } from '@/components/analytics/AnalyticsChartCard';
import { Skeleton } from '@/components/ui/skeleton';
import AnalyticsErrorState from '@/components/analytics/AnalyticsErrorState';

interface ReportsTabContentProps {
  loading: boolean;
  error: Error | null;
  summary: {
    totalPageViews: number;
    totalVisitors: number;
    averageBounceRate: number;
    totalConversions: number;
  } | null;
  data: any[];
  onRetry?: () => void;
}

const ReportsTabContent: React.FC<ReportsTabContentProps> = ({ 
  loading, 
  error, 
  summary, 
  data, 
  onRetry 
}) => {
  // If there's an error, show the error state component
  if (error) {
    return <AnalyticsErrorState message={error.message} onRetry={onRetry} />;
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <Skeleton className="h-4 w-[100px] mt-4" />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px] mt-2" />
            </div>
            <div className="px-6 pb-6">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px] mt-2" />
            </div>
            <div className="px-6 pb-6">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return <div className="p-4 text-center">No reports data available.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Page Views"
          value={summary.totalPageViews.toString()}
          change="8.2%"
          trend="up"
          icon={<BarChart size={20} />}
        />
        <MetricsCard
          title="Unique Visitors"
          value={summary.totalVisitors.toString()}
          change="4.1%"
          trend="up"
          icon={<LineChart size={20} />}
        />
        <MetricsCard
          title="Bounce Rate"
          value={`${summary.averageBounceRate.toFixed(2)}%`}
          change="2.3%"
          trend="down"
          icon={<PieChart size={20} />}
        />
        <MetricsCard
          title="Conversions"
          value={summary.totalConversions.toString()}
          change="12.6%"
          trend="up"
          icon={<LineChart size={20} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnalyticsChartCard
          title="Revenue Overview"
          description="Track revenue trends over time"
          loading={loading}
          chartType="line"
          data={data}
          xDataKey="date"
          yDataKey="conversions"
          height={300}
        />
        <AnalyticsChartCard
          title="Traffic Sources"
          description="Where your visitors are coming from"
          loading={loading}
          chartType="pie"
          data={[
            { name: 'Organic Search', value: 40 },
            { name: 'Direct', value: 25 },
            { name: 'Referral', value: 20 },
            { name: 'Social', value: 15 },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default ReportsTabContent;
