
import { SEOCampaign } from './types';

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
      name: "Q4 Product Landing Pages",
      keywordCount: 20,
      pageCount: 5,
      status: "active",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      metrics: {
        backlinks: 87,
        avgPosition: 4.2
      },
      userId: "user123"
    },
    {
      id: "campaign-2",
      name: "Email Marketing SEO",
      keywordCount: 15,
      pageCount: 3,
      status: "in_progress",
      startDate: "2023-09-15",
      endDate: null,
      metrics: {
        backlinks: 45,
        avgPosition: 7.8
      },
      userId: "user123"
    },
    {
      id: "campaign-3",
      name: "AI Chatbot Solutions",
      keywordCount: 30,
      pageCount: 8,
      status: "active",
      startDate: "2023-08-01",
      endDate: "2023-12-31",
      metrics: {
        backlinks: 120,
        avgPosition: 2.5
      },
      userId: "user123"
    }
  ];
};
