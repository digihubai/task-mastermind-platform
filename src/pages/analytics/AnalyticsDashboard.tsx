
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart, Calendar, Download, RefreshCw } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AppLayout from '@/components/layout/AppLayout';
import { AnalyticsChartCard } from '@/components/analytics/AnalyticsChartCard';
import { MetricsCard } from '@/components/analytics/MetricsCard';
import { CrossChannelDashboard } from '@/components/analytics/CrossChannelDashboard';

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track and analyze your business performance metrics</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Select defaultValue={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => refreshData()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full md:w-fit grid-cols-3">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="customer-insights">Customer Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-4">
            {/* Report Section Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {!loading && summary && (
                <>
                  <MetricsCard
                    title="Total Page Views"
                    value={summary.totalPageViews}
                    percentageChange={8.2}
                    trend="up"
                    icon={<BarChart className="h-4 w-4" />}
                  />
                  <MetricsCard
                    title="Unique Visitors"
                    value={summary.totalVisitors}
                    percentageChange={4.1}
                    trend="up"
                    icon={<LineChart className="h-4 w-4" />}
                  />
                  <MetricsCard
                    title="Bounce Rate"
                    value={`${summary.averageBounceRate.toFixed(2)}%`}
                    percentageChange={-2.3}
                    trend="down"
                    trendDesired="down"
                    icon={<PieChart className="h-4 w-4" />}
                  />
                  <MetricsCard
                    title="Conversions"
                    value={summary.totalConversions}
                    percentageChange={12.6}
                    trend="up"
                    icon={<LineChart className="h-4 w-4" />}
                  />
                </>
              )}
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
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            {/* Performance Section Content */}
            <CrossChannelDashboard loading={loading} />
          </TabsContent>
          
          <TabsContent value="customer-insights" className="space-y-4">
            {/* Customer Insights Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChartCard
                    title=""
                    loading={loading}
                    chartType="pie"
                    data={[
                      { name: 'New Customers', value: 30 },
                      { name: 'Returning', value: 45 },
                      { name: 'Loyal', value: 25 },
                    ]}
                    height={300}
                    hideLegend={false}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChartCard
                    title=""
                    loading={loading}
                    chartType="bar"
                    data={[
                      { name: 'Very Satisfied', value: 42 },
                      { name: 'Satisfied', value: 28 },
                      { name: 'Neutral', value: 15 },
                      { name: 'Dissatisfied', value: 10 },
                      { name: 'Very Dissatisfied', value: 5 },
                    ]}
                    xDataKey="name"
                    yDataKey="value"
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Map</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                {loading ? (
                  <p>Loading journey map data...</p>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Customer journey visualization will appear here</p>
                    <Button variant="outline" onClick={generateSampleData}>Generate Sample Data</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsDashboard;
