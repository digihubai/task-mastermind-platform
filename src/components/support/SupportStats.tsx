
import React from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Clock8
} from "lucide-react";
import { StatCard } from './stats/StatCard';
import { getSupportStats } from './stats/supportStatsData';

const SupportStats: React.FC = () => {
  const stats = getSupportStats();

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

export default SupportStats;
