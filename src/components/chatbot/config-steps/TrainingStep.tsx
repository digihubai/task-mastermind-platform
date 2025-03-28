
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, ChevronRight, Loader2, Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const TrainingStep: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"website" | "pdf" | "text" | "qa">("website");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [step, setStep] = useState(1);
  const [websiteCrawlDepth, setWebsiteCrawlDepth] = useState(2);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaItems, setQaItems] = useState<{question: string; answer: string}[]>([]);
  const [textContent, setTextContent] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleSkip = () => {
    toast({
      title: "Training skipped",
      description: "You can train your chatbot later from the dashboard.",
    });
  };
  
  const handleAddUrl = () => {
    if (!websiteUrl) {
      toast({
        variant: "destructive",
        title: "URL required",
        description: "Please enter a valid URL to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: "Website added",
        description: "Your website has been added for crawling."
      });
    }, 1500);
  };

  const handleStartCrawling = () => {
    setIsLoading(true);
    
    toast({
      title: "Crawling started",
      description: "Website crawling has been initiated. This may take some time."
    });
    
    // Simulate crawling process
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
      setWebsiteUrl("");
      toast({
        title: "Crawling completed",
        description: "Website has been successfully crawled and knowledge has been extracted."
      });
    }, 3000);
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      
      toast({
        title: "Files added",
        description: `${newFiles.length} PDF file(s) added for processing.`
      });
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  
  const handleProcessPdfs = () => {
    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please upload at least one PDF file to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate PDF processing
    setTimeout(() => {
      setIsLoading(false);
      setSelectedFiles([]);
      toast({
        title: "PDFs processed",
        description: `${selectedFiles.length} PDF file(s) have been processed and knowledge has been extracted.`
      });
    }, 2000);
  };
  
  const handleAddText = () => {
    if (!textContent.trim()) {
      toast({
        variant: "destructive",
        title: "Text required",
        description: "Please enter some text content to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate text processing
    setTimeout(() => {
      setIsLoading(false);
      setTextContent("");
      toast({
        title: "Text processed",
        description: "Text content has been processed and knowledge has been extracted."
      });
    }, 1500);
  };
  
  const handleAddQa = () => {
    if (!question.trim() || !answer.trim()) {
      toast({
        variant: "destructive",
        title: "Incomplete Q&A",
        description: "Please enter both a question and an answer."
      });
      return;
    }
    
    setQaItems([...qaItems, { question, answer }]);
    setQuestion("");
    setAnswer("");
    
    toast({
      title: "Q&A added",
      description: "Question and answer pair has been added successfully."
    });
  };
  
  const handleSaveQaSet = () => {
    if (qaItems.length === 0) {
      toast({
        variant: "destructive",
        title: "No Q&A pairs",
        description: "Please add at least one question and answer pair."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate saving Q&A set
    setTimeout(() => {
      setIsLoading(false);
      setQaItems([]);
      toast({
        title: "Q&A set saved",
        description: `${qaItems.length} question and answer pair(s) have been saved.`
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Chatbot Training</h2>
        <p className="text-muted-foreground">
          This step is optional but highly recommended to personalize your chatbot experience.
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full justify-center gap-2 text-muted-foreground"
        onClick={handleSkip}
      >
        Skip <ChevronRight size={16} />
      </Button>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="pdf">PDF</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
        </TabsList>
        
        <TabsContent value="website" className="space-y-6">
          {step === 1 ? (
            <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/10">
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  1
                </div>
                <span className="font-medium">Add URL</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Website</span>
                  <span className="text-xs text-muted-foreground">Single URL</span>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="shrink-0"
                    onClick={() => setWebsiteUrl("")}
                  >
                    <RefreshCw size={18} />
                  </Button>
                </div>
              </div>
              
              <Button
                className="w-full bg-primary/10 text-primary hover:bg-primary/20"
                onClick={handleAddUrl}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : "Next"}
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
                <div className="flex gap-2 items-center mb-4">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    ✓
                  </div>
                  <span className="font-medium">URL Added</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {websiteUrl}
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/10">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    2
                  </div>
                  <span className="font-medium">Configure Crawl Depth</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Depth Level</label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((level) => (
                      <button
                        key={level}
                        className={`flex-1 p-2 border rounded-md text-center ${
                          websiteCrawlDepth === level 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setWebsiteCrawlDepth(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Level {websiteCrawlDepth} is {websiteCrawlDepth === 2 ? "recommended for most websites" : websiteCrawlDepth === 1 ? "good for simple websites" : "for complex websites"}. Higher levels may take longer to process.
                  </p>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleStartCrawling}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Crawling...
                    </>
                  ) : "Start Crawling"}
                </Button>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="pdf" className="space-y-4">
          <div className={`border-2 border-dashed rounded-lg ${selectedFiles.length === 0 ? 'border-muted-foreground/20' : 'border-primary/20'} p-6 flex flex-col items-center justify-center`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept=".pdf"
              multiple
            />
            
            {selectedFiles.length === 0 ? (
              <>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Upload size={24} className="text-primary" />
                </div>
                <p className="text-muted-foreground mb-3 text-center">Drag & drop PDF files here or click to browse</p>
                <Button variant="outline" size="sm" onClick={handleFileUpload}>
                  Upload PDFs
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{selectedFiles.length} PDF file(s) selected</h3>
                  <Button variant="outline" size="sm" onClick={handleFileUpload}>
                    Add More
                  </Button>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                      <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleRemoveFile(index)}
                      >
                        <RefreshCw size={16} className="rotate-45" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {selectedFiles.length > 0 && (
            <Button 
              className="w-full mt-4" 
              onClick={handleProcessPdfs}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing PDFs...
                </>
              ) : `Process ${selectedFiles.length} PDF file(s)`}
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="text" className="space-y-4">
          <div>
            <Label htmlFor="text-content" className="mb-2 block">Add Text Content</Label>
            <Textarea 
              id="text-content"
              className="h-40 resize-none focus:ring-2 focus:ring-primary/30"
              placeholder="Paste or type text content here that your chatbot should learn from..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleAddText}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : "Add Text Content"}
          </Button>
        </TabsContent>
        
        <TabsContent value="qa" className="space-y-4">
          <div className="space-y-4 border p-4 rounded-lg">
            <div>
              <Label htmlFor="qa-question" className="block text-sm font-medium mb-1">Question</Label>
              <Input 
                id="qa-question"
                placeholder="How do I reset my password?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="qa-answer" className="block text-sm font-medium mb-1">Answer</Label>
              <Textarea 
                id="qa-answer"
                className="h-20 resize-none focus:ring-2 focus:ring-primary/30"
                placeholder="To reset your password, click on the 'Forgot Password' link on the login page..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={handleAddQa}
              disabled={!question.trim() || !answer.trim()}
            >
              <Plus size={16} className="mr-1" />
              Add Q&A Pair
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleSaveQaSet}
              disabled={isLoading || qaItems.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : "Save Q&A Set"}
            </Button>
          </div>
          
          {qaItems.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Added Q&A Pairs ({qaItems.length})</h3>
              <div className="max-h-[200px] overflow-y-auto space-y-2">
                {qaItems.map((item, index) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-md">
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
