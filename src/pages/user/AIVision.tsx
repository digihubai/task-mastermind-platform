
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image as ImageIcon, 
  Upload, 
  FileText, 
  Eye, 
  Download, 
  Copy, 
  RotateCcw,
  FilePlus2,
  Sparkles,
  Palette
} from "lucide-react";
import { toast } from "sonner";

const AIVision = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset analysis
      setAnalysisResult("");
    }
  };
  
  const handleAnalyze = () => {
    if (!imagePreview) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis process
    setTimeout(() => {
      const sampleAnalysis = prompt.trim() 
        ? `Analysis based on prompt: "${prompt}"\n\n` 
        : "";
      
      setAnalysisResult(`${sampleAnalysis}## Image Analysis\n\nThis image appears to be [description based on content].\n\n### Key Elements Detected:\n- Object 1\n- Object 2\n- Background elements\n- Colors: primary colors identified\n\n### Context Analysis:\n- Estimated setting: indoor/outdoor\n- Mood/tone: professional/casual/artistic\n- Image quality: high/medium/low resolution\n\n### Additional Insights:\n- This image would be suitable for [recommended uses]\n- Potential improvements: [suggestions]`);
      
      setIsAnalyzing(false);
      toast.success("Image analysis complete!");
    }, 2000);
  };
  
  const handleClearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult("");
    setPrompt("");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(analysisResult);
    toast.success("Analysis copied to clipboard!");
  };
  
  const handleDownloadAnalysis = () => {
    const element = document.createElement("a");
    const file = new Blob([analysisResult], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `image-analysis-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Analysis downloaded as Markdown!");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Vision</h1>
          <p className="text-muted-foreground mt-1">
            Analyze images, generate image descriptions, and visual content
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Image Input</h3>
            
            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative border rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-auto max-h-[300px] object-contain bg-black/5"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    onClick={handleClearImage}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Analysis Prompt (Optional)</label>
                  <Textarea 
                    placeholder="E.g., 'What objects are in this image?' or 'Generate a product description from this image'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-24 resize-none"
                  />
                </div>
                
                <Button 
                  className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>Analyzing image...</>
                  ) : (
                    <>
                      <Eye size={16} />
                      Analyze Image
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-base font-medium">Upload an image</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Drag and drop or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Select Image
                  </Button>
                  <input 
                    type="file" 
                    id="image-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </Card>
          
          <Card className="p-6 border border-border/40">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                {analysisResult ? (
                  <div>
                    <Textarea
                      value={analysisResult}
                      readOnly
                      className="min-h-[300px] font-mono text-sm resize-none"
                    />
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={handleCopyToClipboard}
                        className="gap-2"
                      >
                        <Copy size={16} />
                        Copy
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadAnalysis}
                        className="gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 h-[300px]">
                    <div className="bg-muted p-3 rounded-full mb-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Upload and analyze an image to see results</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="actions">
                <div className="space-y-4">
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                        <FilePlus2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Generate Alt Text</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Create accessible image descriptions for web content
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Create Social Media Caption</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Generate engaging captions based on image content
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
                        <Palette className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Extract Color Palette</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Identify main colors for design and branding
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                        <ImageIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Similar Image Search</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Find visually similar images in your library
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIVision;
