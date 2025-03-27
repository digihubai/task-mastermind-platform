
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
  LayoutTemplate
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
      { path: "/phone/ivr-system", icon: Phone, label: "IVR System" }, // Updated path
      { path: "/outbound", icon: PhoneOutgoing, label: "Outbound Calls" }, // Matches route in App.tsx
    ]
  },
  {
    title: "Team Collaboration",
    items: [
      { path: "/team-chat", icon: MessageSquare, label: "Team Chat" },
      { path: "/projects", icon: Briefcase, label: "Project Management" }, // Updated path
      { path: "/customers", icon: Users, label: "CRM" }, // Updated path
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
      { path: "/automation/workflow-templates", icon: FileText, label: "Templates" }, // Updated path
      { path: "/automation/workflow-editor", icon: Zap, label: "Create Workflow" }, // Updated path
      { path: "/automation/industry-templates", icon: Building, label: "Industry Solutions" },
      { path: "/automation/api-connector", icon: Database, label: "API Connector" },
    ]
  },
  {
    title: "Marketing",
    items: [
      { path: "/marketing", icon: Mail, label: "Email Marketing" }, 
      { path: "/marketing/social", icon: Globe, label: "Social Media" }, // Updated path
      { path: "/marketing/campaigns", icon: Target, label: "Campaigns" }, // Updated path
      { path: "/marketing/brand-voice", icon: Megaphone, label: "Brand Voice" }, // Updated path
    ]
  },
  {
    title: "AI Tools",
    items: [
      { path: "/ai-tools/copywriter", icon: PenTool, label: "AI Copywriter" }, // Updated path
      { path: "/ai-tools/seo", icon: Search, label: "AI SEO Writer" }, // Updated path
      { path: "/ai-tools/vision", icon: Image, label: "AI Vision" }, // Updated path
      { path: "/ai-tools/rewriter", icon: Zap, label: "AI Rewriter" }, // Updated path
      { path: "/ai-tools/pdf-insight", icon: FileSpreadsheet, label: "PDF Insight" }, // Updated path
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
