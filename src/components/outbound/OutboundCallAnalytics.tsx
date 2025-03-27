
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowUpRight, ArrowDownRight, Phone, UserCheck, UserX, Clock } from "lucide-react";
import { CallStats } from '@/services/outboundCallService';

interface OutboundCallAnalyticsProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const OutboundCallAnalytics: React.FC<OutboundCallAnalyticsProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Call Analytics</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-muted/50 rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Call Analytics</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No call data available for analysis
          </div>
        </CardContent>
      </Card>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const pieData = [
    { name: 'Answered', value: stats.callOutcomes.answered },
    { name: 'Voicemail', value: stats.callOutcomes.voicemail },
    { name: 'No Answer', value: stats.callOutcomes.noAnswer },
    { name: 'Busy', value: stats.callOutcomes.busy },
    { name: 'Failed', value: stats.callOutcomes.failed }
  ];

  const metricCards = [
    {
      title: "Total Calls",
      value: stats.totalCalls,
      change: stats.callsChange,
      icon: <Phone className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Answered Rate",
      value: `${stats.answeredRate}%`,
      change: stats.answeredRateChange,
      icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Avg. Duration",
      value: stats.avgCallDuration,
      change: stats.durationChange,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: stats.conversionChange,
      icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Call Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Performance metrics for your outbound call campaigns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium leading-none">{card.title}</p>
                {card.icon}
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{card.value}</div>
                <div className={`flex items-center text-xs ${
                  card.change > 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {card.change > 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(card.change)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Call Volume Trend</CardTitle>
            <CardDescription>Daily outbound call activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8884d8" 
                    name="Total Calls"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="answered" 
                    stroke="#82ca9d" 
                    name="Answered"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
            <CardDescription>Distribution of call results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
          <CardDescription>Call metrics by agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#8884d8" name="Total Calls" />
                <Bar dataKey="converted" fill="#82ca9d" name="Conversions" />
                <Bar dataKey="avgDuration" fill="#ffc658" name="Avg Duration (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutboundCallAnalytics;
