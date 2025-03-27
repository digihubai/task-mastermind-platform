
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AIToolUsageItem {
  id: string;
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
      const { data, error } = await supabase
        .from('ai_tool_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Transform the data to match our interface
        const formattedData: AIToolUsageItem[] = data.map(item => ({
          id: item.id,
          action: item.action,
          tool: item.tool,
          timeAgo: formatTimeAgo(new Date(item.created_at)),
          iconType: item.icon_type,
          iconBgClass: getIconBgClass(item.icon_type)
        }));
        
        setRecentUsage(formattedData);
      } else {
        // If no data is returned, set an empty array
        setRecentUsage([]);
      }
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
