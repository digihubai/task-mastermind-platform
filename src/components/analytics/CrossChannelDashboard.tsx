
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown } from "lucide-react";

interface CrossChannelDashboardProps {
  dateRange: string;
}

const CrossChannelDashboard: React.FC<CrossChannelDashboardProps> = ({ dateRange }) => {
  const channelData = {
    meta: {
      spend: '$15,453.28',
      revenue: '$48,976.35',
      roas: '3.17x',
      cpc: '$0.87',
      ctr: '2.3%',
      change: '+12%',
      trend: 'up'
    },
    google: {
      spend: '$8,936.26',
      revenue: '$37,264.57',
      roas: '4.17x',
      cpc: '$1.24',
      ctr: '3.8%',
      change: '+8%',
      trend: 'up'
    },
    tiktok: {
      spend: '$5,432.67',
      revenue: '$14,568.32',
      roas: '2.68x',
      cpc: '$0.65',
      ctr: '1.9%',
      change: '-4%',
      trend: 'down'
    }
  };
  
  const formatDateRange = (range: string) => {
    switch (range) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'last7days':
        return 'Last 7 days';
      case 'last30days':
        return 'Last 30 days';
      case 'thisMonth':
        return 'This month';
      case 'lastMonth':
        return 'Last month';
      default:
        return 'Custom range';
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <CardTitle>Cross-Channel Performance</CardTitle>
          <p className="text-sm text-muted-foreground">{formatDateRange(dateRange)}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overall" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b-0 pl-4">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="meta">Meta</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overall" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total Spend</p>
                <p className="text-2xl font-semibold mt-1">$29,822.21</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">$100,809.24</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Average ROAS</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">3.38x</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUp size={14} />
                    <span>+7%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">2.7%</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUp size={14} />
                    <span>+0.5%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">$87.64</p>
                  <div className="flex items-center text-red-600 text-sm">
                    <ArrowDown size={14} />
                    <span>-2%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="meta" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Meta Spend</p>
                <p className="text-2xl font-semibold mt-1">{channelData.meta.spend}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Meta Revenue</p>
                <p className="text-2xl font-semibold mt-1">{channelData.meta.revenue}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Meta ROAS</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">{channelData.meta.roas}</p>
                  <div className={`flex items-center ${channelData.meta.trend === 'up' ? 'text-green-600' : 'text-red-600'} text-sm`}>
                    {channelData.meta.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{channelData.meta.change}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CPC</p>
                <p className="text-2xl font-semibold mt-1">{channelData.meta.cpc}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-2xl font-semibold mt-1">{channelData.meta.ctr}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="google" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Google Spend</p>
                <p className="text-2xl font-semibold mt-1">{channelData.google.spend}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Google Revenue</p>
                <p className="text-2xl font-semibold mt-1">{channelData.google.revenue}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Google ROAS</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">{channelData.google.roas}</p>
                  <div className={`flex items-center ${channelData.google.trend === 'up' ? 'text-green-600' : 'text-red-600'} text-sm`}>
                    {channelData.google.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{channelData.google.change}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CPC</p>
                <p className="text-2xl font-semibold mt-1">{channelData.google.cpc}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-2xl font-semibold mt-1">{channelData.google.ctr}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tiktok" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">TikTok Spend</p>
                <p className="text-2xl font-semibold mt-1">{channelData.tiktok.spend}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">TikTok Revenue</p>
                <p className="text-2xl font-semibold mt-1">{channelData.tiktok.revenue}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">TikTok ROAS</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold">{channelData.tiktok.roas}</p>
                  <div className={`flex items-center ${channelData.tiktok.trend === 'up' ? 'text-green-600' : 'text-red-600'} text-sm`}>
                    {channelData.tiktok.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{channelData.tiktok.change}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CPC</p>
                <p className="text-2xl font-semibold mt-1">{channelData.tiktok.cpc}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-2xl font-semibold mt-1">{channelData.tiktok.ctr}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CrossChannelDashboard;
