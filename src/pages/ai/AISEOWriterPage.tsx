
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Edit, 
  Copy, 
  RotateCw,
  Sparkles,
  Globe,
  BarChart3,
  ArrowUp,
  Calendar,
  RefreshCw,
  CheckCircle2,
  MessageSquare,
  Settings,
  Download,
  FileDown,
  ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import { generateSEOTitles, generateMockSEOContent } from "@/services/seoService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  { code: 'he', name: 'Hebrew' }
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

const AISEOWriterPage = () => {
  const [formData, setFormData] = useState({
    topic: '',
    language: 'en',
    contentType: 'Blog Post',
    wordCount: '1000-1500',
    headingStructure: 'H1 + H2 + H3',
    includeTOC: false,
    includeFAQ: false,
    includeCTA: false,
    includeCustomSections: '',
    primaryKeyword: '',
    secondaryKeywordsGeneration: 'auto', // auto or manual
    secondaryKeywords: '',
    keywordDensity: 'Medium',
    metaDescriptionType: 'auto', // auto or manual
    metaDescriptionValue: '',
    includeInternalLinking: false,
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
  
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishType, setPublishType] = useState("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishPlatform, setPublishPlatform] = useState("wordpress");
  const [activeTab, setActiveTab] = useState("input");
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [metaDescription, setMetaDescription] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [error, setError] = useState(null);

  const [connectedCMS, setConnectedCMS] = useState({
    wordpress: true,
    shopify: false,
    webflow: false,
    medium: false,
    wix: false
  });
  
  const [publicationSettings, setPublicationSettings] = useState({
    addFeaturedImage: true,
    addTags: true,
    setCanonicalUrl: true,
    enableComments: true,
    socialShare: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const constructPrompt = (data) => {
    const languageName = LANGUAGES.find(lang => lang.code === data.language)?.name || "English";
    
    return `Generate SEO-optimized ${data.contentType} about ${data.topic} in ${languageName}.
    
Primary keyword: ${data.primaryKeyword}
Secondary keywords: ${data.secondaryKeywordsGeneration === 'auto' ? 'Generate relevant secondary keywords automatically' : data.secondaryKeywords}
Word count: ${data.wordCount}
Heading structure: ${data.headingStructure}
Include Table of Contents: ${data.includeTOC ? 'Yes' : 'No'}
Include FAQ Section: ${data.includeFAQ ? 'Yes' : 'No'}
Include Call to Action: ${data.includeCTA ? 'Yes' : 'No'}
Custom sections: ${data.includeCustomSections}
Keyword density: ${data.keywordDensity}
Voice: ${data.voice}
Expertise level: ${data.expertiseLevel}
Brand personality: ${data.brandPersonality}
Semantic enrichment: ${data.semanticEnrichment}
LSI keyword integration: ${data.lsiKeywords ? 'Yes' : 'No'}
SERP feature targeting: ${data.serpTargeting}
Content uniqueness level: ${data.uniquenessLevel}
Search intent focus: ${data.searchIntent}
Analyze competitors: ${data.analyzeCompetitors ? 'Yes' : 'No'}
Include content gaps: ${data.includeContentGaps ? 'Yes' : 'No'}
Include unique selling points: ${data.includeUSPs ? 'Yes' : 'No'}

Generate comprehensive, original content that adheres to current SEO best practices while maintaining natural readability and providing genuine value to the target audience.`;
  };
  
  const handleGenerateContent = () => {
    if (!formData.topic.trim() || !formData.primaryKeyword.trim()) {
      toast.error("Topic and primary keyword are required");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    // Generate a mock title based on the topic and primary keyword
    const title = `${formData.topic} - Complete Guide [${formData.primaryKeyword}]`;
    setGeneratedTitle(title);
    
    // Set the active tab to output to show content generation
    setActiveTab("output");
    
    setTimeout(() => {
      try {
        // In a real implementation, this would be an API call to generate content
        // For now, we'll use a mock function
        const content = generateMockSEOContent(formData.topic, [formData.primaryKeyword]);
        setGeneratedContent(content);
        
        // Generate a meta description
        setMetaDescription(`Learn about ${formData.primaryKeyword} in our comprehensive ${formData.contentType.toLowerCase()}. Discover best practices, tips, and strategies for success in ${formData.topic}.`);
        
        // Calculate word count (simplified)
        const estimatedWordCount = Math.floor(Math.random() * 500) + parseInt(formData.wordCount.split('-')[0]);
        setWordCount(estimatedWordCount);
        
        // Generate a readability score (0-100)
        const score = Math.floor(Math.random() * 30) + 65;
        setReadabilityScore(score);
        
        toast.success("SEO content generated!");
      } catch (err) {
        console.error("Error generating content:", err);
        setError("Failed to generate content. Please try again.");
        toast.error("Failed to generate content");
      } finally {
        setIsGenerating(false);
      }
    }, 3000);
  };
  
  const handleReset = () => {
    setFormData({
      topic: '',
      language: 'en',
      contentType: 'Blog Post',
      wordCount: '1000-1500',
      headingStructure: 'H1 + H2 + H3',
      includeTOC: false,
      includeFAQ: false,
      includeCTA: false,
      includeCustomSections: '',
      primaryKeyword: '',
      secondaryKeywordsGeneration: 'auto',
      secondaryKeywords: '',
      keywordDensity: 'Medium',
      metaDescriptionType: 'auto',
      metaDescriptionValue: '',
      includeInternalLinking: false,
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
    setGeneratedContent("");
    setActiveTab("input");
    toast.info("All fields have been reset");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleOpenPublishDialog = () => {
    if (!generatedContent) {
      toast.error("Please generate content first");
      return;
    }
    setPublishDialogOpen(true);
  };

  const handlePublishContent = () => {
    if (publishType === "scheduled" && (!scheduleDate || !scheduleTime)) {
      toast.error("Please select both date and time for scheduled publishing");
      return;
    }

    const publishAction = publishType === "immediate" ? "Publishing" : "Scheduling";
    const scheduledInfo = publishType === "scheduled" ? ` for ${scheduleDate} at ${scheduleTime}` : "";
    const platformName = publishPlatform.charAt(0).toUpperCase() + publishPlatform.slice(1);
    
    toast.success(`${publishAction} to ${platformName}${scheduledInfo}...`);
    
    setTimeout(() => {
      toast.success(`Successfully ${publishType === "immediate" ? "published" : "scheduled"} to ${platformName}${scheduledInfo}`);
      setPublishDialogOpen(false);
    }, 1500);
  };

  const handleSettingChange = (setting) => {
    setPublicationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const downloadContent = (format = 'html') => {
    if (!generatedContent) {
      toast.error("Please generate content first");
      return;
    }
    
    const filename = `seo-content-${new Date().toISOString().slice(0, 10)}.${format === 'markdown' ? 'md' : 'html'}`;
    const fileContent = format === 'markdown' 
      ? generatedContent.replace(/<h1>(.*?)<\/h1>/g, '# $1')
                       .replace(/<h2>(.*?)<\/h2>/g, '## $1')
                       .replace(/<h3>(.*?)<\/h3>/g, '### $1')
                       .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
                       .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
                       .replace(/<em>(.*?)<\/em>/g, '*$1*')
                       .replace(/<ul>(.*?)<\/ul>/gs, '$1')
                       .replace(/<li>(.*?)<\/li>/g, '- $1\n')
      : generatedContent;
    
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Content downloaded as ${format.toUpperCase()}`);
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="input">Input Parameters</TabsTrigger>
                  <TabsTrigger value="output">Generated Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="input">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">1. Content Creation Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="topic">Topic</Label>
                            <Input 
                              id="topic"
                              name="topic"
                              value={formData.topic}
                              onChange={handleInputChange}
                              placeholder="Enter your content topic" 
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="language">Output Language</Label>
                            <Select 
                              value={formData.language} 
                              onValueChange={(value) => setFormData({...formData, language: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                {LANGUAGES.map((language) => (
                                  <SelectItem key={language.code} value={language.code}>
                                    {language.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contentType">Content Type</Label>
                            <Select 
                              value={formData.contentType} 
                              onValueChange={(value) => setFormData({...formData, contentType: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select content type" />
                              </SelectTrigger>
                              <SelectContent>
                                {CONTENT_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="wordCount">Word Count</Label>
                            <Select 
                              value={formData.wordCount} 
                              onValueChange={(value) => setFormData({...formData, wordCount: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select word count" />
                              </SelectTrigger>
                              <SelectContent>
                                {WORD_COUNTS.map((count) => (
                                  <SelectItem key={count} value={count}>{count} words</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="headingStructure">Heading Structure</Label>
                            <Select 
                              value={formData.headingStructure} 
                              onValueChange={(value) => setFormData({...formData, headingStructure: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select heading structure" />
                              </SelectTrigger>
                              <SelectContent>
                                {HEADING_STRUCTURES.map((structure) => (
                                  <SelectItem key={structure} value={structure}>{structure}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>Include Sections</Label>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="includeTOC" 
                                  checked={formData.includeTOC} 
                                  onCheckedChange={(checked) => setFormData({...formData, includeTOC: !!checked})} 
                                />
                                <label htmlFor="includeTOC" className="text-sm">
                                  Table of Contents
                                </label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="includeFAQ" 
                                  checked={formData.includeFAQ} 
                                  onCheckedChange={(checked) => setFormData({...formData, includeFAQ: !!checked})} 
                                />
                                <label htmlFor="includeFAQ" className="text-sm">
                                  FAQ Section
                                </label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="includeCTA" 
                                  checked={formData.includeCTA} 
                                  onCheckedChange={(checked) => setFormData({...formData, includeCTA: !!checked})} 
                                />
                                <label htmlFor="includeCTA" className="text-sm">
                                  Call to Action
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">2. SEO Parameters</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="primaryKeyword">Primary Keyword</Label>
                            <Input 
                              id="primaryKeyword"
                              name="primaryKeyword"
                              value={formData.primaryKeyword}
                              onChange={handleInputChange}
                              placeholder="Enter primary keyword" 
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="keywordDensity">Keyword Density</Label>
                            <Select 
                              value={formData.keywordDensity} 
                              onValueChange={(value) => setFormData({...formData, keywordDensity: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select keyword density" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low (0.5-1%)</SelectItem>
                                <SelectItem value="Medium">Medium (1-2%)</SelectItem>
                                <SelectItem value="High">High (2-3%)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Secondary Keywords</Label>
                          <div className="mt-1 space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="auto-keywords"
                                name="secondaryKeywordsGeneration"
                                value="auto"
                                checked={formData.secondaryKeywordsGeneration === 'auto'}
                                onChange={handleInputChange}
                                className="h-4 w-4"
                              />
                              <label htmlFor="auto-keywords" className="text-sm">
                                Generate automatically using AI
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="manual-keywords"
                                name="secondaryKeywordsGeneration"
                                value="manual"
                                checked={formData.secondaryKeywordsGeneration === 'manual'}
                                onChange={handleInputChange}
                                className="h-4 w-4"
                              />
                              <label htmlFor="manual-keywords" className="text-sm">
                                Enter manually
                              </label>
                            </div>
                            
                            {formData.secondaryKeywordsGeneration === 'manual' && (
                              <Textarea
                                id="secondaryKeywords"
                                name="secondaryKeywords"
                                value={formData.secondaryKeywords}
                                onChange={handleInputChange}
                                placeholder="Enter secondary keywords separated by commas"
                                className="mt-2"
                              />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox 
                            id="includeInternalLinking" 
                            checked={formData.includeInternalLinking} 
                            onCheckedChange={(checked) => setFormData({...formData, includeInternalLinking: !!checked})} 
                          />
                          <label htmlFor="includeInternalLinking" className="text-sm">
                            Include internal linking suggestions
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">3. Content Tone & Style</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="voice">Voice</Label>
                          <Select 
                            value={formData.voice} 
                            onValueChange={(value) => setFormData({...formData, voice: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                              {VOICE_OPTIONS.map((voice) => (
                                <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="expertiseLevel">Industry Expertise Level</Label>
                          <Select 
                            value={formData.expertiseLevel} 
                            onValueChange={(value) => setFormData({...formData, expertiseLevel: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select expertise level" />
                            </SelectTrigger>
                            <SelectContent>
                              {EXPERTISE_LEVELS.map((level) => (
                                <SelectItem key={level} value={level}>{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="brandPersonality">Brand Personality</Label>
                          <Select 
                            value={formData.brandPersonality} 
                            onValueChange={(value) => setFormData({...formData, brandPersonality: value})}
                          >
                            <SelectTrigger className="mt-1">
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
                    
                    <div className="flex items-center justify-center">
                      <Button 
                        onClick={handleGenerateContent} 
                        className="w-full md:w-auto px-8 gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        disabled={isGenerating || !formData.topic.trim() || !formData.primaryKeyword.trim()}
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            Generating content...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Generate SEO Content
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="output">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <RefreshCw size={36} className="animate-spin text-primary mb-4" />
                      <h3 className="text-lg font-medium mb-1">Generating SEO Content</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Creating high-quality, optimized content based on your inputs...
                      </p>
                    </div>
                  ) : generatedContent ? (
                    <>
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Word Count</p>
                            <p className="font-medium">{wordCount} words</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Readability</p>
                            <p className={`font-medium ${
                              readabilityScore > 80 ? 'text-green-600' : 
                              readabilityScore > 60 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {readabilityScore}/100
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Language</p>
                            <p className="font-medium">
                              {LANGUAGES.find(lang => lang.code === formData.language)?.name || "English"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">SEO Score</p>
                            <p className="font-medium text-green-600">92/100</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Label className="text-muted-foreground text-xs">GENERATED TITLE</Label>
                        <h3 className="text-lg font-medium">{generatedTitle}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <Label className="text-muted-foreground text-xs">META DESCRIPTION</Label>
                        <p className="text-sm border p-2 rounded bg-muted/20">{metaDescription}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <Label className="text-muted-foreground text-xs">CONTENT</Label>
                        <div className="min-h-[300px] max-h-[500px] overflow-y-auto border rounded-lg p-4">
                          <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: generatedContent }} />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="gap-1"
                            size="sm"
                          >
                            <RotateCw size={14} />
                            Reset
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={handleCopyToClipboard}
                            className="gap-1"
                            size="sm"
                          >
                            <Copy size={14} />
                            Copy
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={() => downloadContent('html')}
                            className="gap-1"
                            size="sm"
                          >
                            <FileDown size={14} />
                            Download HTML
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={() => downloadContent('markdown')}
                            className="gap-1"
                            size="sm"
                          >
                            <Download size={14} />
                            Download Markdown
                          </Button>
                          
                          <Button 
                            onClick={handleOpenPublishDialog}
                            className="gap-1"
                            size="sm"
                          >
                            <Globe size={14} />
                            Publish to CMS
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <FileDown size={36} className="text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium mb-1">No Content Generated Yet</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-6">
                        Fill in the parameters and generate SEO-optimized content.
                      </p>
                      <Button 
                        onClick={() => setActiveTab("input")} 
                        variant="outline"
                      >
                        Go to Parameters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>

            {generatedContent && activeTab === "output" && (
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Connected CMS</h3>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
              
              <div className="space-y-3">
                {Object.entries(connectedCMS).map(([cms, isConnected]) => (
                  <div 
                    key={cms} 
                    className={`flex items-center gap-3 p-3 rounded-md border ${
                      isConnected ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20' : 'border-border'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${isConnected ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-secondary text-muted-foreground'}`}>
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{cms.charAt(0).toUpperCase() + cms.slice(1)}</p>
                      {isConnected ? (
                        <p className="text-xs text-green-700 dark:text-green-400 flex items-center">
                          <CheckCircle2 size={12} className="mr-1" />
                          Connected
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Publish Content to CMS</DialogTitle>
              <DialogDescription>
                Choose where and how to publish your generated SEO content
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="publish-platform">Platform</Label>
                <div className="flex flex-col space-y-2">
                  <Select
                    value={publishPlatform}
                    onValueChange={setPublishPlatform}
                  >
                    <SelectTrigger id="publish-platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="webflow">Webflow</SelectItem>
                      <SelectItem value="custom">Custom CMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Publication Type</Label>
                <div className="mt-1">
                  <Select 
                    value={publishType} 
                    onValueChange={setPublishType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select publication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Publish Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule Publication</SelectItem>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {publishType === "scheduled" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Publication Date</Label>
                    <Input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Publication Time</Label>
                    <Input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <Label>Publication Settings</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="add-featured-image" 
                      checked={publicationSettings.addFeaturedImage}
                      onCheckedChange={() => handleSettingChange('addFeaturedImage')}
                    />
                    <label
                      htmlFor="add-featured-image"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Add featured image (from selected images)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="add-tags" 
                      checked={publicationSettings.addTags}
                      onCheckedChange={() => handleSettingChange('addTags')}
                    />
                    <label
                      htmlFor="add-tags"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Add selected keywords as tags
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="canonical-url" 
                      checked={publicationSettings.setCanonicalUrl}
                      onCheckedChange={() => handleSettingChange('setCanonicalUrl')}
                    />
                    <label
                      htmlFor="canonical-url"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Set canonical URL automatically
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enable-comments" 
                      checked={publicationSettings.enableComments}
                      onCheckedChange={() => handleSettingChange('enableComments')}
                    />
                    <label
                      htmlFor="enable-comments"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable comments
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="social-share" 
                      checked={publicationSettings.socialShare}
                      onCheckedChange={() => handleSettingChange('socialShare')}
                    />
                    <label
                      htmlFor="social-share"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Auto-share to social media (if connected)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePublishContent}>
                {publishType === "immediate"
                  ? "Publish Now"
                  : publishType === "scheduled"
                  ? "Schedule Publication"
                  : "Save as Draft"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default AISEOWriterPage;
