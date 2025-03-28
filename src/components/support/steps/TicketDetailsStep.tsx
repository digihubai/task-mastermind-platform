
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { ArrowLeft, Paperclip } from "lucide-react";
import { TicketCategoryField } from "../form-fields/TicketCategoryField";
import { TicketDepartmentField } from "../form-fields/TicketDepartmentField";
import { TicketSubjectField } from "../form-fields/TicketSubjectField";
import { TicketPriorityField } from "../form-fields/TicketPriorityField";
import { TicketDescriptionField } from "../form-fields/TicketDescriptionField";
import { TicketFormActions } from "../form-fields/TicketFormActions";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        
        {/* Optional Fields Based on Configuration */}
        {optionalFields.urgencyLevel && (
          <div>
            <label htmlFor="urgency" className="block text-sm font-medium mb-1">
              Urgency Level
            </label>
            <RadioGroup 
              value={urgencyLevel} 
              onValueChange={setUrgencyLevel}
              className="flex flex-wrap gap-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="urgency-low" />
                <Label htmlFor="urgency-low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="urgency-medium" />
                <Label htmlFor="urgency-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="urgency-high" />
                <Label htmlFor="urgency-high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="critical" id="urgency-critical" />
                <Label htmlFor="urgency-critical">Critical</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {optionalFields.orderNumber && (
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
              Order/Invoice Number
            </label>
            <Input
              id="orderNumber"
              placeholder="e.g., INV-12345"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
        )}
        
        {optionalFields.preferredContact && (
          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium mb-1">
              Preferred Contact Method
            </label>
            <Select 
              value={preferredContact} 
              onValueChange={setPreferredContact}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {optionalFields.bestTimeToReach && (
          <div>
            <label htmlFor="bestTimeToReach" className="block text-sm font-medium mb-1">
              Best Time to Reach You
            </label>
            <Input
              id="bestTimeToReach"
              placeholder="e.g., Weekdays after 3pm EST"
              value={bestTimeToReach}
              onChange={(e) => setBestTimeToReach(e.target.value)}
            />
          </div>
        )}
        
        {/* Custom Fields */}
        {optionalFields.custom && Object.keys(optionalFields.custom).map(key => {
          if (optionalFields.custom && optionalFields.custom[key]) {
            const fieldName = key.replace(/_/g, ' ');
            const displayName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            
            return (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium mb-1">
                  {displayName}
                </label>
                <Input
                  id={key}
                  placeholder={`Enter ${displayName}`}
                  value={customFields[key] || ''}
                  onChange={(e) => handleCustomFieldChange(key, e.target.value)}
                />
              </div>
            );
          }
          return null;
        })}
        
        <TicketDescriptionField value={description} onChange={(e) => setDescription(e.target.value)} />
        
        {/* File Attachments */}
        <div>
          <label htmlFor="attachments" className="block text-sm font-medium mb-1">
            Attachments
          </label>
          <div className="flex items-center gap-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground">
                <Paperclip className="h-4 w-4" /> 
                <span>Upload Files</span>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {files && files.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          {files && files.length > 0 && (
            <div className="mt-2">
              <ul className="text-xs text-muted-foreground">
                {Array.from(files).map((file, index) => (
                  <li key={index} className="truncate">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <TicketFormActions onCancel={onCancel} isCustomer={true} />
    </form>
  );
};
