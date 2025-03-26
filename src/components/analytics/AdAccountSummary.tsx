
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, InfoIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdAccountSummary = () => {
  const healthItems = [
    {
      title: "Optimization Score",
      score: 78,
      status: "warning",
      description: "Your account could be improved with better ad creative variety"
    },
    {
      title: "Account Structure",
      score: 92,
      status: "success",
      description: "Your campaign structure follows best practices"
    },
    {
      title: "Budget Allocation",
      score: 65,
      status: "warning",
      description: "Spending too much on low-performing campaigns"
    },
    {
      title: "Ad Creative Quality",
      score: 83,
      status: "success",
      description: "Your creative assets are performing well"
    }
  ];
  
  const opportunities = [
    {
      title: "Increase ROAS on Facebook",
      impact: "high",
      description: "Implement lookalike audiences based on your top 1% customers"
    },
    {
      title: "Reduce wasted ad spend",
      impact: "medium",
      description: "Pause 3 campaigns that have spent over $500 with no conversions"
    },
    {
      title: "Improve conversion tracking",
      impact: "high",
      description: "Fix missing conversion events on your checkout page"
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle size={16} className="text-green-500" />;
      case "warning":
        return <AlertCircle size={16} className="text-amber-500" />;
      case "danger":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <InfoIcon size={16} className="text-blue-500" />;
    }
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High Impact</span>;
      case "medium":
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium Impact</span>;
      case "low":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Low Impact</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="font-medium">{item.score}/100</span>
                </div>
                <Progress value={item.score} className={getProgressColor(item.score)} />
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Growth Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((item, index) => (
              <div key={index} className="p-3 border rounded-md space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{item.title}</h4>
                  {getImpactBadge(item.impact)}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdAccountSummary;
