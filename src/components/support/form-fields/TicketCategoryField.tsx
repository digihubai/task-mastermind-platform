
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  // Store and use lowercase values for consistent comparison
  const handleChange = (newValue: string) => {
    onChange(newValue.toLowerCase());
  };
  
  return (
    <div>
      <Label htmlFor="category">Category</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id="category" className="mt-1">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {availableCategories.map((category) => (
              <SelectItem 
                key={category.toLowerCase()} 
                value={category.toLowerCase()}
              >
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
