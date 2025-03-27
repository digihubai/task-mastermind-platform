
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bot, 
  MessageSquare, 
  Settings, 
  PlusCircle,
  FileText,
  Edit,
  PenTool,
  Search,
  FileSpreadsheet,
  Image,
  RefreshCw,
  User,
  Users,
  ShoppingBag,
  Bell,
  Globe,
  DollarSign,
  Heart,
  Bookmark,
  FolderOpen,
  BarChart2,
  Package,
  Palette,
  Mail,
  FileCode,
  Home,
  CreditCard,
  Tag,
  ChevronRight,
  ChevronLeft,
  Activity,
  ExternalLink,
  Target,
  Zap,
  Calendar,
  ChevronDown,
  Headphones,
  UserCheck
} from "lucide-react";

const MainSidebar = ({ collapsed = false, isMobile = false, toggleSidebar }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    marketing: false,
    crm: false,
    projects: false,
    settings: false,
    ai: false
  });
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Check if current path starts with a given path
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };
  
  // Check if exactly the path is active
  const isExactPathActive = (path) => {
    return location.pathname === path;
  };
  
  // Auto-expand sections based on current route
  React.useEffect(() => {
    if (isPathActive('/marketing')) {
      setExpandedSections(prev => ({ ...prev, marketing: true }));
    }
    if (isPathActive('/crm')) {
      setExpandedSections(prev => ({ ...prev, crm: true }));
    }
    if (isPathActive('/project-management')) {
      setExpandedSections(prev => ({ ...prev, projects: true }));
    }
    if (isPathActive('/settings')) {
      setExpandedSections(prev => ({ ...prev, settings: true }));
    }
    if (isPathActive('/ai-') || isPathActive('/bots') || isPathActive('/vision') || 
        isPathActive('/copywriter') || isPathActive('/seo-writer') || 
        isPathActive('/chat') || isPathActive('/rewriter')) {
      setExpandedSections(prev => ({ ...prev, ai: true }));
    }
  }, [location.pathname]);
  
  // Basic menu items
  const userMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  ];
  
  // Marketing menu items
  const marketingItems = [
    { name: "Marketing Hub", path: "/marketing", icon: <Globe size={20} /> },
    { name: "Campaigns", path: "/marketing/campaigns", icon: <Target size={20} /> },
    { name: "Automation", path: "/marketing/automation", icon: <Zap size={20} /> },
    { name: "SEO", path: "/marketing/seo", icon: <Search size={20} />, 
      subItems: [
        { name: "SEO Tools", path: "/marketing/seo/tools", icon: <Globe size={18} /> },
        { name: "AI SEO Writer", path: "/marketing/seo/ai-writer", icon: <Edit size={18} /> }
      ]
    },
    { name: "Email Marketing", path: "/marketing/email", icon: <Mail size={20} /> },
    { name: "Social Media", path: "/marketing/social", icon: <Bell size={20} /> },
    { name: "Analytics", path: "/marketing/analytics", icon: <BarChart2 size={20} /> },
  ];
  
  // AI Tools items
  const aiToolsItems = [
    { name: "AI Tools Hub", path: "/ai-tools", icon: <Bot size={20} /> },
    { name: "AI Bots", path: "/bots", icon: <Bot size={20} /> },
    { name: "AI Chat", path: "/chat", icon: <MessageSquare size={20} /> },
    { name: "AI Vision", path: "/vision", icon: <Image size={20} /> },
    { name: "AI Copywriter", path: "/copywriter", icon: <PenTool size={20} /> },
    { name: "AI SEO Writer", path: "/seo-writer", icon: <Search size={20} /> },
    { name: "AI ReWriter", path: "/rewriter", icon: <RefreshCw size={20} /> },
    { name: "PDF Insight", path: "/pdf-insight", icon: <FileSpreadsheet size={20} /> },
  ];
  
  // Additional modules
  const moduleItems = [
    { name: "CRM", path: "/crm", icon: <Users size={20} /> },
    { name: "Project Management", path: "/project-management", icon: <FolderOpen size={20} /> },
    { name: "Workflow", path: "/workflow", icon: <Activity size={20} /> },
    { name: "Customer Support", path: "/support", icon: <Headphones size={20} /> },
    { name: "Finance", path: "/finance", icon: <DollarSign size={20} /> },
    { name: "HR", path: "/hr", icon: <UserCheck size={20} /> },
  ];
  
  // Settings items
  const settingsItems = [
    { name: "Account Settings", path: "/settings/account", icon: <User size={20} /> },
    { name: "Tools Settings", path: "/settings/tools", icon: <Settings size={20} /> },
    { name: "Integrations", path: "/settings/integrations", icon: <FileCode size={20} /> },
    { name: "Notifications", path: "/settings/notifications", icon: <Bell size={20} /> },
  ];
  
  // Render a section with collapsible header
  const renderSection = (title, items, sectionKey, icon) => {
    const isExpanded = expandedSections[sectionKey];
    
    if (collapsed) {
      return (
        <li className="px-2">
          <Link
            to={items[0].path}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              items.some(item => isPathActive(item.path))
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            {icon || items[0].icon}
          </Link>
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
        
        {isExpanded && renderNestedItems(items)}
      </div>
    );
  };
  
  // Render nested items (potentially with further nesting)
  const renderNestedItems = (items, level = 0) => {
    return (
      <div className={`pl-${level > 0 ? 4 : 4} space-y-1 ${level > 0 ? 'mt-1' : 'mt-1'}`}>
        {items.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isExactPathActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
            
            {item.subItems && isPathActive(item.path) && (
              <div className="pl-6 mt-1 border-l border-border space-y-1">
                {item.subItems.map(subItem => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors ${
                      isExactPathActive(subItem.path)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-card border-r border-border transition-all duration-300 ease-in-out h-full flex flex-col ${
        isMobile ? "fixed left-0 top-14 z-50" : ""
      } ${isMobile && !collapsed ? "shadow-lg" : ""}`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && <h2 className="text-lg font-semibold">DigiHub AI</h2>}
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-4">
            {/* Dashboard */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                DASHBOARD
              </h3>
              <ul className="space-y-1">
                {userMenuItems.map((item) => (
                  <li key={item.path} className="px-2">
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        isExactPathActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {item.icon}
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Core Modules */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                CORE MODULES
              </h3>
              <ul className="space-y-1">
                {/* Modules */}
                {renderSection("Modules", moduleItems, "modules", <Package size={20} />)}
                
                {/* Marketing with nested structure */}
                {renderSection("Marketing", marketingItems, "marketing", <Target size={20} />)}
              </ul>
            </div>
            
            {/* AI Tools */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                AI TOOLS
              </h3>
              <ul className="space-y-1">
                {renderSection("AI Tools", aiToolsItems, "ai", <Bot size={20} />)}
              </ul>
            </div>
            
            {/* Settings */}
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                SETTINGS
              </h3>
              <ul className="space-y-1">
                {renderSection("Settings", settingsItems, "settings", <Settings size={20} />)}
              </ul>
            </div>
          </nav>
        </div>
        
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
      </div>
    </aside>
  );
};

export default MainSidebar;
