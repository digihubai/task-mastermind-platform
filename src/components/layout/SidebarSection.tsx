
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  isMobile: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  path, 
  icon: Icon, 
  label, 
  collapsed, 
  isMobile 
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/";
  };

  const active = isActive(path);
  
  return (
    <li>
      <Link
        to={path}
        className={`
          flex items-center px-3 py-2 rounded-md text-sm
          group transition-all duration-200
          ${active 
            ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium' 
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          }
        `}
      >
        <Icon size={20} className={`${collapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
        {(!collapsed || isMobile) && <span>{label}</span>}
      </Link>
    </li>
  );
};

interface SidebarSectionProps {
  title: string;
  items: Array<{
    path: string;
    icon: LucideIcon;
    label: string;
  }>;
  collapsed: boolean;
  isMobile: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  items, 
  collapsed, 
  isMobile 
}) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </h2>
      )}
      
      <ul className="space-y-1">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            path={item.path}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarSection;
