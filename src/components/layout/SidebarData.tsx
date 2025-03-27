
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
  Hash,
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
        icon: "customers",
      },
      {
        title: "Leads",
        href: "/leads",
        icon: "customers",
      },
      {
        title: "Deals",
        href: "/deals",
        icon: "customers",
      },
    ],
  },
  {
    title: "Communication",
    icon: "communication",
    href: "/communication",
    children: [
      {
        title: "Chat",
        href: "/chat",
        icon: "communication",
      },
      {
        title: "Team Chat",
        href: "/team-chat",
        icon: "communication",
      },
      {
        title: "Messaging",
        href: "/messaging",
        icon: "communication",
      },
      {
        title: "Email",
        href: "/email",
        icon: "communication",
      },
      {
        title: "SMS",
        href: "/sms",
        icon: "communication",
      },
    ],
  },
  {
    title: "Projects",
    icon: "projects",
    href: "/projects",
    children: [
      {
        title: "Kanban Board",
        href: "/kanban",
        icon: "projects",
      },
      {
        title: "Task List",
        href: "/tasks",
        icon: "projects",
      },
      {
        title: "Gantt Chart",
        href: "/gantt",
        icon: "projects",
      },
    ],
  },
  {
    title: "Support",
    icon: "support",
    href: "/support",
    children: [
      {
        title: "Tickets",
        href: "/support",
        icon: "support",
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        icon: "support",
      },
      {
        title: "FAQ",
        href: "/faq",
        icon: "support",
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

// Create sidebarSections structure for Sidebar.tsx
export const sidebarSections = [
  {
    title: "Main",
    items: [
      {
        path: "/",
        icon: LayoutDashboard,
        label: "Dashboard"
      },
      {
        path: "/customers",
        icon: Users,
        label: "CRM"
      },
      {
        path: "/messaging",
        icon: MessageSquare,
        label: "Messaging"
      },
      {
        path: "/team-chat",
        icon: MessageCircle,
        label: "Team Chat"
      }
    ]
  },
  {
    title: "Projects",
    items: [
      {
        path: "/kanban",
        icon: KanbanSquare,
        label: "Kanban Board"
      },
      {
        path: "/tasks",
        icon: ListChecks,
        label: "Tasks"
      }
    ]
  },
  {
    title: "Support",
    items: [
      {
        path: "/support",
        icon: Headphones,
        label: "Tickets"
      },
      {
        path: "/knowledge-base",
        icon: FileText,
        label: "Knowledge Base"
      }
    ]
  }
];
