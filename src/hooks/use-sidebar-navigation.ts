
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sidebarSections } from "@/components/layout/sidebar/SidebarNavData";
import { SidebarItemType, SidebarSectionType } from "@/types/sidebar";

export function useSidebarNavigation() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Initialize expanded sections based on current route
  useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};
    
    // Auto-expand sections based on the current path
    sidebarSections.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems && isPathActive(item.href)) {
          newExpandedSections[item.title] = true;
          
          // Also expand nested subsections
          item.subItems.forEach(subItem => {
            if (subItem.subItems && isPathActive(subItem.href)) {
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
  const toggleSection = useCallback((sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  }, []);
  
  // Check if a path is active (starts with the given path)
  const isPathActive = useCallback((path: string) => {
    return location.pathname.startsWith(path);
  }, [location.pathname]);
  
  // Check if a path is exactly active
  const isExactPathActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);
  
  // Get navigation data
  const getNavigationData = useCallback((): SidebarSectionType[] => {
    return sidebarSections;
  }, []);
  
  return {
    expandedSections,
    toggleSection,
    isPathActive,
    isExactPathActive,
    getNavigationData
  };
}
