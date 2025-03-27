
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface OutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const OutlineStep: React.FC<OutlineStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const { toast } = useToast();
  const [isGeneratingOutlines, setIsGeneratingOutlines] = useState(false);
  
  const handleGenerateOutlines = () => {
    if (!seoData.selectedTitle) {
      toast({
        title: "No title selected",
        description: "Please select a title to generate outlines",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingOutlines(true);
    
    // Simulate API call to generate outlines
    setTimeout(() => {
      const primaryKeyword = seoData.selectedKeywords[0] || "chatbot";
      const keywords = seoData.selectedKeywords.slice(0, 5);
      
      // Generate multiple outline options
      const outlineOptions = [
        {
          title: "Comprehensive Guide Outline",
          sections: [
            `Defining ${primaryKeyword}`,
            `Historical Context of ${primaryKeyword}s`,
            `Technological Foundations of Conversational AI`,
            `${primaryKeyword} Frameworks and Platforms`,
            `Human-Computer Interaction with ${primaryKeyword}s`,
            `Improving Customer Support with AI ${primaryKeyword}s`,
            `Integrating Voice AI into ${primaryKeyword}s`,
            `Addressing Limitations of Current ${primaryKeyword} Technologies`,
            `Training and Educating Users on ${primaryKeyword}s`,
            `Final Thoughts on the ${primaryKeyword} Landscape`
          ]
        },
        {
          title: "Technical Implementation Outline",
          sections: [
            `What is a ${primaryKeyword}?`,
            `The Evolution of Conversational Interfaces`,
            `Types of ${primaryKeyword}s: Rule-based vs AI-driven`,
            `Integrating ${primaryKeyword}s with Existing Systems`,
            `The Importance of Training Data`,
            `User Engagement Strategies with ${primaryKeyword}s`,
            `Ethical Considerations in AI ${primaryKeyword}s`,
            `Analyzing ${primaryKeyword} Performance Metrics`,
            `Case Studies of Successful ${primaryKeyword} Implementations`,
            `Looking Ahead: The Future of AI Conversational Agents`
          ]
        },
        {
          title: "Business-Focused Outline",
          sections: [
            `Introduction to AI and ${primaryKeyword}s`,
            `Understanding Conversational AI`,
            `How ${primaryKeyword}s Function`,
            `Benefits of Using ${primaryKeyword}s in Business`,
            `Common Applications of ${primaryKeyword}s`,
            `Challenges in ${primaryKeyword} Development`,
            `Future Trends in Conversational AI`,
            `The Role of Natural Language Processing`,
            `User Experience and ${primaryKeyword} Design`,
            `Conclusion on the Impact of ${primaryKeyword}s`
          ]
        }
      ];
      
      onDataChange("outlines", outlineOptions.slice(0, seoData.numberOfOutlines));
      setIsGeneratingOutlines(false);
      
      toast({
        title: "Outlines generated",
        description: `Generated ${seoData.numberOfOutlines} outline options based on your title`,
      });
    }, 1500);
  };
  
  const handleOutlineSelect = (outline: any) => {
    onDataChange("selectedOutline", outline);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Outline</h2>
        <Button variant="outline" size="sm" onClick={() => onDataChange("selectedOutline", null)}>
          Clear Selection
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Outline Topic (Optional)</label>
            <Textarea 
              placeholder="Enter a specific focus for your outline (optional)"
              value={seoData.topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <Input 
              value={seoData.selectedKeywords.join(', ')}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Subtitles</label>
            <Input 
              type="number" 
              value={seoData.numberOfSubtitles}
              onChange={(e) => onDataChange("numberOfSubtitles", parseInt(e.target.value) || 10)}
              min={3}
              max={20}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Outlines</label>
            <Input 
              type="number" 
              value={seoData.numberOfOutlines}
              onChange={(e) => onDataChange("numberOfOutlines", parseInt(e.target.value) || 3)}
              min={1}
              max={5}
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="py-2">
                Advanced Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Content Depth</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Content Structure</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="educational">Educational</option>
                      <option value="problem-solution">Problem-Solution</option>
                      <option value="comparison">Comparison</option>
                      <option value="step-by-step">Step-by-Step Guide</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            className="w-full"
            onClick={handleGenerateOutlines}
            disabled={isGeneratingOutlines || !seoData.selectedTitle}
          >
            {isGeneratingOutlines ? "Generating Outlines..." : "Generate Outline"}
          </Button>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Select an outline:</h3>
          
          {seoData.outlines.length > 0 ? (
            <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2">
              {seoData.outlines.map((outline: any, index: number) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    seoData.selectedOutline === outline 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleOutlineSelect(outline)}
                >
                  <p className="font-medium mb-2">{outline.title}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {outline.sections.map((section: string, sectionIndex: number) => (
                      <li key={sectionIndex} className="text-sm text-muted-foreground">
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <Button
                variant="outline"
                className="w-full mt-4"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Outline
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground border rounded-md p-4">
              <p className="mb-2">No outlines generated yet</p>
              <p className="text-sm">Generate outlines using the form on the left</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!seoData.selectedOutline}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default OutlineStep;
