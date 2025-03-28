
import React from "react";
import {
  BarChart2,
  LineChart,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Analytics section for sidebar
export const analyticsSection = {
  title: "Analytics",
  items: [
    {
      title: "Reports",
      href: "/analytics/reports",
      icon: <FileText size={20} />,
      subItems: [
        {
          title: "Revenue Reports",
          href: "/analytics/reports/revenue",
          icon: <FileText size={18} />,
        },
        {
          title: "Lead Analytics",
          href: "/analytics/reports/leads",
          icon: <FileText size={18} />,
        },
        {
          title: "Campaign Performance",
          href: "/analytics/reports/campaigns",
          icon: <FileText size={18} />,
        },
      ],
    },
    {
      title: "Performance",
      href: "/analytics/performance",
      icon: <TrendingUp size={20} />,
      subItems: [
        {
          title: "Real-time Metrics",
          href: "/analytics/performance/realtime",
          icon: <LineChart size={18} />,
        },
        {
          title: "Site Performance",
          href: "/analytics/performance/site",
          icon: <LineChart size={18} />,
        },
      ],
    },
    {
      title: "Customer Insights",
      href: "/analytics/customer-insights",
      icon: <Users size={20} />,
      subItems: [
        {
          title: "Segmentation",
          href: "/analytics/customer-insights/segmentation",
          icon: <Users size={18} />,
        },
        {
          title: "Feedback Analysis",
          href: "/analytics/customer-insights/feedback",
          icon: <Users size={18} />,
        },
        {
          title: "Journey Maps",
          href: "/analytics/customer-insights/journey",
          icon: <Users size={18} />,
        },
      ],
    },
  ] as SidebarItemType[],
};
