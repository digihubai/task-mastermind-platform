import React from "react";
import { SidebarSectionType } from "@/types/sidebar";

export const dashboardSection: SidebarSectionType = {
  title: "Dashboard",
  items: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <span className="material-icons">dashboard</span>,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: <span className="material-icons">assessment</span>,
    },
  ],
};

export const automationSection: SidebarSectionType = {
  title: "Automation",
  items: [
    {
      title: "Workflows",
      href: "/automation/workflows",
      icon: <span className="material-icons">settings_input_composite</span>,
    },
    {
      title: "Sequences",
      href: "/automation/sequences",
      icon: <span className="material-icons">format_list_numbered</span>,
    },
  ],
};

export const analyticsSection: SidebarSectionType = {
  title: "Analytics",
  items: [
    {
      title: "Dashboard",
      href: "/analytics",
      icon: <span className="material-icons">bar_chart</span>,
    },
    {
      title: "Reports",
      href: "/analytics/reports",
      icon: <span className="material-icons">analytics</span>,
    },
  ],
};

export const marketingSection: SidebarSectionType = {
  title: "Marketing",
  items: [
    {
      title: "Campaigns",
      href: "/marketing/campaigns",
      icon: <span className="material-icons">campaign</span>,
    },
    {
      title: "SEO",
      href: "/marketing/seo",
      icon: <span className="material-icons">search</span>,
    },
    {
      title: "Social Media",
      href: "/marketing/social",
      icon: <span className="material-icons">share</span>,
    },
  ],
};

export const aiToolsSection: SidebarSectionType = {
  title: "AI Tools",
  items: [
    {
      title: "AI Chat",
      href: "/ai/chat",
      icon: <span className="material-icons">chat</span>,
    },
    {
      title: "AI Vision",
      href: "/ai/vision",
      icon: <span className="material-icons">visibility</span>,
    },
    {
      title: "AI Assistant",
      href: "/ai/assistant",
      icon: <span className="material-icons">assistant</span>,
    },
  ],
};

export const coreModulesSection: SidebarSectionType = {
  title: "Core Modules",
  items: [
    {
      title: "CRM",
      href: "/crm",
      icon: <span className="material-icons">people</span>,
      subItems: [
        {
          title: "Customers",
          href: "/crm/customers",
          icon: <span className="material-icons">group</span>,
        },
        {
          title: "Sales Pipeline",
          href: "/crm/sales",
          icon: <span className="material-icons">analytics</span>,
        },
      ],
    },
    {
      title: "Support",
      href: "/support",
      icon: <span className="material-icons">support_agent</span>,
      subItems: [
        {
          title: "Call Center",
          href: "/support/call-center",
          icon: <span className="material-icons">call</span>,
        },
        {
          title: "Omnichannel Inbox",
          href: "/support/omnichannel",
          icon: <span className="material-icons">inbox</span>,
        },
        {
          title: "Support Tickets",
          href: "/support/tickets",
          icon: <span className="material-icons">confirmation_number</span>,
        },
      ],
    },
  ],
};

export const settingsSection: SidebarSectionType = {
  title: "Settings",
  items: [
    {
      title: "Profile",
      href: "/settings/profile",
      icon: <span className="material-icons">person</span>,
    },
    {
      title: "Security",
      href: "/settings/security",
      icon: <span className="material-icons">security</span>,
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: <span className="material-icons">notifications</span>,
    },
  ],
};
