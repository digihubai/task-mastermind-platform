
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, TrendingUp, Users, MousePointerClick, ArrowUpRight, FileText, BarChart2, PieChart as PieChartIcon } from "lucide-react";

const performance = [
  { month: 'Jan', visitors: 120, clicks: 45, conversions: 12 },
  { month: 'Feb', visitors: 160, clicks: 70, conversions: 18 },
  { month: 'Mar', visitors: 210, clicks: 95, conversions: 25 },
  { month: 'Apr', visitors: 250, clicks: 120, conversions: 35 },
  { month: 'May', visitors: 310, clicks: 150, conversions: 42 },
  { month: 'Jun', visitors: 390, clicks: 185, conversions: 55 },
];

const keywordsRanking = [
  { keyword: 'AI chatbot', position: 3, change: 2, volume: 5400 },
  { keyword: 'AI assistant', position: 5, change: -1, volume: 3200 },
  { keyword: 'Customer support AI', position: 2, change: 4, volume: 2100 },
  { keyword: 'Conversational AI', position: 8, change: 0, volume: 1800 },
  { keyword: 'AI for business', position: 12, change: 3, volume: 4500 },
];

const topContent = [
  { title: '10 Ways AI Chatbots Are Revolutionizing Customer Support', views: 1245, ctr: 5.2, position: 3 },
  { title: 'The Ultimate Guide to SEO Content Writing in 2023', views: 980, ctr: 4.8, position: 4 },
  { title: 'How to Implement AI Solutions for Small Businesses', views: 875, ctr: 3.9, position: 6 },
  { title: 'Machine Learning vs. Deep Learning: What\'s the Difference?', views: 720, ctr: 3.5, position: 5 },
];

const trafficSourcesData = [
  { name: 'Organic Search', value: 65 },
  { name: 'Social Media', value: 15 },
  { name: 'Direct', value: 10 },
  { name: 'Referral', value: 7 },
  { name: 'Other', value: 3 },
];

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f97316', '#a3a3a3'];

const SEOAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState("6m");

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return '↑';
    if (change < 0) return '↓';
    return '−';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">SEO Analytics</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="1m">Last month</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border border-border/40">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
              <h3 className="text-2xl font-bold">1,440</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-green-500 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>↑ 12.5% from previous period</span>
          </div>
        </Card>
        
        <Card className="p-5 border border-border/40">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <MousePointerClick className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average CTR</p>
              <h3 className="text-2xl font-bold">4.3%</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-green-500 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>↑ 0.7% from previous period</span>
          </div>
        </Card>
        
        <Card className="p-5 border border-border/40">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published Content</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Last published: 2 days ago
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="performance" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Traffic Sources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card className="p-5 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Content Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={performance}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#4f46e5" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="clicks" stroke="#06b6d4" />
                <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Top Performing Content</h3>
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Views</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">CTR</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Position</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topContent.map((content, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <span className="font-medium">{content.title}</span>
                        </td>
                        <td className="py-3 px-4">{content.views.toLocaleString()}</td>
                        <td className="py-3 px-4">{content.ctr}%</td>
                        <td className="py-3 px-4">{content.position}</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight size={16} className="mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="keywords">
          <Card className="p-5 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Keyword Rankings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={keywordsRanking}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="keyword" />
                <YAxis domain={[0, 'dataMax']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#4f46e5" name="Search Volume" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Ranking Keywords</h3>
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Keyword</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Position</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Change</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordsRanking.map((keyword, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <span className="font-medium">{keyword.keyword}</span>
                        </td>
                        <td className="py-3 px-4">{keyword.position}</td>
                        <td className={`py-3 px-4 ${getChangeColor(keyword.change)}`}>
                          {getChangeIcon(keyword.change)} {Math.abs(keyword.change)}
                        </td>
                        <td className="py-3 px-4">{keyword.volume.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sources">
          <Card className="p-5 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex flex-col justify-center">
                <h4 className="text-md font-medium mb-3">Source Breakdown</h4>
                <div className="space-y-3">
                  {trafficSourcesData.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{source.name}</span>
                      </div>
                      <span className="font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOAnalytics;
