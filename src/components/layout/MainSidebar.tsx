
import React from "react";
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
  Tag
} from "lucide-react";

const MainSidebar = ({ collapsed = false, isMobile = false, toggleSidebar }) => {
  const location = useLocation();
  
  const userMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "AI Bots", path: "/bots", icon: <Bot size={20} /> },
    { name: "Documents", path: "/documents", icon: <FileText size={20} /> },
    { name: "AI Editor", path: "/editor", icon: <Edit size={20} /> },
    { name: "AI Copywriter", path: "/copywriter", icon: <PenTool size={20} /> },
    { name: "Chat Settings", path: "/chat-settings", icon: <MessageSquare size={20} /> },
    { name: "AI SEO Writer", path: "/seo-writer", icon: <Search size={20} /> },
    { name: "PDF Insight", path: "/pdf-insight", icon: <FileSpreadsheet size={20} /> },
    { name: "AI Vision", path: "/vision", icon: <Image size={20} /> },
    { name: "AI ReWriter", path: "/rewriter", icon: <RefreshCw size={20} /> },
    { name: "AI Chat", path: "/chat", icon: <MessageSquare size={20} /> },
    { name: "Brand Voice", path: "/brand-voice", icon: <PenTool size={20} /> },
    { name: "Affiliates", path: "/affiliates", icon: <Users size={20} /> },
    { name: "Support", path: "/support", icon: <MessageSquare size={20} /> },
    { name: "Integration", path: "/integration", icon: <FileCode size={20} /> },
    { name: "Links", path: "/links", icon: <Globe size={20} /> }
  ];
  
  const quickAccessItems = [
    { name: "Favorites", path: "/favorites", icon: <Heart size={20} /> },
    { name: "Workbook", path: "/workbook", icon: <Bookmark size={20} /> }
  ];
  
  const adminMenuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <BarChart2 size={20} /> },
    { name: "Marketplace", path: "/admin/marketplace", icon: <ShoppingBag size={20} /> },
    { name: "Themes", path: "/admin/themes", icon: <Palette size={20} /> },
    { name: "User Management", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Bell size={20} /> },
    { name: "Google Adsense", path: "/admin/adsense", icon: <DollarSign size={20} /> },
    { name: "Support Requests", path: "/admin/support-requests", icon: <MessageSquare size={20} /> },
    { name: "Templates", path: "/admin/templates", icon: <FileText size={20} /> },
    { name: "Chat Settings", path: "/admin/chat-settings", icon: <MessageSquare size={20} /> },
    { name: "Frontend", path: "/admin/frontend", icon: <Globe size={20} /> },
    { name: "Finance", path: "/admin/finance", icon: <CreditCard size={20} /> },
    { name: "Pages", path: "/admin/pages", icon: <FileText size={20} /> },
    { name: "Blog", path: "/admin/blog", icon: <Edit size={20} /> },
    { name: "Affiliates", path: "/admin/affiliates", icon: <Users size={20} /> },
    { name: "Coupons", path: "/admin/coupons", icon: <Tag size={20} /> },
    { name: "Email Templates", path: "/admin/email-templates", icon: <Mail size={20} /> },
    { name: "API Integration", path: "/admin/api-integration", icon: <FileCode size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    { name: "Site Health", path: "/admin/site-health", icon: <Activity size={20} /> },
    { name: "Credits", path: "/admin/credits", icon: <DollarSign size={20} /> }
  ];
  
  // Additional new modules from requirements
  const newModulesItems = [
    { name: "Project Management", path: "/project-management", icon: <FolderOpen size={20} /> },
    { name: "CRM", path: "/crm", icon: <Users size={20} /> },
    { name: "Chatbot", path: "/chatbot", icon: <MessageSquare size={20} /> },
    { name: "Marketing", path: "/marketing", icon: <Bell size={20} /> },
    { name: "Workflow", path: "/workflow", icon: <RefreshCw size={20} /> },
    { name: "Funnel Creator", path: "/funnel-creator", icon: <PenTool size={20} /> }
  ];
  
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.path} className="px-2">
        <Link
          to={item.path}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
            location.pathname === item.path
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary"
          }`}
        >
          {item.icon}
          {!collapsed && <span>{item.name}</span>}
        </Link>
      </li>
    ));
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
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                NEW MODULES
              </h3>
              <ul className="space-y-1">
                {renderMenuItems(newModulesItems)}
              </ul>
            </div>
            
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                USER
              </h3>
              <ul className="space-y-1">
                {renderMenuItems(userMenuItems)}
              </ul>
            </div>
            
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                QUICK ACCESS
              </h3>
              <ul className="space-y-1">
                {renderMenuItems(quickAccessItems)}
              </ul>
            </div>
            
            <div>
              <h3 className={`px-4 text-xs font-semibold text-muted-foreground mb-2 ${collapsed ? "sr-only" : ""}`}>
                ADMIN
              </h3>
              <ul className="space-y-1">
                {renderMenuItems(adminMenuItems)}
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
