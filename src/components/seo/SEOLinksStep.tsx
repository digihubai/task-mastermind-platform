
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Link, RefreshCw, ExternalLink } from "lucide-react";
import { fetchInternalLinks, fetchRelatedExternalLinks } from "@/services/seo/linkService";
import { toast } from "sonner";

interface SEOLinksStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOLinksStep: React.FC<SEOLinksStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [internalLinks, setInternalLinks] = useState<Array<{title: string, url: string, selected: boolean}>>([]);
  const [externalLinks, setExternalLinks] = useState<Array<{title: string, url: string, selected: boolean}>>([]);
  const [customLink, setCustomLink] = useState({ title: "", url: "" });

  // Fetch links when component loads
  useEffect(() => {
    if (seoData.topic && seoData.selectedKeywords?.length > 0) {
      loadLinks();
    }
  }, []);

  const loadLinks = async () => {
    setIsLoading(true);
    try {
      // Fetch internal links
      const internal = await fetchInternalLinks();
      setInternalLinks(internal.map(link => ({ ...link, selected: true })));
      
      // Fetch external links
      const external = await fetchRelatedExternalLinks(seoData.topic, seoData.selectedKeywords);
      setExternalLinks(external.map(link => ({ ...link, selected: true })));
      
      // Update seoData with selected links
      onDataChange("internalLinks", internal);
      onDataChange("externalLinks", external);
      
      toast.success("Successfully loaded related links");
    } catch (error) {
      console.error("Error loading links:", error);
      toast.error("Failed to load related links");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInternalLinkToggle = (index: number) => {
    const updatedLinks = [...internalLinks];
    updatedLinks[index].selected = !updatedLinks[index].selected;
    setInternalLinks(updatedLinks);
    
    // Update seoData with selected links only
    onDataChange("internalLinks", updatedLinks.filter(link => link.selected));
  };

  const handleExternalLinkToggle = (index: number) => {
    const updatedLinks = [...externalLinks];
    updatedLinks[index].selected = !updatedLinks[index].selected;
    setExternalLinks(updatedLinks);
    
    // Update seoData with selected links only
    onDataChange("externalLinks", updatedLinks.filter(link => link.selected));
  };

  const handleAddCustomLink = () => {
    if (!customLink.title.trim() || !customLink.url.trim()) {
      toast.error("Please enter both title and URL");
      return;
    }
    
    if (!customLink.url.startsWith("http")) {
      toast.error("URL must start with http:// or https://");
      return;
    }
    
    // Determine if internal or external link
    const isExternal = !customLink.url.includes(window.location.hostname);
    
    if (isExternal) {
      const newExternalLinks = [...externalLinks, { ...customLink, selected: true }];
      setExternalLinks(newExternalLinks);
      onDataChange("externalLinks", newExternalLinks.filter(link => link.selected));
    } else {
      const newInternalLinks = [...internalLinks, { ...customLink, selected: true }];
      setInternalLinks(newInternalLinks);
      onDataChange("internalLinks", newInternalLinks.filter(link => link.selected));
    }
    
    // Reset custom link form
    setCustomLink({ title: "", url: "" });
    toast.success("Added custom link");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Content Links</h2>
        <p className="text-muted-foreground mb-6">
          Select which links to include in your content. These will be automatically inserted at relevant points in your article.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <RefreshCw className="animate-spin h-8 w-8 text-primary" />
            <span className="ml-2">Loading suggested links...</span>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Link className="h-5 w-5 mr-2 text-primary" />
                Internal Links
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
                {internalLinks.length > 0 ? (
                  internalLinks.map((link, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent/50">
                      <Checkbox 
                        id={`internal-${index}`} 
                        checked={link.selected}
                        onCheckedChange={() => handleInternalLinkToggle(index)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`internal-${index}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {link.title}
                        </label>
                        <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">No internal links found</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                External Links
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
                {externalLinks.length > 0 ? (
                  externalLinks.map((link, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent/50">
                      <Checkbox 
                        id={`external-${index}`} 
                        checked={link.selected}
                        onCheckedChange={() => handleExternalLinkToggle(index)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`external-${index}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {link.title}
                        </label>
                        <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">No external links found</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Add Custom Link</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input 
                  placeholder="Link Title" 
                  value={customLink.title}
                  onChange={(e) => setCustomLink({...customLink, title: e.target.value})}
                />
                <Input 
                  placeholder="URL (https://...)" 
                  value={customLink.url}
                  onChange={(e) => setCustomLink({...customLink, url: e.target.value})}
                />
              </div>
              <Button className="mt-3 w-full" variant="secondary" onClick={handleAddCustomLink}>
                Add Custom Link
              </Button>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <Button onClick={onNext}>
                Continue to Content
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOLinksStep;
