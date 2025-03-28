
import { SEOAnalytics } from './types';

/**
 * Fetches SEO analytics data
 */
export const fetchSEOAnalytics = async (): Promise<SEOAnalytics> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock SEO analytics data
  return {
    keywordRankings: 143,
    organicTraffic: 24500,
    backlinks: 867,
    rankings: [
      { keyword: "digital marketing software", position: 3, previous: 5, traffic: 1240, difficulty: "Medium" },
      { keyword: "AI content creation", position: 1, previous: 2, traffic: 980, difficulty: "High" },
      { keyword: "marketing automation", position: 4, previous: 7, traffic: 820, difficulty: "High" },
      { keyword: "customer support tools", position: 2, previous: 4, traffic: 750, difficulty: "Medium" },
      { keyword: "SEO optimization tips", position: 3, previous: 3, traffic: 620, difficulty: "Low" }
    ]
  };
};

// Re-export SEOAnalytics type for convenience
export { SEOAnalytics };
