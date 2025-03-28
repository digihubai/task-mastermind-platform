
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface QATrainingProps {
  onSkip: () => void;
}

export const QATraining: React.FC<QATrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaItems, setQaItems] = useState<{question: string; answer: string}[]>([]);
  
  const handleAddQa = () => {
    if (!question.trim() || !answer.trim()) {
      toast({
        variant: "destructive",
        title: "Incomplete Q&A",
        description: "Please enter both a question and an answer."
      });
      return;
    }
    
    setQaItems([...qaItems, { question, answer }]);
    setQuestion("");
    setAnswer("");
    
    toast({
      title: "Q&A added",
      description: "Question and answer pair has been added successfully."
    });
  };
  
  const handleSaveQaSet = () => {
    if (qaItems.length === 0) {
      toast({
        variant: "destructive",
        title: "No Q&A pairs",
        description: "Please add at least one question and answer pair."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate saving Q&A set
    setTimeout(() => {
      setIsLoading(false);
      setQaItems([]);
      toast({
        title: "Q&A set saved",
        description: `${qaItems.length} question and answer pair(s) have been saved.`
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-4 border p-4 rounded-lg">
        <div>
          <Label htmlFor="qa-question" className="block text-sm font-medium mb-1">Question</Label>
          <Input 
            id="qa-question"
            placeholder="How do I reset my password?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="qa-answer" className="block text-sm font-medium mb-1">Answer</Label>
          <Textarea 
            id="qa-answer"
            className="h-20 resize-none focus:ring-2 focus:ring-primary/30"
            placeholder="To reset your password, click on the 'Forgot Password' link on the login page..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          className="flex-1"
          onClick={handleAddQa}
          disabled={!question.trim() || !answer.trim()}
        >
          <Plus size={16} className="mr-1" />
          Add Q&A Pair
        </Button>
        <Button 
          variant="default" 
          className="flex-1"
          onClick={handleSaveQaSet}
          disabled={isLoading || qaItems.length === 0}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : "Save Q&A Set"}
        </Button>
      </div>
      
      {qaItems.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">Added Q&A Pairs ({qaItems.length})</h3>
          <div className="max-h-[200px] overflow-y-auto space-y-2">
            {qaItems.map((item, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-md">
                <p className="font-medium text-sm">{item.question}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
