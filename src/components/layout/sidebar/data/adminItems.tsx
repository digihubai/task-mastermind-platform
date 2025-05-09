
import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Bell,
  Globe,
  MessageSquare,
  FileText,
  Settings,
  Activity,
  DollarSign,
  Sparkles,
  Shield,
  FileCode,
  BookOpen,
  Share2,
  Tag,
  Mail,
  FileJson
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Admin menu items for sidebar
export const adminItems = [
  { name: "Admin Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "User Management", path: "/admin/user-management", icon: <Users size={20} /> },
  { name: "AI Settings", path: "/admin/ai-settings", icon: <Sparkles size={20} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  { name: "Site Health", path: "/admin/site-health", icon: <Activity size={20} /> },
];

// Admin section for sidebar
export const adminSection = {
  title: "Admin",
  items: [
    {
      title: "Admin",
      href: "/admin",
      icon: <Shield size={20} />,
      subItems: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: <LayoutDashboard size={18} />,
        },
        {
          title: "User Management",
          href: "/admin/user-management",
          icon: <Users size={18} />,
        },
        {
          title: "AI Settings",
          href: "/admin/ai-settings",
          icon: <Sparkles size={18} className="text-purple-500" />,
        },
        {
          title: "Marketplace",
          href: "/admin/marketplace",
          icon: <ShoppingBag size={18} />,
        },
        {
          title: "Frontend",
          href: "/admin/frontend",
          icon: <Globe size={18} />,
        },
        {
          title: "Chat Settings",
          href: "/admin/chat-settings",
          icon: <MessageSquare size={18} />,
        },
        {
          title: "Templates",
          href: "/admin/templates",
          icon: <FileText size={18} />,
        },
        {
          title: "Finance",
          href: "/admin/finance",
          icon: <DollarSign size={18} />,
        },
        {
          title: "Pages",
          href: "/admin/pages",
          icon: <FileCode size={18} />,
        },
        {
          title: "Blog",
          href: "/admin/blog",
          icon: <BookOpen size={18} />,
        },
        {
          title: "Affiliates",
          href: "/admin/affiliates",
          icon: <Share2 size={18} />,
        },
        {
          title: "Coupons",
          href: "/admin/coupons",
          icon: <Tag size={18} />,
        },
        {
          title: "Email Templates",
          href: "/admin/email-templates",
          icon: <Mail size={18} />,
        },
        {
          title: "API Integration",
          href: "/admin/api-integration",
          icon: <FileJson size={18} />,
        },
        {
          title: "Settings",
          href: "/admin/settings",
          icon: <Settings size={18} />,
        },
        {
          title: "Site Health",
          href: "/admin/site-health",
          icon: <Activity size={18} />,
        },
      ],
    },
  ] as SidebarItemType[],
};

export default adminSection;
