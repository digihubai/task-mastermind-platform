
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TopicStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ seoData, onDataChange, onNext }) => {
  const { toast } = useToast();
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  
  const handleGenerateKeywords = () => {
    if (!seoData.topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to provide a topic to generate keywords",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingKeywords(true);
    
    // Simulate API call to generate better, more relevant keywords
    setTimeout(() => {
      // Generate more relevant and focused keywords based on topic
      const topic = seoData.topic.toLowerCase();
      const words = topic.split(/\s+/);
      const mainTerm = words[words.length - 1] || words[0] || "product";
      
      // More sophisticated keyword generation based on topic context
      let relatedKeywords = [];
      
      // Extract key themes from the topic
      const topicThemes = {
        marketing: ['marketing', 'advertise', 'promote', 'brand', 'campaign'],
        technology: ['tech', 'software', 'app', 'digital', 'computer', 'online', 'platform'],
        business: ['business', 'company', 'startup', 'enterprise', 'organization', 'corporate'],
        ecommerce: ['shop', 'store', 'ecommerce', 'retail', 'product', 'sell'],
        content: ['content', 'blog', 'article', 'post', 'write'],
        ai: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'automation']
      };
      
      // Determine primary theme of the topic
      let primaryTheme = '';
      let maxMatches = 0;
      
      for (const [theme, keywords] of Object.entries(topicThemes)) {
        const matches = keywords.filter(keyword => topic.includes(keyword)).length;
        if (matches > maxMatches) {
          maxMatches = matches;
          primaryTheme = theme;
        }
      }
      
      // If no clear theme is detected, default to business
      if (!primaryTheme) primaryTheme = 'business';
      
      // Generate keywords based on detected theme
      switch (primaryTheme) {
        case 'marketing':
          relatedKeywords = [
            `${mainTerm} strategy`,
            `${mainTerm} campaign`,
            `digital ${mainTerm}`,
            `${mainTerm} analytics`,
            `${mainTerm} roi`,
            `${mainTerm} optimization`,
            `${mainTerm} funnel`,
            `${mainTerm} automation`,
            `${mainTerm} targeting`,
            `${mainTerm} metrics`,
            `${mainTerm} performance`,
            `effective ${mainTerm}`,
            `${mainTerm} software`,
            `${mainTerm} agency`,
            `${mainTerm} services`,
            `best ${mainTerm} practices`,
            `${mainTerm} trends`,
            `${mainTerm} tools`,
            `${mainTerm} platforms`,
            `${mainTerm} technology`
          ];
          break;
          
        case 'technology':
          relatedKeywords = [
            `${mainTerm} software`,
            `${mainTerm} platform`,
            `${mainTerm} solution`,
            `${mainTerm} system`,
            `${mainTerm} api`,
            `${mainTerm} integration`,
            `${mainTerm} architecture`,
            `${mainTerm} infrastructure`,
            `${mainTerm} scalability`,
            `${mainTerm} security`,
            `${mainTerm} development`,
            `${mainTerm} implementation`,
            `enterprise ${mainTerm}`,
            `${mainTerm} features`,
            `${mainTerm} benefits`,
            `${mainTerm} comparison`,
            `${mainTerm} pricing`,
            `${mainTerm} review`,
            `top ${mainTerm} providers`,
            `best ${mainTerm} tools`
          ];
          break;
          
        case 'business':
          relatedKeywords = [
            `${mainTerm} strategy`,
            `${mainTerm} growth`,
            `${mainTerm} optimization`,
            `${mainTerm} transformation`,
            `${mainTerm} innovation`,
            `${mainTerm} management`,
            `${mainTerm} solutions`,
            `${mainTerm} consulting`,
            `${mainTerm} services`,
            `${mainTerm} case study`,
            `${mainTerm} best practices`,
            `${mainTerm} implementation`,
            `${mainTerm} framework`,
            `${mainTerm} metrics`,
            `${mainTerm} success factors`,
            `${mainTerm} challenges`,
            `${mainTerm} trends`,
            `${mainTerm} leadership`,
            `${mainTerm} efficiency`,
            `${mainTerm} sustainability`
          ];
          break;
          
        case 'ecommerce':
          relatedKeywords = [
            `${mainTerm} store`,
            `${mainTerm} shop`,
            `${mainTerm} marketplace`,
            `${mainTerm} platform`,
            `${mainTerm} shopping`,
            `${mainTerm} product`,
            `${mainTerm} checkout`,
            `${mainTerm} cart`,
            `${mainTerm} payment`,
            `${mainTerm} shipping`,
            `${mainTerm} returns`,
            `${mainTerm} customer experience`,
            `${mainTerm} conversion rate`,
            `${mainTerm} analytics`,
            `${mainTerm} optimization`,
            `best ${mainTerm} sites`,
            `${mainTerm} hosting`,
            `${mainTerm} website`,
            `${mainTerm} security`,
            `${mainTerm} mobile`
          ];
          break;
          
        case 'content':
          relatedKeywords = [
            `${mainTerm} creation`,
            `${mainTerm} strategy`,
            `${mainTerm} marketing`,
            `${mainTerm} writing`,
            `${mainTerm} distribution`,
            `${mainTerm} management`,
            `${mainTerm} optimization`,
            `${mainTerm} planning`,
            `${mainTerm} calendar`,
            `${mainTerm} promotion`,
            `${mainTerm} engagement`,
            `${mainTerm} analytics`,
            `${mainTerm} tools`,
            `${mainTerm} trends`,
            `${mainTerm} best practices`,
            `${mainTerm} examples`,
            `${mainTerm} roi`,
            `${mainTerm} metrics`,
            `${mainTerm} workflow`,
            `${mainTerm} production`
          ];
          break;
          
        case 'ai':
          relatedKeywords = [
            `${mainTerm} intelligence`,
            `${mainTerm} learning`,
            `${mainTerm} automation`,
            `${mainTerm} algorithms`,
            `${mainTerm} neural networks`,
            `${mainTerm} machine learning`,
            `${mainTerm} deep learning`,
            `${mainTerm} natural language processing`,
            `${mainTerm} computer vision`,
            `${mainTerm} robotics`,
            `${mainTerm} prediction`,
            `${mainTerm} analytics`,
            `${mainTerm} data science`,
            `${mainTerm} applications`,
            `${mainTerm} implementation`,
            `${mainTerm} tools`,
            `${mainTerm} platforms`,
            `${mainTerm} solutions`,
            `${mainTerm} benefits`,
            `${mainTerm} ethics`
          ];
          break;
          
        default:
          // Generic business keywords as fallback
          relatedKeywords = [
            `${mainTerm}`,
            `best ${mainTerm}`,
            `${mainTerm} benefits`,
            `${mainTerm} examples`,
            `${mainTerm} tips`,
            `${mainTerm} guide`,
            `${mainTerm} tutorial`,
            `${mainTerm} strategy`,
            `${mainTerm} management`,
            `${mainTerm} tools`,
            `${mainTerm} software`,
            `${mainTerm} platform`,
            `${mainTerm} solutions`,
            `${mainTerm} services`,
            `${mainTerm} trends`,
            `${mainTerm} best practices`,
            `${mainTerm} techniques`,
            `${mainTerm} implementation`,
            `${mainTerm} optimization`,
            `${mainTerm} experts`
          ];
      }
      
      // Remove duplicates and filter valid keywords
      const uniqueKeywords = [...new Set(relatedKeywords)]
        .filter(keyword => keyword.length > 2)
        .slice(0, seoData.keywordCount);
      
      onDataChange("keywords", uniqueKeywords);
      setIsGeneratingKeywords(false);
      
      toast({
        title: "Keywords generated",
        description: `Generated ${uniqueKeywords.length} keywords based on your topic`,
      });
    }, 1500);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const selectedKeywords = [...seoData.selectedKeywords];
    if (selectedKeywords.includes(keyword)) {
      onDataChange("selectedKeywords", selectedKeywords.filter(k => k !== keyword));
    } else {
      onDataChange("selectedKeywords", [...selectedKeywords, keyword]);
    }
  };
  
  const handleSelectAll = () => {
    if (seoData.selectedKeywords.length === seoData.keywords.length) {
      onDataChange("selectedKeywords", []);
    } else {
      onDataChange("selectedKeywords", [...seoData.keywords]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">What is this article about?</label>
            <Textarea 
              placeholder="What is this article about?"
              value={seoData.topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="resize-none h-32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Keywords</label>
            <Input 
              type="number" 
              value={seoData.keywordCount}
              onChange={(e) => onDataChange("keywordCount", parseInt(e.target.value) || 10)}
              min={1}
              max={20}
            />
          </div>
          
          <div>
            <Button 
              className="w-full"
              onClick={handleGenerateKeywords}
              disabled={isGeneratingKeywords || !seoData.topic.trim()}
            >
              {isGeneratingKeywords ? "Generating Keywords..." : "Generate Keywords"}
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="py-2">
                Advanced Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Keyword Difficulty</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="easy">Easy (0-30)</option>
                      <option value="medium">Medium (31-60)</option>
                      <option value="hard">Hard (61-100)</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Select Keywords</h2>
          {seoData.keywords.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {seoData.selectedKeywords.length === seoData.keywords.length ? "Deselect All" : "Select All"}
            </Button>
          )}
        </div>
        
        {seoData.keywords.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {seoData.keywords.map((keyword: string, index: number) => (
                  <Button
                    key={index}
                    variant={seoData.selectedKeywords.includes(keyword) ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => handleKeywordSelect(keyword)}
                    size="sm"
                  >
                    {keyword}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="px-2">
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
              
              <Button onClick={onNext} className="px-6">Continue</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p className="mb-2">No keywords generated yet</p>
            <p className="text-sm">Generate keywords using the form on the left</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TopicStep;
