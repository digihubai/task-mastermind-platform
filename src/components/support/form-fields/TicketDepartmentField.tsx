
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
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
  // Use provided departments
  const departments = availableDepartments.map(dept => ({ 
    value: dept, 
    label: dept 
  }));

  return (
    <div>
      <label htmlFor="department" className="block text-sm font-medium mb-1">
        Department
      </label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {departments.map(dept => (
              <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
