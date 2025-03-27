
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarItemType } from "@/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
  level?: number;
  collapsed: boolean;
  isMobile: boolean;
  isActive: boolean;
  isExpanded: boolean;
  toggleSection: (sectionName: string) => void;
  renderMenuItem: (item: SidebarItemType, level?: number, parentExpanded?: boolean) => React.ReactNode;
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
            
            {(!collapsed || isMobile) && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-3"
              >
                {item.title}
              </motion.span>
            )}
            
            {item.badge && (!collapsed || isMobile) && (
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                {item.badge}
              </motion.span>
            )}
          </div>
          
          {hasSubItems && (!collapsed || isMobile) && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          )}
        </Link>
      </div>
      
      <AnimatePresence>
        {hasSubItems && isExpanded && (!collapsed || isMobile) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pl-2 mt-1 border-l border-sidebar-border ml-4"
          >
            {item.subItems.map((subItem) => renderMenuItem(subItem, level + 1, true))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItem;
