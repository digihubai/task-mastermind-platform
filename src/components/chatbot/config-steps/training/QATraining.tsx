
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface QATrainingProps {
  onSkip: () => void;
}

interface QAPair {
  id: string;
  question: string;
  answer: string;
  trained: boolean;
  selected?: boolean;
}

export const QATraining: React.FC<QATrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [savedQAPairs, setSavedQAPairs] = useState<QAPair[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  
  const handleAddQA = () => {
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Question required",
        description: "Please enter a question to continue."
      });
      return;
    }
    
    if (!answer.trim()) {
      toast({
        variant: "destructive",
        title: "Answer required",
        description: "Please enter an answer to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Save the Q&A pair
      const newPairId = Date.now().toString();
      setSavedQAPairs([...savedQAPairs, {
        id: newPairId,
        question: question,
        answer: answer,
        trained: false,
        selected: false
      }]);
      
      // Reset input fields
      setQuestion("");
      setAnswer("");
      
      toast({
        title: "Q&A pair added",
        description: "Question and answer have been saved and are ready for training."
      });
    }, 1000);
  };
  
  const handleTrainAll = () => {
    // Simulate training process
    toast({
      title: "Training started",
      description: "Your Q&A pairs are being processed for training."
    });
    
    setTimeout(() => {
      setSavedQAPairs(savedQAPairs.map(pair => ({...pair, trained: true})));
      toast({
        title: "Training complete",
        description: "All Q&A pairs have been successfully trained."
      });
    }, 2000);
  };
  
  const handleDeletePair = (id: string) => {
    setSavedQAPairs(savedQAPairs.filter(pair => pair.id !== id));
    toast({
      title: "Q&A pair removed",
      description: "The question and answer have been removed from training."
    });
  };

  const handleEditPair = (pair: QAPair) => {
    setEditingId(pair.id);
    setEditQuestion(pair.question);
    setEditAnswer(pair.answer);
  };

  const handleSaveEdit = () => {
    if (!editQuestion.trim()) {
      toast({
        variant: "destructive",
        title: "Question required",
        description: "Please enter a question to continue."
      });
      return;
    }
    
    if (!editAnswer.trim()) {
      toast({
        variant: "destructive",
        title: "Answer required",
        description: "Please enter an answer to continue."
      });
      return;
    }

    setSavedQAPairs(savedQAPairs.map(pair => 
      pair.id === editingId 
        ? { ...pair, question: editQuestion, answer: editAnswer, trained: false } 
        : pair
    ));

    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");

    toast({
      title: "Q&A pair updated",
      description: "Your question and answer have been updated successfully."
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleSelectAll = () => {
    setSavedQAPairs(savedQAPairs.map(pair => ({ ...pair, selected: true })));
  };

  const handleToggleSelect = (id: string) => {
    setSavedQAPairs(savedQAPairs.map(pair => 
      pair.id === id ? { ...pair, selected: !pair.selected } : pair
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
        <h3 className="text-base font-medium flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">1</span>
          Add Question & Answer
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="question" className="mb-2 block">Question</Label>
          <Input 
            id="question"
            placeholder="Enter a question your users might ask"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="answer" className="mb-2 block">Answer</Label>
          <Textarea 
            id="answer"
            className="h-40 resize-none focus:ring-2 focus:ring-primary/30"
            placeholder="Enter the answer to the question"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        
        <Button 
          className="w-full"
          onClick={handleAddQA}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      
      {savedQAPairs.length > 0 && (
        <>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4 mt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">2</span>
                Manage Q&A Pairs
              </h3>
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {savedQAPairs.map((pair) => (
              <div key={pair.id} className="border rounded-md p-3">
                {editingId === pair.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                      placeholder="Edit question"
                    />
                    <Textarea
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      placeholder="Edit answer"
                      className="h-32 resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4" 
                          checked={pair.selected || false}
                          onChange={() => handleToggleSelect(pair.id)}
                        />
                        <span className="font-medium">{pair.question.length > 40 ? pair.question.substring(0, 40) + '...' : pair.question}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${pair.trained ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {pair.trained ? 'Trained' : 'Not Trained'}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => handleEditPair(pair)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePair(pair.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {pair.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleTrainAll}>
            Train Chatbot
          </Button>
        </>
      )}
      
      <Button 
        variant="secondary" 
        className="w-full mt-4"
        onClick={() => onSkip()}
      >
        Next
      </Button>
    </div>
  );
};
