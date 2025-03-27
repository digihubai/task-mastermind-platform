
import React from "react";

interface SidebarMenuSectionProps {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}

const SidebarMenuSection: React.FC<SidebarMenuSectionProps> = ({ 
  title, 
  collapsed, 
  children 
}) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </h2>
      )}
      
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarMenuSection;
