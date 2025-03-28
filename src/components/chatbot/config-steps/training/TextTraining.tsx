
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TextTrainingProps {
  onSkip: () => void;
}

export const TextTraining: React.FC<TextTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  
  const handleAddText = () => {
    if (!textContent.trim()) {
      toast({
        variant: "destructive",
        title: "Text required",
        description: "Please enter some text content to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate text processing
    setTimeout(() => {
      setIsLoading(false);
      setTextContent("");
      toast({
        title: "Text processed",
        description: "Text content has been processed and knowledge has been extracted."
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-content" className="mb-2 block">Add Text Content</Label>
        <Textarea 
          id="text-content"
          className="h-40 resize-none focus:ring-2 focus:ring-primary/30"
          placeholder="Paste or type text content here that your chatbot should learn from..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </div>
      <Button 
        className="w-full"
        onClick={handleAddText}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : "Add Text Content"}
      </Button>
    </div>
  );
};
