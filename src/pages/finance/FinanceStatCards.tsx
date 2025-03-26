
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Wallet, CreditCard, DollarSign, PieChart } from "lucide-react";

const FinanceStatCards = () => {
  const stats = [
    {
      title: "Total Income",
      value: "$24,568.80",
      change: "+15.3%",
      trend: "up",
      icon: <DollarSign size={18} className="text-green-600" />,
      color: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600"
    },
    {
      title: "Total Expenses",
      value: "$8,452.20",
      change: "-2.5%",
      trend: "down",
      icon: <CreditCard size={18} className="text-amber-600" />,
      color: "bg-amber-100 dark:bg-amber-900/20",
      iconColor: "text-amber-600"
    },
    {
      title: "Net Cash Flow",
      value: "$16,116.60",
      change: "+18.2%",
      trend: "up",
      icon: <TrendingUp size={18} className="text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600"
    },
    {
      title: "Total Balance",
      value: "$68,927.35",
      change: "+5.4%",
      trend: "up",
      icon: <Wallet size={18} className="text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <div className={`p-2 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">{stat.value}</p>
            <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend === 'up' ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
              <span className="text-sm">{stat.change} from last month</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FinanceStatCards;
