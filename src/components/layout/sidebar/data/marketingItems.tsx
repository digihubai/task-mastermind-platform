
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

// Marketing section for sidebar
export const marketingSection = {
  title: "Core SaaS Modules",
  items: [
    {
      title: "Marketing",
      href: "/marketing",
      icon: <Target size={20} />,
      subItems: [
        {
          title: "Campaigns",
          href: "/marketing/campaigns",
          icon: <Target size={18} />,
        },
        {
          title: "Automation",
          href: "/marketing/automation",
          icon: <Zap size={18} />,
        },
        {
          title: "SEO",
          href: "/marketing/seo",
          icon: <Search size={18} />,
          subItems: [
            {
              title: "SEO Tools",
              href: "/marketing/seo/tools",
              icon: <Search size={16} />,
            },
            {
              title: "AI SEO Writer",
              href: "/marketing/seo/ai-writer",
              icon: <PenTool size={16} />,
            },
          ],
        },
        {
          title: "Email Marketing",
          href: "/marketing/email",
          icon: <Mail size={18} />,
        },
        {
          title: "Social Media",
          href: "/marketing/social",
          icon: <Bell size={18} />,
        },
        {
          title: "Analytics",
          href: "/marketing/analytics",
          icon: <BarChart2 size={18} />,
        },
      ],
    },
  ] as SidebarItemType[],
};
