
import React from "react";
import { SidebarSectionType } from "@/types/sidebar";

// Import all navigation data from modular files
import {
  userMenuItems,
  dashboardSection,
  marketingItems,
  marketingSection,
  moduleItems,
  coreModulesSection,
  aiToolsItems,
  aiToolsSection,
  settingsItems,
  settingsSection,
  automationSection,
  analyticsSection
} from "./data";

// Export item arrays for use in components like MainSidebar
export { 
  userMenuItems,
  marketingItems,
  moduleItems,
  aiToolsItems,
  settingsItems 
};

// Main sidebar navigation sections (used by Sidebar.tsx)
export const sidebarSections: SidebarSectionType[] = [
  dashboardSection,
  coreModulesSection,
  aiToolsSection,
  automationSection,
  analyticsSection,
  settingsSection,
];
