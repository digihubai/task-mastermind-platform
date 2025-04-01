
import { useState } from "react";
import { MessageSquare, Mail, Phone, Users, Database, FileText, BarChart3, RefreshCw, Calendar, Bell, ArrowDownUp } from "lucide-react";
import React from "react";

export interface Category {
  id: string;
  label: string;
}

export interface WorkflowTemplateItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  categoryLabel: string;
  popular?: boolean;
}

export const useWorkflowTemplates = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories: Category[] = [
    { id: "all", label: "All Templates" },
    { id: "support", label: "Support" },
    { id: "sales", label: "Sales" },
    { id: "marketing", label: "Marketing" },
    { id: "hr", label: "HR" },
    { id: "operations", label: "Operations" },
    { id: "call-center", label: "Call Center" },
  ];
  
  const templates: WorkflowTemplateItem[] = [
    // Support templates
    {
      id: 1,
      title: "Customer Support IVR",
      description: "Interactive voice response system for customer support",
      icon: React.createElement(Phone, { size: 20, className: "text-blue-500" }),
      category: "support",
      categoryLabel: "Support",
      popular: true
    },
    {
      id: 2,
      title: "Multi-Channel Chat Support",
      description: "Manage customer chat from multiple channels",
      icon: React.createElement(MessageSquare, { size: 20, className: "text-indigo-500" }),
      category: "support",
      categoryLabel: "Support"
    },
    {
      id: 3,
      title: "Support Ticket Escalation",
      description: "Automatically escalate urgent support tickets",
      icon: React.createElement(Bell, { size: 20, className: "text-red-500" }),
      category: "support",
      categoryLabel: "Support"
    },
    
    // Sales templates
    {
      id: 4,
      title: "Sales Lead Qualification",
      description: "Qualify incoming leads and route to sales reps",
      icon: React.createElement(Users, { size: 20, className: "text-green-500" }),
      category: "sales",
      categoryLabel: "Sales",
      popular: true
    },
    {
      id: 5,
      title: "Follow-up Email Sequence",
      description: "Automated email follow-ups for sales prospects",
      icon: React.createElement(Mail, { size: 20, className: "text-amber-500" }),
      category: "sales",
      categoryLabel: "Sales"
    },
    
    // Marketing templates
    {
      id: 6,
      title: "Campaign Performance Alerts",
      description: "Get notified about marketing campaign performance",
      icon: React.createElement(BarChart3, { size: 20, className: "text-purple-500" }),
      category: "marketing",
      categoryLabel: "Marketing"
    },
    
    // HR templates
    {
      id: 7,
      title: "Employee Onboarding",
      description: "Streamline the new employee onboarding process",
      icon: React.createElement(Users, { size: 20, className: "text-teal-500" }),
      category: "hr",
      categoryLabel: "HR"
    },
    
    // Operations templates
    {
      id: 8,
      title: "Data Sync Automation",
      description: "Sync data between different systems automatically",
      icon: React.createElement(RefreshCw, { size: 20, className: "text-gray-500" }),
      category: "operations",
      categoryLabel: "Operations"
    },
    
    // Call center templates
    {
      id: 9,
      title: "Customer Verification IVR",
      description: "Verify customer identity through an automated call flow",
      icon: React.createElement(Phone, { size: 20, className: "text-blue-500" }),
      category: "call-center",
      categoryLabel: "Call Center",
      popular: true
    },
    {
      id: 10,
      title: "Call Center Queue Management",
      description: "Manage call queues and route calls efficiently",
      icon: React.createElement(ArrowDownUp, { size: 20, className: "text-orange-500" }),
      category: "call-center",
      categoryLabel: "Call Center"
    },
    {
      id: 11,
      title: "Post-Call Survey",
      description: "Collect customer feedback after call completion",
      icon: React.createElement(FileText, { size: 20, className: "text-violet-500" }),
      category: "call-center",
      categoryLabel: "Call Center"
    },
    {
      id: 12,
      title: "Scheduled Callback",
      description: "Allow customers to request callbacks during peak times",
      icon: React.createElement(Calendar, { size: 20, className: "text-cyan-500" }),
      category: "call-center",
      categoryLabel: "Call Center"
    }
  ];
  
  return {
    templates,
    categories,
    activeCategory,
    setActiveCategory
  };
};
