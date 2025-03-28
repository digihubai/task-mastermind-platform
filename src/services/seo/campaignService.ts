
import { SEOCampaign } from "./types";

/**
 * Fetches SEO campaigns for the current user
 */
export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock SEO campaigns
  return [
    {
      id: "campaign-1",
      name: "Q4 Product Launch SEO",
      keywordCount: 23,
      pageCount: 8,
      status: "active",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      metrics: {
        backlinks: 45,
        avgPosition: 3
      },
      userId: "user123"
    },
    {
      id: "campaign-2",
      name: "Blog Content Optimization",
      keywordCount: 18,
      pageCount: 12,
      status: "in_progress",
      startDate: "2023-09-15",
      endDate: null,
      metrics: {
        backlinks: 27,
        avgPosition: 5
      },
      userId: "user123"
    },
    {
      id: "campaign-3",
      name: "Local SEO Initiative",
      keywordCount: 14,
      pageCount: 6,
      status: "completed",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      metrics: {
        backlinks: 32,
        avgPosition: 2
      },
      userId: "user123"
    }
  ];
};

/**
 * Creates a new SEO campaign
 */
export const createSEOCampaign = async (campaignData: Partial<SEOCampaign>): Promise<SEOCampaign> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock created campaign with generated ID
  return {
    id: `campaign-${Math.floor(Math.random() * 1000)}`,
    name: campaignData.name || "New Campaign",
    keywordCount: campaignData.keywordCount || 0,
    pageCount: campaignData.pageCount || 0,
    status: "active",
    startDate: campaignData.startDate || new Date().toISOString().split('T')[0],
    endDate: campaignData.endDate || null,
    metrics: {
      backlinks: 0,
      avgPosition: 0
    },
    userId: "user123"
  };
};
