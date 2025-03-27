
import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebarControl } from "@/hooks/use-sidebar-control";
import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarItem from "./sidebar/SidebarItem";
import SidebarMenuSection from "./sidebar/SidebarMenuSection";
import SidebarMobileOverlay from "./sidebar/SidebarMobileOverlay";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import SidebarResizeHandler from "./sidebar/SidebarResizeHandler";
import { sidebarSections } from "./sidebar/SidebarNavData";

// Constants for sidebar width
const DEFAULT_SIDEBAR_WIDTH = 272; // 17rem
const MIN_SIDEBAR_WIDTH = 240; // 15rem
const MAX_SIDEBAR_WIDTH = 384; // 24rem
const COLLAPSED_WIDTH = 64; // 4rem

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
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  
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
  
  // Handle sidebar resize
  const handleResize = useCallback((newWidth: number) => {
    setSidebarWidth(newWidth);
    // Store in local storage for persistence
    localStorage.setItem('sidebarWidth', newWidth.toString());
  }, []);
  
  // Load saved width from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      setSidebarWidth(Number(savedWidth));
    }
  }, []);
  
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

  const sidebarVariants = {
    expanded: (custom: { isMobile: boolean, width: number }) => ({
      width: custom.isMobile ? "18rem" : custom.width,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40
      }
    }),
    collapsed: {
      width: COLLAPSED_WIDTH,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay - Extracted to its own component */}
      <SidebarMobileOverlay 
        show={isMobile && !collapsed}
        onClick={toggleSidebar}
      />
    
      <motion.aside 
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        custom={{ isMobile, width: sidebarWidth }}
        className={`
          ${isMobile ? 'fixed left-0 top-0 bottom-0 z-30' : 'relative'}
          h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col
          overflow-y-auto overflow-x-hidden
        `}
      >
        {/* Logo and sidebar toggle */}
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
        
        {/* Resize handler */}
        {!isMobile && (
          <SidebarResizeHandler
            onResize={handleResize}
            minWidth={MIN_SIDEBAR_WIDTH}
            maxWidth={MAX_SIDEBAR_WIDTH}
            isCollapsed={collapsed}
          />
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
