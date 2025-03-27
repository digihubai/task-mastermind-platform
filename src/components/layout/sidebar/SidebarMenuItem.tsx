
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface SidebarMenuItemProps {
  item: {
    name: string;
    path: string;
    icon: React.ReactNode;
    subItems?: SidebarMenuItemProps['item'][];
  };
  collapsed: boolean;
  level?: number;
  isPathActive: (path: string) => boolean;
  isExactPathActive: (path: string) => boolean;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  collapsed,
  level = 0,
  isPathActive,
  isExactPathActive,
  expandedSections,
  toggleSection
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedSections[item.name];
  
  if (collapsed && level > 0) return null;

  return (
    <div key={item.path}>
      <Link
        to={item.path}
        className={`flex items-center ${hasSubItems ? 'justify-between' : ''} gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
          isExactPathActive(item.path)
            ? "bg-primary text-primary-foreground"
            : "hover:bg-secondary"
        }`}
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault();
            toggleSection(item.name);
          }
        }}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          {!collapsed && <span>{item.name}</span>}
        </div>
        
        {hasSubItems && !collapsed && (
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        )}
      </Link>
      
      {hasSubItems && isExpanded && !collapsed && (
        <div className="pl-6 mt-1 border-l border-border space-y-1">
          {item.subItems.map(subItem => (
            <SidebarMenuItem
              key={subItem.path}
              item={subItem}
              collapsed={collapsed}
              level={level + 1}
              isPathActive={isPathActive}
              isExactPathActive={isExactPathActive}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenuItem;
