
// SEO Analytics Data Types
export interface SEOAnalytics {
  organicTraffic: number;
  trafficChange: number;
  keywordRankings: Array<{
    keyword: string;
    position: number;
    previousPosition: number;
    volume: number;
    traffic: number;
  }>;
  backlinks: number;
  avgPosition: number;
  clicks: number;
  impressions: number;
  ctr: number;
}

// SEO Campaign Types
export interface SEOCampaign {
  id: string;
  name: string;
  status: "active" | "in_progress" | "completed" | "inactive";
  startDate: string;
  endDate: string | null;
  keywordCount: number;
  pageCount: number;
  userId: string;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
}

// SEO Report Types
export interface SEOReport {
  id: string;
  siteUrl: string;
  period: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  analytics: SEOAnalytics;
  summary: string;
  recommendations: string[];
  status: "pending" | "processing" | "completed" | "failed";
}

export interface SEOReportSchedule {
  id: string;
  siteUrl: string;
  frequency: "weekly" | "monthly";
  recipients: string[];
  startDate: string;
  active: boolean;
  lastSent: string | null;
  nextScheduled: string;
}

// Client Approval Workflow Types
export interface ContentApproval {
  id: string;
  title: string;
  contentType: "blog" | "page" | "product" | "seo";
  status: "draft" | "pending_approval" | "approved" | "rejected" | "published";
  content: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  comments: ContentComment[];
}

export interface ContentComment {
  id: string;
  contentId: string;
  userId: string;
  userName: string;
  userRole: "admin" | "client" | "editor";
  comment: string;
  timestamp: string;
}

// Topic Cluster Types
export interface TopicCluster {
  id: string;
  name: string;
  mainKeyword: string;
  supportingKeywords: string[];
  contentPieces: TopicClusterContent[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicClusterContent {
  id: string;
  title: string;
  keywords: string[];
  status: "planned" | "draft" | "published";
  url?: string;
  publishedDate?: string;
  contentAge?: number; // Days since published/updated
}

// SEO Brief Types
export interface SEOBrief {
  id: string;
  title: string;
  targetKeywords: string[];
  secondaryKeywords: string[];
  outline: string;
  wordCount: number;
  references: string[];
  competitorUrls: string[];
  createdAt: string;
  clientId?: string;
}

// Page Optimization Types
export interface PageOptimization {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  contentScore: number; // 0-100
  technicalScore: number; // 0-100
  speedScore: number; // 0-100
  suggestions: PageOptimizationSuggestion[];
  lastAnalyzed: string;
}

export interface PageOptimizationSuggestion {
  type: "technical" | "content" | "speed" | "schema";
  priority: "high" | "medium" | "low";
  description: string;
  implemented: boolean;
}
