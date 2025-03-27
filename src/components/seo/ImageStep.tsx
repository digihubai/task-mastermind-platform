
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImageStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const ImageStep: React.FC<ImageStepProps> = ({ seoData, onDataChange, onNext, onPrev, onSkip }) => {
  const { toast } = useToast();
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  
  const handleGenerateImages = () => {
    if (!seoData.imagePrompt) {
      toast({
        title: "Image prompt missing",
        description: "Please enter a description for the images you want to generate",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingImages(true);
    
    // Simulate API call to generate images
    setTimeout(() => {
      // In a real implementation, this would call an AI image generation API
      const mockImageUrls = [
        "https://placehold.co/600x400/eee/ccc?text=AI+Generated+Image+1",
        "https://placehold.co/600x400/eee/ccc?text=AI+Generated+Image+2",
        "https://placehold.co/600x400/eee/ccc?text=AI+Generated+Image+3",
        "https://placehold.co/600x400/eee/ccc?text=AI+Generated+Image+4"
      ];
      
      // Take only the number of images specified by the user
      onDataChange("generatedImages", mockImageUrls.slice(0, seoData.numberOfImages));
      setIsGeneratingImages(false);
      
      toast({
        title: "Images generated",
        description: `Generated ${seoData.numberOfImages} images based on your prompt`,
      });
    }, 1500);
  };
  
  const handleImageSelect = (imageUrl: string) => {
    const selectedImages = [...seoData.selectedImages];
    if (selectedImages.includes(imageUrl)) {
      onDataChange("selectedImages", selectedImages.filter(img => img !== imageUrl));
    } else {
      onDataChange("selectedImages", [...selectedImages, imageUrl]);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Image (optional)</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Explain Your Image (Optional)</label>
            <Textarea 
              placeholder="Describe the image you want to generate"
              value={seoData.imagePrompt}
              onChange={(e) => onDataChange("imagePrompt", e.target.value)}
              className="resize-none min-h-[120px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Size (Optional)</label>
            <Select
              value={seoData.imageSize}
              onValueChange={(value) => onDataChange("imageSize", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select image size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Very Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="xlarge">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of images</label>
            <Input 
              type="number" 
              value={seoData.numberOfImages}
              onChange={(e) => onDataChange("numberOfImages", parseInt(e.target.value) || 4)}
              min={1}
              max={8}
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="py-2">
                Advanced Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Image Style</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="photo">Realistic Photo</option>
                      <option value="illustration">Illustration</option>
                      <option value="3d">3D Rendering</option>
                      <option value="cartoon">Cartoon</option>
                      <option value="abstract">Abstract</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Mood</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="professional">Professional</option>
                      <option value="happy">Happy</option>
                      <option value="serious">Serious</option>
                      <option value="dynamic">Dynamic</option>
                      <option value="calm">Calm</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            className="w-full"
            onClick={handleGenerateImages}
            disabled={isGeneratingImages || !seoData.imagePrompt}
          >
            {isGeneratingImages ? "Generating Images..." : "Generate Image"}
          </Button>
          
          <Button 
            variant="secondary"
            className="w-full mt-2"
            onClick={onSkip}
          >
            Skip this step
          </Button>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Select images:</h3>
          
          {seoData.generatedImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {seoData.generatedImages.map((imageUrl: string, index: number) => (
                <div 
                  key={index} 
                  className={`relative rounded-md border cursor-pointer overflow-hidden ${
                    seoData.selectedImages.includes(imageUrl) 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img 
                    src={imageUrl} 
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {seoData.selectedImages.includes(imageUrl) && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground border rounded-md p-4">
              <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground/50" />
              <p className="mb-2">No images generated yet</p>
              <p className="text-sm">Generate images using the form on the left or skip this step</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={seoData.generatedImages.length > 0 && seoData.selectedImages.length === 0}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ImageStep;
