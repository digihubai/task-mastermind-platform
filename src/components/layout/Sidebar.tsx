
import React from "react";
import { ChevronLeft, ChevronRight, Users, ChevronDown, User } from "lucide-react";
import SidebarSection from "./SidebarSection";
import { sidebarSections } from "./SidebarData";
import { SidebarThemeSwitcher } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useSidebarControl } from "@/hooks/use-sidebar-control";
import { Link, useLocation } from "react-router-dom";

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
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedSections[item.title];
    const showItem = level === 0 || parentExpanded;
    
    if (!showItem) return null;
    
    // For collapsed sidebar with depth > 0, don't render nested items
    if (collapsed && !isMobile && level > 0) return null;
    
    return (
      <div key={item.href} className={`my-1 ${level > 0 ? `ml-${level * 3}` : ''}`}>
        <div className="relative">
          <Link
            to={item.href}
            className={`
              flex items-center ${hasSubItems ? 'justify-between' : ''} 
              rounded-md px-3 py-2 text-sm transition-colors
              ${isActive 
                ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }
              ${level > 0 ? 'text-sm' : ''}
              ${level > 1 ? 'text-xs' : ''}
            `}
            onClick={(e) => {
              if (hasSubItems) {
                e.preventDefault();
                toggleSection(item.title);
              }
            }}
          >
            <div className="flex items-center">
              {item.icon}
              {(!collapsed || isMobile) && <span className="ml-3">{item.title}</span>}
              {item.badge && (!collapsed || isMobile) && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            
            {hasSubItems && (!collapsed || isMobile) && (
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            )}
          </Link>
        </div>
        
        {hasSubItems && isExpanded && (!collapsed || isMobile) && (
          <div className="pl-2 mt-1 space-y-1 border-l border-sidebar-border ml-4">
            {item.subItems.map((subItem: any) => renderMenuItem(subItem, level + 1, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}
    
      <aside 
        className={`
          ${isMobile ? 'fixed left-0 top-0 bottom-0 z-30' : 'relative'}
          ${collapsed ? (isMobile ? '-translate-x-full' : 'w-16') : (isMobile ? 'w-72' : 'w-72')}
          h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col
          transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
        `}
      >
        <div className="p-4 flex justify-between items-center sticky top-0 bg-sidebar z-10 border-b border-sidebar-border">
          <div className={`overflow-hidden transition-opacity ${collapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">DigiHub AI</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {!collapsed && <SidebarThemeSwitcher />}
            
            <button 
              onClick={toggleSidebar}
              className={`
                rounded-full p-1.5 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80
                transition-colors duration-200 ${isMobile && collapsed ? 'hidden' : ''}
              `}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h2>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => renderMenuItem(item))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className={`flex items-center ${collapsed && !isMobile ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/10 flex items-center justify-center text-sidebar-primary">
              <Users size={18} />
            </div>
            {(!collapsed || isMobile) && (
              <div className="truncate">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@digihubai.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
