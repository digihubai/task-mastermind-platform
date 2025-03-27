
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarThemeSwitcher } from "@/components/ui/sidebar";

interface SidebarLogoProps {
  collapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed, isMobile, toggleSidebar }) => {
  return (
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
  );
};

export default SidebarLogo;
