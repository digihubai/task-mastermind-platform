
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye } from "lucide-react";

// Import our refactored components
import ImageInput from "@/components/ai-vision/ImageInput";
import AnalysisResult from "@/components/ai-vision/AnalysisResult";
import ActionCards from "@/components/ai-vision/ActionCards";

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
            
            <ImageInput 
              imagePreview={imagePreview}
              prompt={prompt}
              setPrompt={setPrompt}
              isAnalyzing={isAnalyzing}
              handleFileChange={handleFileChange}
              handleClearImage={handleClearImage}
              handleAnalyze={handleAnalyze}
            />
          </Card>
          
          <Card className="p-6 border border-border/40">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <AnalysisResult 
                  analysisResult={analysisResult}
                  handleCopyToClipboard={handleCopyToClipboard}
                  handleDownloadAnalysis={handleDownloadAnalysis}
                />
              </TabsContent>
              
              <TabsContent value="actions">
                <ActionCards />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIVision;
