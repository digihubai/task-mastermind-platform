
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const AISEOPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [keywordCount, setKeywordCount] = useState(10);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  
  const handleGenerateKeywords = () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to provide a topic to generate keywords",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingKeywords(true);
    
    // Simulate API call to generate keywords
    setTimeout(() => {
      const mockKeywords = [
        "ai writer", "seo content", "content optimization", 
        "keyword research", "blog writing", "seo strategy", 
        "content marketing", "search engine optimization", 
        "digital marketing", "ai content", "on-page seo",
        "content creation", "seo tools", "keyword density"
      ];
      
      // Take only the number of keywords specified by the user
      setKeywords(mockKeywords.slice(0, keywordCount));
      setIsGeneratingKeywords(false);
      
      toast({
        title: "Keywords generated",
        description: `Generated ${keywordCount} keywords based on your topic`,
      });
    }, 1500);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedKeywords.length === keywords.length) {
      setSelectedKeywords([]);
    } else {
      setSelectedKeywords([...keywords]);
    }
  };
  
  const handleNextStep = () => {
    if (step === 1 && selectedKeywords.length === 0) {
      toast({
        title: "No keywords selected",
        description: "Please select at least one keyword to continue",
        variant: "destructive"
      });
      return;
    }
    
    setStep(step + 1);
  };
  
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
        </div>
        
        <p className="text-muted-foreground">
          Just choose your topic, and watch AI whip up SEO-optimized blog content in a matter of seconds!
        </p>
        
        <div className="border-b pb-4">
          <Tabs defaultValue="words" className="w-full">
            <div className="flex justify-between items-center mb-2">
              <TabsList>
                <TabsTrigger value="words">Words <Badge className="ml-2 bg-primary text-white">Unlimited</Badge></TabsTrigger>
                <TabsTrigger value="images">Images <Badge className="ml-2 bg-primary text-white">Unlimited</Badge></TabsTrigger>
              </TabsList>
              
              <Button size="sm" variant="outline">
                <span>Start Over</span>
              </Button>
            </div>
          </Tabs>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-secondary'}`}>
                1
              </div>
              <span className="font-medium">Topic</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-secondary'}`}>
                2
              </div>
              <span className="font-medium">Title</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-primary text-white' : 'bg-secondary'}`}>
                3
              </div>
              <span className="font-medium">Outline</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 4 ? 'bg-primary text-white' : 'bg-secondary'}`}>
                4
              </div>
              <span className="font-medium">Content</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {step === 1 && (
            <>
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Topic</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">What is this article about?</label>
                    <Textarea 
                      placeholder="What is this article about?"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="resize-none h-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Keywords</label>
                    <Input 
                      type="number" 
                      value={keywordCount}
                      onChange={(e) => setKeywordCount(parseInt(e.target.value) || 10)}
                      min={1}
                      max={20}
                    />
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full"
                      onClick={handleGenerateKeywords}
                      disabled={isGeneratingKeywords || !topic.trim()}
                    >
                      {isGeneratingKeywords ? "Generating Keywords..." : "Generate Keywords"}
                    </Button>
                  </div>
                  
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-between"
                      onClick={() => {}}
                    >
                      <span>Advanced Options</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Select Keywords</h2>
                  {keywords.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                      {selectedKeywords.length === keywords.length ? "Deselect All" : "Select All"}
                    </Button>
                  )}
                </div>
                
                {keywords.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <Button
                            key={index}
                            variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                            className="rounded-full"
                            onClick={() => handleKeywordSelect(keyword)}
                          >
                            {keyword}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleNextStep} 
                      disabled={selectedKeywords.length === 0}
                      className="w-full"
                    >
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <p className="mb-2">No keywords generated yet</p>
                    <p className="text-sm">Generate keywords using the form on the left</p>
                  </div>
                )}
              </Card>
            </>
          )}
          
          {step === 2 && (
            <div className="col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Title</h2>
                <p>Title generation will be implemented in the next phase.</p>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          {step === 3 && (
            <div className="col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Outline</h2>
                <p>Outline generation will be implemented in the next phase.</p>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          {step === 4 && (
            <div className="col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Content</h2>
                <p>Content generation will be implemented in the next phase.</p>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={() => toast({
                    title: "Content Generated",
                    description: "Your SEO-optimized content has been generated successfully!",
                  })}>
                    Generate Content
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AISEOPage;
