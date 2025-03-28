
import React from "react";
import { RouteObject } from "react-router-dom";
import SettingsPage from "@/pages/SettingsPage";
import SettingsIntegrationsPage from "@/pages/settings/SettingsIntegrationsPage";

const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/integrations",
    element: <SettingsIntegrationsPage />,
  },
];

export default settingsRoutes;
