
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Image, RefreshCw, SkipForward } from "lucide-react";

interface SEOImageStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOImageStep: React.FC<SEOImageStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");

  const mockImages = [
    "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=AI+Chatbot+Image+1",
    "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=AI+Chatbot+Image+2",
    "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=AI+Chatbot+Image+3",
    "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=AI+Chatbot+Image+4"
  ];

  const handleGenerateImages = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedImages(mockImages);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    onDataChange("featuredImage", image);
  };
  
  const handleSkipStep = () => {
    onNext();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Generate Images</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Image Description</label>
            <Textarea 
              placeholder="Riding horse on mars"
              value={seoData.imagePrompt || ""}
              onChange={(e) => onDataChange("imagePrompt", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Size (Optional)</label>
            <Select
              value={seoData.imageSize || "square"}
              onValueChange={(val) => onDataChange("imageSize", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square (1:1)</SelectItem>
                <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                <SelectItem value="portrait">Portrait (4:5)</SelectItem>
                <SelectItem value="widescreen">Widescreen (21:9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Number of Images</label>
            <Input 
              type="number" 
              value={seoData.imageCount}
              onChange={(e) => onDataChange("imageCount", parseInt(e.target.value))}
              min={1}
              max={8}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleGenerateImages} 
              disabled={isGenerating || !seoData.imagePrompt}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Image"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSkipStep}
              className="w-full"
            >
              Skip this step
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose an Image</h2>
        
        {generatedImages.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {generatedImages.map((image, index) => (
                <div 
                  key={index}
                  className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImage === image ? "ring-2 ring-primary" : "hover:opacity-90"
                  }`}
                  onClick={() => handleSelectImage(image)}
                >
                  <img src={image} alt={`Generated image ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
              
              <Button variant="outline" className="col-span-2 mt-2" onClick={handleGenerateImages}>
                <RefreshCw size={16} className="mr-2" />
                Generate More Images
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <Image size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No images generated yet</h3>
            <p className="max-w-xs">Describe the image you want and click "Generate Image" to create visuals for your content.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOImageStep;
