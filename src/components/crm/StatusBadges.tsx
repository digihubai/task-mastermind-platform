
import React from "react";

interface StatusBadgeProps {
  status: string;
  type: "contact" | "deal";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  if (type === "contact") {
    return getContactStatusBadge(status);
  } else {
    return getDealStageBadge(status);
  }
};

export const getContactStatusBadge = (status: string) => {
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

export const getDealStageBadge = (stage: string) => {
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
