
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import TopicStep from "@/components/seo/TopicStep";
import TitleStep from "@/components/seo/TitleStep";
import OutlineStep from "@/components/seo/OutlineStep";
import ImageStep from "@/components/seo/ImageStep";
import ContentGenerationStep from "@/components/seo/ContentGenerationStep";

const AISEOPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // SEO content data
  const [seoData, setSeoData] = useState({
    topic: "",
    keywordCount: 10,
    keywords: [],
    selectedKeywords: [],
    titles: [],
    selectedTitle: "",
    numberOfTitles: 3,
    maxTitleLength: 60,
    outlines: [],
    selectedOutline: null,
    numberOfSubtitles: 10,
    numberOfOutlines: 3,
    imagePrompt: "",
    imageSize: "medium",
    numberOfImages: 4,
    generatedImages: [],
    selectedImages: [],
    generatedContent: "",
  });

  const updateSeoData = (field, value) => {
    setSeoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    // Validation for each step
    if (step === 1 && seoData.selectedKeywords.length === 0) {
      toast({
        title: "No keywords selected",
        description: "Please select at least one keyword to continue",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !seoData.selectedTitle) {
      toast({
        title: "No title selected",
        description: "Please select a title to continue",
        variant: "destructive",
      });
      return;
    }

    if (step === 3 && !seoData.selectedOutline) {
      toast({
        title: "No outline selected",
        description: "Please select an outline to continue",
        variant: "destructive",
      });
      return;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleStartOver = () => {
    setSeoData({
      topic: "",
      keywordCount: 10,
      keywords: [],
      selectedKeywords: [],
      titles: [],
      selectedTitle: "",
      numberOfTitles: 3,
      maxTitleLength: 60,
      outlines: [],
      selectedOutline: null,
      numberOfSubtitles: 10,
      numberOfOutlines: 3,
      imagePrompt: "",
      imageSize: "medium",
      numberOfImages: 4,
      generatedImages: [],
      selectedImages: [],
      generatedContent: "",
    });
    setStep(1);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStartOver}
            className="flex items-center gap-1"
          >
            <RotateCw className="h-4 w-4" />
            <span>Start Over</span>
          </Button>
        </div>
        
        <p className="text-muted-foreground">
          Just choose your topic, and watch AI whip up SEO-optimized blog content in a matter of seconds!
        </p>
        
        <div className="border-b pb-4">
          <Tabs defaultValue="words" className="w-full">
            <div className="flex justify-between items-center mb-2">
              <TabsList>
                <TabsTrigger value="words">Words <Badge className="ml-2 bg-primary text-white">Unlimited</Badge></TabsTrigger>
                <TabsTrigger value="images">Images <Badge className="ml-2 bg-primary text-white">Unlimited</Badge></TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="grid grid-cols-4 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${step === 1 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                1
              </div>
              <span className={`text-xs font-medium ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>Topic</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${step === 2 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                2
              </div>
              <span className={`text-xs font-medium ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>Title</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${step === 3 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                3
              </div>
              <span className={`text-xs font-medium ${step === 3 ? 'text-primary' : 'text-muted-foreground'}`}>Outline</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${step === 4 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                4
              </div>
              <span className={`text-xs font-medium ${step === 4 ? 'text-primary' : 'text-muted-foreground'}`}>Image</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {step === 1 && (
            <TopicStep 
              seoData={seoData} 
              onDataChange={updateSeoData}
              onNext={handleNextStep}
            />
          )}
          
          {step === 2 && (
            <TitleStep 
              seoData={seoData} 
              onDataChange={updateSeoData}
              onNext={handleNextStep}
              onPrev={handlePreviousStep}
            />
          )}
          
          {step === 3 && (
            <OutlineStep 
              seoData={seoData} 
              onDataChange={updateSeoData}
              onNext={handleNextStep}
              onPrev={handlePreviousStep}
            />
          )}
          
          {step === 4 && (
            <ImageStep 
              seoData={seoData} 
              onDataChange={updateSeoData}
              onNext={() => setStep(5)}
              onPrev={handlePreviousStep}
              onSkip={() => setStep(5)}
            />
          )}
          
          {step === 5 && (
            <ContentGenerationStep 
              seoData={seoData} 
              onDataChange={updateSeoData}
              onPrev={handlePreviousStep}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AISEOPage;
