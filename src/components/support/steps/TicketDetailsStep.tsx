
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { ArrowLeft } from "lucide-react";
import { TicketCategoryField } from "../form-fields/TicketCategoryField";
import { TicketDepartmentField } from "../form-fields/TicketDepartmentField";
import { TicketSubjectField } from "../form-fields/TicketSubjectField";
import { TicketPriorityField } from "../form-fields/TicketPriorityField";
import { TicketDescriptionField } from "../form-fields/TicketDescriptionField";
import { TicketFormActions } from "../form-fields/TicketFormActions";

interface TicketDetailsStepProps {
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  onEditContactInfo: () => void;
  onSubmit: (ticketData: Partial<SupportTicket>) => void;
  onCancel: () => void;
  availableCategories?: string[];
  availableDepartments?: string[];
  requiredFields?: {
    phone?: boolean;
    company?: boolean;
  };
}

export const TicketDetailsStep: React.FC<TicketDetailsStepProps> = ({
  customerInfo,
  onEditContactInfo,
  onSubmit,
  onCancel,
  availableCategories,
  availableDepartments,
  requiredFields
}) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [department, setDepartment] = useState("support");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      subject,
      description,
      priority,
      category,
      department,
      status: "new"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEditContactInfo}
          className="p-0 h-auto mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
        </Button>
        <div>
          <div className="text-sm font-medium">{customerInfo.name}</div>
          <div className="text-xs text-muted-foreground">{customerInfo.email}</div>
        </div>
      </div>

      <div className="space-y-4">
        <TicketSubjectField value={subject} onChange={(e) => setSubject(e.target.value)} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TicketCategoryField 
            value={category} 
            onChange={setCategory} 
            availableCategories={availableCategories}
          />
          <TicketDepartmentField 
            value={department} 
            onChange={setDepartment} 
            availableDepartments={availableDepartments}
          />
        </div>
        
        <TicketPriorityField value={priority} onChange={setPriority} />
        <TicketDescriptionField value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <TicketFormActions onCancel={onCancel} isCustomer={true} />
    </form>
  );
};
