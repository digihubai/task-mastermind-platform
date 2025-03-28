
import React from "react";
import { Card } from "@/components/ui/card";

interface SEOSidebarProps {
  seoData: any;
  currentStep: number;
}

const SEOSidebar: React.FC<SEOSidebarProps> = ({ seoData, currentStep }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h3 className="text-lg font-medium mb-4">SEO Summary</h3>
        <div className="space-y-4">
          {seoData.topic && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Topic</h4>
              <p className="text-sm truncate">{seoData.topic}</p>
            </div>
          )}
          
          {seoData.selectedKeywords && seoData.selectedKeywords.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Keywords</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {seoData.selectedKeywords.slice(0, 5).map((keyword: string, i: number) => (
                  <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {keyword}
                  </span>
                ))}
                {seoData.selectedKeywords.length > 5 && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    +{seoData.selectedKeywords.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          {seoData.selectedTitle && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Title</h4>
              <p className="text-sm">{seoData.selectedTitle}</p>
            </div>
          )}
          
          {seoData.selectedImages && seoData.selectedImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Featured Image</h4>
              <div className="mt-1 border rounded-md overflow-hidden">
                <img 
                  src={seoData.selectedImages[0]} 
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

export default SEOSidebar;
