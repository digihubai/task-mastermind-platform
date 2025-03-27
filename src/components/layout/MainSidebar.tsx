
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Package, Bot, Target, Settings, ChevronRight, ChevronLeft } from "lucide-react";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import { 
  userMenuItems, 
  marketingItems, 
  aiToolsItems, 
  moduleItems, 
  settingsItems 
} from "./sidebar/SidebarNavData";

interface MainSidebarProps {
  collapsed?: boolean;
  isMobile?: boolean;
  toggleSidebar: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ 
  collapsed = false, 
  isMobile = false, 
  toggleSidebar 
}) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    marketing: false,
    crm: false,
    projects: false,
    settings: false,
    ai: false,
    modules: false
  });
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Check if current path starts with a given path
  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  // Check if exactly the path is active
  const isExactPathActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Auto-expand sections based on current route
  useEffect(() => {
    if (isPathActive('/marketing')) {
      setExpandedSections(prev => ({ ...prev, marketing: true }));
    }
    if (isPathActive('/crm')) {
      setExpandedSections(prev => ({ ...prev, crm: true }));
    }
    if (isPathActive('/project-management')) {
      setExpandedSections(prev => ({ ...prev, projects: true }));
    }
    if (isPathActive('/settings')) {
      setExpandedSections(prev => ({ ...prev, settings: true }));
    }
    if (isPathActive('/ai-') || isPathActive('/bots') || isPathActive('/vision') || 
        isPathActive('/copywriter') || isPathActive('/seo-writer') || 
        isPathActive('/chat') || isPathActive('/rewriter')) {
      setExpandedSections(prev => ({ ...prev, ai: true }));
    }
  }, [location.pathname]);
  
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-card border-r border-border transition-all duration-300 ease-in-out h-full flex flex-col ${
        isMobile ? "fixed left-0 top-14 z-50" : ""
      } ${isMobile && !collapsed ? "shadow-lg" : ""}`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && <h2 className="text-lg font-semibold">DigiHub AI</h2>}
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-4">
            {/* Dashboard */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                DASHBOARD
              </h3>
              <ul className="space-y-1">
                {userMenuItems.map((item) => (
                  <li key={item.path} className="px-2">
                    <a
                      href={item.path}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        isExactPathActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {item.icon}
                      {!collapsed && <span>{item.name}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Core Modules */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                CORE MODULES
              </h3>
              <ul className="space-y-1">
                {/* Modules */}
                <SidebarSection
                  title="Modules"
                  items={moduleItems}
                  sectionKey="modules"
                  icon={<Package size={20} />}
                  collapsed={collapsed}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  isPathActive={isPathActive}
                  isExactPathActive={isExactPathActive}
                />
                
                {/* Marketing with nested structure */}
                <SidebarSection
                  title="Marketing"
                  items={marketingItems}
                  sectionKey="marketing"
                  icon={<Target size={20} />}
                  collapsed={collapsed}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  isPathActive={isPathActive}
                  isExactPathActive={isExactPathActive}
                />
              </ul>
            </div>
            
            {/* AI Tools */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                AI TOOLS
              </h3>
              <ul className="space-y-1">
                <SidebarSection
                  title="AI Tools"
                  items={aiToolsItems}
                  sectionKey="ai"
                  icon={<Bot size={20} />}
                  collapsed={collapsed}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  isPathActive={isPathActive}
                  isExactPathActive={isExactPathActive}
                />
              </ul>
            </div>
            
            {/* Settings */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                SETTINGS
              </h3>
              <ul className="space-y-1">
                <SidebarSection
                  title="Settings"
                  items={settingsItems}
                  sectionKey="settings"
                  icon={<Settings size={20} />}
                  collapsed={collapsed}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  isPathActive={isPathActive}
                  isExactPathActive={isExactPathActive}
                />
              </ul>
            </div>
          </nav>
        </div>
        
        <SidebarUserProfile collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default MainSidebar;
