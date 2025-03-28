
// Define the SEO related types
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

export interface SEOAnalytics {
  keywordDensity: number;
  readabilityScore: number;
  structureScore: number;
  originalityScore: number;
  overallScore: number;
  recommendations: string[];
}
