import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { generateContentWithImages } from "@/services/seo";
import { toast } from "sonner";

// Import all step components
import TopicStep from "@/components/seo/TopicStep";
import SEOKeywordStep from "@/components/seo/SEOKeywordStep";
import TitleStep from "@/components/seo/TitleStep";
import SimplifiedOutlineStep from "@/components/seo/SimplifiedOutlineStep";
import SEOOutlineStep from "@/components/seo/SEOOutlineStep";
import SEOImageStep from "@/components/seo/SEOImageStep";
import SEOLinksStep from "@/components/seo/SEOLinksStep";
import ContentGenerationStep from "@/components/seo/ContentGenerationStep";
import StepIndicator from "@/components/seo/StepIndicator";
import SEOSidebar from "@/components/seo/SEOSidebar";

const AISEOPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
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
    imagePrompt: ""
  });

  const handleDataChange = (field: string, value: any) => {
    console.log(`Updating ${field} with:`, value);
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    
    // Auto-generate content when moving from Links step (6) to Content step (7)
    if (nextStep === 7 && !seoData.generatedContent) {
      handleGenerateContent();
    }
  };
  
  const handlePrev = () => {
    window.scrollTo(0, 0);
    setActiveStep(prev => prev - 1);
  };

  const handleGenerateContent = async () => {
    // Debug the input data
    console.log("Generating content with:", {
      title: seoData.selectedTitle,
      outline: seoData.selectedOutline || seoData.outline,
      keywords: seoData.selectedKeywords,
      images: seoData.selectedImages
    });
    
    // Validate required inputs
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    // Check both selectedOutline and outline for backwards compatibility
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
      // Generate content with integrated images and links
      const generatedContent = await generateContentWithImages(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.selectedTitle,
        outlineContent,
        seoData.selectedImages,
        seoData.internalLinks || [],
        seoData.externalLinks || []
      );
      
      console.log("Content successfully generated:", generatedContent);
      
      handleDataChange("generatedContent", generatedContent);
      toast.success("Content successfully generated!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <TopicStep 
            topic={seoData.topic} 
            onTopicChange={(value: string) => handleDataChange("topic", value)} 
            onNext={handleNext} 
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
              >
                Generate SEO Content
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
