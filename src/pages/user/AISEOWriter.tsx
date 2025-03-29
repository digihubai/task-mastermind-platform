
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronDown, 
  ChevronUp,
  Settings, 
  ImageIcon,
  VideoIcon,
  FileText,
  ArrowUpDown,
  Lightbulb,
  Download,
  Copy,
  Globe,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  generateSEOContent, 
  ContentGenerationParams, 
  GeneratedContent,
  downloadContentAsHTML,
  downloadContentAsMarkdown,
  copyContentToClipboard
} from "@/services/seo/contentGenerationService";

// Language options available for content generation
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'da', name: 'Danish' },
  { code: 'cs', name: 'Czech' },
  { code: 'el', name: 'Greek' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'fil', name: 'Filipino' },
  { code: 'he', name: 'Hebrew' },
];

// Content type options
const CONTENT_TYPES = [
  'Blog Post', 
  'Landing Page', 
  'Product Description', 
  'Service Page', 
  'How-to Guide', 
  'Comparison Article'
];

// Word count options
const WORD_COUNTS = [
  '500-750',
  '750-1000',
  '1000-1500',
  '1500-2000',
  '2000+'
];

// Heading structure options
const HEADING_STRUCTURES = [
  'H1 + H2',
  'H1 + H2 + H3',
  'Complete hierarchy'
];

// Voice options
const VOICE_OPTIONS = [
  'Informative',
  'Conversational',
  'Professional',
  'Persuasive'
];

// Expertise level options
const EXPERTISE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Expert'
];

// Brand personality options
const BRAND_PERSONALITIES = [
  'Friendly',
  'Authoritative',
  'Innovative',
  'Traditional'
];

// SERP targeting options
const SERP_TARGETING_OPTIONS = [
  'Featured Snippets',
  'People Also Ask',
  'None'
];

// Uniqueness level options
const UNIQUENESS_LEVELS = [
  'Standard',
  'High',
  'Maximum'
];

// Search intent options
const SEARCH_INTENT_OPTIONS = [
  'Informational',
  'Transactional',
  'Navigational',
  'Mixed'
];

const AISEOWriter: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  
  const [formData, setFormData] = useState<ContentGenerationParams>({
    topic: '',
    language: 'en',
    contentType: 'Blog Post',
    wordCount: '1000-1500',
    headingStructure: 'H1 + H2 + H3',
    includeTOC: false,
    includeFAQ: false,
    includeCTA: false,
    customSections: '',
    primaryKeyword: '',
    secondaryKeywords: [],
    keywordDensity: 'Medium',
    metaDescription: '',
    voice: 'Conversational',
    expertiseLevel: 'Intermediate',
    brandPersonality: 'Friendly',
    semanticEnrichment: 'Advanced',
    lsiKeywords: true,
    serpTargeting: 'Featured Snippets',
    uniquenessLevel: 'High',
    searchIntent: 'Mixed',
    includeImagePlacement: true,
    includeVideoSuggestions: false,
    includeInfographics: false,
    analyzeCompetitors: true,
    includeContentGaps: true,
    includeUSPs: true
  });
  
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSecondaryKeywords = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, secondaryKeywords: keywords }));
  };
  
  const handleGenerateContent = async () => {
    if (!formData.topic) {
      toast.error("Please enter a topic");
      return;
    }
    
    if (!formData.primaryKeyword) {
      toast.error("Please enter a primary keyword");
      return;
    }
    
    try {
      setIsGenerating(true);
      setActiveTab("result");
      toast.info("Generating SEO-optimized content... This may take a moment.");
      
      // Ensure primary keyword is used in topic if not already included
      if (!formData.topic.toLowerCase().includes(formData.primaryKeyword.toLowerCase())) {
        setFormData(prev => ({
          ...prev,
          topic: `${prev.topic}: ${prev.primaryKeyword}`
        }));
      }
      
      const content = await generateSEOContent(formData);
      setGeneratedContent(content);
      toast.success("SEO content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopyContent = () => {
    if (generatedContent) {
      copyContentToClipboard(generatedContent.content);
    }
  };
  
  const handleDownloadHTML = () => {
    if (generatedContent) {
      downloadContentAsHTML(generatedContent);
    }
  };
  
  const handleDownloadMarkdown = () => {
    if (generatedContent) {
      downloadContentAsMarkdown(generatedContent);
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI SEO Content Generator</h1>
            <p className="text-muted-foreground mt-1">
              Create SEO-optimized content with advanced AI and customization options
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="settings">Content Settings</TabsTrigger>
            <TabsTrigger value="result">Generated Content</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="settings" className="space-y-6">
              <Card className="p-6 border border-border/40">
                <form onSubmit={(e) => { e.preventDefault(); handleGenerateContent(); }} className="space-y-8">
                  {/* Content Basics Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Content Basics</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic</Label>
                          <Input
                            id="topic"
                            name="topic"
                            placeholder="Enter your content topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select 
                            value={formData.language} 
                            onValueChange={(value) => handleSelectChange("language", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                  {lang.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contentType">Content Type</Label>
                          <Select 
                            value={formData.contentType} 
                            onValueChange={(value) => handleSelectChange("contentType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTENT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="wordCount">Word Count</Label>
                          <Select 
                            value={formData.wordCount} 
                            onValueChange={(value) => handleSelectChange("wordCount", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select word count" />
                            </SelectTrigger>
                            <SelectContent>
                              {WORD_COUNTS.map((count) => (
                                <SelectItem key={count} value={count}>{count}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="headingStructure">Heading Structure</Label>
                          <Select 
                            value={formData.headingStructure} 
                            onValueChange={(value) => handleSelectChange("headingStructure", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select heading structure" />
                            </SelectTrigger>
                            <SelectContent>
                              {HEADING_STRUCTURES.map((structure) => (
                                <SelectItem key={structure} value={structure}>{structure}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="includeTOC" 
                            checked={formData.includeTOC} 
                            onCheckedChange={(checked) => handleSwitchChange("includeTOC", checked)}
                          />
                          <Label htmlFor="includeTOC">Include Table of Contents</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="includeFAQ" 
                            checked={formData.includeFAQ} 
                            onCheckedChange={(checked) => handleSwitchChange("includeFAQ", checked)}
                          />
                          <Label htmlFor="includeFAQ">Include FAQ Section</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="includeCTA" 
                            checked={formData.includeCTA} 
                            onCheckedChange={(checked) => handleSwitchChange("includeCTA", checked)}
                          />
                          <Label htmlFor="includeCTA">Include Call to Action</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="customSections">Custom Sections (optional)</Label>
                        <Textarea
                          id="customSections"
                          name="customSections"
                          placeholder="Enter custom sections separated by commas (e.g. Case Studies, Industry Examples, Future Trends)"
                          value={formData.customSections}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* SEO Parameters Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">SEO Parameters</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="primaryKeyword">Primary Keyword</Label>
                          <Input
                            id="primaryKeyword"
                            name="primaryKeyword"
                            placeholder="Enter primary keyword"
                            value={formData.primaryKeyword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="keywordDensity">Keyword Density</Label>
                          <Select 
                            value={formData.keywordDensity} 
                            onValueChange={(value) => handleSelectChange("keywordDensity", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select keyword density" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondaryKeywords">Secondary Keywords (optional)</Label>
                        <Textarea
                          id="secondaryKeywords"
                          name="secondaryKeywords"
                          placeholder="Enter secondary keywords separated by commas (leave blank for AI-generated keywords)"
                          onChange={handleSecondaryKeywords}
                        />
                        <p className="text-sm text-muted-foreground">Leave blank to auto-generate relevant secondary keywords</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="metaDescription">Meta Description (optional)</Label>
                        <Textarea
                          id="metaDescription"
                          name="metaDescription"
                          placeholder="Enter meta description (leave blank for auto-generation)"
                          value={formData.metaDescription}
                          onChange={handleInputChange}
                        />
                        <p className="text-sm text-muted-foreground">Leave blank to auto-generate based on content</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Settings Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced">
                      <AccordionTrigger className="text-lg font-medium">
                        <div className="flex items-center gap-2">
                          <Settings size={16} />
                          Advanced Settings
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-6">
                        {/* Content Tone & Style */}
                        <div>
                          <h3 className="font-medium mb-3">Content Tone & Style</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="voice">Voice</Label>
                              <Select 
                                value={formData.voice} 
                                onValueChange={(value) => handleSelectChange("voice", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select voice" />
                                </SelectTrigger>
                                <SelectContent>
                                  {VOICE_OPTIONS.map((voice) => (
                                    <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="expertiseLevel">Expertise Level</Label>
                              <Select 
                                value={formData.expertiseLevel} 
                                onValueChange={(value) => handleSelectChange("expertiseLevel", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select expertise level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {EXPERTISE_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="brandPersonality">Brand Personality</Label>
                              <Select 
                                value={formData.brandPersonality} 
                                onValueChange={(value) => handleSelectChange("brandPersonality", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select brand personality" />
                                </SelectTrigger>
                                <SelectContent>
                                  {BRAND_PERSONALITIES.map((personality) => (
                                    <SelectItem key={personality} value={personality}>{personality}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        {/* AI Enhancement Features */}
                        <div>
                          <h3 className="font-medium mb-3">AI Enhancement Features</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="semanticEnrichment">Semantic Content Enrichment</Label>
                              <Select 
                                value={formData.semanticEnrichment} 
                                onValueChange={(value) => handleSelectChange("semanticEnrichment", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select semantic enrichment" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Basic">Basic</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="serpTargeting">SERP Feature Targeting</Label>
                              <Select 
                                value={formData.serpTargeting} 
                                onValueChange={(value) => handleSelectChange("serpTargeting", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select SERP targeting" />
                                </SelectTrigger>
                                <SelectContent>
                                  {SERP_TARGETING_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="uniquenessLevel">Content Uniqueness Level</Label>
                              <Select 
                                value={formData.uniquenessLevel} 
                                onValueChange={(value) => handleSelectChange("uniquenessLevel", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select uniqueness level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {UNIQUENESS_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="searchIntent">Search Intent Focus</Label>
                              <Select 
                                value={formData.searchIntent} 
                                onValueChange={(value) => handleSelectChange("searchIntent", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select search intent" />
                                </SelectTrigger>
                                <SelectContent>
                                  {SEARCH_INTENT_OPTIONS.map((intent) => (
                                    <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="lsiKeywords" 
                                checked={formData.lsiKeywords} 
                                onCheckedChange={(checked) => handleSwitchChange("lsiKeywords", checked)}
                              />
                              <Label htmlFor="lsiKeywords">LSI Keyword Integration</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* Media Recommendations */}
                        <div>
                          <h3 className="font-medium mb-3">Media Recommendations</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeImagePlacement" 
                                checked={formData.includeImagePlacement} 
                                onCheckedChange={(checked) => handleSwitchChange("includeImagePlacement", checked)}
                              />
                              <Label htmlFor="includeImagePlacement">Image Placement Suggestions</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeVideoSuggestions" 
                                checked={formData.includeVideoSuggestions} 
                                onCheckedChange={(checked) => handleSwitchChange("includeVideoSuggestions", checked)}
                              />
                              <Label htmlFor="includeVideoSuggestions">Video Content Suggestions</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeInfographics" 
                                checked={formData.includeInfographics} 
                                onCheckedChange={(checked) => handleSwitchChange("includeInfographics", checked)}
                              />
                              <Label htmlFor="includeInfographics">Infographic Recommendations</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* Competitive Analysis */}
                        <div>
                          <h3 className="font-medium mb-3">Competitive Analysis</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="analyzeCompetitors" 
                                checked={formData.analyzeCompetitors} 
                                onCheckedChange={(checked) => handleSwitchChange("analyzeCompetitors", checked)}
                              />
                              <Label htmlFor="analyzeCompetitors">Analyze Top-Ranking Content</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeContentGaps" 
                                checked={formData.includeContentGaps} 
                                onCheckedChange={(checked) => handleSwitchChange("includeContentGaps", checked)}
                              />
                              <Label htmlFor="includeContentGaps">Include Content Gaps</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeUSPs" 
                                checked={formData.includeUSPs} 
                                onCheckedChange={(checked) => handleSwitchChange("includeUSPs", checked)}
                              />
                              <Label htmlFor="includeUSPs">Suggest Unique Selling Points</Label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating Content..." : "Generate SEO Content"}
                  </Button>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="result" className="space-y-6">
              <Card className="p-6 border border-border/40">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
                    <h3 className="text-xl font-medium mb-2">Generating SEO Content</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Our AI is creating high-quality SEO content based on your specifications. This may take a moment...
                    </p>
                  </div>
                ) : generatedContent ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <h2 className="text-2xl font-semibold">{generatedContent.title}</h2>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyContent}>
                          <Copy className="h-4 w-4 mr-1" /> Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadHTML}>
                          <Download className="h-4 w-4 mr-1" /> HTML
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
                          <FileText className="h-4 w-4 mr-1" /> MD
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast.info("Coming soon: Publish to CMS");
                        }}>
                          <Globe className="h-4 w-4 mr-1" /> Publish
                        </Button>
                      </div>
                    </div>
                    
                    {/* Content Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Word Count</p>
                        <p className="text-lg font-medium">{generatedContent.wordCount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Keywords</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="bg-primary/10">{generatedContent.keywords.primary}</Badge>
                          {generatedContent.keywords.secondary.slice(0, 3).map((keyword, i) => (
                            <Badge key={i} variant="outline">{keyword}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Readability Score</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                generatedContent.readabilityScore > 80 ? 'bg-green-500' :
                                generatedContent.readabilityScore > 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${generatedContent.readabilityScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{generatedContent.readabilityScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Preview */}
                    <div className="border rounded-lg p-6 overflow-auto max-h-[600px]">
                      <div 
                        className="prose prose-sm md:prose-base max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg"
                        dangerouslySetInnerHTML={{ __html: generatedContent.content }}
                      />
                    </div>
                    
                    {/* Meta Description */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Meta Description</h3>
                      <p className="text-sm">{generatedContent.metaDescription}</p>
                    </div>
                    
                    {/* Image Suggestions */}
                    {generatedContent.suggestedImages && generatedContent.suggestedImages.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Suggested Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {generatedContent.suggestedImages.map((image, i) => (
                            <div key={i} className="border rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Suggested image ${i + 1} for ${generatedContent.keywords.primary}`}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <FileText size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Content Generated Yet</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Configure your content settings and click "Generate SEO Content" to create your optimized content.
                    </p>
                    <Button onClick={() => setActiveTab("settings")}>Go to Settings</Button>
                  </div>
                )}
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AISEOWriter;
