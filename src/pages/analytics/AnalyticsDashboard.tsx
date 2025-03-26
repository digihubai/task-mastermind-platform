
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AnalyticsChartCard from "@/components/analytics/AnalyticsChartCard";
import MetricsCard from "@/components/analytics/MetricsCard";
import AdAccountSummary from "@/components/analytics/AdAccountSummary";
import CrossChannelDashboard from "@/components/analytics/CrossChannelDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownToLine, BarChart3, Calendar, ChevronDown, Copy, Download, ExternalLink, Facebook, Grid3X3, Instagram, LineChart, Plus, RefreshCw, Settings, Share2, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAnalytics } from "@/hooks/useAnalytics";
import { toast } from "sonner";

// TikTok Icon as a proper React component
const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.0982 2.268C16.0326 2.24 15.9649 2.2247 15.896 2.223H12.8982V15.5766C12.8982 16.7533 11.9439 17.7076 10.7672 17.7076C9.5905 17.7076 8.63618 16.7533 8.63618 15.5766C8.63618 14.4076 9.5828 13.4533 10.7518 13.4456V10.4478C7.91386 10.4555 5.6231 12.7616 5.6231 15.6073C5.6231 18.4606 8.0108 20.7591 10.8487 20.7591C13.6866 20.7591 16.0743 18.453 16.0743 15.6073V8.5962C17.287 9.5735 18.7469 10.1311 20.3152 10.1465V7.14872C20.3152 7.14872 18.551 7.11489 16.0982 5.12128V2.268Z"
      fill="currentColor"
    />
  </svg>
);

const AnalyticsDashboard = () => {
  const revenueData = [
    { date: "Jan", revenue: 4000, profit: 2400, target: 3000 },
    { date: "Feb", revenue: 3000, profit: 1398, target: 3000 },
    { date: "Mar", revenue: 2000, profit: 800, target: 3000 },
    { date: "Apr", revenue: 2780, profit: 1908, target: 3000 },
    { date: "May", revenue: 1890, profit: 1800, target: 3000 },
    { date: "Jun", revenue: 2390, profit: 2800, target: 3000 },
    { date: "Jul", revenue: 3490, profit: 3300, target: 3000 },
  ];

  const campaignData = [
    { name: "Facebook", spend: 4000, conversions: 240, cpa: 16.7 },
    { name: "Instagram", spend: 3000, conversions: 139, cpa: 21.6 },
    { name: "Google", spend: 2000, conversions: 98, cpa: 20.4 },
    { name: "TikTok", spend: 2780, conversions: 89, cpa: 31.2 },
    { name: "YouTube", spend: 1890, conversions: 43, cpa: 44.0 },
  ];

  const conversionData = [
    { day: "Mon", rate: 2.4 },
    { day: "Tue", rate: 1.8 },
    { day: "Wed", rate: 3.2 },
    { day: "Thu", rate: 4.5 },
    { day: "Fri", rate: 3.8 },
    { day: "Sat", rate: 2.9 },
    { day: "Sun", rate: 1.5 },
  ];

  const audienceData = [
    { segment: "New Users", percentage: 40 },
    { segment: "Returning", percentage: 30 },
    { segment: "Subscribers", percentage: 20 },
    { segment: "Premium", percentage: 10 },
  ];

  const channelMetrics = [
    { channel: "Facebook", trend: "up" as const, change: "+8.5%", value: "$5,483", icon: <Facebook size={20} className="text-blue-600" /> },
    { channel: "Instagram", trend: "up" as const, change: "+12.3%", value: "$7,492", icon: <Instagram size={20} className="text-pink-600" /> },
    { channel: "Twitter", trend: "down" as const, change: "-4.7%", value: "$1,147", icon: <Twitter size={20} className="text-blue-400" /> },
    { channel: "TikTok", trend: "up" as const, change: "+21.8%", value: "$3,982", icon: <TikTokIcon className="text-black dark:text-white" /> },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [chartViewMode, setChartViewMode] = useState("line");
  const [dateRange, setDateRange] = useState("last7days");
  const [dashboardLayout, setDashboardLayout] = useState([
    { id: "revenue", visible: true, title: "Revenue & Profit" },
    { id: "campaigns", visible: true, title: "Campaign Performance" },
    { id: "conversions", visible: true, title: "Conversion Rate" },
    { id: "channels", visible: true, title: "Channel Metrics" },
    { id: "account", visible: true, title: "Account Health" },
    { id: "crossChannel", visible: true, title: "Cross-Channel Performance" },
  ]);
  
  const { data, summary, loading, error, refreshData, generateSampleData } = useAnalytics('week');
  
  const handleGenerateSampleData = async () => {
    try {
      await generateSampleData();
      toast.success("Sample analytics data generated successfully");
    } catch (err) {
      toast.error("Failed to generate sample data");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive view of your marketing performance across all platforms
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Select 
              defaultValue={dateRange} 
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
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
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Download size={16} />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Customize Dashboard</DialogTitle>
                    <DialogDescription>
                      Select which metrics and charts you want to display on your dashboard.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Dashboard Layout</h4>
                      {dashboardLayout.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.id} 
                            checked={item.visible} 
                            onCheckedChange={(checked) => {
                              setDashboardLayout(dashboardLayout.map(i => 
                                i.id === item.id ? {...i, visible: !!checked} : i
                              ));
                            }}
                          />
                          <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item.title}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Chart Style Preference</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="chart-line" 
                            name="chart-style" 
                            value="line" 
                            checked={chartViewMode === "line"} 
                            onChange={() => setChartViewMode("line")}
                          />
                          <label htmlFor="chart-line" className="text-sm font-medium leading-none">Line Charts</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="chart-bar" 
                            name="chart-style" 
                            value="bar" 
                            checked={chartViewMode === "bar"} 
                            onChange={() => setChartViewMode("bar")}
                          />
                          <label htmlFor="chart-bar" className="text-sm font-medium leading-none">Bar Charts</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium">Error loading analytics data</h3>
                    <p className="text-muted-foreground">We encountered an error while loading your analytics data.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={refreshData}>Try Again</Button>
                      <Button variant="outline" onClick={handleGenerateSampleData}>Generate Sample Data</Button>
                    </div>
                  </div>
                </Card>
              ) : data && data.length === 0 ? (
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium">No analytics data available</h3>
                    <p className="text-muted-foreground">Get started by generating sample analytics data.</p>
                    <Button onClick={handleGenerateSampleData}>Generate Sample Data</Button>
                  </div>
                </Card>
              ) : (
                <>
                  {dashboardLayout.find(i => i.id === "channels")?.visible && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {channelMetrics.map((metric, index) => (
                        <MetricsCard
                          key={index}
                          title={metric.channel}
                          value={metric.value}
                          change={metric.change}
                          trend={metric.trend}
                          icon={metric.icon}
                        />
                      ))}
                    </div>
                  )}
                  
                  {dashboardLayout.find(i => i.id === "crossChannel")?.visible && (
                    <CrossChannelDashboard dateRange={dateRange} />
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {dashboardLayout.find(i => i.id === "revenue")?.visible && (
                      <AnalyticsChartCard
                        title="Revenue & Profit"
                        chartType={chartViewMode as "line" | "bar"}
                        data={revenueData}
                        dataKeys={{
                          xAxisKey: "date",
                          yAxisKeys: [
                            { key: "revenue", color: "#2563eb", name: "Revenue" },
                            { key: "profit", color: "#10b981", name: "Profit" },
                            { key: "target", color: "#9333ea", name: "Target" }
                          ]
                        }}
                        status={{
                          text: "+12.5% vs Last Period",
                          variant: "success"
                        }}
                        showInfo
                        showDownload
                        showShare
                      />
                    )}
                    
                    {dashboardLayout.find(i => i.id === "campaigns")?.visible && (
                      <AnalyticsChartCard
                        title="Campaign Performance"
                        chartType="bar"
                        data={campaignData}
                        dataKeys={{
                          xAxisKey: "name",
                          yAxisKeys: [
                            { key: "spend", color: "#f97316", name: "Ad Spend" },
                            { key: "conversions", color: "#06b6d4", name: "Conversions" }
                          ]
                        }}
                        status={{
                          text: "Facebook +18% ROAS",
                          variant: "success"
                        }}
                        showDownload
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {dashboardLayout.find(i => i.id === "conversions")?.visible && (
                      <AnalyticsChartCard
                        title="Conversion Rate"
                        description="Daily website conversion rate"
                        chartType={chartViewMode as "line" | "bar"}
                        data={conversionData}
                        dataKeys={{
                          xAxisKey: "day",
                          yAxisKeys: [
                            { key: "rate", color: "#8b5cf6", name: "Conversion %" }
                          ]
                        }}
                        status={{
                          text: "-0.8% vs Last Week",
                          variant: "warning"
                        }}
                      />
                    )}
                    
                    {dashboardLayout.find(i => i.id === "account")?.visible && (
                      <AdAccountSummary />
                    )}
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Campaign Performance</CardTitle>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} /> Add Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 md:grid-cols-7 py-3 px-4 border-b bg-muted/50">
                    <div className="font-medium">Campaign</div>
                    <div className="font-medium text-right md:text-left">Spend</div>
                    <div className="hidden md:block font-medium">Impressions</div>
                    <div className="hidden md:block font-medium">Clicks</div>
                    <div className="hidden md:block font-medium">CPC</div>
                    <div className="hidden md:block font-medium">Conversions</div>
                    <div className="font-medium text-right">ROAS</div>
                  </div>
                  
                  {[
                    { name: "Summer Promotion", spend: "$1,245.32", impressions: "45,432", clicks: "1,342", cpc: "$0.93", conversions: "67", roas: "2.4x" },
                    { name: "Black Friday", spend: "$3,872.18", impressions: "127,654", clicks: "5,438", cpc: "$0.71", conversions: "245", roas: "3.8x" },
                    { name: "Product Retargeting", spend: "$948.73", impressions: "28,573", clicks: "982", cpc: "$0.97", conversions: "41", roas: "1.9x" },
                    { name: "New Collection", spend: "$2,347.15", impressions: "76,392", clicks: "2,874", cpc: "$0.82", conversions: "98", roas: "2.1x" },
                    { name: "Loyalty Program", spend: "$764.29", impressions: "19,284", clicks: "827", cpc: "$0.92", conversions: "53", roas: "3.2x" },
                  ].map((campaign, i) => (
                    <div key={i} className="grid grid-cols-2 md:grid-cols-7 py-3 px-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-right md:text-left">{campaign.spend}</div>
                      <div className="hidden md:block">{campaign.impressions}</div>
                      <div className="hidden md:block">{campaign.clicks}</div>
                      <div className="hidden md:block">{campaign.cpc}</div>
                      <div className="hidden md:block">{campaign.conversions}</div>
                      <div className="text-right">{campaign.roas}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Facebook", spend: "$2,432.18", revenue: "$5,874.29", roas: "2.4x", status: "success" },
                      { name: "Instagram", spend: "$1,876.54", revenue: "$4,523.18", roas: "2.4x", status: "success" },
                      { name: "Google Search", spend: "$3,291.76", revenue: "$8,723.45", roas: "2.7x", status: "success" },
                      { name: "Google Display", spend: "$987.23", revenue: "$1,234.56", roas: "1.3x", status: "warning" },
                      { name: "TikTok", spend: "$1,654.32", revenue: "$4,321.87", roas: "2.6x", status: "success" },
                    ].map((channel, i) => (
                      <div key={i} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{channel.name}</h4>
                          <Badge variant={channel.status === "success" ? "default" : "outline"} className={channel.status === "success" ? "" : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"}>
                            {channel.roas}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Spend</p>
                            <p>{channel.spend}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p>{channel.revenue}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChartCard
                    title="Platform Performance"
                    chartType="bar"
                    showControls={false}
                    data={[
                      { platform: "Facebook", spend: 1245, cpa: 24, roas: 2.4 },
                      { platform: "Instagram", spend: 987, cpa: 18, roas: 3.1 },
                      { platform: "Google", spend: 1876, cpa: 32, roas: 1.9 },
                      { platform: "TikTok", spend: 654, cpa: 21, roas: 2.7 },
                      { platform: "Twitter", spend: 432, cpa: 36, roas: 1.5 },
                    ]}
                    dataKeys={{
                      xAxisKey: "platform",
                      yAxisKeys: [
                        { key: "roas", color: "#10b981", name: "ROAS" },
                        { key: "cpa", color: "#f97316", name: "CPA" }
                      ]
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="custom-reports">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>Custom Reports</CardTitle>
                    <Button>Create New Report</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 md:grid-cols-5 py-3 px-4 border-b bg-muted/50">
                      <div className="font-medium">Report Name</div>
                      <div className="font-medium hidden md:block">Last Run</div>
                      <div className="font-medium hidden md:block">Frequency</div>
                      <div className="font-medium">Recipients</div>
                      <div className="font-medium text-right">Actions</div>
                    </div>
                    
                    {[
                      { name: "Weekly Performance Summary", last: "May 1, 2023", frequency: "Weekly", recipients: "3 users" },
                      { name: "Campaign ROI Analysis", last: "Apr 28, 2023", frequency: "Monthly", recipients: "5 users" },
                      { name: "Channel Comparison", last: "Apr 26, 2023", frequency: "Monthly", recipients: "2 users" },
                      { name: "Executive Dashboard", last: "Apr 24, 2023", frequency: "Weekly", recipients: "1 user" },
                      { name: "Conversion Path Analysis", last: "Apr 21, 2023", frequency: "Monthly", recipients: "4 users" },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-3 md:grid-cols-5 py-3 px-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <div className="font-medium">{report.name}</div>
                        <div className="hidden md:block">{report.last}</div>
                        <div className="hidden md:block">{report.frequency}</div>
                        <div>{report.recipients}</div>
                        <div className="flex justify-end items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Copy size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowDownToLine size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsDashboard;
