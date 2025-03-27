
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Globe, 
  FileText, 
  BarChart3, 
  Settings,
  PlusCircle,
  ArrowRight,
  Target,
  Link,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

const MarketingSEOPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tools");

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} feature will be available soon.`
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">SEO Management</h1>
            <p className="text-muted-foreground mt-1">
              Optimize your website content and improve your search engine rankings
            </p>
          </div>
          
          <Button onClick={() => handleAction("Create SEO Campaign")} className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New SEO Campaign</span>
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="tools" className="space-y-6">
              <Card className="p-6 border border-border/40">
                <h2 className="text-xl font-semibold mb-4">Advanced SEO Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                      <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium">Keyword Research</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlimited topical authority clusters to dominate competitive search terms
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline">1,000+ Keywords</Badge>
                      <Badge variant="outline">Competitor Analysis</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
                      <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium">Page Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Up to 1,000 optimized pages with code changes for technical SEO excellence
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline">Technical SEO</Badge>
                      <Badge variant="outline">Page Performance</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full inline-block">
                      <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-medium">SEO Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      In-depth reporting and analytics to track your search performance
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline">Rank Tracking</Badge>
                      <Badge variant="outline">ROI Analysis</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-4">Quick SEO Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleAction("Keyword Research")}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Keyword Research
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleAction("Content Audit")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Content Audit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleAction("Rank Tracker")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Rank Tracker
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleAction("SEO Analytics")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      SEO Analytics
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Recent SEO Campaigns</h3>
                  <Button variant="outline" size="sm" onClick={() => handleAction("View All Campaigns")}>View All</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Q4 Product Landing Pages</h4>
                          <p className="text-sm text-muted-foreground mt-1">10 keywords • 4 pages</p>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>42 backlinks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span>Pos. 3.2 avg</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="gap-1">
                        View details <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Blog Content Strategy</h4>
                          <p className="text-sm text-muted-foreground mt-1">24 keywords • 12 articles</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">In Progress</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>6/12 complete</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span>3 ranking</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="gap-1">
                        View details <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-6 border border-border/40">
                <h2 className="text-xl font-semibold mb-6">SEO Performance Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                        <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Keyword Rankings</p>
                        <h3 className="text-2xl font-bold mt-1">143</h3>
                        <p className="text-xs text-green-500 mt-1">+12 this month</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                        <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Organic Traffic</p>
                        <h3 className="text-2xl font-bold mt-1">24.5K</h3>
                        <p className="text-xs text-green-500 mt-1">+8.3% from last month</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                        <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Backlinks</p>
                        <h3 className="text-2xl font-bold mt-1">867</h3>
                        <p className="text-xs text-green-500 mt-1">+23 this month</p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Top Performing Keywords</h3>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        Last 30 Days <ChevronDown size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden border rounded-lg">
                    <div className="bg-secondary/50 text-sm font-medium grid grid-cols-12 p-3 border-b">
                      <div className="col-span-4">Keyword</div>
                      <div className="col-span-2 text-center">Position</div>
                      <div className="col-span-2 text-center">Previous</div>
                      <div className="col-span-2 text-center">Traffic</div>
                      <div className="col-span-2 text-center">Difficulty</div>
                    </div>
                    
                    <div className="divide-y">
                      {[
                        { keyword: "digital marketing software", position: 3, previous: 5, traffic: 1240, difficulty: "Medium" },
                        { keyword: "AI content creation", position: 1, previous: 2, traffic: 980, difficulty: "High" },
                        { keyword: "marketing automation", position: 4, previous: 7, traffic: 820, difficulty: "High" },
                        { keyword: "customer support tools", position: 2, previous: 4, traffic: 750, difficulty: "Medium" },
                        { keyword: "SEO optimization tips", position: 3, previous: 3, traffic: 620, difficulty: "Low" }
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-12 p-3 text-sm hover:bg-secondary/20 transition-colors">
                          <div className="col-span-4 font-medium">{item.keyword}</div>
                          <div className="col-span-2 text-center">{item.position}</div>
                          <div className="col-span-2 text-center flex items-center justify-center">
                            {item.previous}
                            <span className={`text-xs ml-1 ${item.previous > item.position ? 'text-green-500' : item.previous < item.position ? 'text-red-500' : 'text-muted-foreground'}`}>
                              {item.previous > item.position ? '↑' : item.previous < item.position ? '↓' : '→'}
                            </span>
                          </div>
                          <div className="col-span-2 text-center">{item.traffic}</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline" className={
                              item.difficulty === "High" 
                                ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
                                : item.difficulty === "Medium"
                                ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                                : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                            }>
                              {item.difficulty}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">View Full Report</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations">
              <SEOIntegrations />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MarketingSEOPage;
