
import React from "react";
import { BasicConfigStep } from "./config-steps/BasicConfigStep";
import { CustomizationStep } from "./config-steps/CustomizationStep";
import { TrainingStep } from "./config-steps/TrainingStep";
import { EmbedStep } from "./config-steps/EmbedStep";

interface ChatbotConfigStepProps {
  step: number;
  newChatbotInfo: any;
  setNewChatbotInfo: (info: any) => void;
}

export const ChatbotConfigStep: React.FC<ChatbotConfigStepProps> = ({
  step,
  newChatbotInfo,
  setNewChatbotInfo,
}) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicConfigStep
            newChatbotInfo={newChatbotInfo}
            setNewChatbotInfo={setNewChatbotInfo}
          />
        );
      case 2:
        return (
          <CustomizationStep
            newChatbotInfo={newChatbotInfo}
            setNewChatbotInfo={setNewChatbotInfo}
          />
        );
      case 3:
        return (
          <TrainingStep
            newChatbotInfo={newChatbotInfo}
            setNewChatbotInfo={setNewChatbotInfo}
          />
        );
      case 4:
        return (
          <EmbedStep
            newChatbotInfo={newChatbotInfo}
            setNewChatbotInfo={setNewChatbotInfo}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};
