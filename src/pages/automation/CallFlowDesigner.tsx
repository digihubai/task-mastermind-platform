
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { CallFlowDesigner } from "@/components/support/CallFlowDesigner";
import { CallFlow } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CallFlowDesignerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // This would normally come from your API
  const initialFlow: CallFlow | undefined = id 
    ? {
        id: id,
        name: "Customer Support IVR",
        description: "Interactive voice response system for customer support",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nodes: [
          {
            id: "start-node",
            type: "greeting",
            position: { x: 100, y: 100 },
            data: { message: "Welcome to customer support. How can I help you today?" }
          }
        ],
        edges: [],
        isActive: true,
        language: "en",
        voiceType: "natural-female"
      }
    : undefined;

  const handleSave = (flow: CallFlow) => {
    setIsLoading(true);
    // This would normally be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Call Flow Saved",
        description: "Your call flow has been saved successfully."
      });
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/automation/workflows")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {id ? "Edit Call Flow" : "Create New Call Flow"}
            </h1>
          </div>
          <Button 
            onClick={() => handleSave(initialFlow!)} 
            disabled={isLoading}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Flow
          </Button>
        </div>
        
        <CallFlowDesigner 
          flow={initialFlow} 
          onSave={handleSave} 
        />
      </div>
    </AppLayout>
  );
};

export default CallFlowDesignerPage;
