
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Upload, Search, Sparkles, Loader } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ImageStepProps {
  onImageSelect: (images: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading?: boolean;
  selectedKeywords: string[];
  topic: string;
}

const ImageStep: React.FC<ImageStepProps> = ({
  onImageSelect,
  onNext,
  onPrev,
  isLoading,
  selectedKeywords,
  topic
}) => {
  const [activeTab, setActiveTab] = useState("stock");
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [stockImages, setStockImages] = useState<string[]>([]);
  const [aiImages, setAiImages] = useState<string[]>([]);

  // Set search query based on topic and keywords when component mounts
  useEffect(() => {
    if (topic) {
      const query = selectedKeywords.length > 0 
        ? selectedKeywords[0] 
        : topic.split(' ').slice(0, 2).join(' ');
      setSearchQuery(query);
      handleSearchStockImages(query);
    }
  }, [topic, selectedKeywords]);

  const handleSearchStockImages = (query: string = searchQuery) => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setSearching(true);
    
    // Simulate API call to stock image service
    setTimeout(() => {
      // Random images from Unsplash for demo
      const mockStockImages = [
        `https://source.unsplash.com/random/800x600?${query.replace(/\s+/g, '+')}`,
        `https://source.unsplash.com/random/900x600?${query.replace(/\s+/g, '+')}&1`,
        `https://source.unsplash.com/random/800x700?${query.replace(/\s+/g, '+')}&2`,
        `https://source.unsplash.com/random/700x500?${query.replace(/\s+/g, '+')}&3`,
        `https://source.unsplash.com/random/600x800?${query.replace(/\s+/g, '+')}&4`,
        `https://source.unsplash.com/random/800x800?${query.replace(/\s+/g, '+')}&5`,
        `https://source.unsplash.com/random/900x700?${query.replace(/\s+/g, '+')}&6`,
        `https://source.unsplash.com/random/800x500?${query.replace(/\s+/g, '+')}&7`,
      ];
      
      setStockImages(mockStockImages);
      setSearching(false);
    }, 1500);
  };

  const handleGenerateAIImages = () => {
    if (!topic) {
      toast.error("Please set a topic first");
      return;
    }

    setGeneratingAI(true);
    
    // Create a prompt based on the topic and keywords
    const prompt = selectedKeywords.length > 0
      ? `${topic} with focus on ${selectedKeywords.slice(0, 2).join(' and ')}`
      : topic;
    
    // Simulate API call to AI image generation service
    setTimeout(() => {
      // For demo, use placeholder images
      const mockAIImages = [
        `https://source.unsplash.com/random/800x600?ai,${prompt.replace(/\s+/g, '+')}`,
        `https://source.unsplash.com/random/900x600?ai,${prompt.replace(/\s+/g, '+')}&1`,
        `https://source.unsplash.com/random/800x700?ai,${prompt.replace(/\s+/g, '+')}&2`,
        `https://source.unsplash.com/random/700x500?ai,${prompt.replace(/\s+/g, '+')}&3`,
        `https://source.unsplash.com/random/600x800?ai,${prompt.replace(/\s+/g, '+')}&4`
      ];
      
      setAiImages(mockAIImages);
      setGeneratingAI(false);
      toast.success("AI images generated successfully");
    }, 3000);
  };

  const handleImageSelect = (imageUrl: string) => {
    const newSelectedImages = [...selectedImages];
    
    if (newSelectedImages.includes(imageUrl)) {
      // Remove image if already selected
      const index = newSelectedImages.indexOf(imageUrl);
      newSelectedImages.splice(index, 1);
    } else {
      // Add image to selection (limit to 3 images)
      if (newSelectedImages.length < 3) {
        newSelectedImages.push(imageUrl);
      } else {
        toast.info("You can select up to 3 images. Remove one to add another.");
        return;
      }
    }
    
    setSelectedImages(newSelectedImages);
    onImageSelect(newSelectedImages);
  };

  const handleNext = () => {
    if (selectedImages.length === 0) {
      toast.warning("Please select at least one image");
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Select Images</h2>
          <div className="text-sm text-muted-foreground">
            {selectedImages.length}/3 images selected
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="stock">Stock Photos</TabsTrigger>
            <TabsTrigger value="ai">AI Generated</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stock" className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Search stock photos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSearchStockImages()} 
                disabled={searching || !searchQuery.trim()}
                className="gap-2"
              >
                {searching ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
                Search
              </Button>
            </div>
            
            {searching ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Loader className="h-10 w-10 text-primary/50 animate-spin mb-4" />
                <h3 className="text-lg font-medium mb-1">Searching stock photos</h3>
                <p className="text-muted-foreground">Finding high-quality images for "{searchQuery}"</p>
              </div>
            ) : stockImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stockImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all 
                      ${selectedImages.includes(imageUrl) ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-primary/40'}
                    `}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`Stock image ${index + 1}`} 
                      className="w-full h-36 object-cover"
                      onError={(e) => {
                        // Handle image loading error
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error';
                      }}
                    />
                    {selectedImages.includes(imageUrl) && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Search className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No stock photos found</h3>
                <p className="text-muted-foreground">Search for images related to your topic</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Describe the image you want..." 
                defaultValue={topic}
                className="flex-1"
                disabled={generatingAI}
              />
              <Button 
                onClick={handleGenerateAIImages} 
                disabled={generatingAI}
                className="gap-2"
              >
                {generatingAI ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Generate
              </Button>
            </div>
            
            {generatingAI ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Loader className="h-10 w-10 text-primary/50 animate-spin mb-4" />
                <h3 className="text-lg font-medium mb-1">Generating AI images</h3>
                <p className="text-muted-foreground">Creating custom images for your content</p>
                <div className="w-full max-w-md mt-6">
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            ) : aiImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {aiImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all 
                      ${selectedImages.includes(imageUrl) ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-primary/40'}
                    `}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`AI generated image ${index + 1}`} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error';
                      }}
                    />
                    {selectedImages.includes(imageUrl) && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Sparkles className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No AI images generated yet</h3>
                <p className="text-muted-foreground">Click "Generate" to create AI images for your content</p>
                <Button onClick={handleGenerateAIImages} className="mt-4 gap-2">
                  <Sparkles size={16} />
                  Generate Images Now
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <Upload className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium">Upload your images</h3>
              <p className="text-muted-foreground">Drag and drop files here, or click to select files</p>
              <div>
                <Button variant="outline" className="gap-2 mt-2">
                  <Upload size={16} />
                  Select Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF (Max 5MB each)
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedImages.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Selected Images</h3>
            <div className="flex gap-3 overflow-x-auto py-2">
              {selectedImages.map((imageUrl, index) => (
                <div key={index} className="relative min-w-[150px] max-w-[150px]">
                  <img 
                    src={imageUrl} 
                    alt={`Selected image ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageSelect(imageUrl);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Outline
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={isLoading || selectedImages.length === 0}
          className="gap-1"
        >
          Continue to Content
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ImageStep;
