
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Define interfaces for our CRM data
export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  lastContact: string;
  avatar: string | null;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose: string;
  owner: string;
}

export interface Activity {
  id: string;
  type: string;
  contact: string;
  company: string;
  description: string;
  date: string;
  user: string;
  status?: string;
}

// Mock data for the CRM
export const mockContacts: Contact[] = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567",
    status: "lead",
    lastContact: "2023-04-12T10:30:00Z",
    avatar: null
  },
  {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah.j@techsolutions.com",
    company: "Tech Solutions Inc.",
    phone: "+1 (555) 987-6543",
    status: "customer",
    lastContact: "2023-04-15T14:45:00Z",
    avatar: null
  },
  {
    id: "c3",
    name: "Michael Wong",
    email: "m.wong@globalretail.com",
    company: "Global Retail",
    phone: "+1 (555) 456-7890",
    status: "prospect",
    lastContact: "2023-04-10T09:15:00Z",
    avatar: null
  },
  {
    id: "c4",
    name: "Emma Thompson",
    email: "emma.t@innovatesol.com",
    company: "Innovate Solutions",
    phone: "+1 (555) 321-6547",
    status: "customer",
    lastContact: "2023-04-14T11:20:00Z",
    avatar: null
  },
  {
    id: "c5",
    name: "Carlos Mendez",
    email: "carlos@startupxyz.com",
    company: "Startup XYZ",
    status: "lead",
    phone: "+1 (555) 789-0123",
    lastContact: "2023-04-11T16:30:00Z",
    avatar: null
  }
];

export const mockDeals: Deal[] = [
  {
    id: "d1",
    name: "Enterprise Software Package",
    company: "Acme Corporation",
    value: 75000,
    stage: "proposal",
    probability: 60,
    expectedClose: "2023-06-15",
    owner: "Sarah Johnson"
  },
  {
    id: "d2",
    name: "Website Redesign",
    company: "Tech Solutions Inc.",
    value: 25000,
    stage: "discovery",
    probability: 30,
    expectedClose: "2023-07-20",
    owner: "Michael Wong"
  },
  {
    id: "d3",
    name: "Annual Support Contract",
    company: "Global Retail",
    value: 50000,
    stage: "negotiation",
    probability: 80,
    expectedClose: "2023-05-30",
    owner: "John Smith"
  },
  {
    id: "d4",
    name: "Mobile App Development",
    company: "Innovate Solutions",
    value: 120000,
    stage: "closed-won",
    probability: 100,
    expectedClose: "2023-04-10",
    owner: "Emma Thompson"
  },
  {
    id: "d5",
    name: "AI Chatbot Integration",
    company: "Startup XYZ",
    value: 30000,
    stage: "proposal",
    probability: 50,
    expectedClose: "2023-06-25",
    owner: "Carlos Mendez"
  }
];

export const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "call",
    contact: "John Smith",
    company: "Acme Corporation",
    description: "Discussed project requirements and timeline",
    date: "2023-04-15T10:30:00Z",
    user: "Sarah Johnson"
  },
  {
    id: "a2",
    type: "email",
    contact: "Sarah Johnson",
    company: "Tech Solutions Inc.",
    description: "Sent proposal for website redesign",
    date: "2023-04-14T15:45:00Z",
    user: "Michael Wong"
  },
  {
    id: "a3",
    type: "meeting",
    contact: "Michael Wong",
    company: "Global Retail",
    description: "Product demo and feature showcase",
    date: "2023-04-13T11:00:00Z",
    user: "Emma Thompson"
  },
  {
    id: "a4",
    type: "note",
    contact: "Emma Thompson",
    company: "Innovate Solutions",
    description: "Customer requested additional security features",
    date: "2023-04-12T14:20:00Z",
    user: "John Smith"
  },
  {
    id: "a5",
    type: "task",
    contact: "Carlos Mendez",
    company: "Startup XYZ",
    description: "Follow-up on chatbot requirements",
    date: "2023-04-16T09:00:00Z",
    user: "Carlos Mendez",
    status: "pending"
  }
];

export const useCRM = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts] = useState<Contact[]>(mockContacts);
  const [deals] = useState<Deal[]>(mockDeals);
  const [activities] = useState<Activity[]>(mockActivities);

  // Utility functions for formatting and display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      lead: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", label: "Lead" },
      prospect: { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", label: "Prospect" },
      customer: { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Customer" },
      churned: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", label: "Churned" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.lead;
    
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };
  
  const getStageBadge = (stage: string) => {
    const stageConfig = {
      "discovery": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", label: "Discovery" },
      "proposal": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", label: "Proposal" },
      "negotiation": { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", label: "Negotiation" },
      "closed-won": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Closed (Won)" },
      "closed-lost": { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", label: "Closed (Lost)" }
    };
    
    const config = stageConfig[stage as keyof typeof stageConfig] || stageConfig.discovery;
    
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Action handlers
  const handleAddContact = () => {
    toast({
      title: "Create contact",
      description: "Contact creation form will be available soon",
    });
  };
  
  const handleAddDeal = () => {
    toast({
      title: "Create deal",
      description: "Deal creation form will be available soon",
    });
  };
  
  const handleAddActivity = () => {
    toast({
      title: "Log activity",
      description: "Activity logging form will be available soon",
    });
  };

  const handleAddAction = () => {
    switch (activeTab) {
      case "contacts": return handleAddContact();
      case "deals": return handleAddDeal();
      case "activities": return handleAddActivity();
      default: return;
    }
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    contacts,
    deals,
    activities,
    formatDate,
    formatCurrency,
    getStatusBadge,
    getStageBadge,
    handleAddAction,
  };
};
