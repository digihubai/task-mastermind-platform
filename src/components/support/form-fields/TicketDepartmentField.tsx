
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

interface TicketDepartmentFieldProps {
  value: string;
  onChange: (value: string) => void;
  availableDepartments?: string[];
}

export const TicketDepartmentField: React.FC<TicketDepartmentFieldProps> = ({
  value,
  onChange,
  availableDepartments = ["Support", "Sales", "Billing", "Product", "Technical"]
}) => {
  const handleChange = (newValue: string) => {
    // Store the value exactly as provided without converting to lowercase
    // This will preserve the display format while ensuring consistent comparison
    onChange(newValue);
  };
  
  // Debug the departments
  console.log('Available departments in field:', availableDepartments);
  console.log('Current department value:', value);
  
  return (
    <div>
      <Label htmlFor="department">Department</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id="department" className="mt-1">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {availableDepartments.map((department) => (
              <SelectItem 
                key={department} 
                value={department}
              >
                {department}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
