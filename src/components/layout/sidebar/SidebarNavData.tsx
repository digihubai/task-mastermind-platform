
import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  dashboardSection,
  automationSection,
  analyticsSection,
  aiToolsSection,
  coreModulesSection,
  settingsSection,
  adminSection
} from "./data";
import { useLocation } from "react-router-dom";
import { SidebarSectionType } from "@/types/sidebar";
import { useSidebarNavigation } from "@/hooks/use-sidebar-navigation";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";

// Export these items for MainSidebar.tsx
export const userMenuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  // Removed Analytics item
];

export const marketingItems = [
  { name: "Campaigns", path: "/marketing/campaigns", icon: "campaign" },
  { name: "SEO", path: "/marketing/seo", icon: "search" }
];

export const aiToolsItems = [
  { name: "AI Chat", path: "/ai/chat", icon: "chat" },
  { name: "AI Vision", path: "/ai/vision", icon: "visibility" }
];

export const moduleItems = [
  { name: "CRM", path: "/crm", icon: "people" },
  { name: "Support", path: "/support", icon: "support_agent" }
];

export const settingsItems = [
  { name: "Profile", path: "/settings/profile", icon: "person" },
  { name: "Security", path: "/settings/security", icon: "security" }
];

// Export sidebar sections for use-sidebar-navigation.ts
export const sidebarSections: SidebarSectionType[] = [
  dashboardSection,
  automationSection,
  analyticsSection,
  aiToolsSection,
  coreModulesSection,
  settingsSection,
  adminSection
];

export const SidebarNavData = () => {
  const { pathname } = useLocation();
  const { userRole } = useRoleBasedSettings();
  const isAdmin = userRole === "admin" || userRole === "super_admin";
  
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
        key="aitools" 
        section={aiToolsSection} 
        pathname={pathname} 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      <SidebarMenuItem
        key="departments"
        section={coreModulesSection}
        pathname={pathname}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        isPathActive={isPathActive}
        isExactPathActive={isExactPathActive}
      />
      
      {isAdmin && (
        <SidebarMenuItem
          key="admin"
          section={adminSection}
          pathname={pathname}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          isPathActive={isPathActive}
          isExactPathActive={isExactPathActive}
        />
      )}
      
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
