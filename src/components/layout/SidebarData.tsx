
import React from "react";
import {
  Bot,
  MessageSquare,
  FileText,
  Edit,
  PenTool,
  Search,
  FileSpreadsheet,
  Image,
  RefreshCw,
  Users,
  ShoppingBag,
  Bell,
  Globe,
  DollarSign,
  Heart,
  Bookmark,
  FolderOpen,
  BarChart2,
  Mail,
  FileCode,
  Home,
  CreditCard,
  Tag,
  Activity,
  Settings,
  Contact,
  Calendar,
  Database,
  LayoutDashboard,
  Target,
  LineChart,
  Headphones,
  ClipboardList,
  Briefcase,
  UserCheck,
  Zap,
  Building,
  ListChecks,
  User,
} from "lucide-react";

export const sidebarSections = [
  {
    title: "Main Navigation",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard size={20} />,
      },
      {
        title: "AI Tools Hub",
        href: "/ai-tools",
        icon: <Bot size={20} />,
      },
    ],
  },
  {
    title: "Core SaaS Modules",
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
        icon: <Target size={20} />,
        subItems: [
          {
            title: "Campaigns",
            href: "/marketing/campaigns",
            icon: <Target size={18} />,
          },
          {
            title: "Automation",
            href: "/marketing/automation",
            icon: <Zap size={18} />,
          },
          {
            title: "SEO",
            href: "/marketing/seo",
            icon: <Search size={18} />,
            subItems: [
              {
                title: "SEO Tools",
                href: "/marketing/seo/tools",
                icon: <ListChecks size={16} />,
              },
              {
                title: "AI SEO Writer",
                href: "/marketing/seo/ai-writer",
                icon: <Edit size={16} />,
              },
            ],
          },
          {
            title: "Email Marketing",
            href: "/marketing/email",
            icon: <Mail size={18} />,
          },
          {
            title: "Social Media",
            href: "/marketing/social",
            icon: <Bell size={18} />,
          },
          {
            title: "Analytics",
            href: "/marketing/analytics",
            icon: <BarChart2 size={18} />,
          },
        ],
      },
      {
        title: "Sales",
        href: "/sales",
        icon: <ShoppingBag size={20} />,
      },
      {
        title: "Customer Support",
        href: "/support",
        icon: <Headphones size={20} />,
      },
      {
        title: "Finance & Accounting",
        href: "/finance",
        icon: <DollarSign size={20} />,
      },
      {
        title: "HR & Recruitment",
        href: "/hr",
        icon: <UserCheck size={20} />,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        title: "AI Chatbot",
        href: "/chatbot",
        icon: <MessageSquare size={20} />,
      },
      {
        title: "AI Vision",
        href: "/vision",
        icon: <Image size={20} />,
      },
      {
        title: "AI Copywriter",
        href: "/ai-copywriter",
        icon: <PenTool size={20} />,
      },
      {
        title: "AI SEO Writer",
        href: "/ai-seo",
        icon: <Search size={20} />,
      },
      {
        title: "AI Rewriter",
        href: "/ai-rewriter",
        icon: <RefreshCw size={20} />,
      },
      {
        title: "PDF Insight",
        href: "/pdf-insight",
        icon: <FileSpreadsheet size={20} />,
      },
    ],
  },
  {
    title: "Automation",
    items: [
      {
        title: "Workflows",
        href: "/workflow",
        icon: <Activity size={20} />,
      },
      {
        title: "Email Campaigns",
        href: "/marketing/email",
        icon: <Mail size={20} />,
      },
      {
        title: "API Integrations",
        href: "/integrations",
        icon: <FileCode size={20} />,
      },
    ],
  },
  {
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
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Account & Profile",
        href: "/settings/profile",
        icon: <User size={20} />,
      },
      {
        title: "Tool Settings",
        href: "/settings/tools",
        icon: <Settings size={20} />,
      },
      {
        title: "Integrations",
        href: "/settings/integrations",
        icon: <FileCode size={20} />,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: <Bell size={20} />,
      },
      {
        title: "Support & Help",
        href: "/support/help",
        icon: <Headphones size={20} />,
      },
    ],
  },
];
