
import React from "react";
import { ChevronDown } from "lucide-react";
import SidebarMenuItem from "./SidebarMenuItem";

interface SidebarSectionProps {
  title: string;
  items: Array<{
    name: string;
    path: string;
    icon: React.ReactNode;
    subItems?: any[];
  }>;
  sectionKey: string;
  icon?: React.ReactNode;
  collapsed: boolean;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  isPathActive: (path: string) => boolean;
  isExactPathActive: (path: string) => boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  sectionKey,
  icon,
  collapsed,
  expandedSections,
  toggleSection,
  isPathActive,
  isExactPathActive
}) => {
  const isExpanded = expandedSections[sectionKey];
  
  if (collapsed) {
    return (
      <li className="px-2">
        <a
          href={items[0].path}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
            items.some(item => isPathActive(item.path))
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary"
          }`}
        >
          {icon || items[0].icon}
        </a>
      </li>
    );
  }
  
  return (
    <div className="space-y-1">
      <div 
        className="flex items-center justify-between px-3 py-2 text-sm font-medium cursor-pointer hover:bg-secondary/50 rounded-md"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex items-center gap-3">
          {icon || items[0].icon}
          <span>{title}</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </div>
      
      {isExpanded && (
        <div className="pl-4 space-y-1 mt-1">
          {items.map((item) => (
            <SidebarMenuItem
              key={item.path}
              item={item}
              collapsed={collapsed}
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

export default SidebarSection;
