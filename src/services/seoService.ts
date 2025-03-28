import { useState, useEffect } from 'react';

export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: 'active' | 'inactive' | 'completed' | 'in_progress';
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}

export const generateMockSEOContent = (topic: string, keywords: string[]): string => {
  const title = `The Ultimate Guide to ${topic}`;
  
  const introduction = `
# ${title}

In today's digital landscape, understanding ${topic} is essential for businesses and professionals who want to stay competitive. This comprehensive guide will explore everything you need to know about ${topic}, with special focus on ${keywords.slice(0, 3).join(', ')}, and more.

## Introduction to ${topic}

${topic} has revolutionized the way we approach business in the modern era. With advancements in technology and changing consumer behaviors, mastering ${topic} has become a critical skill. This guide will help you understand the fundamentals and advanced strategies of ${topic}.
`;

  const sections = keywords.map((keyword, index) => `
## Understanding ${keyword}

${keyword} is a core component of successful ${topic} strategies. Research shows that organizations implementing effective ${keyword} approaches see up to 30% improvement in their performance metrics.

### Key Benefits of ${keyword}

1. **Improved Efficiency**: Streamline your processes and reduce wasted resources
2. **Enhanced Customer Experience**: Better understand and serve your audience
3. **Competitive Advantage**: Stay ahead of industry trends and outperform competitors
4. **Increased ROI**: Maximize the return on your ${topic} investments

### Best Practices for ${keyword}

- Start with clear goals and objectives
- Measure your performance consistently
- Adapt your strategies based on data and feedback
- Stay updated with the latest ${topic} innovations
${index === 0 ? `
- Integrate ${keywords[1] || keywords[0]} with your ${keyword} approach for best results
` : ''}
`).join('\n');

  const conclusion = `
## Conclusion

Mastering ${topic} requires dedication, continuous learning, and strategic implementation. By focusing on key areas like ${keywords.join(', ')}, you can develop a comprehensive approach that delivers real results.

Remember that the landscape of ${topic} is constantly evolving, so staying current with industry trends and best practices is essential for long-term success.

## Next Steps

Ready to take your ${topic} strategy to the next level? Start by implementing the principles discussed in this guide, particularly focusing on ${keywords[0]} and ${keywords[1] || keywords[0]}.

For more advanced insights, consider connecting with industry experts and participating in professional communities focused on ${topic}.
`;

  return `${introduction}${sections}${conclusion}`;
};

export const fetchSEOCampaigns = async (): Promise<SEOCampaign[]> => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "campaign1",
          name: "Q4 Product Launch SEO",
          keywordCount: 15,
          pageCount: 5,
          status: "active",
          startDate: "2023-10-01",
          endDate: "2023-12-31",
          metrics: {
            backlinks: 47,
            avgPosition: 4
          },
          userId: "user123"
        },
        {
          id: "campaign2",
          name: "Blog Content Optimization",
          keywordCount: 25,
          pageCount: 12,
          status: "in_progress",
          startDate: "2023-09-15",
          endDate: null,
          metrics: {
            backlinks: 32,
            avgPosition: 7
          },
          userId: "user123"
        }
      ]);
    }, 800);
  });
};

export const useSEOCampaigns = () => {
  const [campaigns, setCampaigns] = useState<SEOCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        const data = await fetchSEOCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  return { campaigns, loading, error };
};

export const fetchSEOAnalytics = async (timeframe: string): Promise<any> => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const performance = [
        { month: 'Jan', visitors: 120, clicks: 45, conversions: 12 },
        { month: 'Feb', visitors: 160, clicks: 70, conversions: 18 },
        { month: 'Mar', visitors: 210, clicks: 95, conversions: 25 },
        { month: 'Apr', visitors: 250, clicks: 120, conversions: 35 },
        { month: 'May', visitors: 310, clicks: 150, conversions: 42 },
        { month: 'Jun', visitors: 390, clicks: 185, conversions: 55 },
      ];
      
      const keywordsRanking = [
        { keyword: 'AI chatbot', position: 3, change: 2, volume: 5400 },
        { keyword: 'AI assistant', position: 5, change: -1, volume: 3200 },
        { keyword: 'Customer support AI', position: 2, change: 4, volume: 2100 },
        { keyword: 'Conversational AI', position: 8, change: 0, volume: 1800 },
        { keyword: 'AI for business', position: 12, change: 3, volume: 4500 },
      ];
      
      const topContent = [
        { title: '10 Ways AI Chatbots Are Revolutionizing Customer Support', views: 1245, ctr: 5.2, position: 3 },
        { title: 'The Ultimate Guide to SEO Content Writing in 2023', views: 980, ctr: 4.8, position: 4 },
        { title: 'How to Implement AI Solutions for Small Businesses', views: 875, ctr: 3.9, position: 6 },
        { title: 'Machine Learning vs. Deep Learning: What\'s the Difference?', views: 720, ctr: 3.5, position: 5 },
      ];
      
      const trafficSourcesData = [
        { name: 'Organic Search', value: 65 },
        { name: 'Social Media', value: 15 },
        { name: 'Direct', value: 10 },
        { name: 'Referral', value: 7 },
        { name: 'Other', value: 3 },
      ];
      
      resolve({
        performance,
        keywordsRanking,
        topContent,
        trafficSourcesData,
        totalVisitors: 1440,
        visitorsChange: 12.5,
        averageCTR: 4.3,
        ctrChange: 0.7,
        publishedContent: 12,
        lastPublished: '2 days ago'
      });
    }, 800);
  });
};
