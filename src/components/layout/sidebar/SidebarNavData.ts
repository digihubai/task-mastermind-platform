
import {
  Bot, 
  MessageSquare, 
  Settings, 
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
  FolderOpen,
  BarChart2,
  Mail,
  FileCode,
  Home,
  Activity,
  Package,
  Target,
  Zap,
  Headphones,
  UserCheck
} from "lucide-react";
import React from "react";

// Dashboard menu items
export const userMenuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
];

// Marketing menu items
export const marketingItems = [
  { name: "Marketing Hub", path: "/marketing", icon: <Globe size={20} /> },
  { name: "Campaigns", path: "/marketing/campaigns", icon: <Target size={20} /> },
  { name: "Automation", path: "/marketing/automation", icon: <Zap size={20} /> },
  { name: "SEO", path: "/marketing/seo", icon: <Search size={20} />, 
    subItems: [
      { name: "SEO Tools", path: "/marketing/seo/tools", icon: <Globe size={18} /> },
      { name: "AI SEO Writer", path: "/marketing/seo/ai-writer", icon: <PenTool size={18} /> }
    ]
  },
  { name: "Email Marketing", path: "/marketing/email", icon: <Mail size={20} /> },
  { name: "Social Media", path: "/marketing/social", icon: <Bell size={20} /> },
  { name: "Analytics", path: "/marketing/analytics", icon: <BarChart2 size={20} /> },
];

// AI Tools items
export const aiToolsItems = [
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
export const moduleItems = [
  { name: "CRM", path: "/crm", icon: <Users size={20} /> },
  { name: "Project Management", path: "/project-management", icon: <FolderOpen size={20} /> },
  { name: "Workflow", path: "/workflow", icon: <Activity size={20} /> },
  { name: "Customer Support", path: "/support", icon: <Headphones size={20} /> },
  { name: "Finance", path: "/finance", icon: <DollarSign size={20} /> },
  { name: "HR", path: "/hr", icon: <UserCheck size={20} /> },
];

// Settings items
export const settingsItems = [
  { name: "Account Settings", path: "/settings/account", icon: <User size={20} /> },
  { name: "Tools Settings", path: "/settings/tools", icon: <Settings size={20} /> },
  { name: "Integrations", path: "/settings/integrations", icon: <FileCode size={20} /> },
  { name: "Notifications", path: "/settings/notifications", icon: <Bell size={20} /> },
];
