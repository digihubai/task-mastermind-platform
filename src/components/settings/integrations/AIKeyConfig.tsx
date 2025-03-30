
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Key, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { 
  getOpenAIApiKey, 
  setOpenAIApiKey, 
  validateAPIKey 
} from "@/services/ai/contentGenerationAI";

interface AIKeyConfigProps {
  onValidKeySet?: () => void;
}

const AIKeyConfig: React.FC<AIKeyConfigProps> = ({ onValidKeySet }) => {
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [hasConfiguredKey, setHasConfiguredKey] = useState<boolean>(false);
  
  useEffect(() => {
    const savedKey = getOpenAIApiKey();
    if (savedKey) {
      setOpenAIKey("•".repeat(32)); // Mask the key
      setHasConfiguredKey(true);
    }
  }, []);

  const handleUpdateKey = async () => {
    if (!openAIKey || openAIKey.trim() === "" || openAIKey === "•".repeat(32)) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await validateAPIKey(openAIKey);
      if (isValid) {
        setHasConfiguredKey(true);
        if (onValidKeySet) onValidKeySet();
      }
    } catch (error) {
      console.error("Error validating API key:", error);
      toast.error("Failed to validate API key");
    } finally {
      setIsValidating(false);
    }
  };

  const handleResetKey = () => {
    if (confirm("Are you sure you want to reset your API key? This will remove your current key.")) {
      setOpenAIApiKey("");
      setOpenAIKey("");
      setHasConfiguredKey(false);
      toast.success("API key has been reset");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          OpenAI API Key Configuration
        </CardTitle>
        <CardDescription>
          Configure your OpenAI API key to use AI-powered features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Key className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Your OpenAI API Key</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter your OpenAI API key (starts with sk-)"
              className="flex-1"
            />
            <Button 
              onClick={handleUpdateKey}
              disabled={isValidating}
            >
              {isValidating ? "Validating..." : "Save Key"}
            </Button>
            {hasConfiguredKey && (
              <Button variant="outline" onClick={handleResetKey}>
                Reset
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your API key is stored locally in your browser and never sent to our servers
          </p>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-900/20">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            <span className="font-medium">Where to find your API key:</span>{" "}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Visit OpenAI Dashboard
            </a>
          </AlertDescription>
        </Alert>

        <Alert className="bg-amber-50 dark:bg-amber-900/20">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            Using AI features requires an active OpenAI account with available credits.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AIKeyConfig;
