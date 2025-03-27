
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Copy, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

const AIRewriter = () => {
  const [originalText, setOriginalText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [tone, setTone] = useState("professional");
  const [style, setStyle] = useState("concise");
  const [isRewriting, setIsRewriting] = useState(false);
  
  const handleRewrite = () => {
    if (!originalText.trim()) {
      toast.error("Please enter some text to rewrite");
      return;
    }
    
    setIsRewriting(true);
    
    // Simulate AI rewriting process
    setTimeout(() => {
      const toneAdjustments = {
        professional: "This is a professionally rewritten version with formal language and structure.",
        casual: "Hey there! Here's a more casual take on your content, keeping it friendly.",
        enthusiastic: "WOW! Your content just got an AMAZING upgrade with lots of energy and excitement!",
        serious: "The following represents a more formal, fact-oriented approach to your original text."
      };
      
      const styleAdjustments = {
        concise: "Shortened while maintaining key points.",
        detailed: "Expanded with additional context and information.",
        persuasive: "Reframed to be more convincing and compelling.",
        simple: "Simplified using clearer and more straightforward language."
      };
      
      setRewrittenText(`${originalText}\n\n${toneAdjustments[tone]} ${styleAdjustments[style]}`);
      setIsRewriting(false);
      
      toast.success("Text has been rewritten!");
    }, 2000);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(rewrittenText);
    toast.success("Copied to clipboard!");
  };
  
  const handleReset = () => {
    setOriginalText("");
    setRewrittenText("");
    toast.info("Content has been reset");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Rewriter</h1>
          <p className="text-muted-foreground mt-1">
            Rewrite and improve your content with different tones and styles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <Tabs defaultValue="input" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="input">Original Text</TabsTrigger>
                  <TabsTrigger value="output">Rewritten Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="input">
                  <Textarea
                    placeholder="Enter the text you want to rewrite..."
                    className="min-h-[300px] resize-none"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                  />
                </TabsContent>
                
                <TabsContent value="output">
                  <Textarea
                    placeholder="Rewritten text will appear here..."
                    className="min-h-[300px] resize-none"
                    value={rewrittenText}
                    readOnly
                  />
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw size={16} />
                  Reset
                </Button>
                
                {rewrittenText && (
                  <Button 
                    variant="outline" 
                    onClick={handleCopyToClipboard}
                    className="gap-2"
                  >
                    <Copy size={16} />
                    Copy
                  </Button>
                )}
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Rewriting Options</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Tone</label>
                  <Select 
                    value={tone} 
                    onValueChange={setTone}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Style</label>
                  <Select 
                    value={style} 
                    onValueChange={setStyle}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="simple">Simple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full mt-4 gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                  onClick={handleRewrite}
                  disabled={isRewriting || !originalText.trim()}
                >
                  {isRewriting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Rewrite Content
                    </>
                  )}
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Tips for Better Results</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Provide clear, well-structured original text</span>
                </li>
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Choose tone and style that match your audience</span>
                </li>
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Review the AI output and make final edits yourself</span>
                </li>
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Use the 'Professional' tone for business content</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIRewriter;
