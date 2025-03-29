
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewChatbotPage = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/ai/chatbots");
  };

  const handleCreateChatbot = () => {
    toast.success("New chatbot created successfully!");
    navigate("/ai/chatbots");
  };

  return (
    <AppLayout>
      <div className="p-6">
        <Button 
          variant="ghost" 
          onClick={handleBackToDashboard}
          className="mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Chatbots
        </Button>
        
        <h1 className="text-2xl font-semibold mb-4">Create New Chatbot</h1>
        
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="chatbotName" className="block text-sm font-medium mb-1">Chatbot Name</label>
              <Input id="chatbotName" placeholder="e.g. Support Bot" />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                id="description" 
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="What does this chatbot do?"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">AI Model</label>
              <select 
                id="model"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-2">Claude 2</option>
              </select>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={handleBackToDashboard}>Cancel</Button>
              <Button onClick={handleCreateChatbot}>Create Chatbot</Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewChatbotPage;
