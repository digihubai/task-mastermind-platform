
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Clock8 
} from "lucide-react";

const SupportStats: React.FC = () => {
  // This would typically come from an API
  const stats = {
    activeConversations: 12,
    averageResponseTime: '2m 30s',
    openTickets: 8,
    resolvedToday: 15,
    waitingOnCustomer: 3,
    customerSatisfaction: '94%'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Active Conversations" 
        value={stats.activeConversations.toString()} 
        icon={<MessageSquare className="h-5 w-5" />}
        trend="up"
        trendValue="+20%"
        color="bg-blue-500/10 text-blue-500"
      />
      
      <StatCard 
        title="Average Response Time" 
        value={stats.averageResponseTime} 
        icon={<Clock className="h-5 w-5" />}
        trend="down"
        trendValue="-30%"
        color="bg-green-500/10 text-green-500"
      />
      
      <StatCard 
        title="Customer Satisfaction" 
        value={stats.customerSatisfaction} 
        icon={<UserCheck className="h-5 w-5" />}
        trend="up"
        trendValue="+5%"
        color="bg-purple-500/10 text-purple-500"
      />
      
      <StatCard 
        title="Open Tickets" 
        value={stats.openTickets.toString()} 
        icon={<AlertCircle className="h-5 w-5" />}
        trend="down"
        trendValue="-15%"
        color="bg-amber-500/10 text-amber-500"
      />
      
      <StatCard 
        title="Resolved Today" 
        value={stats.resolvedToday.toString()} 
        icon={<CheckCircle className="h-5 w-5" />}
        trend="up"
        trendValue="+25%"
        color="bg-emerald-500/10 text-emerald-500"
      />
      
      <StatCard 
        title="Waiting on Customer" 
        value={stats.waitingOnCustomer.toString()} 
        icon={<Clock8 className="h-5 w-5" />}
        trend="none"
        trendValue="0%"
        color="bg-gray-500/10 text-gray-500"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'none';
  trendValue: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue, color }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`rounded-full p-2 ${color}`}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-xs">
          {trend === 'up' && (
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {trendValue} from last week
            </div>
          )}
          
          {trend === 'down' && (
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1 rotate-180 transform" />
              {trendValue} from last week
            </div>
          )}
          
          {trend === 'none' && (
            <div className="flex items-center text-gray-500">
              — No change from last week
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportStats;
