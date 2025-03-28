
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Eye, 
  ArrowRight, 
  Download,
  Copy,
  Plus,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateMockSEOContent } from "@/services/seoService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AISEOWriterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [numKeywords, setNumKeywords] = useState("10");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordsGenerated, setKeywordsGenerated] = useState(false);

  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [numTitles, setNumTitles] = useState("3");
  const [maxTitleLength, setMaxTitleLength] = useState("30");
  const [titlesGenerated, setTitlesGenerated] = useState(false);

  const [outlines, setOutlines] = useState<{ title: string; points: string[] }[]>([]);
  const [selectedOutline, setSelectedOutline] = useState<number | null>(null);
  const [numSubtitles, setNumSubtitles] = useState("10");
  const [numOutlines, setNumOutlines] = useState("3");
  const [outlineText, setOutlineText] = useState("");
  const [outlinesGenerated, setOutlinesGenerated] = useState(false);

  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageDescription, setImageDescription] = useState("");
  const [imageSize, setImageSize] = useState("small");
  const [numImages, setNumImages] = useState("4");
  const [imagesGenerated, setImagesGenerated] = useState(false);

  const [generatingContent, setGeneratingContent] = useState(false);
  const [finalContent, setFinalContent] = useState("");
  
  // Mock demo keywords for selection
  const demoKeywords = [
    "ai", "chatbot", "technology", "conversation", "automation", "intelligence",
    "communication", "support", "dialogue", "response", "automated", "customer service",
    "virtual assistant", "machine learning", "natural language", "user interaction",
    "programming"
  ];

  // Mock demo images for selection
  const demoImages = [
    "https://images.unsplash.com/photo-1677442135056-81713323593a",
    "https://images.unsplash.com/photo-1681856691441-0f692dbdbbc9",
    "https://images.unsplash.com/photo-1684381094156-c35c498df984",
    "https://images.unsplash.com/photo-1667730438377-0cac7865a93d",
    "https://images.unsplash.com/photo-1682251466846-c98c6d3fca40"
  ];

  // Demo outlines
  const demoOutlines = [
    {
      title: "Fundamentals of AI Chatbots",
      points: [
        "Introduction to the Topic",
        "Historical Context",
        "Key Terminology",
        "Overview of Current Trends",
        "Challenges Facing the Industry",
        "Technological Innovations",
        "Impact on Society",
        "Future Predictions",
        "Case Studies",
        "Conclusion and Recommendations"
      ]
    },
    {
      title: "The Complete Guide to Modern Chatbots",
      points: [
        "Overview of the Subject",
        "Significant Events",
        "Important Figures",
        "Principles and Guidelines",
        "Recent Developments",
        "Societal Implications",
        "Debates and Discussions",
        "Real-World Applications",
        "Long-Term Effects",
        "Final Thoughts"
      ]
    },
    {
      title: "AI Chatbot Implementation Strategies",
      points: [
        "Basics of the Subject",
        "Economic Implications",
        "Legal Framework",
        "Stakeholder Perspectives",
        "Global Comparisons",
        "Ethical Considerations",
        "Role of Education",
        "Expected Outcomes",
        "Potential for Growth",
        "Summary of Key Points"
      ]
    },
    {
      title: "Revolutionizing Customer Service with AI Chatbots",
      points: [
        "Defining the Subject Matter",
        "Comparative Analysis with Similar Fields",
        "Influential Figures in the Field",
        "Major Events that Shaped the Topic",
        "Cultural Significance",
        "Recent Developments",
        "Environmental Considerations",
        "Policy Implications",
        "Public Perception",
        "Final Thoughts"
      ]
    }
  ];

  // Mock demo titles
  const demoTitles = [
    "Chatbot Innovations: AI at Your Service",
    "The Future of Chatbots in AI Technology",
    "AI Chatbots: Revolutionizing Interaction"
  ];

  const handleGenerateKeywords = () => {
    if (!topic) {
      toast.error("Please enter a topic first");
      return;
    }
    
    // Simulate API call
    setKeywords(demoKeywords);
    setKeywordsGenerated(true);
  };

  const handleKeywordSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleGenerateTitles = () => {
    if (selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword");
      return;
    }
    
    // Simulate API call
    setTitles(demoTitles);
    setTitlesGenerated(true);
  };

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
  };

  const handleGenerateOutlines = () => {
    if (!selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    // Simulate API call
    setOutlines(demoOutlines);
    setOutlinesGenerated(true);
  };

  const handleOutlineSelect = (index: number) => {
    setSelectedOutline(index);
  };

  const handleGenerateImages = () => {
    if (!imageDescription && !selectedTitle && selectedKeywords.length === 0) {
      toast.error("Please enter an image description or select keywords");
      return;
    }
    
    // Simulate API call
    setImages(demoImages);
    setImagesGenerated(true);
  };

  const handleImageSelect = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSelectAll = () => {
    setSelectedKeywords([...demoKeywords]);
  };

  const handleClearSelection = () => {
    setSelectedKeywords([]);
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword");
      return;
    }
    
    if (currentStep === 2 && !selectedTitle) {
      toast.error("Please select a title");
      return;
    }
    
    if (currentStep === 3 && selectedOutline === null) {
      toast.error("Please select an outline");
      return;
    }
    
    setCurrentStep(currentStep + 1);
    
    // If moving to final step, generate content
    if (currentStep === 4) {
      generateFinalContent();
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const generateFinalContent = () => {
    setGeneratingContent(true);
    
    // Simulate API call
    setTimeout(() => {
      const content = generateMockSEOContent(selectedTitle, selectedKeywords);
      setFinalContent(content);
      setGeneratingContent(false);
    }, 3000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(finalContent);
    toast.success("Content copied to clipboard!");
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([finalContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded as Markdown!");
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center mb-6">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`flex items-center justify-center rounded-full w-8 h-8 ${
                step === currentStep 
                  ? 'bg-purple-700 text-white' 
                  : step < currentStep 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {step < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            {step < 4 && (
              <div 
                className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-purple-300' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderTopicStep = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Topic</h3>
            <Textarea 
              placeholder="What is this article about?"
              className="min-h-[120px] resize-none mb-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Number of Keywords</h4>
              <Input 
                type="number" 
                value={numKeywords}
                onChange={(e) => setNumKeywords(e.target.value)}
                min="1"
                max="20"
              />
            </div>
            
            <div className="space-y-3 mt-8">
              <div className="flex items-center">
                <h4 className="text-sm font-medium flex-1">Advanced Options</h4>
                <Button variant="ghost" size="sm" className="h-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                onClick={handleGenerateKeywords}
                disabled={!topic}
              >
                Generate Keywords
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Select Keywords</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleClearSelection}
                disabled={selectedKeywords.length === 0}
              >
                Clear
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-purple-700 mb-4"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
            
            <div className="flex flex-wrap gap-2">
              {keywordsGenerated ? (
                keywords.map((keyword, index) => (
                  <Badge 
                    key={index}
                    className={`cursor-pointer py-1.5 px-3 ${
                      selectedKeywords.includes(keyword) 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    variant="outline"
                    onClick={() => handleKeywordSelect(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))
              ) : (
                <div className="text-center w-full py-10 text-muted-foreground">
                  Enter a topic and generate keywords
                </div>
              )}
            </div>
            
            {selectedKeywords.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Selected keywords: {selectedKeywords.length}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedKeywords.map((keyword, index) => (
                    <Badge 
                      key={index}
                      className="bg-purple-100 text-purple-700"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            onClick={nextStep}
            disabled={selectedKeywords.length === 0}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </>
    );
  };

  const renderTitleStep = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Title Topic (Optional)</h3>
            <Textarea 
              placeholder="Explain your idea"
              className="min-h-[120px] resize-none mb-4"
            />
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Keywords</h4>
              <Input 
                value={selectedKeywords.join(',')}
                readOnly
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Number of Titles</h4>
                <Input 
                  type="number" 
                  value={numTitles}
                  onChange={(e) => setNumTitles(e.target.value)}
                  min="1"
                  max="5"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Maximum Title length</h4>
                <Input 
                  type="number" 
                  value={maxTitleLength}
                  onChange={(e) => setMaxTitleLength(e.target.value)}
                  min="10"
                  max="100"
                />
              </div>
            </div>
            
            <div className="space-y-3 mt-8">
              <div className="flex items-center">
                <h4 className="text-sm font-medium flex-1">Advanced Options</h4>
                <Button variant="ghost" size="sm" className="h-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                onClick={handleGenerateTitles}
                disabled={selectedKeywords.length === 0}
              >
                Generate Title
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Choose a Title</h3>
            
            {titlesGenerated ? (
              <div className="space-y-4">
                {titles.map((title, index) => (
                  <div 
                    key={index}
                    className={`border rounded-md p-4 transition-colors cursor-pointer ${
                      selectedTitle === title 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                    onClick={() => handleTitleSelect(title)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{title}</h4>
                      </div>
                      {selectedTitle === title && (
                        <div className="rounded-full bg-purple-100 p-1">
                          <Check className="h-4 w-4 text-purple-700" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground border rounded-md">
                Generate titles to see options
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline"
            onClick={prevStep}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            onClick={nextStep}
            disabled={!selectedTitle}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </>
    );
  };

  const renderOutlineStep = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Outline Topic (Optional)</h3>
            <Textarea 
              placeholder="Explain your idea"
              className="min-h-[120px] resize-none mb-4"
              value={outlineText}
              onChange={(e) => setOutlineText(e.target.value)}
            />
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Keywords</h4>
              <Input 
                value={selectedKeywords.join(',')}
                readOnly
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Number of Subtitles</h4>
                <Input 
                  type="number" 
                  value={numSubtitles}
                  onChange={(e) => setNumSubtitles(e.target.value)}
                  min="3"
                  max="15"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Number of Outlines</h4>
                <Input 
                  type="number" 
                  value={numOutlines}
                  onChange={(e) => setNumOutlines(e.target.value)}
                  min="1"
                  max="5"
                />
              </div>
            </div>
            
            <div className="space-y-3 mt-8">
              <div className="flex items-center">
                <h4 className="text-sm font-medium flex-1">Advanced Options</h4>
                <Button variant="ghost" size="sm" className="h-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                onClick={handleGenerateOutlines}
                disabled={!selectedTitle && selectedKeywords.length === 0}
              >
                Generate Outline
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Outline</h3>
            
            {outlinesGenerated ? (
              <div className="space-y-6">
                {outlines.map((outline, index) => (
                  <div 
                    key={index}
                    className={`border rounded-md p-4 transition-colors cursor-pointer ${
                      selectedOutline === index 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                    onClick={() => handleOutlineSelect(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{outline.title}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {outline.points.map((point, i) => (
                            <li key={i} className="text-sm">{point}</li>
                          ))}
                        </ul>
                      </div>
                      {selectedOutline === index && (
                        <div className="rounded-full bg-purple-100 p-1">
                          <Check className="h-4 w-4 text-purple-700" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground border rounded-md">
                Generate outlines to see options
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline"
            onClick={prevStep}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            onClick={nextStep}
            disabled={selectedOutline === null}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </>
    );
  };

  const renderImageStep = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Explain Your Image (Optional)</h3>
            <Textarea 
              placeholder="Riding horse on mars"
              className="min-h-[120px] resize-none mb-4"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
            />
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Size (Optional)</h4>
              <Select 
                value={imageSize}
                onValueChange={setImageSize}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-small">Very Small</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Number of Images</h4>
              <Input 
                type="number" 
                value={numImages}
                onChange={(e) => setNumImages(e.target.value)}
                min="1"
                max="10"
              />
            </div>
            
            <div className="space-y-3 mt-8">
              <div className="flex items-center">
                <h4 className="text-sm font-medium flex-1">Advanced Options</h4>
                <Button variant="ghost" size="sm" className="h-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                onClick={handleGenerateImages}
              >
                Generate Image
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={nextStep}
            >
              Skip this step
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Image (optional)</h3>
            
            {imagesGenerated ? (
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`border rounded-md aspect-video overflow-hidden relative cursor-pointer ${
                      selectedImages.includes(image) ? 'border-purple-500' : 'border-gray-200'
                    }`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img 
                      src={image} 
                      alt={`Generated image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    {selectedImages.includes(image) && (
                      <div className="absolute top-2 right-2 bg-purple-100 rounded-full p-1">
                        <Check className="h-4 w-4 text-purple-700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground border rounded-md">
                Generate images or skip this step
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline"
            onClick={prevStep}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            onClick={nextStep}
          >
            Generate Article <Sparkles className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </>
    );
  };

  const renderGenerationStep = () => {
    return (
      <>
        {generatingContent ? (
          <div className="text-center py-16">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="text-purple-100" width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <svg className="animate-spin text-purple-600" width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="70" strokeDashoffset="20" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mt-6 mb-2">Generating the article...</h3>
              <p className="text-muted-foreground">You can edit your article in documents once it is generated.</p>
            </div>
          </div>
        ) : finalContent ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Result</h2>
              <Button variant="destructive" size="sm">Stop</Button>
            </div>
            
            <h3 className="text-lg font-medium mb-4">Overview</h3>
            
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                <Card className="prose max-w-none p-6 dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ 
                    __html: finalContent
                      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                      .replace(/\n- (.*$)/gim, '<li>$1</li>')
                      .replace(/\n([^\n]+)\n/g, '<p>$1</p>')
                  }} />
                </Card>
              </TabsContent>
              
              <TabsContent value="markdown">
                <Textarea
                  className="font-mono text-sm h-[400px]"
                  value={finalContent}
                  readOnly
                />
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleCopyToClipboard}
              >
                <Copy size={16} />
                Copy to Clipboard
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleDownloadMarkdown}
              >
                <Download size={16} />
                Download as Markdown
              </Button>
              
              <Button
                className="gap-2 ml-auto bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Eye size={16} />
                View Full Preview
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            Something went wrong. Please try again.
            
            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={generateFinalContent}
            >
              Retry Generation
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderTopicStep();
      case 2:
        return renderTitleStep();
      case 3:
        return renderOutlineStep();
      case 4:
        return renderImageStep();
      case 5:
        return renderGenerationStep();
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-6xl py-8">
        <Button 
          variant="ghost" 
          className="mb-4 gap-2 text-muted-foreground"
          onClick={() => toast.info("Navigating back to dashboard...")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">AI SEO Writer</h1>
            <p className="text-muted-foreground">
              Just choose your topic, and watch AI whip up SEO-optimized blog content in a matter of seconds!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-700"></div>
              <span className="text-sm">Words</span>
              <span className="text-sm font-medium">Unlimited</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm">Images</span>
              <span className="text-sm font-medium">Unlimited</span>
            </div>
            
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                setCurrentStep(1);
                setTopic("");
                setSelectedKeywords([]);
                setSelectedTitle("");
                setSelectedOutline(null);
                setSelectedImages([]);
                setFinalContent("");
                toast.success("Starting over");
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>
        
        <Card className="p-6 border border-border/40">
          {renderStepIndicator()}
          {renderCurrentStep()}
        </Card>
      </div>
    </AppLayout>
  );
};

export default AISEOWriterPage;
