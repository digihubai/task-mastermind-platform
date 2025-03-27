
import React from "react";
import {
  Activity,
  Mail,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Automation section for sidebar
export const automationSection = {
  title: "Automation",
  items: [
    {
      title: "Workflows",
      href: "/workflow",
      icon: <Activity size={20} />,
    },
    {
      title: "Email Marketing",
      href: "/marketing/email",
      icon: <Mail size={20} />,
    },
  ] as SidebarItemType[],
};
