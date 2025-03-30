
export interface SEOKeyword {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  relevance: number;
}

export interface SEOContentOutline {
  title: string;
  sections: string[];
  raw: string;
}

export interface SEOContentImage {
  url: string;
  description: string;
  altText: string;
}

export interface SEOContentParameters {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  wordCount: number;
  headingStructure: string;
  includeTOC: boolean;
  includeFAQ: boolean;
  tone: string;
}

export interface SEOAnalytics {
  organicTraffic: number;
  keywordRankings: {
    keyword: string;
    position: number;
    change: number;
  }[];
  pagePerformance: {
    url: string;
    traffic: number;
    conversions: number;
  }[];
  backlinks: number;
}

export interface SEOCampaign {
  id: string;
  name: string;
  keywordCount: number;
  pageCount: number;
  status: 'active' | 'completed' | 'in_progress' | 'inactive';
  startDate: string;
  endDate: string | null;
  metrics: {
    backlinks: number;
    avgPosition: number;
  };
  userId: string;
}
