
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'none';
  trendValue: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color 
}) => {
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
