
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TicketCategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TicketCategoryField: React.FC<TicketCategoryFieldProps> = ({ value, onChange }) => {
  // Enhanced categories
  const categories = [
    { value: "general", label: "General" },
    { value: "account", label: "Account" },
    { value: "billing", label: "Billing" },
    { value: "technical", label: "Technical" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "integration", label: "Integration" },
    { value: "security", label: "Security" }
  ];

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium mb-1">
        Category
      </label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
