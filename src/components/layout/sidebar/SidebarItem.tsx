
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface SidebarItemProps {
  item: {
    title: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
    subItems?: SidebarItemProps['item'][];
  };
  level?: number;
  collapsed: boolean;
  isMobile: boolean;
  isActive: boolean;
  isExpanded: boolean;
  toggleSection: (sectionName: string) => void;
  renderMenuItem: (item: SidebarItemProps['item'], level?: number, parentExpanded?: boolean) => React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  level = 0,
  collapsed,
  isMobile,
  isActive,
  isExpanded,
  toggleSection,
  renderMenuItem
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  
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
          {item.subItems.map((subItem) => renderMenuItem(subItem, level + 1, true))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
