
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
  availableCategories?: string[];
}

export const TicketCategoryField: React.FC<TicketCategoryFieldProps> = ({ 
  value, 
  onChange,
  availableCategories 
}) => {
  // Default categories if none provided
  const defaultCategories = [
    { value: "general", label: "General" },
    { value: "account", label: "Account" },
    { value: "billing", label: "Billing" },
    { value: "technical", label: "Technical" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "integration", label: "Integration" },
    { value: "security", label: "Security" }
  ];
  
  // Use provided categories if available, or fall back to defaults
  const categories = availableCategories 
    ? availableCategories.map(cat => ({ value: cat.toLowerCase(), label: cat }))
    : defaultCategories;

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
