
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ChatbotEditViewProps {
  handleBackToDashboard: () => void;
  chatbotId: string;
}

export const ChatbotEditView: React.FC<ChatbotEditViewProps> = ({
  handleBackToDashboard,
  chatbotId,
}) => {
  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={handleBackToDashboard}
        className="mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Chatbots
      </Button>
      
      <h1 className="text-2xl font-semibold mb-4">Edit Chatbot</h1>
      <p>Editing chatbot ID: {chatbotId}</p>
      {/* Edit form would go here */}
    </div>
  );
};
