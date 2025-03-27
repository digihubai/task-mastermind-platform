
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { SidebarSectionType, SidebarItemType } from "@/types/sidebar";

interface SidebarMenuItemProps {
  section?: SidebarSectionType;
  item?: {
    name: string;
    path: string;
    icon: React.ReactNode;
    subItems?: SidebarMenuItemProps['item'][];
  };
  pathname?: string;
  collapsed?: boolean;
  level?: number;
  isPathActive?: (path: string) => boolean;
  isExactPathActive?: (path: string) => boolean;
  expandedSections?: Record<string, boolean>;
  toggleSection?: (section: string) => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  section,
  item,
  pathname = "",
  collapsed = false,
  level = 0,
  isPathActive = () => false,
  isExactPathActive = () => false,
  expandedSections = {},
  toggleSection = () => {}
}) => {
  // If we're rendering based on a section (from SidebarNavData)
  if (section) {
    const items = section.items.map(sectionItem => ({
      name: sectionItem.title,
      path: sectionItem.href,
      icon: sectionItem.icon,
      subItems: sectionItem.subItems?.map(subItem => ({
        name: subItem.title,
        path: subItem.href,
        icon: subItem.icon,
        subItems: subItem.subItems?.map(nestedSubItem => ({
          name: nestedSubItem.title,
          path: nestedSubItem.href,
          icon: nestedSubItem.icon
        }))
      }))
    }));
    
    return (
      <div className="space-y-1">
        {items.map(navItem => (
          <SidebarMenuItem
            key={navItem.path}
            item={navItem}
            pathname={pathname}
            collapsed={collapsed}
            level={level}
            isPathActive={isPathActive}
            isExactPathActive={isExactPathActive}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        ))}
      </div>
    );
  }

  // If we're rendering an individual item
  if (!item) return null;
  
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = hasSubItems && expandedSections[item.name];
  
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
