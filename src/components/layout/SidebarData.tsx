
import {
  Home,
  Users,
  Briefcase,
  BarChartBig,
  MessageSquare,
  Headphones,
  ShoppingCart,
  Settings,
  FileText,
  Sparkles,
  Image,
  Lightbulb,
  Mail,
  LineChart,
  Bot
} from "lucide-react";

export const sidebarSections = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: Home,
      },
      {
        label: "Customers",
        path: "/customers",
        icon: Users,
      },
      {
        label: "Projects",
        path: "/projects",
        icon: Briefcase,
      },
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChartBig,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        label: "Team Chat",
        path: "/team-chat",
        icon: MessageSquare,
      },
      {
        label: "Support",
        path: "/support",
        icon: Headphones,
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        label: "CRM",
        path: "/crm",
        icon: Users,
      },
      {
        label: "Marketing",
        path: "/marketing",
        icon: LineChart,
      },
      {
        label: "E-commerce",
        path: "/ecommerce",
        icon: ShoppingCart,
      },
      {
        label: "Finance",
        path: "/finance",
        icon: FileText,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        label: "AI Tools Hub",
        path: "/ai-tools",
        icon: Sparkles,
      },
      {
        label: "AI Vision",
        path: "/ai-vision",
        icon: Image,
      },
      {
        label: "AI Copywriter",
        path: "/ai-copywriter",
        icon: Lightbulb,
      },
      {
        label: "Email AI",
        path: "/email-ai",
        icon: Mail,
      },
      {
        label: "AI Chatbot",
        path: "/chatbot",
        icon: Bot,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];
