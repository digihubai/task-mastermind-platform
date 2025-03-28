
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { CustomerTicketForm } from '@/components/support/CustomerTicketForm';
import { useNavigate } from 'react-router-dom';

const CustomerSupportPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    // Could redirect to a confirmation page or dashboard
    // navigate('/support/tickets');
  };

  return (
    <AppLayout showModuleName moduleName="Customer Support">
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Support</h1>
        <CustomerTicketForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </AppLayout>
  );
};

export default CustomerSupportPage;
