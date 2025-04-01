
import { SEOAnalytics, SEOReport, SEOReportSchedule } from './types';
import { fetchSEOAnalytics } from './analyticsService';
import { generateContentAI } from '../ai/contentGenerationAI';

/**
 * Generate a comprehensive SEO report
 */
export const generateSEOReport = async (
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SEOReport> => {
  try {
    // Fetch analytics data for reporting period
    const analytics = await fetchSEOAnalytics(siteUrl, startDate, endDate);
    
    // Generate AI summary of the performance
    const summary = await generateReportSummary(analytics);
    
    return {
      id: `report_${Date.now()}`,
      siteUrl,
      period: { startDate, endDate },
      createdAt: new Date().toISOString(),
      analytics,
      summary,
      recommendations: await generateRecommendations(analytics),
      status: 'completed'
    };
  } catch (error) {
    console.error("Error generating SEO report:", error);
    throw error;
  }
};

/**
 * Generate AI-written summary of SEO performance
 */
async function generateReportSummary(analytics: SEOAnalytics): Promise<string> {
  try {
    const avgPosition = analytics.keywordRankings.reduce((sum, item) => sum + item.position, 0) / 
      analytics.keywordRankings.length;
    
    const prompt = `Write a professional SEO performance summary for a website. Include the following data points:
    - Organic traffic: ${analytics.organicTraffic} visits (${analytics.trafficChange > 0 ? '+' : ''}${analytics.trafficChange}% change)
    - Average position: ${avgPosition.toFixed(1)} 
    - Top keyword: "${analytics.keywordRankings[0]?.keyword}" at position ${analytics.keywordRankings[0]?.position}
    - Backlinks: ${analytics.backlinks}
    
    Keep the summary concise, professional, and include actionable insights based on the data.`;
    
    return generateContentAI('SEO Report', ['SEO', 'analytics', 'performance'], 'SEO Performance Summary', prompt);
  } catch (error) {
    console.error("Error generating report summary:", error);
    return "Unable to generate summary. Please check the analytics data manually.";
  }
}

/**
 * Generate AI recommendations based on SEO data
 */
async function generateRecommendations(analytics: SEOAnalytics): Promise<string[]> {
  // In a real implementation, this would analyze the data and provide smart recommendations
  return [
    "Focus on improving content for keywords ranking in positions 4-10 to push them to the first page",
    "Target more backlinks from authoritative sites in your industry",
    "Update older content that's beginning to drop in rankings",
    "Improve page speed on mobile devices to reduce bounce rate"
  ];
}

/**
 * Schedule automated SEO reports
 */
export const scheduleReport = async (
  siteUrl: string,
  frequency: 'weekly' | 'monthly',
  recipients: string[],
  startDate?: string
): Promise<SEOReportSchedule> => {
  // This would connect to a real scheduling system in production
  const schedule: SEOReportSchedule = {
    id: `schedule_${Date.now()}`,
    siteUrl,
    frequency,
    recipients,
    startDate: startDate || new Date().toISOString(),
    active: true,
    lastSent: null,
    nextScheduled: calculateNextScheduleDate(frequency, startDate)
  };
  
  // Save the schedule to database
  console.log("Scheduled new report:", schedule);
  
  return schedule;
};

/**
 * Calculate the next schedule date based on frequency
 */
function calculateNextScheduleDate(frequency: 'weekly' | 'monthly', startDate?: string): string {
  const date = startDate ? new Date(startDate) : new Date();
  
  if (frequency === 'weekly') {
    date.setDate(date.getDate() + 7);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  
  return date.toISOString();
}

/**
 * Send a report to specified recipients
 */
export const sendReport = async (reportId: string, recipients: string[]): Promise<boolean> => {
  // This would connect to an email service in production
  console.log(`Sending report ${reportId} to ${recipients.join(', ')}`);
  return true;
};

/**
 * Generate a branded PDF report for clients
 */
export const generatePDFReport = async (reportId: string, brandSettings?: any): Promise<string> => {
  // This would generate a PDF report in production
  console.log(`Generating PDF for report ${reportId} with brand settings`, brandSettings);
  return `https://example.com/reports/${reportId}.pdf`;
};
