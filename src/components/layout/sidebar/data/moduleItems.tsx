
import React from "react";
import {
  Users,
  FolderOpen,
  Activity,
  Headphones,
  DollarSign,
  UserCheck,
  ShoppingBag,
  Package,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Module menu items
export const moduleItems = [
  { name: "CRM", path: "/crm", icon: <Users size={20} /> },
  { name: "Project Management", path: "/project-management", icon: <FolderOpen size={20} /> },
  { name: "Workflow", path: "/workflow", icon: <Activity size={20} /> },
  { name: "Customer Support", path: "/support", icon: <Headphones size={20} /> },
  { name: "Finance", path: "/finance", icon: <DollarSign size={20} /> },
  { name: "HR", path: "/hr", icon: <UserCheck size={20} /> },
];

// Core modules section for sidebar
export const coreModulesSection = {
  title: "Core SaaS Modules",
  items: [
    {
      title: "CRM",
      href: "/crm",
      icon: <Users size={20} />,
      badge: "New",
    },
    {
      title: "Project Management",
      href: "/project-management",
      icon: <FolderOpen size={20} />,
    },
    {
      title: "Sales",
      href: "/sales",
      icon: <ShoppingBag size={20} />,
    },
    {
      title: "Customer Support",
      href: "/support",
      icon: <Headphones size={20} />,
    },
    {
      title: "Finance & Accounting",
      href: "/finance",
      icon: <DollarSign size={20} />,
    },
    {
      title: "HR & Recruitment",
      href: "/hr",
      icon: <UserCheck size={20} />,
    },
  ] as SidebarItemType[],
};

// Modules section starter for the main sidebar
export const modulesStarter = {
  title: "Modules",
  icon: <Package size={20} />,
};
