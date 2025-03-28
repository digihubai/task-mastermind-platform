
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
  // Store and use lowercase values for consistent comparison
  const handleChange = (newValue: string) => {
    onChange(newValue.toLowerCase());
  };
  
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
                key={department.toLowerCase()} 
                value={department.toLowerCase()}
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
