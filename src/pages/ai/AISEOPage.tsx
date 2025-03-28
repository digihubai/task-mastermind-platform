
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowRight,
  Globe,
  BookOpen,
  FileEdit,
  Image as ImageIcon,
  RefreshCw,
  Loader
} from "lucide-react";
import TopicStep from "@/components/seo/TopicStep";
import KeywordsStep from "@/components/seo/KeywordsStep";
import TitleStep from "@/components/seo/TitleStep";
import OutlineStep from "@/components/seo/OutlineStep";
import ImageStep from "@/components/seo/ImageStep";
import ContentGenerationStep from "@/components/seo/ContentGenerationStep";
import SEOSidebar from "@/components/seo/SEOSidebar";
import { generateContentWithImages, generateKeywords } from "@/services/seo";
import { toast } from "sonner";

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
    numberOfOutlineSections: 3,
    maxOutlineDepth: 2,
    selectedImages: [],
    generatedContent: ""
  });

  // Effect to autogenerate keywords when topic is provided
  useEffect(() => {
    if (seoData.topic && activeStep === 2 && 
        (!seoData.keywords || seoData.keywords.length === 0)) {
      handleAutoGenerateKeywords();
    }
  }, [seoData.topic, activeStep]);

  // Check if we have enough selected keywords to proceed
  const hasEnoughKeywords = Array.isArray(seoData.selectedKeywords) && 
                           seoData.selectedKeywords.length >= 3;

  // Effect to auto-navigate to title step after keywords selected
  useEffect(() => {
    if (activeStep === 2 && hasEnoughKeywords) {
      // Delay to show the user that their selection was registered
      const timer = setTimeout(() => {
        handleNext();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [seoData.selectedKeywords, activeStep, hasEnoughKeywords]);
  
  const handleDataChange = (field: string, value: any) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    setActiveStep(prev => prev + 1);
  };
  
  const handlePrev = () => {
    window.scrollTo(0, 0);
    setActiveStep(prev => prev - 1);
  };

  const handleAutoGenerateKeywords = async () => {
    if (!seoData.topic || !seoData.topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }
    
    try {
      const keywords = await generateKeywords(seoData.topic, seoData.keywordCount);
      if (Array.isArray(keywords) && keywords.length > 0) {
        setSeoData(prev => ({
          ...prev,
          keywords,
          // Preselect the first 3 keywords for convenience
          selectedKeywords: keywords.slice(0, 3)
        }));
        toast.success(`Generated ${keywords.length} keyword suggestions based on your topic`);
      } else {
        toast.error("No keywords could be generated. Try a different topic.");
      }
    } catch (error) {
      console.error("Error auto-generating keywords:", error);
      toast.error("Failed to generate keywords automatically. Please try manually.");
    }
  };
  
  const handleGenerateContent = async () => {
    // Validate required inputs
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    if (!seoData.selectedOutline) {
      toast.error("Please select an outline first");
      return;
    }
    
    if (!Array.isArray(seoData.selectedKeywords) || seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Generate content with integrated images
      const generatedContent = await generateContentWithImages(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.selectedTitle,
        seoData.selectedOutline,
        seoData.selectedImages
      );
      
      // Add special image content integration if images were selected
      let finalContent = generatedContent;
      if (Array.isArray(seoData.selectedImages) && seoData.selectedImages.length > 0) {
        // Insert image references into the content where appropriate
        const contentParts = finalContent.split('\n\n');
        
        // Add first image after introduction
        if (contentParts.length > 2 && seoData.selectedImages[0]) {
          contentParts.splice(2, 0, `![${seoData.selectedKeywords[0] || 'Featured image'} 1](${seoData.selectedImages[0]})`);
        }
        
        // Add second image in the middle if available
        if (contentParts.length > 4 && seoData.selectedImages[1]) {
          const middleIndex = Math.floor(contentParts.length / 2);
          contentParts.splice(middleIndex, 0, `![${seoData.selectedKeywords[1] || 'Featured image'} 2](${seoData.selectedImages[1]})`);
        }
        
        // Add third image near the end if available
        if (contentParts.length > 6 && seoData.selectedImages[2]) {
          contentParts.splice(contentParts.length - 2, 0, `![${seoData.selectedKeywords[2] || 'Featured image'} 3](${seoData.selectedImages[2]})`);
        }
        
        finalContent = contentParts.join('\n\n');
      }
      
      handleDataChange("generatedContent", finalContent);
      toast.success("Content successfully generated with integrated images!");
      
      // Auto-navigate to the content step
      setActiveStep(6);
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
            onTopicChange={(value) => handleDataChange("topic", value)} 
            onNext={handleNext} 
          />
        );
      case 2:
        return (
          <KeywordsStep 
            topic={seoData.topic}
            keywordCount={seoData.keywordCount}
            keywords={seoData.keywords}
            selectedKeywords={seoData.selectedKeywords}
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
          <OutlineStep 
            seoData={seoData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <ImageStep 
            onImageSelect={(images) => handleDataChange("selectedImages", images)}
            onNext={handleNext}
            onPrev={handlePrev}
            isLoading={isGenerating}
            selectedKeywords={seoData.selectedKeywords}
            topic={seoData.topic}
          />
        );
      case 6:
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
          {/* Left Side - Content Steps */}
          <div className="lg:w-3/4 space-y-6">
            <Card className="border-border/40">
              <div className="w-full overflow-auto">
                <div className="flex border-b">
                  {[
                    { step: 1, label: "Topic", icon: Search },
                    { step: 2, label: "Keywords", icon: FileEdit },
                    { step: 3, label: "Title", icon: BookOpen },
                    { step: 4, label: "Outline", icon: ArrowRight },
                    { step: 5, label: "Images", icon: ImageIcon },
                    { step: 6, label: "Content", icon: Globe }
                  ].map(({ step, label, icon: Icon }) => (
                    <button
                      key={step}
                      onClick={() => step <= getMaxAllowedStep() && setActiveStep(step)}
                      className={`
                        flex items-center whitespace-nowrap px-4 py-3 border-b-2 text-sm font-medium
                        ${activeStep === step 
                          ? "border-primary text-primary" 
                          : step <= getMaxAllowedStep()
                            ? "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                            : "border-transparent text-muted-foreground/50 cursor-not-allowed"}
                      `}
                      disabled={step > getMaxAllowedStep()}
                    >
                      <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-2 ${
                        activeStep === step 
                          ? "bg-primary text-primary-foreground" 
                          : step < activeStep
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {step < activeStep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          <span className="text-xs">{step}</span>
                        )}
                      </div>
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
            
            {renderStep()}
            
            {activeStep === 5 && !isGenerating && seoData.selectedImages?.length > 0 && (
              <Button 
                className="w-full"
                onClick={handleGenerateContent}
              >
                Generate SEO Content
              </Button>
            )}
          </div>
          
          {/* Right Side - SEO Information Panel */}
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
  
  // Helper function to determine the maximum step the user is allowed to reach
  function getMaxAllowedStep() {
    if (!seoData.topic) return 1;
    if (seoData.selectedKeywords.length === 0) return 2;
    if (!seoData.selectedTitle) return 3;
    if (!seoData.selectedOutline) return 4;
    return 6; // Allow skipping images
  }
};

export default AISEOPage;
