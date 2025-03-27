
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ConversationFilterProps {
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

const ConversationFilter: React.FC<ConversationFilterProps> = ({
  filterStatus,
  onFilterChange
}) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <Select value={filterStatus} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="waiting">Waiting</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" variant="ghost">
        <Filter size={16} className="mr-1" />
        Filters
      </Button>
    </div>
  );
};

export default ConversationFilter;
