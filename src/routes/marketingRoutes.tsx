
import React from "react";
import { RouteObject } from "react-router-dom";
import SEOToolsPage from "@/pages/marketing/SEOToolsPage";
import CampaignsPage from "@/pages/marketing/CampaignsPage";
import SocialMediaPage from "@/pages/marketing/SocialMediaPage";
import AISEOPage from "@/pages/ai/AISEOPage";

const marketingRoutes: RouteObject[] = [
  {
    path: "/marketing/seo/tools",
    element: <SEOToolsPage />,
  },
  {
    path: "/marketing/campaigns",
    element: <CampaignsPage />,
  },
  {
    path: "/marketing/social-media",
    element: <SocialMediaPage />,
  },
  {
    path: "/marketing/seo/ai-writer",
    element: <AISEOPage />,
  }
];

export default marketingRoutes;
