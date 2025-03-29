
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ChatbotConfigView } from "@/components/chatbot/ChatbotConfigView";

const ChatbotConfigPage = () => {
  const { id } = useParams();
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
    iframeWidth: 420,
    iframeHeight: 745,
  });

  const handleBackToDashboard = () => {
    navigate("/ai/chatbots");
  };

  const handleNextStep = () => {
    if (configStep < 4) {
      setConfigStep(configStep + 1);
    } else {
      // Complete configuration and redirect
      navigate("/ai/chatbots");
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        <ChatbotConfigView
          selectedChatbot={id}
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

export default ChatbotConfigPage;
