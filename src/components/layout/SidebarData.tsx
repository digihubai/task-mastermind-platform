
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
        name: "Dashboard",
        path: "/",
        icon: <Home className="h-5 w-5" />,
      },
      {
        name: "Customers",
        path: "/customers",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Projects",
        path: "/projects",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        name: "Analytics",
        path: "/analytics",
        icon: <BarChartBig className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        name: "Team Chat",
        path: "/team-chat",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Support",
        path: "/support",
        icon: <Headphones className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        name: "CRM",
        path: "/crm",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Marketing",
        path: "/marketing",
        icon: <LineChart className="h-5 w-5" />,
      },
      {
        name: "E-commerce",
        path: "/ecommerce",
        icon: <ShoppingCart className="h-5 w-5" />,
      },
      {
        name: "Finance",
        path: "/finance",
        icon: <FileText className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        name: "AI Tools Hub",
        path: "/ai-tools",
        icon: <Sparkles className="h-5 w-5" />,
      },
      {
        name: "AI Vision",
        path: "/ai-vision",
        icon: <Image className="h-5 w-5" />,
      },
      {
        name: "AI Copywriter",
        path: "/ai-copywriter",
        icon: <Lightbulb className="h-5 w-5" />,
      },
      {
        name: "Email AI",
        path: "/email-ai",
        icon: <Mail className="h-5 w-5" />,
      },
      {
        name: "AI Chatbot",
        path: "/chatbot",
        icon: <Bot className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
];
