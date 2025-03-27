import {
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  Mail,
  Bell,
  Settings,
  FileText,
  Image,
  Video,
  CalendarDays,
  MessageCircle,
  Briefcase,
  ShoppingCart,
  UserPlus,
  Headphones,
  Globe,
  CreditCard,
  ListChecks,
  KanbanSquare,
  Building2,
  HelpCircle,
  Contact2,
  LucideIcon,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: string;
  children?: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
  },
  {
    title: "CRM",
    icon: "customers",
    href: "/customers",
    children: [
      {
        title: "Customers",
        href: "/customers",
      },
      {
        title: "Leads",
        href: "/leads",
      },
      {
        title: "Deals",
        href: "/deals",
      },
    ],
  },
  {
    title: "Communication",
    icon: "communication",
    children: [
      {
        title: "Chat",
        href: "/chat",
      },
      {
        title: "Team Chat",
        href: "/team-chat",
      },
      {
        title: "Messaging",
        href: "/messaging",
      },
      {
        title: "Email",
        href: "/email",
      },
      {
        title: "SMS",
        href: "/sms",
      },
    ],
  },
  {
    title: "Projects",
    icon: "projects",
    children: [
      {
        title: "Kanban Board",
        href: "/kanban",
      },
      {
        title: "Task List",
        href: "/tasks",
      },
      {
        title: "Gantt Chart",
        href: "/gantt",
      },
    ],
  },
  {
    title: "Support",
    icon: "support",
    children: [
      {
        title: "Tickets",
        href: "/support",
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
      },
      {
        title: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

export const ICON_MAP: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  customers: Users,
  communication: MessageSquare,
  projects: Briefcase,
  support: Headphones,
  settings: Settings,
};
