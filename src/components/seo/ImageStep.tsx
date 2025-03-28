
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2,
  Image,
  Skip,
  Forward
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImages = () => {
    if (!seoData.imagePrompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating images...");
    
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, you would call an image generation API
      // For this example, we'll use placeholder image URLs
      const mockImages = [
        'https://placehold.co/600x400/4F46E5/FFFFFF?text=AI+Generated+Image+1',
        'https://placehold.co/600x400/3B82F6/FFFFFF?text=AI+Generated+Image+2',
        'https://placehold.co/600x400/10B981/FFFFFF?text=AI+Generated+Image+3',
        'https://placehold.co/600x400/F59E0B/FFFFFF?text=AI+Generated+Image+4'
      ];
      
      onDataChange('generatedImages', mockImages);
      setIsGenerating(false);
      toast.success("Generated 4 images!");
    }, 2000);
  };

  const handleSelectImage = (imgUrl: string) => {
    const selectedImages = [...seoData.selectedImages];
    
    if (selectedImages.includes(imgUrl)) {
      onDataChange('selectedImages', selectedImages.filter(url => url !== imgUrl));
    } else {
      onDataChange('selectedImages', [...selectedImages, imgUrl]);
    }
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 4: Select Images</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Image prompt
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Describe the image you want to generate..."
              value={seoData.imagePrompt}
              onChange={(e) => onDataChange('imagePrompt', e.target.value)}
            />
            <Button 
              onClick={generateImages}
              disabled={isGenerating || !seoData.imagePrompt.trim()}
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="imageSize">Image Size</Label>
            <Select 
              value={seoData.imageSize} 
              onValueChange={(value) => onDataChange('imageSize', value)}
            >
              <SelectTrigger id="imageSize">
                <SelectValue placeholder="Select image size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (512x512)</SelectItem>
                <SelectItem value="medium">Medium (768x768)</SelectItem>
                <SelectItem value="large">Large (1024x1024)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="numberOfImages">Number of Images</Label>
            <Select 
              value={seoData.numberOfImages.toString()} 
              onValueChange={(value) => onDataChange('numberOfImages', parseInt(value))}
            >
              <SelectTrigger id="numberOfImages">
                <SelectValue placeholder="Select number of images" />
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
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Generating images...</p>
          </div>
        ) : seoData.generatedImages.length > 0 ? (
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select images for your content
            </label>
            <div className="grid grid-cols-2 gap-4">
              {seoData.generatedImages.map((imgUrl: string, index: number) => {
                const isSelected = seoData.selectedImages.includes(imgUrl);
                
                return (
                  <div 
                    key={index}
                    className={`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 ${
                      isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-muted'
                    }`}
                    onClick={() => handleSelectImage(imgUrl)}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Generated image ${index + 1}`} 
                      className="w-full h-auto aspect-video object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              className="mt-4 gap-2 w-full"
              onClick={generateImages}
            >
              <RefreshCw size={16} />
              Generate More Images
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 bg-muted/30 rounded-lg">
            <Image className="h-12 w-12 text-muted-foreground opacity-30" />
            <p className="mt-4 text-muted-foreground">Enter a prompt and click "Generate" to create images</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onSkip}
            className="gap-2"
          >
            <Forward size={16} />
            Skip Images
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={seoData.selectedImages.length === 0 && seoData.generatedImages.length > 0}
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
