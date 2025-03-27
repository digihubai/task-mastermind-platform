
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
  ListFilter,
  FileQuestion,
  MessageSquare,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { ChatInterface } from "@/components/chatbot/ChatInterface";

const PDFInsight = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("upload");
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
      setIsProcessed(false);
      setExtractedText("");
      setSearchResults([]);
    } else if (file) {
      toast.error("Please upload a PDF file");
    }
  };
  
  const handleProcessPDF = () => {
    if (!selectedFile) {
      toast.error("Please upload a PDF file first");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate PDF processing
    setTimeout(() => {
      const sampleText = `
# Sample Document Title

## Executive Summary
This document provides an overview of the key findings from our research study conducted in Q2 2023. The analysis reveals significant opportunities for market expansion in the Asia-Pacific region, with particular focus on emerging technologies in the healthcare and finance sectors.

## Introduction
The global landscape for digital transformation has accelerated dramatically in recent years, with organizations across all sectors embracing new technologies to remain competitive. This report examines the current state of technology adoption and provides recommendations for strategic implementations.

## Key Findings
1. Cloud computing adoption increased by 34% year-over-year
2. Artificial intelligence implementations showed positive ROI in 76% of cases
3. Cybersecurity remains the top concern for 89% of IT decision-makers
4. Remote workforce enablement continues to drive technology spending

## Methodology
Our research included surveys of 1,200 IT professionals across 14 countries, complemented by in-depth interviews with 75 CIOs and CTOs from Fortune 500 companies. Data collection occurred between March and May 2023.

## Conclusions
Organizations that prioritize digital resilience while focusing on customer experience will be best positioned to capitalize on emerging opportunities. We recommend a balanced approach to technology investment, with particular attention to security, scalability, and user experience.

## Recommendations
- Increase cloud infrastructure investments by 15-20%
- Implement AI-driven analytics for customer insights
- Enhance security protocols for remote work environments
- Develop comprehensive digital transformation roadmaps
      `;
      
      setExtractedText(sampleText);
      setIsProcessing(false);
      setIsProcessed(true);
      setActiveTab("content");
      
      toast.success("PDF processed successfully!");
    }, 2000);
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim() || !extractedText) {
      return;
    }
    
    // Simple search implementation
    const allLines = extractedText.split('\n').filter(line => line.trim());
    const matchingLines = allLines.filter(line => 
      line.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(matchingLines);
    
    if (matchingLines.length === 0) {
      toast.info("No results found for your search query");
    } else {
      toast.success(`Found ${matchingLines.length} results`);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Content copied to clipboard!");
  };
  
  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.replace('.pdf', '')}-extracted.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Content downloaded as text file!");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">PDF Insight</h1>
          <p className="text-muted-foreground mt-1">
            Extract and analyze information from PDF documents
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Upload PDF Document</h3>
              
              <div 
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => document.getElementById('pdf-upload')?.click()}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <FileText className="h-6 w-6 text-primary" />
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
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-6 p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium">{fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white"
                      onClick={handleProcessPDF}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Process PDF
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card className="p-6 border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Extracted Content</h3>
                
                {isProcessed && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopyToClipboard}
                      className="gap-1"
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadText}
                      className="gap-1"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </Button>
                  </div>
                )}
              </div>
              
              {isProcessed ? (
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 h-[400px]">
                  <div className="bg-muted p-3 rounded-full mb-3">
                    <FileQuestion className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {selectedFile 
                      ? "Click 'Process PDF' to extract content" 
                      : "Upload a PDF document first"
                    }
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Search Document</h3>
              
              <div className="space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9"
                      placeholder="Search within document..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      disabled={!isProcessed}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={!isProcessed || !searchQuery.trim()}
                  >
                    Search
                  </Button>
                </div>
                
                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Search Results</h4>
                      <span className="text-xs text-muted-foreground">
                        {searchResults.length} results found
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-md bg-accent/50 text-sm"
                        >
                          {result.replace(
                            new RegExp(`(${searchQuery})`, 'gi'),
                            '<mark>$1</mark>'
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : isProcessed ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <ListFilter className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Search for specific information in the document
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileQuestion className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Process a PDF document first to search its content
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChatInterface 
                  title="PDF Assistant"
                  variant="embedded"
                  config={{
                    initialMessage: "Hello! I'm your PDF assistant. Ask me anything about the document you've uploaded.",
                    modelName: "gpt-4",
                    maxTokens: 200,
                    temperature: 0.7
                  }}
                />
              </div>
              
              <div className="space-y-6">
                <Card className="p-6 border border-border/40">
                  <h3 className="text-lg font-medium mb-4">Document Information</h3>
                  
                  {isProcessed ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Filename:</span>
                        <span className="text-sm font-medium">{fileName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pages:</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Word Count:</span>
                        <span className="text-sm font-medium">2,458</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Estimated Read Time:</span>
                        <span className="text-sm font-medium">9 mins</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm">
                        Process a PDF to see document information
                      </p>
                    </div>
                  )}
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <h3 className="text-lg font-medium mb-4">Suggested Questions</h3>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2 px-3"
                      disabled={!isProcessed}
                    >
                      Summarize the key points of this document
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2 px-3"
                      disabled={!isProcessed}
                    >
                      What are the main recommendations?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2 px-3"
                      disabled={!isProcessed}
                    >
                      Extract all tables and data points
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2 px-3"
                      disabled={!isProcessed}
                    >
                      Create a presentation based on this document
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <h3 className="text-lg font-medium mb-4">Tools</h3>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      disabled={!isProcessed}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Executive Summary
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      disabled={!isProcessed}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Export to Google Docs
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PDFInsight;
