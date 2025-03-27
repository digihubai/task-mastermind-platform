
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Phone,
  UserRound,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { useCallStats } from '@/services/outboundCallService';

// Line chart component using recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const callVolumeData = [
  { name: '1 Mar', outbound: 40, answered: 24 },
  { name: '2 Mar', outbound: 30, answered: 13 },
  { name: '3 Mar', outbound: 20, answered: 8 },
  { name: '4 Mar', outbound: 27, answered: 19 },
  { name: '5 Mar', outbound: 18, answered: 10 },
  { name: '6 Mar', outbound: 23, answered: 12 },
  { name: '7 Mar', outbound: 34, answered: 20 },
];

const conversionData = [
  { name: '1 Mar', rate: 12 },
  { name: '2 Mar', rate: 9 },
  { name: '3 Mar', rate: 15 },
  { name: '4 Mar', rate: 18 },
  { name: '5 Mar', rate: 12 },
  { name: '6 Mar', rate: 14 },
  { name: '7 Mar', rate: 17 },
];

const timeOfDayData = [
  { name: '9 AM', calls: 28, rate: 15 },
  { name: '10 AM', calls: 35, rate: 20 },
  { name: '11 AM', calls: 42, rate: 18 },
  { name: '12 PM', calls: 20, rate: 10 },
  { name: '1 PM', calls: 15, rate: 8 },
  { name: '2 PM', calls: 38, rate: 16 },
  { name: '3 PM', calls: 45, rate: 22 },
  { name: '4 PM', calls: 30, rate: 19 },
];

const OutboundCallAnalytics = () => {
  const { data: stats, isLoading } = useCallStats();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium tracking-tight">Call Performance</h2>
          <p className="text-muted-foreground">Analyze your outbound call campaigns</p>
        </div>
        
        <div className="flex gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={14} />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <BarChart3 size={14} />
            Reports
          </Button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Total Calls</p>
                <p className="text-2xl font-semibold">
                  {isLoading ? "..." : stats?.totalCalls}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={16} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <span className={`font-medium flex items-center ${true ? 'text-green-500' : 'text-red-500'}`}>
                {true ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                8.2%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Answer Rate</p>
                <p className="text-2xl font-semibold">
                  {isLoading ? "..." : `${stats?.answerRate}%`}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserRound size={16} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <span className={`font-medium flex items-center ${false ? 'text-green-500' : 'text-red-500'}`}>
                {false ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                2.1%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Conversion Rate</p>
                <p className="text-2xl font-semibold">
                  {isLoading ? "..." : `${stats?.conversionRate}%`}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle size={16} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <span className={`font-medium flex items-center ${true ? 'text-green-500' : 'text-red-500'}`}>
                {true ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                5.3%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Avg Duration</p>
                <p className="text-2xl font-semibold">
                  {isLoading ? "..." : stats?.avgDuration}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock size={16} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <span className={`font-medium flex items-center ${true ? 'text-green-500' : 'text-red-500'}`}>
                {true ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                0.5%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="callVolume" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="callVolume">Call Volume</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="timeOfDay">Time of Day</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Last 7 days
          </div>
        </div>
        
        <TabsContent value="callVolume">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Call Volume Trend</CardTitle>
              <CardDescription>Total outbound calls vs answered calls</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={callVolumeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="outbound" stroke="#8884d8" name="Outbound" />
                    <Line type="monotone" dataKey="answered" stroke="#82ca9d" name="Answered" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversions">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Daily conversion rate for outbound calls</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#8884d8" name="Conversion %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeOfDay">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Time of Day Analysis</CardTitle>
              <CardDescription>Best times for calls and conversion rates</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeOfDayData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="calls" fill="#8884d8" name="Calls" />
                    <Bar yAxisId="right" dataKey="rate" fill="#82ca9d" name="Success %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Call Outcomes */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Call Outcomes</CardTitle>
          <CardDescription>Distribution of call results</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-md flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-3">
                <CheckCircle size={24} />
              </div>
              <p className="font-medium">Successful</p>
              <p className="text-2xl font-semibold mt-1">32%</p>
              <p className="text-xs text-muted-foreground mt-1">398 calls</p>
            </div>
            
            <div className="p-4 border rounded-md flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mb-3">
                <Phone size={24} />
              </div>
              <p className="font-medium">Voicemail</p>
              <p className="text-2xl font-semibold mt-1">28%</p>
              <p className="text-xs text-muted-foreground mt-1">352 calls</p>
            </div>
            
            <div className="p-4 border rounded-md flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-3">
                <XCircle size={24} />
              </div>
              <p className="font-medium">No Answer</p>
              <p className="text-2xl font-semibold mt-1">36%</p>
              <p className="text-xs text-muted-foreground mt-1">450 calls</p>
            </div>
            
            <div className="p-4 border rounded-md flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                <Clock size={24} />
              </div>
              <p className="font-medium">Scheduled</p>
              <p className="text-2xl font-semibold mt-1">4%</p>
              <p className="text-xs text-muted-foreground mt-1">48 calls</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutboundCallAnalytics;
