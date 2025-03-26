
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Phone, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Support = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
            <p className="text-muted-foreground mt-1">
              Get help and support for your account
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Support Ticket</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Chat with our support team in real-time
            </p>
            <Button variant="outline" className="w-full">Start Chat</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Knowledge Base</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Browse tutorials and documentation
            </p>
            <Button variant="outline" className="w-full">Browse Articles</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Get in touch via email or phone
            </p>
            <Button variant="outline" className="w-full">Contact Options</Button>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Your Support Tickets</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border/40">
              <div>
                <p className="font-medium">Setup assistance for chatbot</p>
                <p className="text-xs text-muted-foreground">Created 2 days ago</p>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">In Progress</Badge>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-border/40">
              <div>
                <p className="font-medium">API integration questions</p>
                <p className="text-xs text-muted-foreground">Created 5 days ago</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Resolved</Badge>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Billing inquiry</p>
                <p className="text-xs text-muted-foreground">Created 1 week ago</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Resolved</Badge>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm">View All Tickets</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Support;
