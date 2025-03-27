
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Digihub</h1>
        <p className="text-muted-foreground">
          Your AI-powered workspace for streamlining business operations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-medium mb-2">CRM & Sales</h2>
            <p className="text-muted-foreground">Manage customer relationships and optimize sales processes</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-medium mb-2">Marketing</h2>
            <p className="text-muted-foreground">Create and manage marketing campaigns with AI assistance</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-medium mb-2">Customer Support</h2>
            <p className="text-muted-foreground">AI-powered support agents with human takeover capabilities</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
