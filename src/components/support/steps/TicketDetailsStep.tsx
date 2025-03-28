
import React, { useState, useEffect } from "react";
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
  availableCategories = ["General", "Technical", "Billing", "Feature Request"],
  availableDepartments = ["Support", "Sales", "Billing", "Product", "Technical"],
  requiredFields,
  optionalFields = {}
}) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  // Set initial category and department from the first available options
  const [category, setCategory] = useState(availableCategories && availableCategories.length > 0 
    ? availableCategories[0]
    : "General");
  const [department, setDepartment] = useState(availableDepartments && availableDepartments.length > 0 
    ? availableDepartments[0] 
    : "Support");
  const [orderNumber, setOrderNumber] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("medium");
  const [preferredContact, setPreferredContact] = useState("email");
  const [bestTimeToReach, setBestTimeToReach] = useState("");
  const [customFields, setCustomFields] = useState<{[key: string]: string}>({});
  const [files, setFiles] = useState<FileList | null>(null);

  // Debug initial values and available options
  useEffect(() => {
    console.log('TicketDetailsStep - Available categories:', availableCategories);
    console.log('TicketDetailsStep - Selected category:', category);
    console.log('TicketDetailsStep - Available departments:', availableDepartments);
    console.log('TicketDetailsStep - Selected department:', department);
  }, [availableCategories, category, availableDepartments, department]);

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
    
    // Build metadata object only with fields that are enabled
    const metadata: Record<string, any> = {};
    
    if (optionalFields.orderNumber) {
      metadata.orderNumber = orderNumber;
    }
    
    if (optionalFields.urgencyLevel) {
      metadata.urgencyLevel = urgencyLevel;
    }
    
    if (optionalFields.preferredContact) {
      metadata.preferredContact = preferredContact;
    }
    
    if (optionalFields.bestTimeToReach) {
      metadata.bestTimeToReach = bestTimeToReach;
    }
    
    if (Object.keys(optionalFields.custom || {}).length > 0) {
      metadata.customFields = customFields;
    }
    
    if (fileNames.length > 0) {
      metadata.attachments = fileNames;
    }

    // Log the final ticket data before submission
    const ticketData = {
      subject,
      description,
      priority,
      category,
      department,
      status: "new",
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined
    };
    
    console.log('Submitting ticket data:', ticketData);
    onSubmit(ticketData);
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
        {Object.keys(optionalFields.custom || {}).length > 0 && (
          <TicketCustomFields
            customFields={customFields}
            optionalFields={optionalFields}
            onChange={handleCustomFieldChange}
          />
        )}
        
        {/* Required Description Field */}
        <TicketDescriptionField 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        
        {/* File Attachments - Always show this field */}
        <TicketAttachmentField
          files={files}
          onChange={handleFileChange}
        />
      </div>

      <TicketFormActions onCancel={onCancel} isCustomer={true} />
    </form>
  );
};
