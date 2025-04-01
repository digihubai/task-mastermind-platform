import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Download } from "lucide-react";
import { format, subDays } from "date-fns";
import { toast } from "sonner";
import { fetchSEOAnalytics, generateSEOReport } from '@/services/seo';

const SEOAnalytics = () => {
  const [siteUrl, setSiteUrl] = useState("https://example.com");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSEOAnalytics(siteUrl, startDate, endDate);
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      await generateSEOReport(siteUrl, startDate, endDate);
      toast.success("SEO Report generated successfully");
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">SEO Analytics</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={handleGenerateReport}
            disabled={generatingReport}
          >
            {generatingReport ? "Generating..." : (
              <>
                <Download className="h-4 w-4" />
                <span>Generate Report</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading analytics data...</p>
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Organic Traffic</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{analytics.organicTraffic.toLocaleString()}</p>
              <span className={`text-xs font-medium ${analytics.trafficChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {analytics.trafficChange > 0 ? '+' : ''}{analytics.trafficChange}%
              </span>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg. Position</h3>
            <p className="text-3xl font-bold">{analytics.avgPosition}</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Click-Through Rate</h3>
            <p className="text-3xl font-bold">{analytics.ctr}%</p>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center py-12">
          <p>No analytics data available</p>
        </div>
      )}

      {/* Add more analytics components here */}
    </div>
  );
};

export default SEOAnalytics;
