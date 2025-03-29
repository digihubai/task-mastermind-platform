
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ChatbotConfigPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
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
        
        <h1 className="text-2xl font-semibold mb-4">Configure Chatbot</h1>
        <p>Configuration options for chatbot ID: {id}</p>
        
        {/* Configuration form would go here */}
      </div>
    </AppLayout>
  );
};

export default ChatbotConfigPage;
