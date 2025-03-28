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
  Loader,
  Link
} from "lucide-react";
import { generateContentWithImages, generateKeywords, generateSEOTitles } from "@/services/seo";
import { toast } from "sonner";
import SEOKeywordStep from "@/components/seo/SEOKeywordStep";
import SEOImageStep from "@/components/seo/SEOImageStep";
import ContentGenerationStep from "@/components/seo/ContentGenerationStep";
import SEOLinksStep from "@/components/seo/SEOLinksStep";

const TopicStep = (props: any) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose Your Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What would you like to write about?</label>
            <textarea 
              className="w-full h-32 p-3 border rounded-md"
              placeholder="Enter your topic here..."
              value={props.topic}
              onChange={(e) => props.onTopicChange(e.target.value)}
            ></textarea>
          </div>
          <Button 
            onClick={props.onNext} 
            disabled={!props.topic.trim()}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

const TitleStep = (props: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateTitles = async () => {
    if (!props.seoData.selectedKeywords || props.seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword first");
      return;
    }
    
    setIsGenerating(true);
    try {
      const titles = await generateSEOTitles(
        props.seoData.topic,
        props.seoData.selectedKeywords,
        props.seoData.numberOfTitles || 5,
        "mixed"
      );
      props.onDataChange("titles", titles);
      if (titles && titles.length > 0) {
        props.onDataChange("selectedTitle", titles[0]);
      }
      toast.success("Generated title suggestions");
    } catch (error) {
      console.error("Error generating titles:", error);
      toast.error("Failed to generate titles");
    } finally {
      setIsGenerating(false);
    }
  };
  
  useEffect(() => {
    if (props.seoData.selectedKeywords?.length > 0 && (!props.seoData.titles || props.seoData.titles.length === 0)) {
      handleGenerateTitles();
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose Your Title</h2>
        <div className="space-y-4">
          <Button 
            onClick={handleGenerateTitles}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating Titles..." : "Generate Title Suggestions"}
          </Button>
          
          <div className="space-y-2 mt-4">
            {props.seoData.titles && props.seoData.titles.map((title: string, index: number) => (
              <div 
                key={index}
                className={`p-3 border rounded-md cursor-pointer ${
                  props.seoData.selectedTitle === title ? "border-primary bg-primary/5" : "hover:bg-accent/50"
                }`}
                onClick={() => props.onDataChange("selectedTitle", title)}
              >
                {title}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={props.onPrev}>
              Back
            </Button>
            <Button 
              onClick={props.onNext}
              disabled={!props.seoData.selectedTitle}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const OutlineStep = (props: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateOutline = async () => {
    if (!props.seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate generating outline
    setTimeout(() => {
      const outline = {
        id: "outline-1",
        title: props.seoData.selectedTitle,
        sections: {
          introduction: {
            title: "Introduction",
            content: `An engaging introduction about ${props.seoData.topic} focusing on its importance and relevance.`
          },
          background: {
            title: "Understanding " + props.seoData.topic,
            content: "Background information and key concepts related to the topic.",
            subsections: [
              {
                title: "Key Benefits",
                content: `The primary advantages of implementing ${props.seoData.topic} in your business.`
              },
              {
                title: "Common Challenges",
                content: `Obstacles and challenges often faced when working with ${props.seoData.topic}.`
              }
            ]
          },
          implementation: {
            title: "Implementation Strategies",
            content: `Practical approaches to implementing ${props.seoData.topic} effectively.`,
            subsections: [
              {
                title: "Best Practices",
                content: "Industry best practices for optimal results."
              },
              {
                title: "Case Studies",
                content: "Real-world examples of successful implementations."
              }
            ]
          },
          conclusion: {
            title: "Conclusion",
            content: "Summary of key points and final thoughts."
          }
        }
      };
      
      props.onDataChange("outlines", [outline]);
      props.onDataChange("selectedOutline", outline);
      setIsGenerating(false);
      toast.success("Generated content outline");
    }, 1500);
  };
  
  useEffect(() => {
    if (props.seoData.selectedTitle && !props.seoData.selectedOutline) {
      handleGenerateOutline();
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Content Outline</h2>
        <div className="space-y-4">
          <Button 
            onClick={handleGenerateOutline}
            disabled={isGenerating || !props.seoData.selectedTitle}
            className="w-full"
          >
            {isGenerating ? "Generating Outline..." : "Generate Content Outline"}
          </Button>
          
          {props.seoData.selectedOutline && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">{props.seoData.selectedOutline.title}</h3>
              
              <div className="space-y-3">
                {Object.entries(props.seoData.selectedOutline.sections).map(([key, section]: [string, any]) => (
                  <div key={key} className="border p-3 rounded-md">
                    <h4 className="font-medium">{section.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{section.content}</p>
                    
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="ml-4 mt-3 space-y-2">
                        {section.subsections.map((subsection: any, index: number) => (
                          <div key={index} className="border-l-2 pl-3 py-1">
                            <h5 className="text-sm font-medium">{subsection.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={props.onPrev}>
              Back
            </Button>
            <Button 
              onClick={props.onNext}
              disabled={!props.seoData.selectedOutline}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const SEOSidebar = (props: any) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h3 className="text-lg font-medium mb-4">SEO Summary</h3>
        <div className="space-y-4">
          {props.seoData.topic && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Topic</h4>
              <p className="text-sm truncate">{props.seoData.topic}</p>
            </div>
          )}
          
          {props.seoData.selectedKeywords && props.seoData.selectedKeywords.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Keywords</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {props.seoData.selectedKeywords.slice(0, 5).map((keyword: string, i: number) => (
                  <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {keyword}
                  </span>
                ))}
                {props.seoData.selectedKeywords.length > 5 && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    +{props.seoData.selectedKeywords.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          {props.seoData.selectedTitle && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Title</h4>
              <p className="text-sm">{props.seoData.selectedTitle}</p>
            </div>
          )}
          
          {props.seoData.selectedImages && props.seoData.selectedImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Featured Image</h4>
              <div className="mt-1 border rounded-md overflow-hidden">
                <img 
                  src={props.seoData.selectedImages[0]} 
                  alt="Featured" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h3 className="text-lg font-medium mb-4">SEO Tips</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Include your primary keyword in your title</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Use headers (H2, H3) to structure your content</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Aim for at least 1,500 words for comprehensive topics</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Include relevant internal and external links</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Optimize images with alt text and descriptive filenames</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

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
    setActiveStep(prev => prev + 1);
  };
  
  const handlePrev = () => {
    window.scrollTo(0, 0);
    setActiveStep(prev => prev - 1);
  };

  const handleGenerateContent = async () => {
    // Validate required inputs
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    if (!seoData.selectedOutline && !seoData.outline) {
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
        seoData.selectedOutline || seoData.outline,
        seoData.selectedImages,
        seoData.internalLinks,
        seoData.externalLinks
      );
      
      handleDataChange("generatedContent", generatedContent);
      toast.success("Content successfully generated!");
      
      // Auto-navigate to the content step
      setActiveStep(7);
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
          <OutlineStep 
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
                    { step: 6, label: "Links", icon: Link },
                    { step: 7, label: "Content", icon: Globe }
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
            
            {activeStep === 6 && !isGenerating && !seoData.generatedContent && (
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
    if (!seoData.selectedOutline && !seoData.outline) return 4;
    if (!seoData.selectedImages || seoData.selectedImages.length === 0) return 5;
    if (!seoData.internalLinks || !seoData.externalLinks) return 6;
    return 7;
  }
};

export default AISEOPage;
