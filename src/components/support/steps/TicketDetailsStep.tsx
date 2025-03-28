
import React, { useState } from "react";
import { SupportTicket } from "@/types/support";
import { TicketCategoryField } from "../form-fields/TicketCategoryField";
import { TicketDepartmentField } from "../form-fields/TicketDepartmentField";
import { TicketSubjectField } from "../form-fields/TicketSubjectField";
import { TicketDescriptionField } from "../form-fields/TicketDescriptionField";
import { TicketFormActions } from "../form-fields/TicketFormActions";
import { TicketCustomerHeader } from "../form-fields/TicketCustomerHeader";
import { TicketOrderNumberField } from "../form-fields/TicketOrderNumberField";
import { TicketUrgencyField } from "../form-fields/TicketUrgencyField";
import { TicketContactMethodField } from "../form-fields/TicketContactMethodField";
import { TicketBestTimeField } from "../form-fields/TicketBestTimeField";
import { TicketCustomFields } from "../form-fields/TicketCustomFields";
import { TicketAttachmentField } from "../form-fields/TicketAttachmentField";

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
  optionalFields?: {
    orderNumber?: boolean;
    urgencyLevel?: boolean;
    preferredContact?: boolean;
    bestTimeToReach?: boolean;
    custom?: {[key: string]: boolean};
  };
}

export const TicketDetailsStep: React.FC<TicketDetailsStepProps> = ({
  customerInfo,
  onEditContactInfo,
  onSubmit,
  onCancel,
  availableCategories,
  availableDepartments,
  requiredFields,
  optionalFields = {}
}) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [department, setDepartment] = useState("support");
  const [orderNumber, setOrderNumber] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("medium");
  const [preferredContact, setPreferredContact] = useState("email");
  const [bestTimeToReach, setBestTimeToReach] = useState("");
  const [customFields, setCustomFields] = useState<{[key: string]: string}>({});
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleCustomFieldChange = (key: string, value: string) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fileNames = files ? Array.from(files).map(file => file.name) : [];

    onSubmit({
      subject,
      description,
      priority,
      category,
      department,
      status: "new",
      metadata: {
        orderNumber: optionalFields.orderNumber ? orderNumber : undefined,
        urgencyLevel: optionalFields.urgencyLevel ? urgencyLevel : undefined,
        preferredContact: optionalFields.preferredContact ? preferredContact : undefined,
        bestTimeToReach: optionalFields.bestTimeToReach ? bestTimeToReach : undefined,
        customFields: Object.keys(optionalFields.custom || {}).length > 0 ? customFields : undefined,
        attachments: fileNames.length > 0 ? fileNames : undefined
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TicketCustomerHeader 
        customerInfo={customerInfo}
        onEditContactInfo={onEditContactInfo}
      />

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
        
        {/* Optional Fields Based on Configuration */}
        {optionalFields.urgencyLevel && (
          <TicketUrgencyField
            value={urgencyLevel}
            onChange={setUrgencyLevel}
          />
        )}
        
        {optionalFields.orderNumber && (
          <TicketOrderNumberField
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        )}
        
        {optionalFields.preferredContact && (
          <TicketContactMethodField
            value={preferredContact}
            onChange={setPreferredContact}
          />
        )}
        
        {optionalFields.bestTimeToReach && (
          <TicketBestTimeField
            value={bestTimeToReach}
            onChange={(e) => setBestTimeToReach(e.target.value)}
          />
        )}
        
        {/* Custom Fields */}
        <TicketCustomFields
          customFields={customFields}
          optionalFields={optionalFields}
          onChange={handleCustomFieldChange}
        />
        
        <TicketDescriptionField 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        
        {/* File Attachments */}
        <TicketAttachmentField
          files={files}
          onChange={handleFileChange}
        />
      </div>

      <TicketFormActions onCancel={onCancel} isCustomer={true} />
    </form>
  );
};
