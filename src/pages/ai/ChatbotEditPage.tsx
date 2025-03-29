
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { ChatbotEditView } from "@/components/chatbot/ChatbotEditView";
import { useParams, useNavigate } from "react-router-dom";

const ChatbotEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/ai/chatbots");
  };

  return (
    <AppLayout>
      <div className="p-6">
        <ChatbotEditView 
          handleBackToDashboard={handleBackToDashboard} 
          chatbotId={id || ""}
        />
      </div>
    </AppLayout>
  );
};

export default ChatbotEditPage;
