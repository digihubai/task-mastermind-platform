
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, MousePointerClick, Code, Globe, Image, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SEOSidebarProps {
  seoData: any;
  currentStep: number;
}

const SEOSidebar: React.FC<SEOSidebarProps> = ({ seoData, currentStep }) => {
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Search;
      case 2: return MousePointerClick;
      case 3: return FileText;
      case 4: return Code;
      case 5: return Image;
      case 6: return FileCheck;
      default: return Search;
    }
  };
  
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Topic Selection";
      case 2: return "Keyword Research";
      case 3: return "Title Creation";
      case 4: return "Content Outline";
      case 5: return "Image Selection";
      case 6: return "Content Generation";
      default: return "";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">SEO Content Progress</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((step) => {
              const StepIcon = getStepIcon(step);
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;
              
              return (
                <div 
                  key={step}
                  className={cn(
                    "flex items-start gap-3 p-2 rounded-md",
                    isCurrent && "bg-accent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isCompleted ? "bg-primary/20 text-primary" : 
                    isCurrent ? "bg-primary text-primary-foreground" : 
                    "bg-muted text-muted-foreground"
                  )}>
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium",
                      isCompleted && "text-primary",
                      isCurrent && "text-foreground"
                    )}>
                      {getStepTitle(step)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isCompleted ? "Completed" : isCurrent ? "In progress" : "Not started"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Content Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            {seoData.topic && (
              <div>
                <p className="text-sm text-muted-foreground">Topic</p>
                <p className="font-medium">{seoData.topic}</p>
              </div>
            )}
            
            {seoData.selectedKeywords.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Selected Keywords</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {seoData.selectedKeywords.map((keyword: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {seoData.selectedTitle && (
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{seoData.selectedTitle}</p>
              </div>
            )}
            
            {seoData.selectedOutline && (
              <div>
                <p className="text-sm text-muted-foreground">Outline</p>
                <p className="font-medium truncate">
                  {seoData.selectedOutline.sections?.length || 0} sections
                </p>
              </div>
            )}
            
            {seoData.selectedImages?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="font-medium">{seoData.selectedImages.length} images selected</p>
              </div>
            )}
            
            {seoData.generatedContent && (
              <div>
                <p className="text-sm text-muted-foreground">Generated Content</p>
                <p className="font-medium">
                  {seoData.generatedContent.split(/\s+/).length} words
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">SEO Tips</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Globe className="h-4 w-4 mt-0.5 text-primary" />
              <span>Include your main keyword in the title and first paragraph</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="h-4 w-4 mt-0.5 text-primary" />
              <span>Use related keywords throughout your content naturally</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="h-4 w-4 mt-0.5 text-primary" />
              <span>Aim for content longer than 1,000 words for better ranking</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="h-4 w-4 mt-0.5 text-primary" />
              <span>Include images with alt text containing keywords</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOSidebar;
