
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import StepIndicator from './StepIndicator';
import TopicStep from './TopicStep';
import KeywordsStep from './KeywordsStep';
import TitleStep from './TitleStep';
import OutlineStep from './OutlineStep';
import ImageStep from './ImageStep';
import ContentGenerationStep from './ContentGenerationStep';
import { AlertCircle } from 'lucide-react';
import { getOpenAIApiKey } from '@/services/ai/contentGenerationAI';

interface SEOContentGeneratorProps {
  generateKeywords: (topic: string, count?: number) => Promise<string[]>;
  generateTitles: (topic: string, keywords: string[], count?: number) => Promise<string[]>;
  generateOutline: (topic: string, keywords: string[], title: string) => Promise<any>;
  generateContent: (title: string, outline: string, keywords: string[]) => Promise<string>;
}

const SEOContentGenerator: React.FC<SEOContentGeneratorProps> = ({
  generateKeywords,
  generateTitles,
  generateOutline,
  generateContent
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [maxAllowedStep, setMaxAllowedStep] = useState(1);
  const [seoData, setSeoData] = useState({
    topic: '',
    keywords: [],
    selectedKeywords: [],
    keywordCount: 10,
    numberOfTitles: 5,
    titles: [],
    selectedTitle: '',
    outlines: [],
    selectedOutline: null,
    images: [],
    selectedImages: [],
    links: [],
    generatedContent: ''
  });

  const hasApiKey = !!getOpenAIApiKey();

  const handleDataChange = (field: string, value: any) => {
    setSeoData(prev => ({ ...prev, [field]: value }));

    // Update max allowed step based on data completion
    if (field === 'topic' && value && maxAllowedStep < 2) {
      setMaxAllowedStep(2);
    } else if ((field === 'keywords' || field === 'selectedKeywords') && value.length > 0 && maxAllowedStep < 3) {
      setMaxAllowedStep(3);
    } else if (field === 'selectedTitle' && value && maxAllowedStep < 4) {
      setMaxAllowedStep(4);
    } else if (field === 'selectedOutline' && value && maxAllowedStep < 5) {
      setMaxAllowedStep(5);
    } else if ((field === 'images' || field === 'selectedImages') && value.length > 0 && maxAllowedStep < 6) {
      setMaxAllowedStep(6);
    }
  };

  const handleNext = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1);
      // Also update max allowed step if needed
      if (maxAllowedStep < activeStep + 1) {
        setMaxAllowedStep(activeStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleRegenerateContent = async () => {
    if (!hasApiKey) {
      toast.error("API key not configured. Please contact your administrator.");
      return;
    }
    
    setIsGenerating(true);
    setActiveStep(7); // Move to content generation step
    
    try {
      if (seoData.selectedOutline) {
        const outlineSections = seoData.selectedOutline.sections.join("\n");
        const content = await generateContent(
          seoData.selectedTitle,
          outlineSections,
          seoData.selectedKeywords
        );
        
        setSeoData(prev => ({ ...prev, generatedContent: content }));
        toast.success("Content generated successfully");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="container max-w-5xl mx-auto pb-10">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">AI SEO Content Generator</h1>
            <p className="text-muted-foreground">
              Generate SEO-optimized content with AI assistance.
            </p>
          </div>
          
          <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              The AI content generator requires an API key. Please contact your administrator to set up the AI integration in Admin Settings.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto pb-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI SEO Content Generator</h1>
          <p className="text-muted-foreground">
            Generate SEO-optimized content with AI assistance. Follow the steps to create high-quality content based on your topic.
          </p>
        </div>

        <StepIndicator 
          activeStep={activeStep} 
          maxAllowedStep={maxAllowedStep} 
          setActiveStep={setActiveStep} 
        />
        
        {activeStep === 1 && (
          <TopicStep 
            seoData={seoData} 
            onDataChange={handleDataChange} 
            onNext={handleNext} 
          />
        )}
        
        {activeStep === 2 && (
          <KeywordsStep 
            seoData={seoData} 
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
            generateKeywords={generateKeywords}
          />
        )}
        
        {activeStep === 3 && (
          <TitleStep 
            seoData={seoData} 
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
            generateTitles={generateTitles}
          />
        )}
        
        {activeStep === 4 && (
          <OutlineStep 
            seoData={seoData} 
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
            generateOutline={generateOutline}
          />
        )}
        
        {activeStep === 5 && (
          <ImageStep 
            seoData={seoData} 
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        
        {activeStep === 6 && (
          <Card className="p-6 border border-border/40">
            <h2 className="text-xl font-semibold">Add Links</h2>
            <p className="text-muted-foreground mb-4">Coming soon! This feature is currently under development.</p>
            <div className="flex justify-between">
              <button onClick={handlePrev} className="text-primary">Previous</button>
              <button onClick={handleNext} className="text-primary">Skip</button>
            </div>
          </Card>
        )}
        
        {activeStep === 7 && (
          <ContentGenerationStep
            seoData={seoData}
            isGenerating={isGenerating}
            onDataChange={handleDataChange}
            onPrev={handlePrev}
            onRegenerateContent={handleRegenerateContent}
          />
        )}
        
        <Tabs defaultValue="history" className="mt-8">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Content history will be available soon. This feature is under development.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEOContentGenerator;
