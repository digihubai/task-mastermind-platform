
import React from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { SidebarThemeSwitcher } from "@/components/ui/sidebar";

interface SidebarLogoProps {
  collapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed, isMobile, toggleSidebar }) => {
  return (
    <div className="p-4 flex justify-between items-center sticky top-0 bg-sidebar z-10 border-b border-sidebar-border">
      <motion.div 
        initial={false}
        animate={{ 
          width: collapsed && !isMobile ? 0 : 'auto',
          opacity: collapsed && !isMobile ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          DigiHub AI
        </h1>
      </motion.div>
      
      <div className="flex items-center gap-1">
        {!collapsed && <SidebarThemeSwitcher />}
        
        <button 
          onClick={toggleSidebar}
          className="rounded-full p-1.5 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80
            transition-colors duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMobile ? 
            <Menu size={18} /> : 
            (collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)
          }
        </button>
      </div>
    </div>
  );
};

export default SidebarLogo;
