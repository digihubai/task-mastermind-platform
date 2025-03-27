
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  Copy, 
  RotateCcw,
  Book,
  FileSearch,
  List,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const PDFInsight = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // For PDF we just store the name
      setFilePreview(file.name);
      
      // Reset analysis
      setAnalysisResult("");
    }
  };
  
  const handleAnalyze = () => {
    if (!selectedFile) {
      toast.error("Please upload a PDF file first");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis process
    setTimeout(() => {
      const sampleAnalysis = prompt.trim() 
        ? `Analysis based on prompt: "${prompt}"\n\n` 
        : "";
      
      setAnalysisResult(`${sampleAnalysis}## PDF Analysis\n\nThis document appears to be a ${selectedFile.name.includes("report") ? "formal report" : "document"} containing information about business operations.\n\n### Key Points:\n- Executive Summary section on page 1\n- Financial data on pages 3-5\n- Conclusions and recommendations on page 8\n\n### Content Analysis:\n- Document tone: formal/professional\n- Primary topics: business strategy, financial performance\n- Key metrics identified: revenue growth (8%), customer acquisition cost ($52)\n\n### Summary:\nThe document presents an overview of quarterly business performance with positive growth indicators in most areas. Several recommendations are made for improving operations in the next quarter.`);
      
      setIsAnalyzing(false);
      toast.success("PDF analysis complete!");
    }, 2000);
  };
  
  const handleClearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
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
    element.download = `pdf-analysis-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Analysis downloaded as Markdown!");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">PDF Insight</h1>
          <p className="text-muted-foreground mt-1">
            Extract insights, summarize content, and ask questions about PDF documents
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Document Input</h3>
            
            {filePreview ? (
              <div className="space-y-4">
                <div className="relative border rounded-md p-4 bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{filePreview}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile?.size ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    onClick={handleClearFile}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Analysis Prompt (Optional)</label>
                  <Textarea 
                    placeholder="E.g., 'Summarize the key points in this document' or 'Extract all financial data'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-24 resize-none"
                  />
                </div>
                
                <Button 
                  className="w-full gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>Analyzing document...</>
                  ) : (
                    <>
                      <Search size={16} />
                      Analyze Document
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => document.getElementById('pdf-upload')?.click()}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-base font-medium">Upload a PDF document</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Drag and drop or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Select PDF
                  </Button>
                  <input 
                    type="file" 
                    id="pdf-upload" 
                    className="hidden" 
                    accept=".pdf"
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
                    <p className="text-muted-foreground">Upload and analyze a PDF to see results</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="actions">
                <div className="space-y-4">
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                        <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Summarize Document</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Create concise summaries of long documents
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                        <FileSearch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Extract Data</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Find and extract specific information from PDFs
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
                        <List className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Generate Key Points</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Identify and list the main points from documents
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Ask Questions</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get answers to specific questions about the document
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

export default PDFInsight;
