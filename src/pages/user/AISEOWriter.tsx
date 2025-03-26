
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, PlusCircle, Eye, Search, ArrowRight, File, Layers, BarChart2, Image, RefreshCw, Cloud, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Step components import
import SEOKeywordStep from "@/components/seo/SEOKeywordStep";
import SEOTitleStep from "@/components/seo/SEOTitleStep";
import SEOOutlineStep from "@/components/seo/SEOOutlineStep";
import SEOImageStep from "@/components/seo/SEOImageStep";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import SEOIntegrations from "@/components/seo/SEOIntegrations";
import SEOContentHistory from "@/components/seo/SEOContentHistory";
import SEOAnalytics from "@/components/seo/SEOAnalytics";

const STEPS = [
  { id: 1, name: "Topic & Keywords", component: SEOKeywordStep },
  { id: 2, name: "Title", component: SEOTitleStep },
  { id: 3, name: "Outline", component: SEOOutlineStep },
  { id: 4, name: "Image", component: SEOImageStep },
  { id: 5, name: "Content", component: SEOContentPreview },
];

const AISEOWriter = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [currentStep, setCurrentStep] = useState(1);
  const [seoData, setSeoData] = useState({
    topic: "",
    keywords: [],
    keywordCount: 10,
    title: "",
    titleCount: 3,
    maxTitleLength: 30,
    outline: "",
    subtitleCount: 10,
    outlineCount: 3,
    imagePrompt: "",
    imageSize: "square",
    imageCount: 4,
    content: "",
    wordCount: 0,
    seoScore: 0,
    readabilityScore: 0,
    keywords_density: {},
    integrations: [],
    selectedKeywords: [],
  });

  const handleInputChange = (field: string, value: any) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step completed
      toast({
        title: "Content created successfully",
        description: "Your SEO content is ready to be published.",
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateKeywords = () => {
    // Simulate API call for keyword generation
    toast({
      title: "Generating keywords",
      description: "Keywords are being generated based on your topic.",
    });
    
    // Mock data
    setTimeout(() => {
      const mockKeywords = ["assistant", "dialogue", "interface", "response", "automation", 
                          "conversation", "intelligence", "technology", "support", "queries", 
                          "chatbot", "ai", "language"];
      handleInputChange("keywords", mockKeywords);
      toast({
        title: "Keywords generated",
        description: "Choose the most relevant keywords for your content.",
      });
    }, 1500);
  };

  const handleSelectKeyword = (keyword: string) => {
    const selectedKeywords = [...seoData.selectedKeywords];
    if (selectedKeywords.includes(keyword)) {
      handleInputChange("selectedKeywords", selectedKeywords.filter(k => k !== keyword));
    } else {
      handleInputChange("selectedKeywords", [...selectedKeywords, keyword]);
    }
  };

  const handleNewContent = () => {
    setSeoData({
      topic: "",
      keywords: [],
      keywordCount: 10,
      title: "",
      titleCount: 3,
      maxTitleLength: 30,
      outline: "",
      subtitleCount: 10,
      outlineCount: 3,
      imagePrompt: "",
      imageSize: "square", 
      imageCount: 4,
      content: "",
      wordCount: 0,
      seoScore: 0,
      readabilityScore: 0,
      keywords_density: {},
      integrations: [],
      selectedKeywords: [],
    });
    setCurrentStep(1);
    setActiveTab("create");
  };

  const handleExportToWordPress = () => {
    toast({
      title: "Content exported to WordPress",
      description: "Your content has been successfully exported to your WordPress site.",
    });
  };

  const renderCurrentStep = () => {
    const StepComponent = STEPS[currentStep - 1].component;
    return <StepComponent seoData={seoData} onDataChange={handleInputChange} onNext={handleNextStep} onPrev={handlePrevStep} />;
  };

  const renderStepIndicator = () => {
    const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {STEPS.map((step) => (
            <div 
              key={step.id} 
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
                ${currentStep === step.id ? 'bg-primary text-primary-foreground' : 
                 currentStep > step.id ? 'bg-primary/80 text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              {step.id}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          {STEPS.map((step) => (
            <span key={step.id} className="text-xs text-muted-foreground max-w-[80px] text-center">{step.name}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
            <p className="text-muted-foreground mt-1">
              Just choose your topic, and watch AI whip up SEO-optimized blog content in a matter of seconds!
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("create")}>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button onClick={handleNewContent} className="flex items-center gap-2">
              <PlusCircle size={18} />
              <span>Start Over</span>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Badge variant="outline" className="px-3 py-1">
              <span className="font-semibold mr-1">Words:</span> Unlimited
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <span className="font-semibold mr-1">Images:</span> Unlimited
            </Badge>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="history">Content History</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            {renderStepIndicator()}
            {renderCurrentStep()}
          </TabsContent>
          
          <TabsContent value="history">
            <SEOContentHistory />
          </TabsContent>
          
          <TabsContent value="integrations">
            <SEOIntegrations />
          </TabsContent>
          
          <TabsContent value="analytics">
            <SEOAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AISEOWriter;
