
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logger from '@/utils/logger';

const Index = () => {
  logger.debug("Rendering Index page");
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Digihub</h1>
      <p className="text-muted-foreground mb-6">
        Your AI-powered workspace for streamlining business operations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Link to="/crm" className="block">
          <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium mb-2">CRM & Sales</h2>
            <p className="text-muted-foreground">Manage customer relationships and optimize sales processes</p>
          </div>
        </Link>
        
        <Link to="/ai/tools" className="block">
          <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium mb-2">AI Tools</h2>
            <p className="text-muted-foreground">Access powerful AI tools to enhance your productivity</p>
          </div>
        </Link>
        
        <Link to="/ai/chatbots" className="block">
          <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium mb-2">AI Chatbots</h2>
            <p className="text-muted-foreground">Create and manage AI-powered chatbots</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">1. Explore CRM Module</h3>
            <p className="text-muted-foreground mb-2">Manage your contacts, deals, and customer interactions in one place.</p>
            <Button asChild variant="outline">
              <Link to="/crm">Open CRM</Link>
            </Button>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">2. Try AI Tools</h3>
            <p className="text-muted-foreground mb-2">Enhance your productivity with our suite of AI-powered tools.</p>
            <Button asChild variant="outline">
              <Link to="/ai/tools">Explore AI Tools</Link>
            </Button>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">3. Create Chatbots</h3>
            <p className="text-muted-foreground mb-2">Build AI chatbots to automate customer interactions.</p>
            <Button asChild variant="outline">
              <Link to="/ai/chatbots">Create Chatbots</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
