
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NewTicketForm } from './NewTicketForm';
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomerTicketFormProps {
  onSubmitSuccess?: () => void;
}

export const CustomerTicketForm: React.FC<CustomerTicketFormProps> = ({ 
  onSubmitSuccess 
}) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<'contact' | 'details'>('contact');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: "Required information missing",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }
    setStep('details');
  };
  
  const handleSubmit = (ticketData: Partial<SupportTicket>) => {
    // Here you would typically make an API call to submit the ticket with customer info
    console.log('Customer ticket submitted:', { ...ticketData, customer: customerInfo });
    
    // Show success message
    toast({
      title: "Support request submitted",
      description: "We've received your request and will get back to you soon."
    });
    
    setSubmitted(true);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };
  
  const handleNewTicket = () => {
    setSubmitted(false);
    setStep('contact');
  };
  
  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Submitted</CardTitle>
          <CardDescription>Thank you for contacting support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.</p>
          <p>You will receive updates on your request via email at <strong>{customerInfo.email}</strong>.</p>
          <div className="flex justify-end">
            <Button 
              onClick={handleNewTicket}
              className="text-primary hover:underline"
            >
              Submit another request
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (step === 'contact') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Please provide your contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  value={customerInfo.company}
                  onChange={handleCustomerInfoChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Continue to Support Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Submit a new support request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">{customerInfo.name}</p>
              <p className="text-sm text-muted-foreground">{customerInfo.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setStep('contact')}
            >
              Edit Contact Info
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            Please provide details about your issue, and our support team will get back to you as soon as possible.
          </p>
        </CardContent>
      </Card>
      
      <NewTicketForm 
        onSubmit={handleSubmit}
        onCancel={() => {
          setStep('contact');
        }}
        isCustomer={true}
      />
    </div>
  );
};
