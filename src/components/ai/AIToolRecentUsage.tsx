
import React from "react";
import { Star, PenTool, Image, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RecentUsageItem {
  id: number;
  icon: React.ReactNode;
  action: string;
  tool: string;
  timeAgo: string;
  iconBgClass: string;
}

const AIToolRecentUsage = () => {
  const recentUsageItems: RecentUsageItem[] = [
    {
      id: 1,
      icon: <PenTool size={16} />,
      action: "Created marketing copy",
      tool: "AI Copywriter",
      timeAgo: "2 hours ago",
      iconBgClass: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      id: 2,
      icon: <Image size={16} />,
      action: "Generated product images",
      tool: "AI Vision",
      timeAgo: "Yesterday",
      iconBgClass: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
    },
    {
      id: 3,
      icon: <Bot size={16} />,
      action: "Trained customer service chatbot",
      tool: "AI Chatbot",
      timeAgo: "3 days ago",
      iconBgClass: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Usage</h2>
      <Card className="border border-border/40 p-6">
        <div className="space-y-4">
          {recentUsageItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.iconBgClass}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.tool}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-muted-foreground">{item.timeAgo}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AIToolRecentUsage;
