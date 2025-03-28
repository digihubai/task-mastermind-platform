
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface TextTrainingProps {
  onSkip: () => void;
}

interface SavedContent {
  id: string;
  title: string;
  trained: boolean;
  selected?: boolean;
}

export const TextTraining: React.FC<TextTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [savedContents, setSavedContents] = useState<SavedContent[]>([]);
  
  const handleAddText = () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please enter a title for this content."
      });
      return;
    }
    
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
      
      // Save the content
      const newContentId = Date.now().toString();
      setSavedContents([...savedContents, {
        id: newContentId,
        title: title,
        trained: false,
        selected: false
      }]);
      
      // Reset input fields
      setTitle("");
      setTextContent("");
      
      toast({
        title: "Content saved",
        description: "Text content has been saved and is ready for training."
      });
    }, 1000);
  };
  
  const handleTrainAll = () => {
    // Simulate training process
    toast({
      title: "Training started",
      description: "Your content is being processed for training."
    });
    
    setTimeout(() => {
      setSavedContents(savedContents.map(content => ({...content, trained: true})));
      toast({
        title: "Training complete",
        description: "All content has been successfully trained."
      });
    }, 2000);
  };
  
  const handleDeleteContent = (id: string) => {
    setSavedContents(savedContents.filter(content => content.id !== id));
    toast({
      title: "Content removed",
      description: "The content has been removed from training."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
        <h3 className="text-base font-medium flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">1</span>
          Add Text
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="text-title" className="mb-2 block">Title</Label>
          <Input 
            id="text-title"
            placeholder="Type your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="text-content" className="mb-2 block">Text</Label>
          <Textarea 
            id="text-content"
            className="h-40 resize-none focus:ring-2 focus:ring-primary/30"
            placeholder="Type your text here"
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
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      
      {savedContents.length > 0 && (
        <>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4 mt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">2</span>
                Manage Content
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSavedContents(savedContents.map(c => ({...c, selected: true})))}>
                Select All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {savedContents.map((content) => (
              <div key={content.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" checked={content.selected || false} />
                  <span>{content.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${content.trained ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {content.trained ? 'Trained' : 'Not Trained'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteContent(content.id)}>
                    &times;
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleTrainAll}>
            Train GPT
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
