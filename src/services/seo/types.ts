
/**
 * SEO Campaign interface
 */
export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: "active" | "in_progress" | "completed" | "inactive";
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}

/**
 * SEO Analytics interface
 */
export interface SEOAnalytics {
  keywordRankings: number;
  organicTraffic: number;
  backlinks: number;
  rankings: {
    keyword: string;
    position: number;
    previous: number;
    traffic: number;
    difficulty: string;
  }[];
}
