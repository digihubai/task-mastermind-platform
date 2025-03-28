
import React from "react";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

interface StatusIconProps {
  status: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case "open":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "pending":
    case "in_progress":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "closed":
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};
