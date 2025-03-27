
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users,
  Briefcase,
  Settings, 
  BarChart3,
  Bot,
  Mail,
  Headphones,
  Server,
  Globe,
  FileText,
  Phone,
  PhoneOutgoing,
  HelpCircle,
  Heart,
  Star,
  Calendar,
  AlertCircle,
  Activity,
  BookOpen,
  LucideIcon,
  Target,
  PenTool,
  Zap,
  Database,
  Layers,
  Image,
  Search,
  FileSpreadsheet,
  CreditCard,
  Megaphone,
  DollarSign,
  Calculator,
  Wallet,
  PieChart,
  Receipt,
  Building,
  Sparkles,
  LayoutTemplate,
  Pin,
  Gift,
  Hash,
  Palette
} from "lucide-react";

export interface SidebarItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [
      { path: "/", icon: LayoutDashboard, label: "Overview" },
      { path: "/analytics", icon: BarChart3, label: "Analytics" },
      { path: "/calendar", icon: Calendar, label: "Calendar" },
    ]
  },
  {
    title: "Customer Service",
    items: [
      { path: "/chat", icon: MessageSquare, label: "Customer Chat" },
      { path: "/support", icon: HelpCircle, label: "Support Tickets" },
      { path: "/chatbot", icon: Bot, label: "AI Chatbot" },
      { path: "/phone", icon: Phone, label: "IVR System" },
      { path: "/outbound", icon: PhoneOutgoing, label: "Outbound Calls" },
    ]
  },
  {
    title: "Team Collaboration",
    items: [
      { path: "/team-chat", icon: MessageSquare, label: "Team Chat" },
      { path: "/team-chat/channels", icon: Hash, label: "Channels" },
      { path: "/team-chat/canvas", icon: Palette, label: "Canvas" },
      { path: "/team-chat/pinned", icon: Pin, label: "Pinned Items" },
      { path: "/team-chat/gifs", icon: Gift, label: "GIF Library" },
      { path: "/project-management", icon: Briefcase, label: "Project Management" },
      { path: "/crm", icon: Users, label: "CRM" },
    ]
  },
  {
    title: "Finance",
    items: [
      { path: "/finance", icon: DollarSign, label: "Finance Dashboard" },
      { path: "/finance/tax-calculator", icon: Calculator, label: "Tax Calculator" },
      { path: "/finance/invoices", icon: Receipt, label: "Invoices" },
      { path: "/finance/expenses", icon: CreditCard, label: "Expenses" },
      { path: "/finance/reports", icon: PieChart, label: "Financial Reports" },
    ]
  },
  {
    title: "Workflow Automation",
    items: [
      { path: "/automation/workflows", icon: LayoutTemplate, label: "Workflows" },
      { path: "/automation/templates", icon: FileText, label: "Templates" },
      { path: "/automation/editor", icon: Zap, label: "Create Workflow" },
      { path: "/automation/industry-templates", icon: Building, label: "Industry Solutions" },
      { path: "/automation/api-connector", icon: Database, label: "API Connector" },
    ]
  },
  {
    title: "Marketing",
    items: [
      { path: "/marketing", icon: Mail, label: "Email Marketing" },
      { path: "/social", icon: Globe, label: "Social Media" },
      { path: "/campaigns", icon: Target, label: "Campaigns" },
      { path: "/brand-voice", icon: Megaphone, label: "Brand Voice" },
    ]
  },
  {
    title: "AI Tools",
    items: [
      { path: "/ai-copywriter", icon: PenTool, label: "AI Copywriter" },
      { path: "/ai-seo", icon: Search, label: "AI SEO Writer" },
      { path: "/ai-vision", icon: Image, label: "AI Vision" },
      { path: "/ai-rewriter", icon: Zap, label: "AI Rewriter" },
      { path: "/pdf-insight", icon: FileSpreadsheet, label: "PDF Insight" },
    ]
  },
  {
    title: "Resources",
    items: [
      { path: "/knowledge", icon: BookOpen, label: "Knowledge Base" },
      { path: "/reports", icon: FileText, label: "Reports" },
      { path: "/settings", icon: Settings, label: "Settings" },
    ]
  }
];
