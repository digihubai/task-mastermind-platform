
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Image as ImageIcon, 
  Search, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Loader,
  X
} from "lucide-react";
import { toast } from "sonner";

interface ImageStepProps {
  onImageSelect: (images: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
  selectedKeywords?: string[];
  topic?: string;
}

const ImageStep: React.FC<ImageStepProps> = ({ 
  onImageSelect, 
  onNext, 
  onPrev, 
  isLoading, 
  selectedKeywords = [],
  topic = ""
}) => {
  const [activeTab, setActiveTab] = useState("stock");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [draggedFile, setDraggedFile] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  // Initialize search query based on keywords or topic
  useEffect(() => {
    if (!searchQuery && (selectedKeywords.length > 0 || topic)) {
      const initialQuery = selectedKeywords.length > 0 
        ? selectedKeywords.slice(0, 2).join(" ") 
        : topic.split(" ").slice(0, 3).join(" ");
      
      setSearchQuery(initialQuery);
      handleSearchImages(initialQuery);
    }
  }, [selectedKeywords, topic]);

  const handleSearchImages = async (query = searchQuery) => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API call to fetch stock images
      setTimeout(() => {
        // Mock image URLs
        const mockImages = [
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop",
        ];
        
        setSearchResults(mockImages);
        setIsSearching(false);
      }, 1500);
    } catch (error) {
      console.error("Error searching for images:", error);
      toast.error("Failed to search for images. Please try again.");
      setIsSearching(false);
    }
  };

  const handleGenerateAIImages = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a prompt for image generation");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call to generate AI images
      setTimeout(() => {
        // Mock generated image URLs
        const mockGeneratedImages = [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1640158615573-cd28feb28bd7?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&auto=format&fit=crop",
        ];
        
        setGeneratedImages(mockGeneratedImages);
        setIsGenerating(false);
      }, 3000);
    } catch (error) {
      console.error("Error generating AI images:", error);
      toast.error("Failed to generate AI images. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    processUploadedFiles(Array.from(files));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedFile(false);
    
    if (e.dataTransfer.files.length > 0) {
      processUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processUploadedFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error("Please upload image files only");
      return;
    }
    
    // Process each image file
    const newImages: string[] = [];
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          newImages.push(event.target.result);
          
          // Update state when all images are processed
          if (newImages.length === imageFiles.length) {
            setUploadedImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    
    toast.success(`Uploaded ${imageFiles.length} image${imageFiles.length > 1 ? 's' : ''}`);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedFile(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedFile(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter(url => url !== uploadedImages[index]));
  };

  const handleContinue = () => {
    onImageSelect(selectedImages);
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Select Images for Your Content</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="stock">Stock Photos</TabsTrigger>
            <TabsTrigger value="ai">AI Generated</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <div className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder={activeTab === "ai" ? "Enter a prompt for AI image generation..." : "Search for stock photos..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              {activeTab === "stock" ? (
                <Button onClick={() => handleSearchImages()} disabled={isSearching}>
                  {isSearching ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              ) : activeTab === "ai" ? (
                <Button onClick={handleGenerateAIImages} disabled={isGenerating} className="gap-1">
                  {isGenerating ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              ) : null}
            </div>
          </div>
          
          <TabsContent value="stock" className="mt-0">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 animate-spin mb-4 text-primary" />
                <p className="text-muted-foreground">Searching for images...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedImages.includes(imageUrl) ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`Stock image ${index + 1}`} 
                      className="w-full h-40 object-cover"
                    />
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      selectedImages.includes(imageUrl) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {selectedImages.includes(imageUrl) && (
                        <div className="bg-primary rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No images found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try searching for different keywords to find stock photos for your content.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 animate-spin mb-4 text-primary" />
                <p className="text-muted-foreground">Generating AI images based on your prompt...</p>
                <p className="text-xs text-muted-foreground/70 mt-2">This may take a minute or two</p>
              </div>
            ) : generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generatedImages.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedImages.includes(imageUrl) ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`AI generated image ${index + 1}`} 
                      className="w-full h-40 object-cover"
                    />
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      selectedImages.includes(imageUrl) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {selectedImages.includes(imageUrl) && (
                        <div className="bg-primary rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No AI images generated yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter a prompt and click "Generate" to create unique AI images for your content.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <div 
              className={`border-2 border-dashed ${draggedFile ? 'border-primary bg-primary/5' : 'border-border'} rounded-lg p-8 text-center`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Images</h3>
              <p className="text-muted-foreground mb-4">Drag and drop images here, or click to browse</p>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={handleFileUpload}
              />
              <Button asChild variant="outline">
                <label htmlFor="image-upload" className="cursor-pointer">Browse Files</label>
              </Button>
            </div>
            
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Uploaded Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((imageUrl, index) => (
                    <div 
                      key={index} 
                      className={`relative group rounded-lg overflow-hidden border-2 ${
                        selectedImages.includes(imageUrl) ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`Uploaded image ${index + 1}`} 
                        className="w-full h-40 object-cover cursor-pointer"
                        onClick={() => handleImageSelect(imageUrl)}
                      />
                      <button 
                        className="absolute top-2 right-2 bg-black/70 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveUploadedImage(index)}
                      >
                        <X size={16} />
                      </button>
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                        selectedImages.includes(imageUrl) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {selectedImages.includes(imageUrl) && (
                          <div className="bg-primary rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back
        </Button>
        
        <Button 
          onClick={handleContinue} 
          disabled={selectedImages.length === 0}
          className="gap-1"
        >
          Continue
          <ChevronRight size={16} />
        </Button>
      </div>
      
      {selectedImages.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Selected Images ({selectedImages.length})</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {selectedImages.map((imageUrl, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                <img 
                  src={imageUrl} 
                  alt={`Selected image ${index + 1}`} 
                  className="w-full h-20 object-cover"
                />
                <button 
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageStep;
