
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SEOAnalytics as SEOAnalyticsType } from '@/services/seo/types';
import { fetchSEOAnalytics, generateSEOReport } from '@/services/seo/seoAnalyticsService';
import { ChevronDown, Download, Calendar, Globe, ArrowRight, ArrowUp, ArrowDown, Search, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const SEOAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<SEOAnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30');
  const [siteUrl, setSiteUrl] = useState('https://example.com');
  
  const [trafficData, setTrafficData] = useState([]);
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);
  
  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - parseInt(timeframe) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const data = await fetchSEOAnalytics(siteUrl, startDate, endDate);
      setAnalytics(data);
      
      // Generate mock time series data for charts
      generateChartData(data, parseInt(timeframe));
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error("Failed to load SEO analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (data: SEOAnalyticsType, days: number) => {
    // Generate traffic data
    const traffic = [];
    const rankings = [];
    let date = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      // Set date to i days ago
      date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      // Traffic data
      const dailyVisits = Math.round(data.organicTraffic / days) + Math.floor(Math.random() * 20) - 10;
      traffic.push({
        date: dateStr,
        visits: dailyVisits > 0 ? dailyVisits : 5,
      });
      
      // Rankings data
      if (i % 5 === 0 || i === 0 || i === days - 1) {
        // Only add ranking data every 5 days to simulate weekly updates
        rankings.push({
          date: dateStr,
          avgPosition: parseFloat((data.avgPosition + (Math.random() * 0.6 - 0.3)).toFixed(1))
        });
      }
    }
    
    setTrafficData(traffic);
    setRankingData(rankings);
  };

  const handleGenerateReport = async () => {
    try {
      toast.info("Generating SEO report...");
      
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - parseInt(timeframe) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      await generateSEOReport(siteUrl, startDate, endDate);
      
      toast.success("SEO report generated and ready for download");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate SEO report. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Analytics</h2>
          <p className="text-muted-foreground">Track your search engine optimization performance</p>
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={timeframe} 
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[150px]">
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Last {timeframe} Days
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleGenerateReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-32">
              <CardContent className="p-6">
                <div className="h-full bg-muted/50 rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analytics ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                    <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organic Traffic</p>
                    <h3 className="text-2xl font-bold mt-1">{analytics.organicTraffic}</h3>
                    <p className={`text-xs ${analytics.trafficChange > 0 ? 'text-green-500' : 'text-red-500'} mt-1 flex items-center`}>
                      {analytics.trafficChange > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(analytics.trafficChange)}% from previous period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Position</p>
                    <h3 className="text-2xl font-bold mt-1">{analytics.avgPosition}</h3>
                    <p className="text-xs text-green-500 mt-1">Improved from position 5.3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Click-Through Rate</p>
                    <h3 className="text-2xl font-bold mt-1">{analytics.ctr}%</h3>
                    <p className="text-xs text-green-500 mt-1">+0.8% from previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organic Traffic Trend</CardTitle>
                <CardDescription>Daily organic search traffic over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="visits" 
                        name="Visits" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Keyword Rankings</CardTitle>
                <CardDescription>Average position over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="avgPosition" 
                        name="Average Position" 
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
              <CardDescription>Keywords driving the most traffic to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden border rounded-lg">
                <div className="bg-muted/50 text-sm font-medium grid grid-cols-12 p-3 border-b">
                  <div className="col-span-4">Keyword</div>
                  <div className="col-span-2 text-center">Position</div>
                  <div className="col-span-2 text-center">Previous</div>
                  <div className="col-span-2 text-center">Traffic</div>
                  <div className="col-span-2 text-center">Volume</div>
                </div>
                
                <div className="divide-y">
                  {analytics.keywordRankings.map((item, i) => (
                    <div key={i} className="grid grid-cols-12 p-3 text-sm hover:bg-muted/20 transition-colors">
                      <div className="col-span-4 font-medium">{item.keyword}</div>
                      <div className="col-span-2 text-center">{item.position}</div>
                      <div className="col-span-2 text-center flex items-center justify-center">
                        {item.previousPosition}
                        <span className={`text-xs ml-1 ${
                          item.previousPosition > item.position ? 
                          'text-green-500' : 
                          item.previousPosition < item.position ? 
                          'text-red-500' : 
                          'text-muted-foreground'
                        }`}>
                          {item.previousPosition > item.position ? 
                            '↑' : 
                            item.previousPosition < item.position ? 
                            '↓' : 
                            '→'}
                        </span>
                      </div>
                      <div className="col-span-2 text-center">{item.traffic}</div>
                      <div className="col-span-2 text-center">{item.volume}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  View All Keywords <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex justify-center items-center p-6">
            <p className="text-muted-foreground">No analytics data available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SEOAnalytics;
