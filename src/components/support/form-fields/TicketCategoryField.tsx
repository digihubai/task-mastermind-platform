
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
  const handleChange = (newValue: string) => {
    // Store the value exactly as provided without converting to lowercase
    // This will preserve the display format while ensuring consistent comparison
    onChange(newValue);
  };
  
  // Debug the categories
  console.log('Available categories in field:', availableCategories);
  console.log('Current category value:', value);
  
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
                key={category} 
                value={category}
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
