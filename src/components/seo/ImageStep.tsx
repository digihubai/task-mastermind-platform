
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Plus,
  RefreshCw,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("ai");
  const [aiImageQuery, setAIImageQuery] = useState("");
  const [stockImageQuery, setStockImageQuery] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isSearchingStock, setIsSearchingStock] = useState(false);

  // Mock data for AI generated images
  const mockAIImages = [
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    "https://images.unsplash.com/photo-1576495199011-eb94736d05d6",
    "https://images.unsplash.com/photo-1615751072497-5f5169febe17",
  ];

  // Mock data for stock photos
  const mockStockImages = [
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    "https://images.unsplash.com/photo-1628196483163-829af3e0d25e",
    "https://images.unsplash.com/photo-1639322537138-5e513100b36e",
    "https://images.unsplash.com/photo-1656268164012-119304af0c69",
    "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1",
    "https://images.unsplash.com/photo-1655720835463-45660426b8a3",
  ];

  const handleGenerateAIImages = () => {
    if (!aiImageQuery.trim()) return;
    
    setIsGeneratingAI(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingAI(false);
      toast({
        title: "AI Images Generated",
        description: `Generated images for prompt: "${aiImageQuery}"`,
      });
    }, 2000);
  };

  const handleSearchStockImages = () => {
    if (!stockImageQuery.trim()) return;
    
    setIsSearchingStock(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearchingStock(false);
      toast({
        title: "Stock Photos Found",
        description: `Found ${mockStockImages.length} stock photos for: "${stockImageQuery}"`,
      });
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, you would upload these files to a server
    // For now, we'll create object URLs for the selected files
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...newImages]);
    
    toast({
      title: "Images Added",
      description: `Added ${files.length} image(s) from your device`,
    });
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-4">Step 5: Image Selection</h2>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="ai" className="flex items-center justify-center">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Generate
          </TabsTrigger>
          <TabsTrigger value="stock" className="flex items-center justify-center">
            <Search className="mr-2 h-4 w-4" />
            Stock Photos
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center justify-center">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ai-prompt">Describe the image you want to generate</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="ai-prompt" 
                  placeholder="e.g., a professional team meeting in a modern office" 
                  value={aiImageQuery}
                  onChange={(e) => setAIImageQuery(e.target.value)}
                />
                <Button 
                  onClick={handleGenerateAIImages}
                  disabled={!aiImageQuery.trim() || isGeneratingAI}
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Detailed descriptions yield better results. Try specifying style, colors, and content.
              </p>
            </div>
            
            {isGeneratingAI ? (
              <div className="text-center py-12 border rounded-lg">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                <p className="text-muted-foreground">Generating AI images...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mockAIImages.map((image, index) => (
                  <div 
                    key={`ai-${index}`}
                    className={cn(
                      "relative aspect-video rounded-md overflow-hidden border-2 cursor-pointer group",
                      selectedImages.includes(image) ? "border-primary" : "border-transparent hover:border-muted"
                    )}
                    onClick={() => toggleImageSelection(image)}
                  >
                    <img 
                      src={image}
                      alt={`AI generated image ${index + 1}`}
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
        </TabsContent>
        
        <TabsContent value="stock" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="stock-search">Search for stock photos</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="stock-search" 
                  placeholder="e.g., business meeting, marketing team" 
                  value={stockImageQuery}
                  onChange={(e) => setStockImageQuery(e.target.value)}
                />
                <Button 
                  onClick={handleSearchStockImages}
                  disabled={!stockImageQuery.trim() || isSearchingStock}
                >
                  {isSearchingStock ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Search across multiple stock photo providers including Unsplash, Pixabay, and Pexels
              </p>
            </div>
            
            {isSearchingStock ? (
              <div className="text-center py-12 border rounded-lg">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                <p className="text-muted-foreground">Searching stock photos...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mockStockImages.map((image, index) => (
                  <div 
                    key={`stock-${index}`}
                    className={cn(
                      "relative aspect-video rounded-md overflow-hidden border-2 cursor-pointer group",
                      selectedImages.includes(image) ? "border-primary" : "border-transparent hover:border-muted"
                    )}
                    onClick={() => toggleImageSelection(image)}
                  >
                    <img 
                      src={image}
                      alt={`Stock photo ${index + 1}`}
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
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-6">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-base font-medium mb-2">Upload your own images</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop image files here, or click to select files
              </p>
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  Select Images
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedImages.length > 0 && (
        <div className="mt-6 space-y-3">
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
              onClick={() => document.getElementById(currentTab === 'ai' ? 'ai-prompt' : 'stock-search')?.focus()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="space-x-2">
          <Button variant="secondary" onClick={handleSkip}>
            Skip this step
          </Button>
          <Button onClick={handleContinue} disabled={isLoading}>
            {isLoading ? "Loading..." : (
              <>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageStep;
