
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AIToolUsageItem {
  id: string; // Changed from number to string to match UUID format
  action: string;
  tool: string;
  timeAgo: string;
  iconType: "pen-tool" | "image" | "bot" | string;
  iconBgClass: string;
}

export function useAIToolUsage() {
  const [recentUsage, setRecentUsage] = useState<AIToolUsageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchRecentUsage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Since ai_tool_usage table doesn't exist yet, we'll use fallback data
      // In a real implementation, you'd create and use the table
      const fallbackData: AIToolUsageItem[] = [
        {
          id: "1",
          action: "Created marketing copy",
          tool: "AI Copywriter",
          timeAgo: "2 hours ago",
          iconType: "pen-tool",
          iconBgClass: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        },
        {
          id: "2",
          action: "Generated product images",
          tool: "AI Vision",
          timeAgo: "Yesterday",
          iconType: "image",
          iconBgClass: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
        },
        {
          id: "3",
          action: "Trained customer service chatbot",
          tool: "AI Chatbot",
          timeAgo: "3 days ago",
          iconType: "bot",
          iconBgClass: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
        }
      ];
      
      setRecentUsage(fallbackData);
    } catch (err) {
      console.error("Error fetching AI tool usage:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch recent usage"));
      toast({
        title: "Error",
        description: "Failed to load recent tool usage.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentUsage();
  }, []);

  return {
    recentUsage,
    isLoading,
    error,
    refreshUsage: fetchRecentUsage
  };
}

// Helper function to format the time ago string
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  } else {
    return "Just now";
  }
}

// Helper function to get the appropriate background class based on icon type
function getIconBgClass(iconType: string): string {
  switch (iconType) {
    case "pen-tool":
      return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
    case "image":
      return "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400";
    case "bot":
      return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400";
    default:
      return "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400";
  }
}
