
import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import MetricsCard from '@/components/analytics/MetricsCard';
import { AnalyticsChartCard } from '@/components/analytics/AnalyticsChartCard';

interface ReportsTabContentProps {
  loading: boolean;
  summary: {
    totalPageViews: number;
    totalVisitors: number;
    averageBounceRate: number;
    totalConversions: number;
  } | null;
  data: any[];
}

const ReportsTabContent: React.FC<ReportsTabContentProps> = ({ loading, summary, data }) => {
  if (loading || !summary) {
    return <div className="p-4 text-center">Loading reports data...</div>;
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
