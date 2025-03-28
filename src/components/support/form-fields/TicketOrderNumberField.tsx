
import React from "react";
import { Input } from "@/components/ui/input";

interface TicketOrderNumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TicketOrderNumberField: React.FC<TicketOrderNumberFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
        Order/Invoice Number
      </label>
      <Input
        id="orderNumber"
        placeholder="e.g., INV-12345"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
