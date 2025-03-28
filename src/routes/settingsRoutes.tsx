
import React from "react";
import { RouteObject } from "react-router-dom";
import SettingsPage from "@/pages/SettingsPage";
import SettingsIntegrationsPage from "@/pages/settings/SettingsIntegrationsPage";
import SEOImageIntegrations from "@/pages/admin/SEOImageIntegrations";

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
];

export default settingsRoutes;
