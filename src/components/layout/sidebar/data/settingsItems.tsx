
import React from "react";
import {
  User,
  Settings,
  FileCode,
  Bell,
  Headphones,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Settings menu items
export const settingsItems = [
  { name: "Account Settings", path: "/settings/account", icon: <User size={20} /> },
  { name: "Tools Settings", path: "/settings/tools", icon: <Settings size={20} /> },
  { name: "Integrations", path: "/settings/integrations", icon: <FileCode size={20} /> },
  { name: "Notifications", path: "/settings/notifications", icon: <Bell size={20} /> },
];

// Settings section for sidebar
export const settingsSection = {
  title: "Settings",
  items: [
    {
      title: "Account & Profile",
      href: "/settings/profile",
      icon: <User size={20} />,
    },
    {
      title: "Tool Settings",
      href: "/settings/tools",
      icon: <Settings size={20} />,
    },
    {
      title: "Integrations",
      href: "/settings/integrations",
      icon: <FileCode size={20} />,
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: <Bell size={20} />,
    },
    {
      title: "Support & Help",
      href: "/support/help",
      icon: <Headphones size={20} />,
    },
  ] as SidebarItemType[],
};
