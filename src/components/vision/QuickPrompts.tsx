
import React from "react";
import { Button } from "@/components/ui/button";

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const QuickPrompts = ({ onSelectPrompt }: QuickPromptsProps) => {
  const prompts = [
    "Explain an Image",
    "Summarize a book for research",
    "Translate a book"
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {prompts.map((prompt) => (
        <Button 
          key={prompt}
          variant="secondary" 
          size="sm" 
          className="rounded-full"
          onClick={() => onSelectPrompt(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
};

export default QuickPrompts;
