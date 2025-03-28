
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import GeneralSettings from "./ai-settings/GeneralSettings";
import HumanHandoffSettings from "./ai-settings/HumanHandoffSettings";
import ChannelSettings from "./ai-settings/ChannelSettings";
import CSATSettings from "./ai-settings/CSATSettings";

interface AIAssistantSettingsProps {
  onClose: () => void;
}

const AIAssistantSettings: React.FC<AIAssistantSettingsProps> = ({ onClose }) => {
  const [assistantName, setAssistantName] = useState("Support AI");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! I'm your AI assistant. How can I help you today?");
  const [enableAutoAssign, setEnableAutoAssign] = useState(true);
  const [autoAssignThreshold, setAutoAssignThreshold] = useState("3");
  const [model, setModel] = useState("gpt-4o");
  const [enableCSAT, setEnableCSAT] = useState(true);
  const [csatThreshold, setCsatThreshold] = useState(70);
  const [channels, setChannels] = useState({
    website: true,
    email: true,
    whatsapp: true,
    messenger: true,
    telegram: false,
    slack: false,
    sms: false,
    instagram: false,
    twitter: false,
    viber: false,
    line: false,
    wechat: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your AI assistant settings have been updated"
    });
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>AI Assistant Settings</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <GeneralSettings 
          assistantName={assistantName}
          setAssistantName={setAssistantName}
          welcomeMessage={welcomeMessage}
          setWelcomeMessage={setWelcomeMessage}
          model={model}
          setModel={setModel}
        />

        <Separator />

        <HumanHandoffSettings 
          enableAutoAssign={enableAutoAssign}
          setEnableAutoAssign={setEnableAutoAssign}
          autoAssignThreshold={autoAssignThreshold}
          setAutoAssignThreshold={setAutoAssignThreshold}
        />

        <Separator />

        <ChannelSettings 
          channels={channels}
          setChannels={setChannels}
        />

        <Separator />

        <CSATSettings
          enableCSAT={enableCSAT}
          setEnableCSAT={setEnableCSAT}
          csatThreshold={csatThreshold}
          setCsatThreshold={setCsatThreshold}
        />
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIAssistantSettings;
