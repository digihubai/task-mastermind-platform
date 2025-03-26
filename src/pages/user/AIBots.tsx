
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AIBots = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Bots</h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI assistants and automated workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bot size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-lg">Customer Support Bot</h3>
            </div>
            <p className="text-muted-foreground mb-4">Helps with customer service requests automatically</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              <button className="text-sm text-primary">Configure</button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <Bot size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Create New Bot</h3>
            <p className="text-muted-foreground mt-1">Build a custom AI assistant</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIBots;
