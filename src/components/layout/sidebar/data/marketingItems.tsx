
import React from "react";
import {
  Globe,
  Target,
  Zap,
  Search,
  Mail,
  Bell,
  BarChart2,
  PenTool,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Marketing menu items
export const marketingItems = [
  { name: "Marketing Hub", path: "/marketing", icon: <Globe size={20} /> },
  { name: "SEO", path: "/marketing/seo", icon: <Search size={20} /> },
  { name: "Email Marketing", path: "/marketing/email", icon: <Mail size={20} /> },
];

// Marketing section for sidebar
export const marketingSection = {
  title: "Department",
  items: [
    {
      title: "Marketing",
      href: "/marketing",
      icon: <Target size={20} />,
      subItems: [
        {
          title: "SEO",
          href: "/marketing/seo",
          icon: <Search size={18} />,
        },
        {
          title: "Email Marketing",
          href: "/marketing/email",
          icon: <Mail size={18} />,
        },
      ],
    },
  ] as SidebarItemType[],
};
