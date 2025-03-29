
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatbotConfigStep } from "./ChatbotConfigStep";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface ChatbotEditViewProps {
  handleBackToDashboard: () => void;
  chatbotId: string;
}

export const ChatbotEditView: React.FC<ChatbotEditViewProps> = ({
  handleBackToDashboard,
  chatbotId,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [chatbotInfo, setChatbotInfo] = useState({
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

  useEffect(() => {
    // In a real app, fetch the chatbot info based on chatbotId
    console.log("Fetching chatbot with ID:", chatbotId);
    // Mock data fetching
    setTimeout(() => {
      toast.info("Chatbot data loaded");
    }, 1000);
  }, [chatbotId]);

  const handleSave = () => {
    toast.success("Chatbot updated successfully!");
    handleBackToDashboard();
  };
  
  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 4) {
      setStep(newStep);
    }
  };

  const stepTitles = ["Configure", "Customize", "Train", "Embed"];

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
      
      <div className="flex gap-4 mb-6">
        {stepTitles.map((title, index) => (
          <Button
            key={index}
            variant={step === index + 1 ? "default" : "outline"}
            onClick={() => handleStepChange(index + 1)}
            className="flex-1"
          >
            <span className="mr-2">{index + 1}</span>
            {title}
          </Button>
        ))}
      </div>
      
      <Card className="p-6">
        <ChatbotConfigStep
          step={step}
          newChatbotInfo={chatbotInfo}
          setNewChatbotInfo={setChatbotInfo}
        />
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => handleStepChange(step - 1)}
            disabled={step === 1}
          >
            Back
          </Button>
          
          {step < 4 ? (
            <Button onClick={() => handleStepChange(step + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
