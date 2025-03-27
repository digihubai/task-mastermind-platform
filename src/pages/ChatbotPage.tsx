
import React, { useState } from "react";
import { toast } from "sonner";
import { Bot, User } from "lucide-react";
import { ChatbotDashboard } from "@/components/chatbot/ChatbotDashboard";
import { ChatbotConfigView } from "@/components/chatbot/ChatbotConfigView";
import { ChatbotEditView } from "@/components/chatbot/ChatbotEditView";

const ChatbotPage = () => {
  const [chatbotView, setChatbotView] = useState<"list" | "create" | "edit" | "configure">("list");
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  const [configStep, setConfigStep] = useState(1);
  const [newChatbotInfo, setNewChatbotInfo] = useState({
    title: "",
    bubbleMessage: "Hey there, how can I help you?",
    welcomeMessage: "Hi, how can I help you?",
    instructions: "",
    language: "auto"
  });
  
  const activeChatbots = [
    {
      id: "1",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-blue-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "2",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-purple-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "3",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-green-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "4",
      name: "Digi",
      avatar: <User className="text-white" />,
      avatarBg: "bg-orange-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "5",
      name: "Digi",
      avatar: <User className="text-white" />,
      avatarBg: "bg-red-500",
      status: "active",
      createdAt: "3 days ago"
    }
  ];
  
  const handleNewChatbot = () => {
    setChatbotView("create");
  };
  
  const handleEditChatbot = (id: string) => {
    setSelectedChatbot(id);
    setChatbotView("edit");
  };
  
  const handleViewHistory = () => {
    toast.info("Chat history feature coming soon");
  };
  
  const handleConfigureChatbot = (id: string) => {
    setSelectedChatbot(id);
    setChatbotView("configure");
    setConfigStep(1);
  };
  
  const handleBackToDashboard = () => {
    setChatbotView("list");
    setSelectedChatbot(null);
    setConfigStep(1);
  };
  
  const handleNextStep = () => {
    if (configStep < 4) {
      setConfigStep(configStep + 1);
    } else {
      toast.success("Chatbot configuration completed!");
      setChatbotView("list");
    }
  };
  
  console.log("Rendering ChatbotPage, view:", chatbotView);
  
  return (
    <div className="p-6 animate-fade-in">
      {chatbotView === "list" && (
        <ChatbotDashboard
          activeChatbots={activeChatbots}
          onNewChatbot={handleNewChatbot}
          onEditChatbot={handleEditChatbot}
          onConfigureChatbot={handleConfigureChatbot}
          onViewHistory={handleViewHistory}
        />
      )}
      
      {(chatbotView === "configure" || chatbotView === "create") && (
        <ChatbotConfigView
          selectedChatbot={selectedChatbot}
          configStep={configStep}
          setConfigStep={setConfigStep}
          newChatbotInfo={newChatbotInfo}
          setNewChatbotInfo={setNewChatbotInfo}
          handleNextStep={handleNextStep}
          handleBackToDashboard={handleBackToDashboard}
        />
      )}
      
      {chatbotView === "edit" && (
        <ChatbotEditView
          handleBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default ChatbotPage;
