
import React, { useState } from "react";
import { SupportTicket } from "@/types/support";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketSubjectField } from "./form-fields/TicketSubjectField";
import { TicketDescriptionField } from "./form-fields/TicketDescriptionField";
import { TicketPriorityField } from "./form-fields/TicketPriorityField";
import { TicketCategoryField } from "./form-fields/TicketCategoryField";
import { TicketDepartmentField } from "./form-fields/TicketDepartmentField";
import { TicketFormActions } from "./form-fields/TicketFormActions";

export interface NewTicketFormProps {
  onSubmit: (newTicket: Partial<SupportTicket>) => void;
  onCancel: () => void;
  isCustomer?: boolean;
}

export const NewTicketForm: React.FC<NewTicketFormProps> = ({ 
  onSubmit, 
  onCancel,
  isCustomer = false
}) => {
  const [formData, setFormData] = useState<Partial<SupportTicket>>({
    subject: "",
    description: "",
    priority: "medium",
    category: "general",
    department: "Support",
    tags: []
  });
  
  const handleChange = (field: keyof SupportTicket, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCustomer ? "Submit Support Request" : "Create New Support Ticket"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TicketSubjectField
            value={formData.subject || ""}
            onChange={(e) => handleChange("subject", e.target.value)}
          />
          
          <TicketDescriptionField
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TicketPriorityField
              value={formData.priority || "medium"}
              onChange={(value) => handleChange("priority", value)}
            />
            
            <TicketCategoryField
              value={formData.category || "general"}
              onChange={(value) => handleChange("category", value)}
            />
          </div>
          
          {!isCustomer && (
            <TicketDepartmentField
              value={formData.department || "Support"}
              onChange={(value) => handleChange("department", value)}
            />
          )}
          
          <TicketFormActions
            onCancel={onCancel}
            isCustomer={isCustomer}
          />
        </form>
      </CardContent>
    </Card>
  );
};
