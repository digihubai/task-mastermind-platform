
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users,
  Briefcase,
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Bot,
  Mail,
  LucideIcon
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, toggleSidebar }) => {
  const location = useLocation();
  
  const sidebarSections: SidebarSection[] = [
    {
      title: "Core",
      items: [
        { path: "/", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/chat", icon: MessageSquare, label: "Chat" },
        { path: "/projects", icon: Briefcase, label: "Projects" },
        { path: "/customers", icon: Users, label: "Customers" },
      ]
    },
    {
      title: "Features",
      items: [
        { path: "/chatbot", icon: Bot, label: "Chatbot" },
        { path: "/marketing", icon: Mail, label: "Marketing" },
        { path: "/analytics", icon: BarChart3, label: "Analytics" },
      ]
    },
    {
      title: "System",
      items: [
        { path: "/settings", icon: Settings, label: "Settings" },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}
    
      <aside 
        className={`
          ${isMobile ? 'fixed left-0 top-0 bottom-0 z-30' : 'relative'}
          ${collapsed ? (isMobile ? '-translate-x-full' : 'w-16') : (isMobile ? 'w-64' : 'w-64')}
          h-full bg-white dark:bg-sidebar border-r border-border flex flex-col
          transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
        `}
      >
        <div className="p-4 flex justify-between items-center sticky top-0 bg-white dark:bg-sidebar z-10">
          <div className={`overflow-hidden transition-opacity ${collapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="text-xl font-semibold">DigiHub AI</h1>
          </div>
          
          <button 
            onClick={toggleSidebar}
            className={`
              rounded-full p-1.5 bg-secondary/50 text-foreground hover:bg-secondary
              transition-colors duration-200 ${isMobile && collapsed ? 'hidden' : ''}
            `}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          {sidebarSections.map((section, index) => (
            <div key={index} className="mb-6">
              {!collapsed && (
                <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h2>
              )}
              
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <li key={itemIndex}>
                      <Link
                        to={item.path}
                        className={`
                          flex items-center px-3 py-2 rounded-md text-sm
                          group transition-all duration-200 hover-lift
                          ${active 
                            ? 'bg-primary text-primary-foreground font-medium' 
                            : 'text-foreground hover:bg-secondary'
                          }
                        `}
                      >
                        <Icon size={20} className={`${collapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
                        {(!collapsed || isMobile) && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className={`flex items-center ${collapsed && !isMobile ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users size={18} />
            </div>
            {(!collapsed || isMobile) && (
              <div className="truncate">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@digihubai.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
