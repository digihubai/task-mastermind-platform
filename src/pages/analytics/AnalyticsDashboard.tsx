
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalytics } from '@/hooks/useAnalytics';
import AppLayout from '@/components/layout/AppLayout';
import CrossChannelDashboard from '@/components/analytics/CrossChannelDashboard';
import DashboardHeader from '@/components/analytics/DashboardHeader';
import ReportsTabContent from '@/components/analytics/ReportsTabContent';
import CustomerInsightsTabContent from '@/components/analytics/CustomerInsightsTabContent';

const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [activeTab, setActiveTab] = useState('reports');
  const { data, summary, loading, error, refreshData, generateSampleData } = useAnalytics(period);

  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'day' | 'week' | 'month');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6">
        <DashboardHeader 
          period={period}
          onPeriodChange={handlePeriodChange}
          onRefresh={refreshData}
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full md:w-fit grid-cols-3">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="customer-insights">Customer Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-4">
            <ReportsTabContent loading={loading} summary={summary} data={data} />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <CrossChannelDashboard dateRange={period} />
          </TabsContent>
          
          <TabsContent value="customer-insights" className="space-y-4">
            <CustomerInsightsTabContent 
              loading={loading}
              generateSampleData={generateSampleData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsDashboard;
