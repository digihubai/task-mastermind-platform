
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Image, RefreshCw, SkipForward, Search, Loader, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchStockPhotos } from "@/services/seo/imageService";

interface SEOImageStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOImageStep: React.FC<SEOImageStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageSource, setImageSource] = useState("ai");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize search query with a keyword if available
  useEffect(() => {
    if (seoData.selectedKeywords?.length > 0 && !searchQuery) {
      setSearchQuery(seoData.selectedKeywords[0]);
    } else if (seoData.topic && !searchQuery) {
      setSearchQuery(seoData.topic.split(' ').slice(0, 2).join(' '));
    }
  }, [seoData.selectedKeywords, seoData.topic, searchQuery]);

  // Generate images automatically when component mounts
  useEffect(() => {
    if ((seoData.topic || searchQuery) && !generatedImages.length) {
      handleGenerateImages();
    }
  }, []);

  const handleGenerateImages = async () => {
    setIsGenerating(true);
    
    // Use topic and keywords to create a relevant prompt
    let prompt = seoData.imagePrompt || searchQuery || seoData.topic;
    if (!prompt) {
      if (seoData.selectedKeywords?.length > 0) {
        prompt = seoData.selectedKeywords.slice(0, 3).join(", ");
      } else {
        prompt = "Digital marketing content";
      }
    }
    
    try {
      // Use the searchStockPhotos service to get images
      const count = seoData.imageCount || 4;
      const source = imageSource === "ai" ? "unsplash" : "pexels"; // This is a mock distinction for now
      
      const images = await searchStockPhotos(prompt, source, count);
      setGeneratedImages(images);
      
      if (images.length > 0) {
        setSelectedImage(images[0]);
        onDataChange("featuredImage", images[0]);
        onDataChange("selectedImages", [images[0]]);
      }
      
      const sourceType = imageSource === "ai" ? "AI" : "stock";
      toast.success(`Generated ${sourceType} images based on your content`);
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSearchImages = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    
    try {
      const count = seoData.imageCount || 4;
      const images = await searchStockPhotos(searchQuery, "unsplash", count);
      
      setGeneratedImages(images);
      if (images.length > 0) {
        setSelectedImage(images[0]);
        onDataChange("featuredImage", images[0]);
        onDataChange("selectedImages", [images[0]]);
      }
      
      toast.success(`Found ${images.length} images for "${searchQuery}"`);
    } catch (error) {
      console.error("Error searching images:", error);
      toast.error("Failed to search for images. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    onDataChange("featuredImage", image);
    
    // Also update the selectedImages array
    const selectedImages = [image];
    // Add up to 2 more different images if available
    for (const img of generatedImages) {
      if (img !== image && selectedImages.length < 3) {
        selectedImages.push(img);
      }
    }
    onDataChange("selectedImages", selectedImages);
  };
  
  const handleSkipStep = () => {
    // Set default images if none are selected
    if (!seoData.selectedImages || seoData.selectedImages.length === 0) {
      const defaultImage = `https://source.unsplash.com/random/800x600?${seoData.topic.replace(/\s+/g, '+')}&sig=${Date.now()}`;
      onDataChange("selectedImages", [defaultImage]);
      onDataChange("featuredImage", defaultImage);
    }
    onNext();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Generate Images</h2>
        <div className="space-y-4">
          <Tabs defaultValue={imageSource} onValueChange={setImageSource}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ai">AI Generated</TabsTrigger>
              <TabsTrigger value="stock">Stock Photos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image Description</label>
                <Textarea 
                  placeholder="Describe the image you want to generate..."
                  value={seoData.imagePrompt || ""}
                  onChange={(e) => onDataChange("imagePrompt", e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  If left empty, we'll use your topic and keywords to generate relevant images.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="stock" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Search Stock Photos</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter keywords to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearchImages}
                    disabled={isSearching || !searchQuery.trim()}
                    className="shrink-0"
                  >
                    {isSearching ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    Search
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Search Unsplash, Pexels, and Pixabay for relevant stock photos.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
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
              value={seoData.imageCount || 4}
              onChange={(e) => onDataChange("imageCount", parseInt(e.target.value))}
              min={1}
              max={8}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={imageSource === "stock" && searchQuery ? handleSearchImages : handleGenerateImages} 
              disabled={isGenerating || isSearching}
              className="w-full"
            >
              {isGenerating || isSearching ? 
                <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : 
                imageSource === "stock" ? <><Search className="mr-2 h-4 w-4" /> Search Images</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Images</>}
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
                  key={`${image}-${index}`}
                  className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImage === image ? "ring-2 ring-primary" : "hover:opacity-90"
                  }`}
                  onClick={() => handleSelectImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`Generated image ${index + 1}`} 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback for failed image loads
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Failed+to+Load';
                    }}
                  />
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="col-span-2 mt-2" 
                onClick={imageSource === "stock" ? handleSearchImages : handleGenerateImages}
              >
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
                Continue to Links
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <Image size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No images generated yet</h3>
            <p className="max-w-xs">
              {imageSource === "stock" ? 
                "Search for stock photos using keywords related to your content." :
                "Describe the image you want and click 'Generate Images' to create visuals for your content."}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOImageStep;
