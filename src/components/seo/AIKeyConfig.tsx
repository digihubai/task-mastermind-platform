
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import { setOpenAIApiKey, getOpenAIApiKey } from '@/services/ai/contentGenerationAI';

interface AIKeyConfigProps {
  onValidKeySet?: () => void;
}

const AIKeyConfig: React.FC<AIKeyConfigProps> = ({ onValidKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showKey, setShowKey] = useState(false);
  
  useEffect(() => {
    // Load saved API key on component mount
    const savedKey = getOpenAIApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsValid(true);
    }
  }, []);
  
  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsValidating(true);
    try {
      // For now, we'll simply accept any key (validation will be added later)
      setOpenAIApiKey(apiKey);
      setIsValid(true);
      
      if (onValidKeySet) {
        onValidKeySet();
      }
      
      toast.success("API key saved successfully");
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>AI Integration Settings</CardTitle>
        <CardDescription>
          Configure API keys for AI content generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="openai-key"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                />
                {isValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowKey(!showKey)}
                type="button"
              >
                {showKey ? "Hide" : "Show"}
              </Button>
              <Button 
                onClick={handleSaveKey}
                disabled={isValidating}
              >
                {isValidating ? "Validating..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-blue-800 dark:text-blue-300">
              <p className="font-medium">Need an OpenAI API key?</p>
              <p className="mt-1">You can get one from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI website</a>. We recommend using gpt-4o-mini for best results.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIKeyConfig;
