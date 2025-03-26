
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnalyticsChartCard from "@/components/analytics/AnalyticsChartCard";
import MetricsCard from "@/components/analytics/MetricsCard";
import CustomizableAnalyticsPanel from "@/components/analytics/CustomizableAnalyticsPanel";
import AdAccountSummary from "@/components/analytics/AdAccountSummary";
import CrossChannelDashboard from "@/components/analytics/CrossChannelDashboard";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  ArrowUpRight, 
  Download, 
  Share2, 
  Settings, 
  Clock, 
  ZoomIn,
  CalendarCheck,
  LayoutDashboard,
  ChevronRight,
  Plus,
  RefreshCw
} from "lucide-react";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("last30days");
  const [activeTab, setActiveTab] = useState("overview");
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Get comprehensive insights across all your marketing channels
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              <span>Export</span>
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Share2 size={16} />
              <span>Share</span>
            </Button>
            
            <Button 
              variant={isCustomizing ? "secondary" : "outline"} 
              className="gap-2"
              onClick={() => setIsCustomizing(!isCustomizing)}
            >
              <Settings size={16} />
              <span>Customize</span>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meta">Meta Ads</TabsTrigger>
            <TabsTrigger value="google">Google Ads</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            <TabsTrigger value="shopify">Shopify</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {isCustomizing ? (
              <CustomizableAnalyticsPanel onSave={() => setIsCustomizing(false)} />
            ) : (
              <>
                <CrossChannelDashboard dateRange={dateRange} />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <MetricsCard 
                    title="Total Ad Spend" 
                    value="$24,389.54" 
                    change="+12.3%" 
                    trend="up" 
                    icon={<LineChart className="text-blue-500" />} 
                  />
                  <MetricsCard 
                    title="Total Revenue" 
                    value="$86,240.92" 
                    change="+18.7%" 
                    trend="up" 
                    icon={<BarChart3 className="text-green-500" />} 
                  />
                  <MetricsCard 
                    title="ROAS" 
                    value="3.54x" 
                    change="+5.2%" 
                    trend="up" 
                    icon={<PieChart className="text-indigo-500" />} 
                  />
                  <MetricsCard 
                    title="Conversion Rate" 
                    value="2.8%" 
                    change="-0.4%" 
                    trend="down" 
                    icon={<ArrowUpRight className="text-amber-500" />} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnalyticsChartCard 
                    title="Revenue vs Spend" 
                    subtitle="Last 30 days" 
                    chartType="bar" 
                  />
                  <AnalyticsChartCard 
                    title="ROAS by Channel" 
                    subtitle="Last 30 days" 
                    chartType="bar" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AnalyticsChartCard 
                    title="Top Campaigns" 
                    subtitle="By revenue" 
                    chartType="horizontal-bar" 
                  />
                  <AnalyticsChartCard 
                    title="Conversion Funnel" 
                    subtitle="Visitor to purchase" 
                    chartType="funnel" 
                  />
                  <AnalyticsChartCard 
                    title="Revenue by Device" 
                    subtitle="Breakdown" 
                    chartType="pie" 
                  />
                </div>
                
                <AdAccountSummary />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="meta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meta Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect your Meta Ads account to view performance data</p>
                <Button className="mt-4">Connect Meta Ads</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="google" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Google Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect your Google Ads account to view performance data</p>
                <Button className="mt-4">Connect Google Ads</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tiktok" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>TikTok Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect your TikTok Ads account to view performance data</p>
                <Button className="mt-4">Connect TikTok Ads</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shopify" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shopify Store Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect your Shopify store to view performance data</p>
                <Button className="mt-4">Connect Shopify</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus size={16} />
                  Create Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { name: "Weekly Performance", date: "Oct 12, 2023", type: "Automated" },
                  { name: "Facebook ROAS Analysis", date: "Oct 10, 2023", type: "Custom" },
                  { name: "Q3 Marketing Results", date: "Oct 5, 2023", type: "Custom" },
                  { name: "Campaign Comparison", date: "Oct 1, 2023", type: "Automated" }
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.type}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsDashboard;
