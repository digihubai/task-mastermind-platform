
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand, Check } from "lucide-react";
import { toast } from "sonner";
import KeywordsStep from './KeywordsStep';
import TitleStep from './TitleStep';
import OutlineStep from './OutlineStep';
import ContentGenerationStep from './ContentGenerationStep';
import AIKeyConfig from './AIKeyConfig';
import { getOpenAIApiKey } from '@/services/ai';
import StepIndicator from './StepIndicator';

interface SEOContentGeneratorProps {
  generateKeywords: (topic: string, count?: number) => Promise<string[]>;
  generateTitles: (topic: string, keywords: string[], count?: number) => Promise<string[]>;
  generateOutline: (topic: string, keywords: string[], title: string) => Promise<string>;
}

const SEOContentGenerator: React.FC<SEOContentGeneratorProps> = ({
  generateKeywords,
  generateTitles,
  generateOutline
}) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasValidApiKey, setHasValidApiKey] = useState(false);
  const [seoData, setSeoData] = useState({
    topic: '',
    keywords: [],
    keywordCount: 10,
    selectedKeywords: [],
    titles: [],
    selectedTitle: '',
    outline: '',
    outlines: [],
    selectedOutline: null,
    generatedContent: '',
    images: []
  });

  useEffect(() => {
    // Check if we have a valid API key
    const apiKey = getOpenAIApiKey();
    if (apiKey) {
      setHasValidApiKey(true);
    }
  }, []);

  const handleDataChange = (field: string, value: any) => {
    setSeoData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleNextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleRegenerateContent = async () => {
    setIsGenerating(true);
    try {
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error regenerating content:", error);
      toast.error("Failed to regenerate content");
      setIsGenerating(false);
    }
  };

  const handleValidKeySet = () => {
    setHasValidApiKey(true);
    toast.success("API key validated and saved!");
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SEO Content Generator</h1>
        <p className="text-muted-foreground">
          Create SEO-optimized content with AI assistance
        </p>
      </div>

      {!hasValidApiKey && (
        <AIKeyConfig onValidKeySet={handleValidKeySet} />
      )}

      <div className="space-y-8">
        <StepIndicator currentStep={step} totalSteps={4} />

        {step === 1 && (
          <KeywordsStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNextStep}
            generateKeywords={generateKeywords}
          />
        )}

        {step === 2 && (
          <TitleStep
            seoData={seoData}
            onDataChange={handleDataChange}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            generateTitles={generateTitles}
          />
        )}

        {step === 3 && (
          <OutlineStep
            seoData={seoData}
            onDataChange={handleDataChange}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            generateOutline={generateOutline}
          />
        )}

        {step === 4 && (
          <ContentGenerationStep
            seoData={seoData}
            isGenerating={isGenerating}
            onDataChange={handleDataChange}
            onPrev={handlePrevStep}
            onRegenerateContent={handleRegenerateContent}
          />
        )}
      </div>
    </div>
  );
};

export default SEOContentGenerator;
