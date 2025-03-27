
import React from "react";
import {
  BarChart2,
  LineChart,
  Users,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Analytics section for sidebar
export const analyticsSection = {
  title: "Analytics",
  items: [
    {
      title: "Reports",
      href: "/analytics/reports",
      icon: <BarChart2 size={20} />,
    },
    {
      title: "Performance",
      href: "/analytics/performance",
      icon: <LineChart size={20} />,
    },
    {
      title: "Customer Insights",
      href: "/analytics/customer-insights",
      icon: <Users size={20} />,
    },
  ] as SidebarItemType[],
};
