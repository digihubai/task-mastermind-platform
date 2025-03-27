
import React from "react";
import { Button } from "@/components/ui/button";

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const QuickPrompts = ({ onSelectPrompt }: QuickPromptsProps) => {
  const prompts = [
    "What's in this image?",
    "Describe this for social media",
    "Identify key objects",
    "Extract colors from this image"
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelectPrompt(prompt)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
};

export default QuickPrompts;
