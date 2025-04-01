
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, PhoneCall, UserCheck } from "lucide-react";

interface CallAnalyticsProps {
  totalCalls: number;
  aiHandledCalls: number;
  humanHandledCalls: number;
  totalCallsChange?: string;
  aiPercentage?: number;
  humanPercentage?: number;
}

const CallAnalytics: React.FC<CallAnalyticsProps> = ({
  totalCalls,
  aiHandledCalls,
  humanHandledCalls,
  totalCallsChange = "+12% from last week",
  aiPercentage = 74,
  humanPercentage = 26
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <PhoneCall className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-2xl font-bold">{totalCalls.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{totalCallsChange}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AI Handled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-2xl font-bold">{aiHandledCalls.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{aiPercentage}% of all calls</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Human Handled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <UserCheck className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-2xl font-bold">{humanHandledCalls.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{humanPercentage}% of all calls</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallAnalytics;
