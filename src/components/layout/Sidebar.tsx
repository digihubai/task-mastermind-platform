
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import { useSidebarControl } from "@/hooks/use-sidebar-control";
import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarItem from "./sidebar/SidebarItem";
import SidebarMenuSection from "./sidebar/SidebarMenuSection";
import SidebarMobileOverlay from "./sidebar/SidebarMobileOverlay";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import { sidebarSections } from "./sidebar/SidebarNavData";

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, toggleSidebar }) => {
  // Access more sidebar controls for potential future enhancements
  const { theme } = useSidebarControl();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Initialize expanded sections based on current route
  useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};
    
    // Auto-expand sections based on the current path
    sidebarSections.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems && location.pathname.startsWith(item.href)) {
          newExpandedSections[item.title] = true;
          
          // Also expand nested subsections
          item.subItems.forEach(subItem => {
            if (subItem.subItems && location.pathname.startsWith(subItem.href)) {
              newExpandedSections[subItem.title] = true;
            }
          });
        }
      });
    });
    
    setExpandedSections(prev => ({
      ...prev,
      ...newExpandedSections
    }));
  }, [location.pathname]);
  
  // Toggle section expansion
  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isMobile && !collapsed) {
      const handleClickOutside = (e: MouseEvent) => {
        // Close if clicking outside the sidebar
        const sidebarElement = document.querySelector('aside');
        if (sidebarElement && !sidebarElement.contains(e.target as Node)) {
          toggleSidebar();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, collapsed, toggleSidebar]);

  // Render nested menu items
  const renderMenuItem = (item: any, level = 0, parentExpanded = true) => {
    const isActive = location.pathname === item.href;
    const isExpanded = expandedSections[item.title];
    const showItem = level === 0 || parentExpanded;
    
    if (!showItem) return null;
    
    // For collapsed sidebar with depth > 0, don't render nested items
    if (collapsed && !isMobile && level > 0) return null;
    
    return (
      <SidebarItem 
        key={item.href}
        item={item}
        level={level}
        collapsed={collapsed}
        isMobile={isMobile}
        isActive={isActive}
        isExpanded={isExpanded}
        toggleSection={toggleSection}
        renderMenuItem={renderMenuItem}
      />
    );
  };

  return (
    <>
      {/* Mobile Overlay - Extracted to its own component */}
      <SidebarMobileOverlay 
        show={isMobile && !collapsed}
        onClick={toggleSidebar}
      />
    
      <aside 
        className={`
          ${isMobile ? 'fixed left-0 top-0 bottom-0 z-30' : 'relative'}
          ${collapsed ? (isMobile ? '-translate-x-full' : 'w-16') : (isMobile ? 'w-72' : 'w-72')}
          h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col
          transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
        `}
      >
        {/* Logo and sidebar toggle - Extracted to its own component */}
        <SidebarLogo 
          collapsed={collapsed}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {sidebarSections.map((section) => (
            <SidebarMenuSection 
              key={section.title} 
              title={section.title}
              collapsed={collapsed}
            >
              {section.items.map((item) => renderMenuItem(item))}
            </SidebarMenuSection>
          ))}
        </nav>
        
        <SidebarUserProfile collapsed={collapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
