
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";

interface KpiData {
  value: string;
  change: string;
  trend: "up" | "down";
}

interface KpiCardProps {
  title: string;
  data: KpiData;
  icon: React.ReactNode;
  metricType?: "value" | "percentage" | "currency";
}

const KpiCard: React.FC<KpiCardProps> = ({ title, data, icon, metricType = "value" }) => {
  // Handle the display of values based on metric type
  const formatValue = (value: string) => {
    // If the value already includes a currency symbol or % sign, don't format it
    if (value.includes('$') || value.includes('%')) {
      return value;
    }
    
    switch (metricType) {
      case "percentage":
        return `${value}%`;
      case "currency":
        return `$${value}`;
      default:
        return value;
    }
  };

  return (
    <Card className="stat-card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="stat-value">{data.value}</p>
        <div className={data.trend === "up" ? "stat-indicator-up" : "stat-indicator-down"}>
          {data.trend === "up" ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
          {data.change}
        </div>
      </div>
    </Card>
  );
};

export default KpiCard;
