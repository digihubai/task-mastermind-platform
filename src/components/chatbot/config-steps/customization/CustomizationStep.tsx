
import React from "react";
import { LogoUpload } from "./LogoUpload";
import { LanguageSelector } from "./LanguageSelector";
import { FooterLinkInput } from "./FooterLinkInput";
import { AvatarSelection } from "./AvatarSelection";
import { ColorSelection } from "./ColorSelection";
import { ToggleOptions } from "./ToggleOptions";
import { TriggerSizeSlider } from "./TriggerSizeSlider";
import { PositionSelection } from "./PositionSelection";

interface CustomizationStepProps {
  chatbotInfo: {
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
  };
  setNewChatbotInfo: (info: any) => void;
}

export const CustomizationStep: React.FC<CustomizationStepProps> = ({
  chatbotInfo,
  setNewChatbotInfo,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const updateInfo = (key: string, value: any) => {
    setNewChatbotInfo({ ...chatbotInfo, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium mb-2">Customize</h2>
        <p className="text-muted-foreground">
          Create and configure a chatbot that interacts with your users, ensuring it delivers accurate information.
        </p>
      </div>
      
      <LogoUpload fileInputRef={fileInputRef} />
      
      <LanguageSelector 
        language={chatbotInfo.language} 
        updateInfo={updateInfo} 
      />
      
      <FooterLinkInput 
        footerLink={chatbotInfo.footerLink} 
        updateInfo={updateInfo} 
      />
      
      <AvatarSelection 
        selectedAvatar={chatbotInfo.avatar} 
        updateInfo={updateInfo}
        fileInputRef={fileInputRef}
      />
      
      <ColorSelection 
        selectedColor={chatbotInfo.color} 
        updateInfo={updateInfo} 
      />
      
      <ToggleOptions 
        showLogo={chatbotInfo.showLogo}
        showDateTime={chatbotInfo.showDateTime}
        transparentTrigger={chatbotInfo.transparentTrigger}
        updateInfo={updateInfo}
      />
      
      <TriggerSizeSlider 
        triggerSize={chatbotInfo.triggerSize} 
        updateInfo={updateInfo} 
      />
      
      <PositionSelection 
        position={chatbotInfo.position} 
        updateInfo={updateInfo} 
      />
    </div>
  );
};
