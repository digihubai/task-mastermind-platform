
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { useSidebarControl } from "@/hooks/use-sidebar-control";

interface SidebarToggleButtonProps {
  variant?: "icon" | "text" | "both";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A reusable button component that can be placed anywhere in the app
 * to control the sidebar state.
 */
export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  variant = "icon",
  size = "md",
  className = "",
}) => {
  const { state, toggleSidebar, isMobile } = useSidebarControl();
  
  const isCollapsed = state === "collapsed";
  
  // Size mappings
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };
  
  // Define icon size based on button size
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;
  
  return (
    <Button
      variant="ghost"
      className={`${sizeClasses[size]} ${className}`}
      onClick={toggleSidebar}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {variant === "icon" || variant === "both" ? (
        isMobile ? (
          <Menu size={iconSize} />
        ) : isCollapsed ? (
          <PanelLeft size={iconSize} />
        ) : (
          <PanelLeftClose size={iconSize} />
        )
      ) : null}
      
      {variant === "text" || variant === "both" ? (
        <span className={variant === "both" ? "ml-2" : ""}>
          {isCollapsed ? "Expand" : "Collapse"}
        </span>
      ) : null}
    </Button>
  );
};

export default SidebarToggleButton;
