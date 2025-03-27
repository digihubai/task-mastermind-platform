
import React from "react";
import {
  Users,
  FolderOpen,
  Activity,
  Headphones,
  Package,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
  Ticket,
  BarChart2,
  Calculator,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Module menu items
export const moduleItems = [
  { name: "CRM", path: "/crm", icon: <Users size={20} /> },
  { name: "Project Management", path: "/project-management", icon: <FolderOpen size={20} /> },
  { name: "Marketing", path: "/marketing", icon: <Activity size={20} /> },
  { name: "Customer Support", path: "/support", icon: <Headphones size={20} /> },
];

// Core modules section for sidebar (Department)
export const coreModulesSection = {
  title: "Department",
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
      title: "Marketing",
      href: "/marketing",
      icon: <Activity size={20} />,
      subItems: [
        {
          title: "SEO",
          href: "/marketing/seo",
          icon: <Activity size={18} />,
        },
        {
          title: "Email Marketing",
          href: "/marketing/email",
          icon: <Activity size={18} />,
        }
      ],
    },
    {
      title: "Customer Support",
      href: "/support",
      icon: <Headphones size={20} />,
      subItems: [
        {
          title: "Call Center",
          href: "/support/call-center",
          icon: <Phone size={18} />,
          subItems: [
            {
              title: "Inbound",
              href: "/support/call-center/inbound",
              icon: <PhoneIncoming size={16} />,
            },
            {
              title: "Outbound",
              href: "/support/call-center/outbound",
              icon: <PhoneOutgoing size={16} />,
            }
          ],
        },
        {
          title: "Omnichannel Support",
          href: "/support/omnichannel",
          icon: <MessageSquare size={18} />,
        },
        {
          title: "Tickets",
          href: "/support/tickets",
          icon: <Ticket size={18} />,
        }
      ],
    },
    {
      title: "Finance",
      href: "/finance",
      icon: <Calculator size={20} />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart2 size={20} />,
    }
  ] as SidebarItemType[],
};

// Modules section starter for the main sidebar
export const modulesStarter = {
  title: "Modules",
  icon: <Package size={20} />,
};

// Removing the redundant moduleSection - we'll use coreModulesSection instead
