
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface TicketDescriptionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TicketDescriptionField: React.FC<TicketDescriptionFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium mb-1">
        Description
      </label>
      <Textarea
        id="description"
        placeholder="Detailed description of your issue"
        rows={5}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
