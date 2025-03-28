
import React from "react";
import { 
  BasicConfigStep,
  CustomizationStep, 
  TrainingStep, 
  EmbedStep
} from "./config-steps";

interface ChatbotConfigStepProps {
  step: number;
  newChatbotInfo: {
    title: string;
    bubbleMessage: string;
    welcomeMessage: string;
    instructions: string;
    language: string;
    showLogo: boolean;
    showDateTime: boolean;
    transparentTrigger: boolean;
    triggerSize: number;
    position: "left" | "right";
    color: string;
    avatar: string;
    footerLink: string;
  };
  setNewChatbotInfo: (info: any) => void;
}

export const ChatbotConfigStep: React.FC<ChatbotConfigStepProps> = ({
  step,
  newChatbotInfo,
  setNewChatbotInfo,
}) => {
  switch (step) {
    case 1:
      return <BasicConfigStep chatbotInfo={newChatbotInfo} setNewChatbotInfo={setNewChatbotInfo} />;
    case 2:
      return <CustomizationStep chatbotInfo={newChatbotInfo} setNewChatbotInfo={setNewChatbotInfo} />;
    case 3:
      return <TrainingStep />;
    case 4:
      return <EmbedStep />;
    default:
      return null;
  }
};
