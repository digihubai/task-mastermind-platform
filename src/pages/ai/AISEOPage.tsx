
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ArrowRight,
  Globe,
  BookOpen,
  FileEdit,
  Image as ImageIcon,
  RefreshCw
} from "lucide-react";
import TopicStep from "@/components/seo/TopicStep";
import KeywordsStep from "@/components/seo/KeywordsStep";
import TitleStep from "@/components/seo/TitleStep";
import OutlineStep from "@/components/seo/OutlineStep";
import ImageStep from "@/components/seo/ImageStep";
import ContentGenerationStep from "@/components/seo/ContentGenerationStep";
import SEOSidebar from "@/components/seo/SEOSidebar";
import { generateMockSEOContent } from "@/services/seoService";

const AISEOPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [seoData, setSeoData] = useState({
    topic: "",
    keywordCount: 5,
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
  
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    // Simulating AI content generation
    setTimeout(() => {
      const generatedContent = generateMockSEOContent(
        seoData.topic, 
        seoData.selectedKeywords
      );
      
      handleDataChange("generatedContent", generatedContent);
      setIsGenerating(false);
    }, 3000);
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
            topic={seoData.topic}
            keywords={seoData.selectedKeywords}
            titles={seoData.titles}
            selectedTitle={seoData.selectedTitle}
            numberOfTitles={seoData.numberOfTitles}
            maxTitleLength={seoData.maxTitleLength}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <OutlineStep 
            topic={seoData.topic}
            keywords={seoData.selectedKeywords}
            title={seoData.selectedTitle}
            outlines={seoData.outlines}
            selectedOutline={seoData.selectedOutline}
            numberOfOutlineSections={seoData.numberOfOutlineSections}
            maxOutlineDepth={seoData.maxOutlineDepth}
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
                      onClick={() => setActiveStep(step)}
                      className={`
                        flex items-center whitespace-nowrap px-4 py-3 border-b-2 text-sm font-medium
                        ${activeStep === step 
                          ? "border-primary text-primary" 
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}
                        ${step > 1 && !seoData.topic ? "opacity-50 cursor-not-allowed" : ""}
                        ${step > 2 && seoData.selectedKeywords.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
                        ${step > 3 && !seoData.selectedTitle ? "opacity-50 cursor-not-allowed" : ""}
                        ${step > 4 && !seoData.selectedOutline ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                      disabled={
                        (step > 1 && !seoData.topic) ||
                        (step > 2 && seoData.selectedKeywords.length === 0) ||
                        (step > 3 && !seoData.selectedTitle) ||
                        (step > 4 && !seoData.selectedOutline)
                      }
                    >
                      <div className="bg-muted rounded-full h-6 w-6 flex items-center justify-center mr-2">
                        <span className="text-xs">{step}</span>
                      </div>
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
            
            {renderStep()}
            
            {activeStep === 5 && !isGenerating && (
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
};

export default AISEOPage;
