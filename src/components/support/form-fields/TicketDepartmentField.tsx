
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
}

export const TicketDepartmentField: React.FC<TicketDepartmentFieldProps> = ({ value, onChange }) => {
  // Enhanced departments
  const departments = [
    { value: "Support", label: "Support" },
    { value: "Sales", label: "Sales" },
    { value: "Billing", label: "Billing" },
    { value: "Product", label: "Product" },
    { value: "Technical", label: "Technical" },
    { value: "Engineering", label: "Engineering" },
    { value: "Customer Success", label: "Customer Success" }
  ];

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
