
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Briefcase, 
  Mail, 
  Users, 
  Bot 
} from "lucide-react";

const SystemStatus: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-border/40">
        <p className="text-sm flex items-center gap-2">
          <MessageSquare size={16} className="text-indigo-600" />
          Chatbot Integration
        </p>
        <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
          Operational
        </span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-border/40">
        <p className="text-sm flex items-center gap-2">
          <Briefcase size={16} className="text-purple-600" />
          Project Management
        </p>
        <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
          Operational
        </span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-border/40">
        <p className="text-sm flex items-center gap-2">
          <Mail size={16} className="text-blue-600" />
          Marketing Automation
        </p>
        <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
          Operational
        </span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-border/40">
        <p className="text-sm flex items-center gap-2">
          <Users size={16} className="text-green-600" />
          CRM System
        </p>
        <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
          Operational
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm flex items-center gap-2">
          <Bot size={16} className="text-amber-600" />
          AI Agents
        </p>
        <span className="text-xs px-2 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">
          Partial Outage
        </span>
      </div>
    </div>
  );
};

export default SystemStatus;
