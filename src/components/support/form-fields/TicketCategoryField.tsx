
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
  availableCategories = ["General", "Technical", "Billing", "Feature Request"]
}) => {
  // Use provided categories if available, or fall back to defaults
  const categories = availableCategories.map(cat => ({ 
    value: cat.toLowerCase(), 
    label: cat 
  }));

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
