
import React, { useEffect } from 'react';
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
  // Debug the departments
  useEffect(() => {
    console.log('Available departments in field:', availableDepartments);
    console.log('Current department value:', value);
  }, [availableDepartments, value]);
  
  return (
    <div>
      <Label htmlFor="department">Department</Label>
      <Select value={value} onValueChange={onChange}>
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
