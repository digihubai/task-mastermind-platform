
import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  dashboardSection,
  automationSection,
  analyticsSection,
  marketingSection,
  aiToolsSection,
  moduleSection,
  settingsSection
} from "./data";
import { useLocation } from "react-router-dom";
import { SidebarSectionType } from "@/types/sidebar";
import { useSidebarNavigation } from "@/hooks/use-sidebar-navigation";

// Export these items for MainSidebar.tsx
export const userMenuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <span className="material-icons">dashboard</span> },
  { name: "Analytics", path: "/analytics", icon: <span className="material-icons">bar_chart</span> }
];

export const marketingItems = [
  { name: "Campaigns", path: "/marketing/campaigns", icon: <span className="material-icons">campaign</span> },
  { name: "SEO", path: "/marketing/seo", icon: <span className="material-icons">search</span> }
];

export const aiToolsItems = [
  { name: "AI Chat", path: "/ai/chat", icon: <span className="material-icons">chat</span> },
  { name: "AI Vision", path: "/ai/vision", icon: <span className="material-icons">visibility</span> }
];

export const moduleItems = [
  { name: "CRM", path: "/crm", icon: <span className="material-icons">people</span> },
  { name: "Support", path: "/support", icon: <span className="material-icons">support_agent</span> }
];

export const settingsItems = [
  { name: "Profile", path: "/settings/profile", icon: <span className="material-icons">person</span> },
  { name: "Security", path: "/settings/security", icon: <span className="material-icons">security</span> }
];

// Export sidebar sections for use-sidebar-navigation.ts
export const sidebarSections: SidebarSectionType[] = [
  dashboardSection,
  automationSection,
  analyticsSection,
  marketingSection,
  aiToolsSection,
  moduleSection,
  settingsSection
];

export const SidebarNavData = () => {
  const { pathname } = useLocation();
  // We'll use our navigation hook to get expanded sections and other utilities
  const {
    expandedSections,
    toggleSection,
    isPathActive,
    isExactPathActive
  } = useSidebarNavigation();

  return (
    <div className="flex flex-col gap-6 p-0">
      <SidebarMenuItem 
        key="dashboard"
        section={dashboardSection} 
        pathname={pathname} 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />

      <SidebarMenuItem
        key="automation"
        section={automationSection}
        pathname={pathname}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem
        key="analytics"  
        section={analyticsSection}
        pathname={pathname}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem 
        key="marketing"
        section={marketingSection} 
        pathname={pathname} 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem
        key="aitools" 
        section={aiToolsSection} 
        pathname={pathname} 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem
        key="modules"
        section={moduleSection}
        pathname={pathname}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem
        key="settings"
        section={settingsSection}
        pathname={pathname}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
    </div>
  );
};

export default SidebarNavData;
