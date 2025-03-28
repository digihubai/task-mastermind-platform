
import React from "react";
import { Input } from "@/components/ui/input";

interface TicketSubjectFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TicketSubjectField: React.FC<TicketSubjectFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="subject" className="block text-sm font-medium mb-1">
        Subject
      </label>
      <Input
        id="subject"
        placeholder="Brief description of your issue"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
