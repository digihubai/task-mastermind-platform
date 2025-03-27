
import React from "react";
import { Star, PenTool, Image, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAIToolUsage, AIToolUsageItem } from "@/hooks/useAIToolUsage";

const AIToolRecentUsage = () => {
  const { recentUsage, isLoading, error, refreshUsage } = useAIToolUsage();

  // Function to render the appropriate icon based on the tool type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "pen-tool":
        return <PenTool size={16} />;
      case "image":
        return <Image size={16} />;
      case "bot":
        return <Bot size={16} />;
      default:
        return <PenTool size={16} />;
    }
  };

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Usage</h2>
        <Card className="border border-border/40 p-6">
          <div className="text-center text-muted-foreground py-4">
            Unable to load recent activity.
            <Button variant="link" onClick={refreshUsage} className="ml-2">
              Try again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Usage</h2>
      <Card className="border border-border/40 p-6">
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton loading state
            <>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </>
          ) : recentUsage.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No recent activity found.
            </div>
          ) : (
            recentUsage.map((item: AIToolUsageItem) => (
              <div key={item.id} className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.iconBgClass}`}>
                    {renderIcon(item.iconType)}
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
            ))
          )}
          
          {isLoading && (
            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <Loader2 size={16} className="animate-spin mr-2" />
              Loading recent activity...
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AIToolRecentUsage;
