
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TicketPriorityFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TicketPriorityField: React.FC<TicketPriorityFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="priority" className="block text-sm font-medium mb-1">
        Priority
      </label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
