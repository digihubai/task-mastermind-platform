
import React from "react";
import { Input } from "@/components/ui/input";

interface TicketBestTimeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TicketBestTimeField: React.FC<TicketBestTimeFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="bestTimeToReach" className="block text-sm font-medium mb-1">
        Best Time to Reach You
      </label>
      <Input
        id="bestTimeToReach"
        placeholder="e.g., Weekdays after 3pm EST"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
