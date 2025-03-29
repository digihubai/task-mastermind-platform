
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ChatbotConfigStep } from "./ChatbotConfigStep";
import { ChatInterface } from "./ChatInterface";
import { Card } from "@/components/ui/card";

interface ChatbotConfigViewProps {
  selectedChatbot: string | null;
  configStep: number;
  setConfigStep: (step: number) => void;
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
    personality: string;
    iframeWidth?: number;
    iframeHeight?: number;
  };
  setNewChatbotInfo: (info: any) => void;
  handleNextStep: () => void;
  handleBackToDashboard: () => void;
}

export const ChatbotConfigView: React.FC<ChatbotConfigViewProps> = ({
  selectedChatbot,
  configStep,
  setConfigStep,
  newChatbotInfo,
  setNewChatbotInfo,
  handleNextStep,
  handleBackToDashboard,
}) => {
  const stepTitles = ["configure", "customize", "train", "embed"];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft size={16} className="mr-1" />
          Close
        </Button>
        <span className="text-muted-foreground">
          {selectedChatbot ? `Editing: ${selectedChatbot}` : "New Chatbot"}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`flex-1 text-center pb-2 border-b-2 ${
                  configStep === step ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
                } cursor-pointer`}
                onClick={() => setConfigStep(step)}
              >
                <span className="mr-1">{step}</span>
                <span className="hidden md:inline">{stepTitles[step-1]}</span>
              </div>
            ))}
          </div>
          
          <Card className="p-6">
            <ChatbotConfigStep 
              step={configStep} 
              newChatbotInfo={newChatbotInfo} 
              setNewChatbotInfo={setNewChatbotInfo}
            />
            
            <div className="mt-8 flex justify-between">
              {configStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setConfigStep(configStep - 1)}
                  className="px-6"
                >
                  Back
                </Button>
              )}
              <div className="flex-1"></div>
              <Button 
                variant="default" 
                onClick={handleNextStep}
                className="px-6"
              >
                {configStep < 4 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="hidden lg:block">
          <div className="bg-muted/50 rounded-lg h-full flex items-center justify-center p-6 relative">
            <ChatInterface 
              title={newChatbotInfo.title || "digibot"}
              config={{
                initialMessage: newChatbotInfo.welcomeMessage,
                modelName: "gpt-4o",
                maxTokens: 150,
                temperature: 0.7
              }}
              variant="embedded"
              showBranding={newChatbotInfo.showLogo}
              accentColor={newChatbotInfo.color}
              triggerSize={newChatbotInfo.triggerSize}
              transparentTrigger={newChatbotInfo.transparentTrigger}
              avatar={newChatbotInfo.avatar}
              position={newChatbotInfo.position}
              showDateTime={newChatbotInfo.showDateTime}
              language={newChatbotInfo.language}
              width={newChatbotInfo.iframeWidth}
              height={newChatbotInfo.iframeHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
