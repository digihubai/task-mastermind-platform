
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Search, Link, ChevronDown, Loader, BarChart3 } from "lucide-react";
import { fetchSEOAnalytics } from "@/services/seoService";
import { SEOAnalytics as SEOAnalyticsType } from "@/services/seo/types";

const SEOAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<SEOAnalyticsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("30days");

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await fetchSEOAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading SEO analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
        <Button variant="outline" onClick={loadAnalytics} className="mt-4">
          <BarChart3 size={16} className="mr-2" />
          Load Analytics
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-6">SEO Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Keyword Rankings</p>
              <h3 className="text-2xl font-bold mt-1">{analytics.keywordRankings}</h3>
              <p className="text-xs text-green-500 mt-1">+12 this month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
              <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Organic Traffic</p>
              <h3 className="text-2xl font-bold mt-1">{(analytics.organicTraffic / 1000).toFixed(1)}K</h3>
              <p className="text-xs text-green-500 mt-1">+8.3% from last month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
              <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Backlinks</p>
              <h3 className="text-2xl font-bold mt-1">{analytics.backlinks}</h3>
              <p className="text-xs text-green-500 mt-1">+23 this month</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Top Performing Keywords</h3>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Last {timeframe === "30days" ? "30" : timeframe === "90days" ? "90" : "7"} Days <ChevronDown size={14} />
            </Button>
          </div>
        </div>
        
        <div className="overflow-hidden border rounded-lg">
          <div className="bg-secondary/50 text-sm font-medium grid grid-cols-12 p-3 border-b">
            <div className="col-span-4">Keyword</div>
            <div className="col-span-2 text-center">Position</div>
            <div className="col-span-2 text-center">Previous</div>
            <div className="col-span-2 text-center">Traffic</div>
            <div className="col-span-2 text-center">Difficulty</div>
          </div>
          
          <div className="divide-y">
            {analytics.rankings.map((item, i) => (
              <div key={i} className="grid grid-cols-12 p-3 text-sm hover:bg-secondary/20 transition-colors">
                <div className="col-span-4 font-medium">{item.keyword}</div>
                <div className="col-span-2 text-center">{item.position}</div>
                <div className="col-span-2 text-center flex items-center justify-center">
                  {item.previous}
                  <span className={`text-xs ml-1 ${item.previous > item.position ? 'text-green-500' : item.previous < item.position ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {item.previous > item.position ? '↑' : item.previous < item.position ? '↓' : '→'}
                  </span>
                </div>
                <div className="col-span-2 text-center">{item.traffic}</div>
                <div className="col-span-2 text-center">
                  <Badge variant="outline" className={
                    item.difficulty === "High" 
                      ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
                      : item.difficulty === "Medium"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                      : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                  }>
                    {item.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm">View Full Report</Button>
        </div>
      </div>
    </Card>
  );
};

export default SEOAnalytics;
