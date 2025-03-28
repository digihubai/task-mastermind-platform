
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SupportTicket } from "@/types/support";
import { TicketCategoryField } from "@/components/support/form-fields/TicketCategoryField";
import { TicketDepartmentField } from "@/components/support/form-fields/TicketDepartmentField";
import { TicketPriorityField } from "@/components/support/form-fields/TicketPriorityField";

interface NewTicketSectionProps {
  showNewTicketForm: boolean;
  setShowNewTicketForm: (show: boolean) => void;
  onCreateTicket: (ticket: Partial<SupportTicket>) => void;
}

export const NewTicketSection: React.FC<NewTicketSectionProps> = ({
  showNewTicketForm,
  setShowNewTicketForm,
  onCreateTicket
}) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Technical"); 
  const [department, setDepartment] = useState("Support");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting ticket with category:", category, "and department:", department);
    
    onCreateTicket({
      subject,
      description,
      priority,
      category,
      department
    });

    // Reset form
    setSubject("");
    setDescription("");
    setPriority("medium");
    setCategory("Technical");
    setDepartment("Support");
  };

  if (!showNewTicketForm) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <Button onClick={() => setShowNewTicketForm(true)}>
          Create New Ticket
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Create New Support Ticket</CardTitle>
          <Button 
            variant="outline"
            onClick={() => setShowNewTicketForm(false)}
          >
            Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 h-32"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TicketPriorityField
              value={priority}
              onChange={setPriority}
            />
            
            <TicketCategoryField
              value={category}
              onChange={(value) => {
                console.log("Setting category to:", value);
                setCategory(value);
              }}
            />
            
            <TicketDepartmentField
              value={department}
              onChange={(value) => {
                console.log("Setting department to:", value);
                setDepartment(value);
              }}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              Create Ticket
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
