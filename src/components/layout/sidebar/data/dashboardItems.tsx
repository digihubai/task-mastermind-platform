
import React from "react";
import {
  Home,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Dashboard menu items
export const userMenuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
];

// Dashboard section for sidebar
export const dashboardSection = {
  title: "Main Navigation",
  items: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "AI Tools Hub",
      href: "/ai-tools",
      icon: <Bot size={20} />,
    },
  ] as SidebarItemType[],
};
