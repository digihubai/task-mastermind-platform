
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, Download, RotateCcw, Loader, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generateContentWithImages } from "@/services/seoService";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentGenerationStepProps {
  seoData: any;
  isGenerating: boolean;
  onDataChange: (field: string, value: any) => void;
  onPrev: () => void;
  onRegenerateContent: () => void;
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({
  seoData,
  isGenerating,
  onDataChange,
  onPrev,
  onRegenerateContent,
}) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [isGeneratingWithImages, setIsGeneratingWithImages] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ step: 0, message: "" });

  useEffect(() => {
    if (seoData.selectedImages && seoData.selectedImages.length > 0 && !seoData.generatedContent) {
      generateContentWithImagesIntegrated();
    }
  }, [seoData.selectedImages]);

  const generateContentWithImagesIntegrated = async () => {
    setIsGeneratingWithImages(true);
    
    const progressSteps = [
      { step: 1, message: "Analyzing selected keywords..." },
      { step: 2, message: "Structuring content based on outline..." },
      { step: 3, message: "Integrating images into content..." },
      { step: 4, message: "Optimizing for SEO..." },
      { step: 5, message: "Finalizing content generation..." },
    ];
    
    // Show progress steps
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        setGenerationProgress(progressSteps[currentStep]);
        currentStep++;
      } else {
        clearInterval(progressInterval);
      }
    }, 1000);
    
    try {
      // Generate content with integrated images
      const contentWithImages = await generateContentWithImages(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.selectedTitle,
        seoData.selectedOutline,
        seoData.selectedImages
      );
      
      // Update state with the generated content
      onDataChange("generatedContent", contentWithImages);
      toast.success("Content generated successfully with images!");
    } catch (error) {
      console.error("Error generating content with images:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setIsGeneratingWithImages(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast.success("Content copied to clipboard!");
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([seoData.generatedContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${seoData.selectedTitle.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as Markdown file!");
  };

  const handleTryAgain = () => {
    onRegenerateContent();
  };

  const formatContentForPreview = (content: string) => {
    if (!content) return "";
    
    // Process markdown for preview, adding proper spacing
    let formatted = content
      // Add space after headings that don't have it
      .replace(/^(#{1,6}[^#\n]+)$/gm, "$1\n")
      // Ensure proper spacing between paragraphs
      .replace(/\n{3,}/g, "\n\n")
      // Make sure there's spacing after lists
      .replace(/^(\s*[-*+]\s+.+)$/gm, "$1\n");
    
    return formatted;
  };

  // Render markdown for the preview (very simple version)
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return <p>No content generated yet.</p>;
    
    // Format the markdown for display
    const formatted = formatContentForPreview(markdown);
    
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {formatted.split("\n").map((line, index) => {
          // Handle headings
          if (line.startsWith("# ")) {
            return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
          } else if (line.startsWith("## ")) {
            return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
          } else if (line.startsWith("### ")) {
            return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
          } 
          // Handle images
          else if (line.startsWith("![")) {
            const altTextMatch = line.match(/!\[(.*?)\]/);
            const urlMatch = line.match(/\((.*?)\)/);
            const altText = altTextMatch ? altTextMatch[1] : "Image";
            const url = urlMatch ? urlMatch[1] : "";
            if (url) {
              return (
                <div key={index} className="my-4">
                  <img src={url} alt={altText} className="rounded-md max-h-64 object-contain mx-auto" />
                  <p className="text-center text-sm text-muted-foreground mt-1">{altText}</p>
                </div>
              );
            }
          } 
          // Handle lists
          else if (line.match(/^\s*[-*+]\s+/)) {
            return <li key={index} className="ml-6">{line.replace(/^\s*[-*+]\s+/, "")}</li>;
          } 
          // Empty lines become paragraph breaks
          else if (line.trim() === "") {
            return <br key={index} />;
          } 
          // Regular paragraphs
          else {
            return <p key={index} className="my-2">{line}</p>;
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated Content</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              {seoData.selectedKeywords.length} Keywords
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              {seoData.selectedImages?.length || 0} Images
            </Badge>
          </div>
        </div>

        {isGenerating || isGeneratingWithImages ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader className="h-12 w-12 text-primary animate-spin mb-6" />
            <h3 className="text-xl font-medium mb-2">
              {generationProgress.step > 0 
                ? `Step ${generationProgress.step}/5: ${generationProgress.message}` 
                : "Generating your SEO content..."}
            </h3>
            <p className="text-muted-foreground max-w-md">
              We're creating optimized content based on your selected keywords, title, outline, and images.
            </p>
            <div className="w-full max-w-md mt-6">
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(generationProgress.step / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : seoData.generatedContent ? (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-0">
                <ScrollArea className="border rounded-md p-4 h-[500px]">
                  {renderMarkdown(seoData.generatedContent)}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="markdown" className="mt-0">
                <ScrollArea className="border rounded-md bg-muted/30 p-4 h-[500px]">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {seoData.generatedContent}
                  </pre>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="gap-1.5">
                <Copy size={14} />
                Copy to Clipboard
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadMarkdown} className="gap-1.5">
                <Download size={14} />
                Download Markdown
              </Button>
              <Button variant="outline" size="sm" onClick={handleTryAgain} className="gap-1.5">
                <RotateCcw size={14} />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 ml-auto" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  Publish
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader className="h-12 w-12 text-muted-foreground/30 mb-6" />
            <h3 className="text-xl font-medium mb-2">Content generation ready</h3>
            <p className="text-muted-foreground max-w-md">
              Click "Generate SEO Content" to create optimized content based on your selections.
            </p>
            <Button className="mt-6" onClick={onRegenerateContent}>
              Generate SEO Content
            </Button>
          </div>
        )}
      </Card>
      
      <div className="flex">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Images
        </Button>
      </div>
    </div>
  );
};

export default ContentGenerationStep;
