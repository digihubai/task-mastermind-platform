
import { SidebarSectionType } from "@/types/sidebar";

// Import sections from individual files
import { dashboardSection } from "./dashboardItems";
import { automationSection } from "./automationItems";
import { analyticsSection } from "./analyticsItems";
import { marketingSection } from "./marketingItems";
import { aiToolsSection } from "./aiTools";
import { coreModulesSection } from "./moduleItems";
import { settingsSection } from "./settingsItems";

// Export all sections for use in SidebarNavData
export {
  dashboardSection,
  automationSection,
  analyticsSection,
  marketingSection,
  aiToolsSection,
  coreModulesSection,
  settingsSection
};
