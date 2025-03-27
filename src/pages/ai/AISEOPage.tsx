
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import SEOKeywordStep from "@/components/seo/SEOKeywordStep";
import SEOTitleStep from "@/components/seo/SEOTitleStep";
import SEOOutlineStep from "@/components/seo/SEOOutlineStep";
import SEOImageStep from "@/components/seo/SEOImageStep";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const steps = ["keywords", "title", "outline", "image", "content"];

const AISEOPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [seoData, setSeoData] = useState({
    topic: "",
    keywords: [],
    selectedKeywords: [],
    keywordCount: 10,
    title: "",
    titleTopic: "",
    titleCount: 4,
    maxTitleLength: 60,
    outline: "",
    outlineTopic: "",
    subtitleCount: 5,
    outlineCount: 2,
    image: null,
    featuredImage: "",
    imagePrompt: "",
    imageSize: "square",
    imageCount: 4,
    content: "",
    savedContent: ""
  });

  const handleDataChange = (field: string, value: any) => {
    setSeoData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "savedContent") {
      toast({
        title: "Content saved",
        description: "Your SEO content has been saved successfully.",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">SEO Content Generator</h1>
          <p className="text-muted-foreground mt-1">
            Create search optimized content with our step-by-step AI-powered system
          </p>
        </div>

        <Card className="p-6 border border-border/40">
          <Tabs defaultValue={steps[currentStep]} value={steps[currentStep]} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger 
                value="keywords" 
                onClick={() => setCurrentStep(0)}
                disabled={currentStep < 0}
              >
                Keywords
              </TabsTrigger>
              <TabsTrigger 
                value="title" 
                onClick={() => setCurrentStep(1)}
                disabled={currentStep < 1 && seoData.selectedKeywords.length === 0}
              >
                Title
              </TabsTrigger>
              <TabsTrigger 
                value="outline" 
                onClick={() => setCurrentStep(2)}
                disabled={currentStep < 2 && !seoData.title}
              >
                Outline
              </TabsTrigger>
              <TabsTrigger 
                value="image" 
                onClick={() => setCurrentStep(3)}
                disabled={currentStep < 3 && !seoData.outline}
              >
                Image
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                onClick={() => setCurrentStep(4)}
                disabled={currentStep < 4}
              >
                Content
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="keywords">
                <SEOKeywordStep 
                  seoData={seoData} 
                  onDataChange={handleDataChange} 
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </TabsContent>
              
              <TabsContent value="title">
                <SEOTitleStep 
                  seoData={seoData} 
                  onDataChange={handleDataChange} 
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </TabsContent>
              
              <TabsContent value="outline">
                <SEOOutlineStep 
                  seoData={seoData} 
                  onDataChange={handleDataChange} 
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </TabsContent>
              
              <TabsContent value="image">
                <SEOImageStep 
                  seoData={seoData} 
                  onDataChange={handleDataChange} 
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </TabsContent>
              
              <TabsContent value="content">
                <SEOContentPreview 
                  seoData={seoData}
                  onDataChange={handleDataChange}
                />
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft size={16} />
              Previous Step
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={
                (currentStep === 0 && seoData.selectedKeywords.length === 0) ||
                (currentStep === 1 && !seoData.title) ||
                (currentStep === 2 && !seoData.outline) ||
                (currentStep === 4)
              }
              className="gap-2"
            >
              Next Step
              <ChevronRight size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AISEOPage;
