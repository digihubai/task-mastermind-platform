
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { ChatbotConfigView } from "@/components/chatbot/ChatbotConfigView";
import { toast } from "sonner";

const NewChatbotPage = () => {
  const navigate = useNavigate();
  const [configStep, setConfigStep] = useState(1);
  const [newChatbotInfo, setNewChatbotInfo] = useState({
    title: "digibot",
    bubbleMessage: "Hey there, How can I help you?",
    welcomeMessage: "Hi, how can I help you?",
    instructions: "Explain chatbot role",
    language: "en",
    showLogo: true,
    showDateTime: true,
    transparentTrigger: false,
    triggerSize: 60,
    position: "left" as "left" | "right",
    color: "#4361ee",
    avatar: "avatar1",
    footerLink: "https://digihub.ai",
    personality: "helpful",
  });

  const handleBackToDashboard = () => {
    navigate("/ai/chatbots");
  };

  const handleNextStep = () => {
    if (configStep < 4) {
      setConfigStep(configStep + 1);
    } else {
      // Submit the chatbot configuration
      toast.success("New chatbot created successfully!");
      navigate("/ai/chatbots");
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        <ChatbotConfigView
          selectedChatbot={null}
          configStep={configStep}
          setConfigStep={setConfigStep}
          newChatbotInfo={newChatbotInfo}
          setNewChatbotInfo={setNewChatbotInfo}
          handleNextStep={handleNextStep}
          handleBackToDashboard={handleBackToDashboard}
        />
      </div>
    </AppLayout>
  );
};

export default NewChatbotPage;
