
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConversationFilterProps {
  filterStatus: string;
  onFilterChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ConversationFilter: React.FC<ConversationFilterProps> = ({
  filterStatus,
  onFilterChange,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="space-y-3 py-2">
      {/* Status filter */}
      <div>
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant={filterStatus === "all" ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => onFilterChange("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "open" ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => onFilterChange("open")}
          >
            Open
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "pending" ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => onFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "resolved" ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => onFilterChange("resolved")}
          >
            Resolved
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationFilter;
