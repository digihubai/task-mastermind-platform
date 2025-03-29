
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  generateKeywordsAI, 
  generateTitlesAI, 
  generateOutlineAI, 
  generateContentAI,
  getOpenAIApiKey
} from "@/services/ai/contentGenerationAI";

import { 
  generateContentWithImages
} from "@/services/seo";

import { 
  TopicStep,
  SEOKeywordStep,
  TitleStep,
  SimplifiedOutlineStep,
  SEOOutlineStep,
  SEOImageStep,
  SEOLinksStep,
  ContentGenerationStep,
  StepIndicator,
  SEOSidebar
} from "@/components/seo";

const AISEOPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasValidApiKey, setHasValidApiKey] = useState(!!getOpenAIApiKey());
  
  useEffect(() => {
    const checkApiKey = () => {
      setHasValidApiKey(!!getOpenAIApiKey());
    };
    
    checkApiKey();
    const interval = setInterval(checkApiKey, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const [seoData, setSeoData] = useState({
    topic: "",
    keywordCount: 10,
    keywords: [],
    selectedKeywords: [],
    titles: [],
    selectedTitle: "",
    numberOfTitles: 5,
    maxTitleLength: 70,
    outlines: [],
    selectedOutline: null,
    outline: "",
    numberOfOutlineSections: 3,
    maxOutlineDepth: 2,
    selectedImages: [],
    internalLinks: [],
    externalLinks: [],
    generatedContent: "",
    imageSize: "square",
    imageCount: 4,
    imagePrompt: "",
    advancedSettings: {}
  });

  const handleDataChange = (field: string, value: any) => {
    console.log(`Updating ${field} with:`, field === 'generatedContent' ? `${value.substring(0, 50)}...` : value);
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    
    // Auto-generate content when reaching the content generation step
    if (nextStep === 7 && !seoData.generatedContent && !isGenerating && hasValidApiKey) {
      handleGenerateContent();
    }
  };

  const handlePrev = () => {
    window.scrollTo(0, 0);
    setActiveStep(prev => prev - 1);
  };

  const handleGenerateContent = async () => {
    if (!hasValidApiKey) {
      toast.error("No API key configured. Please contact your administrator.");
      return;
    }

    console.log("Generating content with:", {
      title: seoData.selectedTitle,
      outline: seoData.selectedOutline || seoData.outline,
      keywords: seoData.selectedKeywords,
      images: seoData.selectedImages?.length
    });

    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }

    const outlineContent = seoData.selectedOutline || seoData.outline;
    if (!outlineContent) {
      toast.error("Please select an outline first");
      return;
    }

    if (!Array.isArray(seoData.selectedKeywords) || seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating comprehensive SEO content...");

    try {
      const generatedContent = await generateContentAI(
        seoData.selectedTitle,
        outlineContent,
        seoData.selectedKeywords
      );

      console.log("Content successfully generated:", generatedContent?.substring(0, 100) + "...");
      
      handleDataChange("generatedContent", generatedContent);
      toast.success("Content successfully generated!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateKeywords = async () => {
    if (!hasValidApiKey || !seoData.topic) return;
    
    try {
      const keywords = await generateKeywordsAI(seoData.topic, seoData.keywordCount);
      handleDataChange("keywords", keywords);
    } catch (error) {
      console.error("Error generating keywords:", error);
    }
  };

  const handleGenerateTitles = async () => {
    if (!hasValidApiKey || seoData.selectedKeywords.length === 0) return;
    
    try {
      const titles = await generateTitlesAI(
        seoData.topic, 
        seoData.selectedKeywords, 
        seoData.numberOfTitles
      );
      handleDataChange("titles", titles);
    } catch (error) {
      console.error("Error generating titles:", error);
    }
  };

  const handleGenerateOutline = async () => {
    if (!hasValidApiKey || !seoData.selectedTitle) return;
    
    try {
      const outline = await generateOutlineAI(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.selectedTitle
      );
      handleDataChange("outline", outline);
    } catch (error) {
      console.error("Error generating outline:", error);
    }
  };

  useEffect(() => {
    if (seoData.topic && hasValidApiKey && seoData.keywords.length === 0) {
      handleGenerateKeywords();
    }
  }, [seoData.topic, hasValidApiKey]);

  useEffect(() => {
    if (seoData.selectedKeywords.length > 0 && hasValidApiKey && seoData.titles.length === 0) {
      handleGenerateTitles();
    }
  }, [seoData.selectedKeywords, hasValidApiKey]);

  useEffect(() => {
    if (seoData.selectedTitle && hasValidApiKey && !seoData.outline) {
      handleGenerateOutline();
    }
  }, [seoData.selectedTitle, hasValidApiKey]);

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <TopicStep 
            topic={seoData.topic} 
            onTopicChange={(value: string) => handleDataChange("topic", value)} 
            onNext={handleNext}
            advancedSettings={seoData.advancedSettings}
            onAdvancedSettingsChange={(settings) => handleDataChange("advancedSettings", settings)}
          />
        );
      case 2:
        return (
          <SEOKeywordStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <TitleStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <SimplifiedOutlineStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <SEOImageStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 6:
        return (
          <SEOLinksStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 7:
        return (
          <ContentGenerationStep 
            seoData={seoData}
            isGenerating={isGenerating}
            onDataChange={handleDataChange}
            onPrev={handlePrev}
            onRegenerateContent={handleGenerateContent}
          />
        );
      default:
        return null;
    }
  };

  const getMaxAllowedStep = () => {
    if (!seoData.topic) return 1;
    if (seoData.selectedKeywords.length === 0) return 2;
    if (!seoData.selectedTitle) return 3;
    if (!seoData.selectedOutline && !seoData.outline) return 4;
    if (!seoData.selectedImages || seoData.selectedImages.length === 0) return 5;
    return 7; // Allow proceeding to content generation even without links
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Content Creator</h1>
          <p className="text-muted-foreground mt-1">
            Create SEO-optimized content in minutes with AI assistance
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4 space-y-6">
            <StepIndicator 
              activeStep={activeStep} 
              maxAllowedStep={getMaxAllowedStep()} 
              setActiveStep={setActiveStep} 
            />
            
            {renderStep()}
            
            {activeStep === 6 && !isGenerating && !seoData.generatedContent && (
              <Button 
                className="w-full"
                onClick={handleGenerateContent}
                disabled={!hasValidApiKey}
              >
                {hasValidApiKey ? "Generate SEO Content" : "API Key Required (Contact Admin)"}
              </Button>
            )}
          </div>
          
          <div className="lg:w-1/4">
            <SEOSidebar 
              seoData={seoData} 
              currentStep={activeStep}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AISEOPage;
