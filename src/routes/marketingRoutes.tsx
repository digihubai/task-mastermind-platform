import React from 'react';
import { RouteObject } from 'react-router-dom';
import MarketingPage from '@/pages/MarketingPage';
import MarketingSEOPage from '@/pages/MarketingSEOPage';
import SEOToolsPage from '@/pages/marketing/SEOToolsPage';
import AISEOPage from '@/pages/ai/AISEOPage';

// Create placeholder components for missing marketing routes
const CampaignsPage = () => <div>Campaigns Page</div>;
const AutomationPage = () => <div>Automation Page</div>;
const SocialMediaPage = () => <div>Social Media Page</div>;
const EmailMarketingPage = () => <div>Email Marketing Page</div>;
const AnalyticsPage = () => <div>Marketing Analytics Page</div>;

const marketingRoutes: RouteObject[] = [
  {
    path: '/marketing',
    element: <MarketingPage />,
  },
  // SEO Section
  {
    path: '/marketing/seo',
    element: <MarketingSEOPage />,
  },
  {
    path: '/marketing/seo/tools',
    element: <SEOToolsPage />,
  },
  {
    path: '/marketing/seo/ai-writer',
    element: <AISEOPage />,
  },
  // Campaigns Section
  {
    path: '/marketing/campaigns',
    element: <CampaignsPage />,
  },
  // Automation Section
  {
    path: '/marketing/automation',
    element: <AutomationPage />,
  },
  // Other marketing sections
  {
    path: '/marketing/social',
    element: <SocialMediaPage />,
  },
  {
    path: '/marketing/email',
    element: <EmailMarketingPage />,
  },
  {
    path: '/marketing/analytics',
    element: <AnalyticsPage />,
  },
];

export default marketingRoutes;
