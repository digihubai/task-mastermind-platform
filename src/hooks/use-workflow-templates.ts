
import { useState } from "react";
import { 
  MessageSquare, Mail, Phone, Users, Database, FileText, 
  BarChart3, RefreshCw, Calendar, Bell, ArrowDownUp, CheckCircle 
} from "lucide-react";
import React from "react";

export interface WorkflowTemplate {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  categoryLabel: string;
  category: string;
  popular: boolean;
}

export interface TemplateCategory {
  id: string;
  label: string;
}

export const useWorkflowTemplates = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories: TemplateCategory[] = [
    { id: "all", label: "All Templates" },
    { id: "communication", label: "Communication" },
    { id: "customer-service", label: "Customer Service" },
    { id: "sales", label: "Sales & CRM" },
    { id: "project", label: "Project Management" },
    { id: "finance", label: "Finance" },
    { id: "hr", label: "Human Resources" }
  ];

  const templates: WorkflowTemplate[] = [
    // Communication templates
    {
      id: 1,
      title: "Customer Support IVR",
      description: "Interactive voice response system for handling customer calls and routing to proper departments.",
      icon: React.createElement(Phone, { size: 20, className: "text-violet-600" }),
      categoryLabel: "Phone",
      category: "communication",
      popular: true
    },
    {
      id: 2,
      title: "Multi-Channel Chat Support",
      description: "Connect with customers through multiple chat platforms with a unified inbox.",
      icon: React.createElement(MessageSquare, { size: 20, className: "text-blue-600" }),
      categoryLabel: "Messaging",
      category: "communication",
      popular: true
    },
    {
      id: 3,
      title: "Email Response Automation",
      description: "Automatically categorize and respond to common email inquiries.",
      icon: React.createElement(Mail, { size: 20, className: "text-indigo-600" }),
      categoryLabel: "Email",
      category: "communication",
      popular: false
    },
    
    // Customer Service templates
    {
      id: 4,
      title: "CSAT Dashboard",
      description: "Monitor customer satisfaction scores across all touchpoints.",
      icon: React.createElement(BarChart3, { size: 20, className: "text-green-600" }),
      categoryLabel: "Analytics",
      category: "customer-service",
      popular: true
    },
    {
      id: 5,
      title: "Ticket Resolution Timer",
      description: "Track and improve response and resolution times with automated reports.",
      icon: React.createElement(RefreshCw, { size: 20, className: "text-blue-600" }),
      categoryLabel: "Performance",
      category: "customer-service",
      popular: false
    },
    {
      id: 6,
      title: "Refund Processing",
      description: "Streamline refund approval process with proper documentation and authorization.",
      icon: React.createElement(Database, { size: 20, className: "text-indigo-600" }),
      categoryLabel: "Operations",
      category: "customer-service",
      popular: false
    },
    
    // Sales & CRM templates
    {
      id: 7,
      title: "Lead Qualification",
      description: "Score and route leads to the appropriate sales representatives.",
      icon: React.createElement(Users, { size: 20, className: "text-amber-600" }),
      categoryLabel: "Pipeline",
      category: "sales",
      popular: true
    },
    {
      id: 8,
      title: "Contract Approval Process",
      description: "Manage the review and approval of sales contracts with role-based permissions.",
      icon: React.createElement(FileText, { size: 20, className: "text-violet-600" }),
      categoryLabel: "Documents",
      category: "sales",
      popular: false
    },
    
    // Project Management templates
    {
      id: 9,
      title: "Task Lifecycle Management",
      description: "Track tasks from creation to completion with custom status transitions.",
      icon: React.createElement(CheckCircle, { size: 20, className: "text-green-600" }),
      categoryLabel: "Tasks",
      category: "project",
      popular: true
    },
    {
      id: 10,
      title: "Deadline Reminders",
      description: "Send automated reminders about upcoming project deadlines.",
      icon: React.createElement(Calendar, { size: 20, className: "text-blue-600" }),
      categoryLabel: "Scheduling",
      category: "project",
      popular: false
    },
    
    // Finance templates
    {
      id: 11,
      title: "Expense Approval",
      description: "Multi-level approval workflow for expense reports with budget validation.",
      icon: React.createElement(Database, { size: 20, className: "text-amber-600" }),
      categoryLabel: "Expenses",
      category: "finance",
      popular: true
    },
    
    // HR templates
    {
      id: 12,
      title: "Onboarding Process",
      description: "Streamline new employee onboarding with automated task assignments.",
      icon: React.createElement(Users, { size: 20, className: "text-indigo-600" }),
      categoryLabel: "Employees",
      category: "hr",
      popular: true
    }
  ];

  return {
    templates,
    categories,
    activeCategory,
    setActiveCategory
  };
};
