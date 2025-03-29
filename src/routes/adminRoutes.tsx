
import React from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Marketplace from "@/pages/admin/Marketplace";
import Themes from "@/pages/admin/Themes";
import UserManagement from "@/pages/admin/UserManagement";
import Announcements from "@/pages/admin/Announcements";
import GoogleAdsense from "@/pages/admin/GoogleAdsense";
import SupportRequests from "@/pages/admin/SupportRequests";
import Templates from "@/pages/admin/Templates";
import ChatSettings from "@/pages/admin/ChatSettings";
import Frontend from "@/pages/admin/Frontend";
import Finance from "@/pages/admin/Finance";
import Pages from "@/pages/admin/Pages";
import Blog from "@/pages/admin/Blog";
import Affiliates from "@/pages/admin/Affiliates";
import Coupons from "@/pages/admin/Coupons";
import EmailTemplates from "@/pages/admin/EmailTemplates";
import APIIntegration from "@/pages/admin/APIIntegration";
import Settings from "@/pages/admin/Settings";
import SiteHealth from "@/pages/admin/SiteHealth";
import AdminAISettings from "@/pages/admin/AdminAISettings";
import Credits from "@/pages/admin/Credits";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/admin/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/admin/themes",
    element: <Themes />,
  },
  {
    path: "/admin/user-management",
    element: <UserManagement />,
  },
  {
    path: "/admin/announcements",
    element: <Announcements />,
  },
  {
    path: "/admin/google-adsense",
    element: <GoogleAdsense />,
  },
  {
    path: "/admin/support-requests",
    element: <SupportRequests />,
  },
  {
    path: "/admin/templates",
    element: <Templates />,
  },
  {
    path: "/admin/chat-settings",
    element: <ChatSettings />,
  },
  {
    path: "/admin/frontend",
    element: <Frontend />,
  },
  {
    path: "/admin/finance",
    element: <Finance />,
  },
  {
    path: "/admin/pages",
    element: <Pages />,
  },
  {
    path: "/admin/blog",
    element: <Blog />,
  },
  {
    path: "/admin/affiliates",
    element: <Affiliates />,
  },
  {
    path: "/admin/coupons",
    element: <Coupons />,
  },
  {
    path: "/admin/email-templates",
    element: <EmailTemplates />,
  },
  {
    path: "/admin/api-integration",
    element: <APIIntegration />,
  },
  {
    path: "/admin/settings",
    element: <Settings />,
  },
  {
    path: "/admin/site-health",
    element: <SiteHealth />,
  },
  {
    path: "/admin/ai-settings",
    element: <AdminAISettings />,
  },
  {
    path: "/admin/credits",
    element: <Credits />,
  },
];

export default adminRoutes;
