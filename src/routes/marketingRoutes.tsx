
import React from 'react';
import { RouteObject } from 'react-router-dom';
import MarketingPage from '@/pages/MarketingPage';
import MarketingSEOPage from '@/pages/MarketingSEOPage';
import SEOToolsPage from '@/pages/marketing/SEOToolsPage';
import AISEOPage from '@/pages/ai/AISEOPage';
import EmailMarketingPage from '@/pages/marketing/EmailMarketingPage';

// Create placeholder components for missing marketing routes
const CampaignsPage = () => <div>Campaigns Page</div>;
const AutomationPage = () => <div>Automation Page</div>;
const SocialMediaPage = () => <div>Social Media Page</div>;
const AnalyticsPage = () => <div>Marketing Analytics Page</div>;

const marketingRoutes: RouteObject[] = [
  // Marketing Main Hub
  {
    path: '/marketing',
    element: <MarketingPage />,
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
  // SEO Section with nested routes
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
  // Email Marketing
  {
    path: '/marketing/email',
    element: <EmailMarketingPage />,
  },
  // Social Media
  {
    path: '/marketing/social',
    element: <SocialMediaPage />,
  },
  // Analytics
  {
    path: '/marketing/analytics',
    element: <AnalyticsPage />,
  },
];

export default marketingRoutes;
