
import React, { useState } from "react";
import { SupportTicket } from "@/types/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Detailed description of your issue"
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority
              </label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!isCustomer && (
            <div>
              <label htmlFor="department" className="block text-sm font-medium mb-1">
                Department
              </label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleChange("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isCustomer ? "Submit Request" : "Create Ticket"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
