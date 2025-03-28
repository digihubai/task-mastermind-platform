
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Plus,
  RefreshCw
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ImageStepProps {
  onImageSelect: (images: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading?: boolean;
}

const ImageStep: React.FC<ImageStepProps> = ({ 
  onImageSelect, 
  onNext, 
  onPrev,
  isLoading = false
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageQuery, setImageQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Dummy data to simulate image results
  const dummyImageResults = [
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    "https://images.unsplash.com/photo-1576495199011-eb94736d05d6",
    "https://images.unsplash.com/photo-1615751072497-5f5169febe17",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    "https://images.unsplash.com/photo-1628196483163-829af3e0d25e",
    "https://images.unsplash.com/photo-1639322537138-5e513100b36e"
  ];

  const handleSearchImages = () => {
    if (!imageQuery.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const toggleImageSelection = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleContinue = () => {
    onImageSelect(selectedImages);
    onNext();
  };

  const handleSkip = () => {
    onImageSelect([]);
    onNext();
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-4">Image Selection</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image-query">Generate or search for relevant images</Label>
          <div className="flex gap-2">
            <Input 
              id="image-query" 
              placeholder="e.g., business meeting, data analysis, marketing team" 
              value={imageQuery}
              onChange={(e) => setImageQuery(e.target.value)}
            />
            <Button 
              onClick={handleSearchImages}
              disabled={!imageQuery.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-4">Upload your own images</h3>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click to select files</p>
            <Button variant="secondary" size="sm">
              Select Images
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-4">Search results</h3>
          
          {!imageQuery.trim() ? (
            <div className="text-center py-8 border rounded-lg">
              <ImageIcon className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Search for images to see results</p>
            </div>
          ) : isGenerating ? (
            <div className="text-center py-12 border rounded-lg">
              <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-muted-foreground">Searching for images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {dummyImageResults.map((image, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative aspect-video rounded-md overflow-hidden border-2 cursor-pointer group",
                    selectedImages.includes(image) ? "border-primary" : "border-transparent hover:border-muted"
                  )}
                  onClick={() => toggleImageSelection(image)}
                >
                  <img 
                    src={image}
                    alt={`Search result ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {selectedImages.includes(image) && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-6 w-6 rounded-full bg-primary text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImageSelection(image);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedImages.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <h3 className="text-sm font-medium">Selected Images ({selectedImages.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative h-16 w-16">
                  <img 
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-5 w-5 absolute -top-2 -right-2 rounded-full bg-background border"
                    onClick={() => toggleImageSelection(image)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button 
                className="h-16 w-16 border border-dashed rounded-md bg-transparent text-muted-foreground hover:text-foreground"
                variant="ghost"
                onClick={() => document.getElementById('image-query')?.focus()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <div className="space-x-2">
          <Button variant="secondary" onClick={handleSkip}>
            Skip this step
          </Button>
          <Button onClick={handleContinue} disabled={isLoading}>
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageStep;
