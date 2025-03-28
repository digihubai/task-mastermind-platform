
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, List, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface SEOOutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOOutlineStep: React.FC<SEOOutlineStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutlines, setGeneratedOutlines] = useState<string[]>([]);
  const [selectedOutline, setSelectedOutline] = useState("");

  // Auto-generate outlines when component loads if we have a title
  useEffect(() => {
    if (seoData.title && (!generatedOutlines.length || generatedOutlines.length === 0)) {
      handleGenerateOutlines();
    }
  }, []);

  const handleGenerateOutlines = () => {
    setIsGenerating(true);
    toast.info("Generating outline options...");
    
    // Simulate API call
    setTimeout(() => {
      const mockOutlines = [
        `# ${seoData.selectedTitle || "AI Chatbots Guide"}
## Introduction to AI Chatbots
- What are AI chatbots and how they work
- Evolution of conversational AI technology
- Current market landscape

## Key Benefits for Businesses
- Customer service automation and cost savings
- 24/7 availability and instant responses
- Personalized customer experiences
- Data collection and analytics opportunities

## Popular AI Chatbot Platforms
- Overview of leading solutions
- Comparison of features and capabilities
- Pricing models and implementation costs

## Implementation Strategies
- Determining your chatbot needs
- Integration with existing systems
- Training your AI chatbot effectively
- Measuring success and ROI

## Best Practices for Chatbot Design
- Conversational design principles
- Handling edge cases and fallbacks
- Balancing automation with human support

## Future Trends in Chatbot Technology
- Advancements in natural language processing
- Multimodal interaction capabilities
- Industry-specific applications

## Conclusion`,
        
        `# ${seoData.selectedTitle || "Understanding AI Assistant Technology"}
## The Evolution of Conversational AI
- Historical development of chatbots
- Breakthroughs in natural language processing
- Shift from rule-based to AI-powered systems

## Core Components of Modern Chatbots
- Natural Language Understanding (NLU)
- Dialog management systems
- Machine learning and training mechanisms
- Response generation techniques

## Business Applications Across Industries
- Retail and e-commerce use cases
- Financial services implementations
- Healthcare chatbot applications
- Travel and hospitality solutions

## Technical Implementation Guide
- Choosing the right technology stack
- API integrations and connectors
- Security and compliance considerations
- Scaling your chatbot infrastructure

## Optimizing User Experience
- Creating intuitive conversation flows
- Personality development for chatbots
- Handling errors and misunderstandings
- User feedback incorporation

## Measuring Chatbot Performance
- Key performance indicators
- Conversation analytics tools
- A/B testing methodologies
- Continuous improvement strategies

## Future Outlook and Innovations
- Emerging technologies in the space
- Predicted market developments
- Preparing for the next generation of AI assistants`,

        `# ${seoData.selectedTitle || "Complete Guide to Conversational AI"}
## Getting Started with AI Chatbots
- Defining your chatbot strategy
- Setting realistic goals and expectations
- Building your initial use cases
- Resource planning and team requirements

## Technical Foundation
- Overview of chatbot architectures
- Language models and their capabilities
- Intent recognition and entity extraction
- Knowledge base development

## Development and Deployment Process
- Design and prototyping best practices
- Development workflows and tools
- Testing methodologies
- Deployment and monitoring strategies

## Enhancing Capabilities Over Time
- From basic to advanced conversations
- Adding multimedia and rich interactions
- Context awareness and memory features
- Personality and tone consistency

## Integration with Business Systems
- CRM integration strategies
- E-commerce platform connections
- Help desk and support ticket systems
- Marketing automation possibilities

## Analytics and Continuous Improvement
- Understanding conversation data
- Identifying bottlenecks and issues
- User satisfaction measurement
- Iterative refinement process

## Case Studies and Success Stories
- Real-world implementation examples
- Challenges overcome
- Measurable business results
- Lessons learned`
      ];
      setGeneratedOutlines(mockOutlines);
      if (!selectedOutline && mockOutlines.length > 0) {
        setSelectedOutline(mockOutlines[0]);
        onDataChange("outline", mockOutlines[0]);
      }
      setIsGenerating(false);
      toast.success("Generated 3 outline options!");
    }, 1500);
  };
  
  const handleSelectOutline = (outline: string) => {
    setSelectedOutline(outline);
    onDataChange("outline", outline);
  };
  
  const handleContinue = () => {
    if (selectedOutline || seoData.outline) {
      onNext();
    } else {
      toast.error("Please select an outline first");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Generate Outline</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Outline Topic</label>
            <Textarea 
              placeholder="Explain your idea"
              value={seoData.outlineTopic || seoData.topic || ""}
              onChange={(e) => onDataChange("outlineTopic", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <Input 
              value={(seoData.selectedKeywords || []).join(", ")}
              disabled
              className="bg-muted"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Sections</label>
              <Input 
                type="number" 
                value={seoData.subtitleCount || 5}
                onChange={(e) => onDataChange("subtitleCount", parseInt(e.target.value))}
                min={3}
                max={15}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Outline Style</label>
              <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => onDataChange("outlineStyle", e.target.value)}
                value={seoData.outlineStyle || "comprehensive"}
              >
                <option value="comprehensive">Comprehensive</option>
                <option value="concise">Concise</option>
                <option value="technical">Technical</option>
              </select>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateOutlines} 
            disabled={isGenerating || !seoData.selectedTitle}
            className="w-full"
          >
            {isGenerating ? "Generating Outlines..." : "Generate Outline Options"}
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose an Outline</h2>
        
        {generatedOutlines.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {generatedOutlines.map((outline, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer transition-colors overflow-auto max-h-[300px] relative ${
                    selectedOutline === outline ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectOutline(outline)}
                >
                  {selectedOutline === outline && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <CheckCircle size={16} />
                    </div>
                  )}
                  <div className="font-medium mb-2 text-sm">Option {index + 1}</div>
                  <pre className="whitespace-pre-wrap font-sans text-sm">{outline}</pre>
                </div>
              ))}
              
              <Button variant="outline" className="w-full" onClick={handleGenerateOutlines}>
                <RefreshCw size={16} className="mr-2" />
                Generate More Outline Options
              </Button>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <Button onClick={handleContinue} disabled={!selectedOutline && !seoData.outline}>
                Continue to Image
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <List size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No outlines generated yet</h3>
            <p className="max-w-xs">Click "Generate Outline Options" to create outline alternatives for your content.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOOutlineStep;
