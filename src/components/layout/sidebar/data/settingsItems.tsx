
import React from "react";
import {
  Settings,
  Users,
  CreditCard,
  Bell,
  Globe,
  Lock,
  Palette,
  UserCog,
  Bot,
  PlugZap,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// Settings menu items
export const settingsItems = [
  { name: "General Settings", path: "/settings", icon: <Settings size={20} /> },
  { name: "Teams", path: "/settings/teams", icon: <Users size={20} /> },
  { name: "Billing", path: "/settings/billing", icon: <CreditCard size={20} /> },
  { name: "Notifications", path: "/settings/notifications", icon: <Bell size={20} /> },
  { name: "Integrations", path: "/settings/integrations", icon: <PlugZap size={20} /> },
  { name: "Language", path: "/settings/language", icon: <Globe size={20} /> },
  { name: "Security", path: "/settings/security", icon: <Lock size={20} /> },
  { name: "Appearance", path: "/settings/appearance", icon: <Palette size={20} /> },
  { name: "API Settings", path: "/settings/api", icon: <Bot size={20} /> },
  { name: "AI Configuration", path: "/settings/ai-configuration", icon: <Bot size={20} /> },
];

// Settings section for sidebar
export const settingsSection = {
  title: "Settings",
  items: [
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
      subItems: [
        {
          title: "General",
          href: "/settings/general",
          icon: <Settings size={18} />,
        },
        {
          title: "Profile",
          href: "/settings/profile",
          icon: <UserCog size={18} />,
        },
        {
          title: "Teams",
          href: "/settings/teams",
          icon: <Users size={18} />,
        },
        {
          title: "Billing",
          href: "/settings/billing",
          icon: <CreditCard size={18} />,
        },
        {
          title: "Notifications",
          href: "/settings/notifications",
          icon: <Bell size={18} />,
        },
        {
          title: "Integrations",
          href: "/settings/integrations",
          icon: <PlugZap size={18} />,
        },
        {
          title: "Language",
          href: "/settings/language",
          icon: <Globe size={18} />,
        },
        {
          title: "Security",
          href: "/settings/security",
          icon: <Lock size={18} />,
        },
        {
          title: "Appearance",
          href: "/settings/appearance",
          icon: <Palette size={18} />,
        },
        {
          title: "AI Configuration",
          href: "/settings/ai-configuration",
          icon: <Bot size={18} />,
        },
      ],
    },
  ] as SidebarItemType[],
};
