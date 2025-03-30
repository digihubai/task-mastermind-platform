
import { SEOCampaign } from "./types";

/**
 * Fetch SEO campaigns for the current user
 */
export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  // In a real implementation, this would fetch from an API or database
  // For now, return mock data
  return [
    {
      id: "campaign-1",
      name: "Q3 SEO Campaign",
      keywordCount: 25,
      pageCount: 8,
      status: "active",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      metrics: {
        backlinks: 42,
        avgPosition: 3
      },
      userId: "user123"
    },
    {
      id: "campaign-2",
      name: "Product Launch SEO",
      keywordCount: 15,
      pageCount: 5,
      status: "in_progress",
      startDate: "2023-08-15",
      endDate: null,
      metrics: {
        backlinks: 18,
        avgPosition: 7
      },
      userId: "user123"
    }
  ];
};

/**
 * Create a new SEO campaign
 */
export const createSEOCampaign = async (campaignData: Partial<SEOCampaign>): Promise<SEOCampaign> => {
  // In a real implementation, this would send to an API or database
  // For now, return mock data with the provided values
  return {
    id: `campaign-${Math.random().toString(36).substring(2, 9)}`,
    name: campaignData.name || "New Campaign",
    keywordCount: campaignData.keywordCount || 0,
    pageCount: campaignData.pageCount || 0,
    status: campaignData.status || "active",
    startDate: campaignData.startDate || new Date().toISOString().split('T')[0],
    endDate: campaignData.endDate || null,
    metrics: campaignData.metrics || {
      backlinks: 0,
      avgPosition: 0
    },
    userId: "user123"
  };
};

export default {
  fetchSEOCampaigns,
  createSEOCampaign
};
