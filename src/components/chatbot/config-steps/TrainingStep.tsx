
import React, { useState } from "react";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  WebsiteTraining,
  PDFTraining,
  TextTraining, 
  QATraining,
  SkipButton,
  TrainingTabs
} from "./training";

interface TrainingStepProps {
  newChatbotInfo: any;
  setNewChatbotInfo: (info: any) => void;
}

export const TrainingStep: React.FC<TrainingStepProps> = ({ newChatbotInfo, setNewChatbotInfo }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"website" | "pdf" | "text" | "qa">("website");
  
  const handleSkip = () => {
    toast({
      title: "Training skipped",
      description: "You can train your chatbot later from the dashboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Chatbot Training</h2>
        <p className="text-muted-foreground">
          This step is optional but highly recommended to personalize your chatbot experience.
        </p>
      </div>
      
      <SkipButton onSkip={handleSkip} />
      
      <Tabs value={activeTab} className="w-full">
        <TrainingTabs 
          activeTab={activeTab} 
          onTabChange={(tab) => setActiveTab(tab)} 
        />
        
        <TabsContent value="website" className="space-y-6">
          <WebsiteTraining onSkip={handleSkip} />
        </TabsContent>
        
        <TabsContent value="pdf" className="space-y-4">
          <PDFTraining onSkip={handleSkip} />
        </TabsContent>
        
        <TabsContent value="text" className="space-y-4">
          <TextTraining onSkip={handleSkip} />
        </TabsContent>
        
        <TabsContent value="qa" className="space-y-4">
          <QATraining onSkip={handleSkip} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
