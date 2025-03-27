
import React from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import SidebarSection from "./SidebarSection";
import { sidebarSections } from "./SidebarData";
import { SidebarThemeSwitcher } from "@/components/ui/sidebar";

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, toggleSidebar }) => {
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
          ${collapsed ? (isMobile ? '-translate-x-full' : 'w-16') : (isMobile ? 'w-64' : 'w-64')}
          h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col
          transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
        `}
      >
        <div className="p-4 flex justify-between items-center sticky top-0 bg-sidebar z-10 border-b border-sidebar-border">
          <div className={`overflow-hidden transition-opacity ${collapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="text-xl font-semibold text-modern-gradient">DigiHub AI</h1>
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
          {sidebarSections.map((section, index) => (
            <SidebarSection
              key={index}
              title={section.title}
              items={section.items}
              collapsed={collapsed}
              isMobile={isMobile}
            />
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
