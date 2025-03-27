
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  FileText, 
  Sparkles, 
  SaveIcon, 
  RefreshCcw, 
  Check, 
  Upload,
  Brush
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BrandVoice = () => {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("DigiHub");
  const [toneOfVoice, setToneOfVoice] = useState("Professional yet approachable");
  const [brandValues, setBrandValues] = useState("Innovation, Efficiency, Customer-focused");
  const [targetAudience, setTargetAudience] = useState("Business professionals seeking automation and AI solutions");
  const [voiceGenerated, setVoiceGenerated] = useState(false);
  
  const generateVoice = () => {
    setVoiceGenerated(true);
    toast({
      title: "Brand voice generated",
      description: "Your AI brand voice settings have been applied",
    });
  };
  
  const saveVoice = () => {
    toast({
      title: "Brand voice saved",
      description: "Your brand voice settings have been saved successfully",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Brand Voice</h1>
          <p className="text-muted-foreground mt-1">
            Configure and manage your brand's communication style
          </p>
        </div>
        
        <Tabs defaultValue="define" className="space-y-4">
          <TabsList>
            <TabsTrigger value="define">Define Voice</TabsTrigger>
            <TabsTrigger value="examples">Voice Examples</TabsTrigger>
            <TabsTrigger value="templates">Voice Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="define" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand Name</label>
                  <Input 
                    placeholder="Enter your brand name" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone of Voice</label>
                  <Input 
                    placeholder="e.g., Professional, Casual, Friendly" 
                    value={toneOfVoice}
                    onChange={(e) => setToneOfVoice(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand Values</label>
                  <Input 
                    placeholder="e.g., Innovation, Transparency, Quality" 
                    value={brandValues}
                    onChange={(e) => setBrandValues(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input 
                    placeholder="Describe your target audience" 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={generateVoice}
                  >
                    <Sparkles size={16} />
                    <span>Generate AI Voice</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={saveVoice}
                  >
                    <SaveIcon size={16} />
                    <span>Save</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {voiceGenerated && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Generated Voice Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Voice Characteristics</h3>
                    <div className="p-4 bg-secondary/50 rounded-md text-sm">
                      <p className="mb-2"><span className="font-semibold">Tone:</span> Professional but conversational, emphasizing clarity and expertise while remaining approachable and helpful.</p>
                      <p className="mb-2"><span className="font-semibold">Language:</span> Clear, concise, and jargon-free when possible. When technical terms are necessary, they are explained in accessible language.</p>
                      <p><span className="font-semibold">Personality:</span> Knowledgeable, efficient, and solution-oriented. Conveys confidence and reliability while being supportive and understanding of customer needs.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Do's and Don'ts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md text-sm">
                        <p className="font-semibold flex items-center"><Check size={16} className="mr-2" /> Do</p>
                        <ul className="mt-2 space-y-1 list-disc pl-5">
                          <li>Use clear, direct language</li>
                          <li>Emphasize benefits and solutions</li>
                          <li>Be concise and respectful of time</li>
                          <li>Personalize communication when possible</li>
                          <li>Provide actionable next steps</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-md text-sm">
                        <p className="font-semibold flex items-center"><Check size={16} className="mr-2" /> Don't</p>
                        <ul className="mt-2 space-y-1 list-disc pl-5">
                          <li>Use excessive jargon or technical language</li>
                          <li>Be overly casual or informal</li>
                          <li>Make unrealistic promises</li>
                          <li>Use negative language</li>
                          <li>Ignore the specific needs of the audience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voice Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Email Communication</h3>
                  <div className="p-4 bg-secondary/50 rounded-md text-sm">
                    <p className="font-semibold mb-2">Subject: Getting Started with DigiHub - Your Next Steps</p>
                    <p className="mb-2">Hi [Name],</p>
                    <p className="mb-2">Thank you for choosing DigiHub for your automation needs. We're excited to help you streamline your workflows and boost your team's productivity.</p>
                    <p className="mb-2">To help you get started:</p>
                    <ul className="list-disc pl-5 mb-2">
                      <li>We've scheduled a brief onboarding call with our implementation specialist on [Date]</li>
                      <li>Your account is now set up with basic configurations based on your industry</li>
                      <li>Our resource hub is available 24/7 with guides and tutorials</li>
                    </ul>
                    <p className="mb-2">If you have any questions before our call, please don't hesitate to reach out.</p>
                    <p className="mb-2">Looking forward to our partnership,</p>
                    <p>The DigiHub Team</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Social Media Post</h3>
                  <div className="p-4 bg-secondary/50 rounded-md text-sm">
                    <p>📊 Struggling with data silos? DigiHub's new integration feature connects your tools in minutes, not days. See how our clients are saving 15+ hours weekly with unified dashboards. Link in bio for a free assessment of your current workflow. #WorkflowAutomation #ProductivityTools</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Product Description</h3>
                  <div className="p-4 bg-secondary/50 rounded-md text-sm">
                    <p>DigiHub's AI Assistant seamlessly integrates with your existing systems to automate routine tasks, analyze customer interactions, and provide actionable insights. Unlike conventional automation tools, our solution adapts to your unique workflows and learns from your team's expertise. The result? Reduced operational costs, faster response times, and the freedom for your team to focus on high-value work that drives business growth.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Create Your Own Example</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Email</Button>
                    <Button variant="outline" size="sm">Social Post</Button>
                    <Button variant="outline" size="sm">Product Description</Button>
                    <Button variant="outline" size="sm">Support Response</Button>
                    <Button variant="outline" size="sm">Website Copy</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea 
                    placeholder="Write your content here..."
                    rows={6}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    className="flex items-center gap-2"
                  >
                    <Brush size={16} />
                    <span>Apply Brand Voice</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCcw size={16} />
                    <span>Generate Alternative</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Professional</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Formal, authoritative, and precise communication style suitable for corporate and B2B contexts.
                  </p>
                  <Button variant="outline" className="w-full">Apply Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Conversational</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Friendly, approachable, and relatable style that connects with audiences on a personal level.
                  </p>
                  <Button variant="outline" className="w-full">Apply Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Technical</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Precise, detailed, and information-rich style focused on accuracy and technical specifications.
                  </p>
                  <Button variant="outline" className="w-full">Apply Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Inspirational</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Motivational, visionary, and empowering style that inspires action and emotional connection.
                  </p>
                  <Button variant="outline" className="w-full">Apply Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Educational</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Clear, instructional, and helpful style that explains concepts and guides the audience.
                  </p>
                  <Button variant="outline" className="w-full">Apply Template</Button>
                </CardContent>
              </Card>
              
              <Card className="border border-dashed flex items-center justify-center cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto bg-secondary w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <Upload size={20} className="text-primary" />
                  </div>
                  <h3 className="font-medium">Upload Custom Template</h3>
                  <p className="text-sm text-muted-foreground mt-1">Import a custom voice template</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default BrandVoice;
