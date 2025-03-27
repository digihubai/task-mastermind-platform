
import React from "react";
import { User } from "lucide-react";

interface SidebarUserProfileProps {
  collapsed: boolean;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ collapsed }) => {
  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User size={16} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarUserProfile;
