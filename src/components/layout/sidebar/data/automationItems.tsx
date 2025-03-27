
import React from "react";
import {
  Activity,
  FileText,
  Settings,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Automation section for sidebar
export const automationSection = {
  title: "Automation",
  items: [
    {
      title: "Workflows",
      href: "/automation/workflows",
      icon: <Activity size={20} />,
    },
    {
      title: "Templates",
      href: "/automation/templates",
      icon: <FileText size={20} />,
    },
    {
      title: "Settings",
      href: "/automation/settings",
      icon: <Settings size={20} />,
    },
  ] as SidebarItemType[],
};
