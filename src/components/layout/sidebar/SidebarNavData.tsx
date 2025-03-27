
import React from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
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

export const SidebarNavData = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-6 p-0">
      <SidebarMenuItem 
        key="dashboard"
        section={dashboardSection} 
        pathname={pathname} 
      />

      <SidebarMenuItem
        key="automation"
        section={automationSection}
        pathname={pathname}
      />
      
      <SidebarMenuItem
        key="analytics"  
        section={analyticsSection}
        pathname={pathname}
      />
      
      <SidebarMenuItem 
        key="marketing"
        section={marketingSection} 
        pathname={pathname} 
      />
      
      <SidebarMenuItem
        key="aitools" 
        section={aiToolsSection} 
        pathname={pathname} 
      />
      
      <SidebarMenuItem
        key="modules"
        section={moduleSection}
        pathname={pathname}
      />
      
      <SidebarMenuItem
        key="settings"
        section={settingsSection}
        pathname={pathname}
      />
    </div>
  );
};

export default SidebarNavData;
