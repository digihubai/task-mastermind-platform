
import React from "react";
import { RouteObject } from "react-router-dom";
import SEOToolsPage from "@/pages/marketing/SEOToolsPage";
import CampaignsPage from "@/pages/marketing/CampaignsPage";
import SocialMediaPage from "@/pages/marketing/SocialMediaPage";

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
  }
];

export default marketingRoutes;
