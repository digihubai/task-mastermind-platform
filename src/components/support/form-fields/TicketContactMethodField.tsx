
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketContactMethodFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TicketContactMethodField: React.FC<TicketContactMethodFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="preferredContact" className="block text-sm font-medium mb-1">
        Preferred Contact Method
      </label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select contact method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="chat">Chat</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
