
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  Image,
  SkipForward,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImageStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const ImageStep: React.FC<ImageStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev,
  onSkip
}) => {
  const [generating, setGenerating] = useState(false);
  
  const handleGenerateImages = () => {
    if (!seoData.imagePrompt) {
      toast.error("Please enter an image prompt");
      return;
    }
    
    setGenerating(true);
    toast.info("Generating images...");
    
    // Simulate image generation
    setTimeout(() => {
      const mockImages = [
        "https://placehold.co/600x400/3b82f6/ffffff?text=SEO+Image+1",
        "https://placehold.co/600x400/10b981/ffffff?text=SEO+Image+2",
        "https://placehold.co/600x400/6366f1/ffffff?text=SEO+Image+3",
        "https://placehold.co/600x400/f59e0b/ffffff?text=SEO+Image+4"
      ];
      
      onDataChange('generatedImages', mockImages);
      setGenerating(false);
      toast.success("Generated images successfully!");
    }, 2500);
  };
  
  const handleImageSelect = (imageUrl: string) => {
    const isSelected = seoData.selectedImages.includes(imageUrl);
    let newSelectedImages = [...seoData.selectedImages];
    
    if (isSelected) {
      newSelectedImages = newSelectedImages.filter(img => img !== imageUrl);
    } else {
      newSelectedImages.push(imageUrl);
    }
    
    onDataChange('selectedImages', newSelectedImages);
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 4: Generate Images</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Enter a prompt to generate images for your content
          </label>
          <Input 
            placeholder="Describe the images you want (e.g., 'Professional digital marketer working at a computer')" 
            value={seoData.imagePrompt}
            onChange={(e) => onDataChange('imagePrompt', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Image Size
            </label>
            <Select 
              value={seoData.imageSize} 
              onValueChange={(value) => onDataChange('imageSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (256x256)</SelectItem>
                <SelectItem value="medium">Medium (512x512)</SelectItem>
                <SelectItem value="large">Large (1024x1024)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Number of Images
            </label>
            <Select 
              value={seoData.numberOfImages.toString()} 
              onValueChange={(value) => onDataChange('numberOfImages', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Number of images" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Image</SelectItem>
                <SelectItem value="2">2 Images</SelectItem>
                <SelectItem value="4">4 Images</SelectItem>
                <SelectItem value="6">6 Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button
          className="gap-2 w-full"
          onClick={handleGenerateImages}
          disabled={!seoData.imagePrompt || generating}
        >
          {generating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating Images...
            </>
          ) : (
            <>
              <Image className="h-4 w-4" />
              Generate Images
            </>
          )}
        </Button>
        
        {seoData.generatedImages.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select images to include in your content
            </label>
            <div className="grid grid-cols-2 gap-4">
              {seoData.generatedImages.map((img: string, index: number) => {
                const isSelected = seoData.selectedImages.includes(img);
                return (
                  <div 
                    key={index} 
                    className={`relative border rounded-md overflow-hidden cursor-pointer ${
                      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border/40'
                    }`}
                    onClick={() => handleImageSelect(img)}
                  >
                    <img 
                      src={img} 
                      alt={`Generated image ${index + 1}`} 
                      className="w-full h-auto"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
          disabled={generating}
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onSkip}
            className="gap-2"
            disabled={generating}
          >
            <SkipForward size={16} />
            Skip Images
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={generating}
            className="gap-2"
          >
            Next Step
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageStep;
