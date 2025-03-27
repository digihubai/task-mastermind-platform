
import React from 'react';
import { RouteObject } from 'react-router-dom';
import MarketingPage from '@/pages/MarketingPage';
import MarketingSEOPage from '@/pages/MarketingSEOPage';
import SEOToolsPage from '@/pages/marketing/SEOToolsPage';

// Create placeholder components for missing marketing routes
const SocialPage = () => <div>Social Page</div>;
const CampaignsPage = () => <div>Campaigns Page</div>;
const BrandVoicePage = () => <div>Brand Voice Page</div>;

const marketingRoutes: RouteObject[] = [
  {
    path: '/marketing',
    element: <MarketingPage />,
  },
  {
    path: '/marketing/seo',
    element: <MarketingSEOPage />,
  },
  {
    path: '/marketing/seo/tools',
    element: <SEOToolsPage />,
  },
  {
    path: '/social',
    element: <SocialPage />,
  },
  {
    path: '/campaigns',
    element: <CampaignsPage />,
  },
  {
    path: '/brand-voice',
    element: <BrandVoicePage />,
  },
];

export default marketingRoutes;
