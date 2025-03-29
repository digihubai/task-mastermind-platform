
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Edit, 
  Copy, 
  RotateCcw,
  Sparkles,
  Globe,
  BarChart3,
  ArrowUp,
  Calendar,
  ImageIcon,
  VideoIcon,
  FileText,
  ArrowsUpDown,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const AISEOWriter = () => {
  const [activeTab, setActiveTab] = useState("input");
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("Blog Post");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState("1000-1500");
  const [headingStructure, setHeadingStructure] = useState("H1 + H2 + H3");
  const [language, setLanguage] = useState("en");
  const [includeTOC, setIncludeTOC] = useState(false);
  const [includeFAQ, setIncludeFAQ] = useState(false);
  const [includeCTA, setIncludeCTA] = useState(false);
  const [keywordDensity, setKeywordDensity] = useState("Medium");
  const [expertiseLevel, setExpertiseLevel] = useState("Intermediate");
  const [brandPersonality, setBrandPersonality] = useState("Friendly");
  const [secondaryKeywordsOption, setSecondaryKeywordsOption] = useState("auto");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [metaDescriptionOption, setMetaDescriptionOption] = useState("auto");
  const [metaDescription, setMetaDescription] = useState("");
  const [includeInternalLinking, setIncludeInternalLinking] = useState(false);
  const [semanticEnrichment, setSemanticEnrichment] = useState("Advanced");
  const [lsiKeywords, setLsiKeywords] = useState(true);
  const [serpTarget, setSerpTarget] = useState("Featured Snippets");
  const [uniquenessLevel, setUniquenessLevel] = useState("High");
  const [searchIntent, setSearchIntent] = useState("Mixed");
  const [includeImagePlacement, setIncludeImagePlacement] = useState(true);
  const [includeVideoSuggestions, setIncludeVideoSuggestions] = useState(false);
  const [includeInfographics, setIncludeInfographics] = useState(false);
  const [analyzeCompetitors, setAnalyzeCompetitors] = useState(true);
  const [includeContentGaps, setIncludeContentGaps] = useState(true);
  const [includeUSPs, setIncludeUSPs] = useState(true);

  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishType, setPublishType] = useState("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showWordPressOptions, setShowWordPressOptions] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  const handleGenerate = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const contentTypeFormats = {
        'Blog Post': "# Blog Post",
        'Landing Page': "# Landing Page",
        'Product Description': "## Product Description",
        'Service Page': "# Service Page",
        'How-to Guide': "# How-to Guide",
        'Comparison Article': "# Comparison Article"
      };
      
      const format = contentTypeFormats[contentType as keyof typeof contentTypeFormats];
      const languageName = LANGUAGES.find(lang => lang.code === language)?.name || "English";
      
      setGeneratedContent(`${format}: ${keyword}\n\nThis is an SEO-optimized ${contentType} about "${keyword}" in ${languageName} with a ${tone} tone that is approximately ${wordCount} words in length.\n\n## Key SEO Elements\n\n- Primary keyword "${keyword}" used in title, headings, and body\n- Secondary keywords included naturally\n- Optimized heading structure (${headingStructure})\n- Proper keyword density (${keywordDensity})\n- Meta description optimized for click-through\n- ${includeInternalLinking ? 'Internal linking suggestions included' : 'No internal linking'}\n\nThis content is designed to rank well for "${keyword}" while providing value to readers and maintaining a natural, engaging ${tone} tone with an ${expertiseLevel} expertise level and ${brandPersonality} brand personality.\n\n${includeTOC ? '## Table of Contents\n\n- Introduction\n- Main Section 1\n- Main Section 2\n- Conclusion\n' : ''}\n\n${includeFAQ ? '## Frequently Asked Questions\n\n### Q1: What is the best way to use ' + keyword + '?\n\nA1: The best way to use ' + keyword + ' depends on your specific needs and requirements...\n' : ''}\n\n${includeCTA ? '## Take Action Now\n\nReady to get started with ' + keyword + '? Contact us today to learn more about how we can help you achieve your goals.\n' : ''}`);
      
      setIsGenerating(false);
      toast.success("SEO content generated!");
      setShowWordPressOptions(true);
      setActiveTab("output");
    }, 2000);
  };
  
  const handleReset = () => {
    setKeyword("");
    setContentType("Blog Post");
    setTone("professional");
    setWordCount("1000-1500");
    setLanguage("en");
    setHeadingStructure("H1 + H2 + H3");
    setIncludeTOC(false);
    setIncludeFAQ(false);
    setIncludeCTA(false);
    setKeywordDensity("Medium");
    setExpertiseLevel("Intermediate");
    setBrandPersonality("Friendly");
    setSecondaryKeywordsOption("auto");
    setSecondaryKeywords("");
    setMetaDescriptionOption("auto");
    setMetaDescription("");
    setIncludeInternalLinking(false);
    setSemanticEnrichment("Advanced");
    setLsiKeywords(true);
    setSerpTarget("Featured Snippets");
    setUniquenessLevel("High");
    setSearchIntent("Mixed");
    setIncludeImagePlacement(true);
    setIncludeVideoSuggestions(false);
    setIncludeInfographics(false);
    setAnalyzeCompetitors(true);
    setIncludeContentGaps(true);
    setIncludeUSPs(true);
    setGeneratedContent("");
    setShowWordPressOptions(false);
    setActiveTab("input");
    toast.info("All fields have been reset");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handlePublishToWordPress = () => {
    if (publishType === "scheduled" && (!scheduleDate || !scheduleTime)) {
      toast.error("Please select both date and time for scheduled publishing");
      return;
    }

    const publishAction = publishType === "immediate" ? "Publishing" : "Scheduling";
    const scheduledInfo = publishType === "scheduled" ? ` for ${scheduleDate} at ${scheduleTime}` : "";
    
    toast.success(`${publishAction} to WordPress${scheduledInfo}...`);
    
    // Simulate publishing process
    setTimeout(() => {
      toast.success(`Successfully ${publishType === "immediate" ? "published" : "scheduled"} to WordPress${scheduledInfo}`);
    }, 1500);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
          <p className="text-muted-foreground mt-1">
            Generate search-optimized content for better rankings and traffic
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="input">Input Parameters</TabsTrigger>
                  <TabsTrigger value="output">Generated Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="input">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Target Keyword</Label>
                        <Input 
                          placeholder="Enter your main SEO keyword or phrase" 
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                    
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Language</Label>
                          <Select 
                            value={language} 
                            onValueChange={setLanguage}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {LANGUAGES.map(lang => (
                                <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Content Type</Label>
                          <Select 
                            value={contentType} 
                            onValueChange={setContentType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTENT_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Word Count</Label>
                          <Select 
                            value={wordCount} 
                            onValueChange={setWordCount}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              {WORD_COUNTS.map(count => (
                                <SelectItem key={count} value={count}>{count} words</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Heading Structure</Label>
                          <Select 
                            value={headingStructure} 
                            onValueChange={setHeadingStructure}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select heading structure" />
                            </SelectTrigger>
                            <SelectContent>
                              {HEADING_STRUCTURES.map(structure => (
                                <SelectItem key={structure} value={structure}>{structure}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Voice</Label>
                          <Select 
                            value={tone} 
                            onValueChange={setTone}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              {VOICE_OPTIONS.map(voice => (
                                <SelectItem key={voice.toLowerCase()} value={voice.toLowerCase()}>{voice}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    
                      <div className="space-y-3">
                        <Label className="text-sm font-medium block">Include Sections</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="toc" 
                              checked={includeTOC}
                              onCheckedChange={(checked) => setIncludeTOC(checked === true)}
                            />
                            <label
                              htmlFor="toc"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Table of Contents
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="faq" 
                              checked={includeFAQ}
                              onCheckedChange={(checked) => setIncludeFAQ(checked === true)}
                            />
                            <label
                              htmlFor="faq"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              FAQ Section
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="cta" 
                              checked={includeCTA}
                              onCheckedChange={(checked) => setIncludeCTA(checked === true)}
                            />
                            <label
                              htmlFor="cta"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Call to Action
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      >
                        {showAdvancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}
                      </Button>
                      
                      <Button 
                        className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        onClick={handleGenerate}
                        disabled={isGenerating || !keyword.trim()}
                      >
                        {isGenerating ? (
                          <>Generating content...</>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Generate SEO Content
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {showAdvancedOptions && (
                      <div className="border-t pt-4 space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">SEO Parameters</h3>
                          
                          <div className="space-y-3">
                            <Label htmlFor="keywordDensity">Keyword Density</Label>
                            <Select 
                              value={keywordDensity} 
                              onValueChange={setKeywordDensity}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select keyword density" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low (0.5-1%)</SelectItem>
                                <SelectItem value="Medium">Medium (1-2%)</SelectItem>
                                <SelectItem value="High">High (2-3%)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-3">
                            <Label>Secondary Keywords</Label>
                            <RadioGroup 
                              value={secondaryKeywordsOption} 
                              onValueChange={setSecondaryKeywordsOption}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="auto" id="auto-keywords" />
                                <Label htmlFor="auto-keywords">Generate automatically using AI</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="manual" id="manual-keywords" />
                                <Label htmlFor="manual-keywords">Enter manually</Label>
                              </div>
                            </RadioGroup>
                            
                            {secondaryKeywordsOption === "manual" && (
                              <Textarea
                                placeholder="Enter secondary keywords separated by commas"
                                value={secondaryKeywords}
                                onChange={(e) => setSecondaryKeywords(e.target.value)}
                                className="mt-2"
                              />
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <Label>Meta Description</Label>
                            <RadioGroup 
                              value={metaDescriptionOption} 
                              onValueChange={setMetaDescriptionOption}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="auto" id="auto-meta" />
                                <Label htmlFor="auto-meta">Generate automatically</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="manual" id="manual-meta" />
                                <Label htmlFor="manual-meta">Enter manually</Label>
                              </div>
                            </RadioGroup>
                            
                            {metaDescriptionOption === "manual" && (
                              <Textarea
                                placeholder="Enter meta description (150-160 characters recommended)"
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className="mt-2"
                                maxLength={160}
                              />
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="internal-linking" 
                              checked={includeInternalLinking}
                              onCheckedChange={(checked) => setIncludeInternalLinking(checked === true)}
                            />
                            <Label
                              htmlFor="internal-linking"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Include internal linking suggestions
                            </Label>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Content Tone & Style</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Industry Expertise Level</Label>
                              <Select 
                                value={expertiseLevel} 
                                onValueChange={setExpertiseLevel}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select expertise level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {EXPERTISE_LEVELS.map(level => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Brand Personality</Label>
                              <Select 
                                value={brandPersonality} 
                                onValueChange={setBrandPersonality}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select brand personality" />
                                </SelectTrigger>
                                <SelectContent>
                                  {BRAND_PERSONALITIES.map(personality => (
                                    <SelectItem key={personality} value={personality}>{personality}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">AI Enhancement Features</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Semantic Content Enrichment</Label>
                              <Select 
                                value={semanticEnrichment} 
                                onValueChange={setSemanticEnrichment}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select enrichment level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Basic">Basic</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>SERP Feature Targeting</Label>
                              <Select 
                                value={serpTarget} 
                                onValueChange={setSerpTarget}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select SERP target" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Featured Snippets">Featured Snippets</SelectItem>
                                  <SelectItem value="People Also Ask">People Also Ask</SelectItem>
                                  <SelectItem value="None">None</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Content Uniqueness Level</Label>
                              <Select 
                                value={uniquenessLevel} 
                                onValueChange={setUniquenessLevel}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select uniqueness level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Standard">Standard</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Maximum">Maximum</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Search Intent Focus</Label>
                              <Select 
                                value={searchIntent} 
                                onValueChange={setSearchIntent}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select search intent" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Informational">Informational</SelectItem>
                                  <SelectItem value="Transactional">Transactional</SelectItem>
                                  <SelectItem value="Navigational">Navigational</SelectItem>
                                  <SelectItem value="Mixed">Mixed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="lsi-keywords" 
                              checked={lsiKeywords}
                              onCheckedChange={(checked) => setLsiKeywords(checked === true)}
                            />
                            <Label
                              htmlFor="lsi-keywords"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              LSI keyword integration
                            </Label>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Media & Competitive Analysis</h3>
                          
                          <div className="space-y-3">
                            <Label>Media Recommendations</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="image-placement" 
                                  checked={includeImagePlacement}
                                  onCheckedChange={(checked) => setIncludeImagePlacement(checked === true)}
                                />
                                <Label
                                  htmlFor="image-placement"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Image placement
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="video-suggestions" 
                                  checked={includeVideoSuggestions}
                                  onCheckedChange={(checked) => setIncludeVideoSuggestions(checked === true)}
                                />
                                <Label
                                  htmlFor="video-suggestions"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Video suggestions
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="infographics" 
                                  checked={includeInfographics}
                                  onCheckedChange={(checked) => setIncludeInfographics(checked === true)}
                                />
                                <Label
                                  htmlFor="infographics"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Infographic recommendations
                                </Label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Label>Competitive Analysis</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="analyze-competitors" 
                                  checked={analyzeCompetitors}
                                  onCheckedChange={(checked) => setAnalyzeCompetitors(checked === true)}
                                />
                                <Label
                                  htmlFor="analyze-competitors"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Analyze top-ranking content
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="content-gaps" 
                                  checked={includeContentGaps}
                                  onCheckedChange={(checked) => setIncludeContentGaps(checked === true)}
                                />
                                <Label
                                  htmlFor="content-gaps"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Include content gaps
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="usps" 
                                  checked={includeUSPs}
                                  onCheckedChange={(checked) => setIncludeUSPs(checked === true)}
                                />
                                <Label
                                  htmlFor="usps"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Suggest unique selling points
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="output">
                  <Textarea
                    placeholder="SEO-optimized content will appear here..."
                    className="min-h-[300px] resize-none font-mono text-sm"
                    value={generatedContent}
                    readOnly
                  />
                  
                  {generatedContent && (
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                          className="gap-2"
                        >
                          <RotateCcw size={16} />
                          Reset
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={handleCopyToClipboard}
                          className="gap-2"
                        >
                          <Copy size={16} />
                          Copy
                        </Button>
                      </div>

                      {showWordPressOptions && (
                        <Card className="p-4 mt-2 border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Globe size={16} className="text-green-600" />
                            WordPress Publishing Options
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Select 
                                value={publishType} 
                                onValueChange={setPublishType}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Publish type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="immediate">Publish Immediately</SelectItem>
                                  <SelectItem value="scheduled">Schedule Publication</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {publishType === "scheduled" && (
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-medium mb-1 block">Date</label>
                                  <Input 
                                    type="date" 
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-medium mb-1 block">Time</label>
                                  <Input 
                                    type="time" 
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                  />
                                </div>
                              </div>
                            )}
                            
                            <Button 
                              onClick={handlePublishToWordPress}
                              className="w-full gap-2"
                              variant="secondary"
                            >
                              {publishType === "immediate" ? (
                                <>
                                  <Globe size={16} />
                                  Publish to WordPress
                                </>
                              ) : (
                                <>
                                  <Calendar size={16} />
                                  Schedule for WordPress
                                </>
                              )}
                            </Button>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>

            {/* Add SEO Content Preview Component */}
            {generatedContent && (
              <SEOContentPreview content={generatedContent} />
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">SEO Performance</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Keyword Optimization</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      Excellent
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Readability</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      Good
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Originality</span>
                    <span className="text-sm font-medium text-amber-600 flex items-center">
                      Moderate
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">SEO Tips</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Search className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Include your target keyword in title, headings, and first paragraph</span>
                </li>
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Add relevant internal and external links</span>
                </li>
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Keep paragraphs short (3-4 sentences max)</span>
                </li>
                <li className="flex gap-2">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Maintain keyword density between 1-2%</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">AI Features</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-2 p-3 hover:bg-accent/30 transition-colors rounded-md">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Semantic Analysis</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enhances content with semantically related terms to improve topical relevance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 hover:bg-accent/30 transition-colors rounded-md">
                  <ImageIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Media Optimization</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Suggests strategic image placement with SEO-friendly alt text
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 hover:bg-accent/30 transition-colors rounded-md">
                  <ArrowsUpDown className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">SERP Position Analysis</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Analyzes top-ranking content to optimize structure and keywords
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 hover:bg-accent/30 transition-colors rounded-md">
                  <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Content Gap Identification</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Identifies missing topics and keywords to create more comprehensive content
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Add SEO tools and integrations tabs section */}
        <Tabs defaultValue="seo-tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 max-w-md">
            <TabsTrigger value="seo-tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="seo-tools">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Advanced SEO Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
                      <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium">Keyword Research</h4>
                    <p className="text-xs text-muted-foreground">Find high-value keywords for your content</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full">
                      <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-medium">SERP Analysis</h4>
                    <p className="text-xs text-muted-foreground">Analyze top-ranking content for any keyword</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full">
                      <Edit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-medium">Content Audit</h4>
                    <p className="text-xs text-muted-foreground">Evaluate and optimize your existing content</p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Content Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">WordPress</h4>
                      <p className="text-xs text-muted-foreground mt-1">Direct publishing to WordPress sites</p>
                      <p className="text-xs text-green-600 mt-2">Connected</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                      <Edit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Medium</h4>
                      <p className="text-xs text-muted-foreground mt-1">Publish articles to Medium</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Connect</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                      <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Google Search Console</h4>
                      <p className="text-xs text-muted-foreground mt-1">Track search performance</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Connect</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AISEOWriter;
