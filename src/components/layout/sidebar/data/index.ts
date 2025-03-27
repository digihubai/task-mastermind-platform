
import { SidebarSectionType } from "@/types/sidebar";

export const dashboardSection: SidebarSectionType = {
  title: "Dashboard",
  items: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: "assessment",
    },
  ],
};

export const automationSection: SidebarSectionType = {
  title: "Automation",
  items: [
    {
      title: "Workflows",
      href: "/automation/workflows",
      icon: "settings_input_composite",
    },
    {
      title: "Sequences",
      href: "/automation/sequences",
      icon: "format_list_numbered",
    },
  ],
};

export const analyticsSection: SidebarSectionType = {
  title: "Analytics",
  items: [
    {
      title: "Dashboard",
      href: "/analytics",
      icon: "bar_chart",
    },
    {
      title: "Reports",
      href: "/analytics/reports",
      icon: "analytics",
    },
  ],
};

export const marketingSection: SidebarSectionType = {
  title: "Marketing",
  items: [
    {
      title: "Campaigns",
      href: "/marketing/campaigns",
      icon: "campaign",
    },
    {
      title: "SEO",
      href: "/marketing/seo",
      icon: "search",
    },
    {
      title: "Social Media",
      href: "/marketing/social",
      icon: "share",
    },
  ],
};

export const aiToolsSection: SidebarSectionType = {
  title: "AI Tools",
  items: [
    {
      title: "AI Chat",
      href: "/ai/chat",
      icon: "chat",
    },
    {
      title: "AI Vision",
      href: "/ai/vision",
      icon: "visibility",
    },
    {
      title: "AI Assistant",
      href: "/ai/assistant",
      icon: "assistant",
    },
  ],
};

export const coreModulesSection: SidebarSectionType = {
  title: "Core Modules",
  items: [
    {
      title: "CRM",
      href: "/crm",
      icon: "people",
      subItems: [
        {
          title: "Customers",
          href: "/crm/customers",
          icon: "group",
        },
        {
          title: "Sales Pipeline",
          href: "/crm/sales",
          icon: "analytics",
        },
      ],
    },
    {
      title: "Support",
      href: "/support",
      icon: "support_agent",
      subItems: [
        {
          title: "Call Center",
          href: "/support/call-center",
          icon: "call",
        },
        {
          title: "Omnichannel Inbox",
          href: "/support/omnichannel",
          icon: "inbox",
        },
        {
          title: "Support Tickets",
          href: "/support/tickets",
          icon: "confirmation_number",
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
      icon: "person",
    },
    {
      title: "Security",
      href: "/settings/security",
      icon: "security",
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: "notifications",
    },
  ],
};
