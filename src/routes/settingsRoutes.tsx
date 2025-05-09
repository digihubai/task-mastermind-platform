
import React from "react";
import { RouteObject } from "react-router-dom";
import SettingsPage from "@/pages/SettingsPage";
import SettingsIntegrationsPage from "@/pages/settings/SettingsIntegrationsPage";
import SEOImageIntegrations from "@/pages/admin/SEOImageIntegrations";
import AdminAISettings from "@/pages/admin/AdminAISettings";
import APIIntegration from "@/pages/admin/APIIntegration";

const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/integrations",
    element: <SettingsIntegrationsPage />,
  },
  {
    path: "/settings/seo-image-integrations",
    element: <SEOImageIntegrations />,
  },
  {
    path: "/settings/ai-configuration",
    element: <AdminAISettings />,
  },
  {
    path: "/settings/api-integration",
    element: <APIIntegration />,
  },
];

export default settingsRoutes;
