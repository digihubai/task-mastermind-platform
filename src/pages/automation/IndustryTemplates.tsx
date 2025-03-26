
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, Briefcase, Phone, MessageSquare, Users, Mail, 
  Globe, DollarSign, ShoppingCart, FileText, Heart, Search, 
  CreditCard, ArrowRight, Bot, Headphones, Truck, Zap,
  Store, MapPin, PieChart, AlertTriangle, BarChart3,
  Calendar
} from "lucide-react";

const IndustryTemplates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const industries = [
    { id: "all", label: "All Industries" },
    { id: "healthcare", label: "Healthcare" },
    { id: "retail", label: "Retail & E-commerce" },
    { id: "financial", label: "Financial Services" },
    { id: "saas", label: "SaaS & Technology" },
    { id: "education", label: "Education" },
    { id: "hospitality", label: "Hospitality" },
    { id: "manufacturing", label: "Manufacturing" }
  ];

  // Healthcare templates
  const healthcareTemplates = [
    {
      id: 101,
      title: "Patient Appointment Scheduler",
      description: "Automate appointment booking, reminders, and follow-ups with seamless calendar integration.",
      icon: <Calendar className="text-indigo-600" />,
      category: "Healthcare",
      subcategory: "Patient Care",
      popular: true
    },
    {
      id: 102,
      title: "Medical Claims Processing",
      description: "Streamline insurance claims submission, tracking, and follow-up with automatic notifications.",
      icon: <FileText className="text-blue-600" />,
      category: "Healthcare",
      subcategory: "Administration",
      popular: true
    },
    {
      id: 103,
      title: "Patient Follow-up System",
      description: "Automate post-visit care instructions, medication reminders, and satisfaction surveys.",
      icon: <Heart className="text-red-600" />,
      category: "Healthcare",
      subcategory: "Patient Care",
      popular: false
    },
    {
      id: 104,
      title: "Healthcare Provider Directory",
      description: "Maintain an up-to-date directory of in-network providers with specialties and availability.",
      icon: <Users className="text-green-600" />,
      category: "Healthcare",
      subcategory: "Administration",
      popular: false
    }
  ];

  // Retail templates
  const retailTemplates = [
    {
      id: 201,
      title: "Abandoned Cart Recovery",
      description: "Automatically follow up with customers who left items in their shopping cart.",
      icon: <ShoppingCart className="text-violet-600" />,
      category: "Retail",
      subcategory: "E-commerce",
      popular: true
    },
    {
      id: 202,
      title: "Inventory Alert System",
      description: "Get notified when inventory levels are low and automate reordering processes.",
      icon: <AlertTriangle className="text-amber-600" />,
      category: "Retail",
      subcategory: "Inventory",
      popular: false
    },
    {
      id: 203,
      title: "Customer Loyalty Program",
      description: "Manage loyalty point accrual, redemption, and special promotions for repeat customers.",
      icon: <Heart className="text-red-600" />,
      category: "Retail",
      subcategory: "Marketing",
      popular: true
    },
    {
      id: 204,
      title: "Order Processing Workflow",
      description: "Streamline order processing from receipt to fulfillment, shipping, and delivery tracking.",
      icon: <Truck className="text-blue-600" />,
      category: "Retail",
      subcategory: "Operations",
      popular: false
    }
  ];

  // Financial services templates
  const financialTemplates = [
    {
      id: 301,
      title: "Loan Application Processing",
      description: "Manage the entire loan application workflow from submission to approval and funding.",
      icon: <DollarSign className="text-green-600" />,
      category: "Financial",
      subcategory: "Lending",
      popular: true
    },
    {
      id: 302,
      title: "Financial Document Verification",
      description: "Automated process for collecting and verifying financial documents with compliance checks.",
      icon: <FileText className="text-blue-600" />,
      category: "Financial",
      subcategory: "Compliance",
      popular: false
    },
    {
      id: 303,
      title: "Credit Card Dispute Resolution",
      description: "Manage the entire dispute resolution process with tracking and customer communication.",
      icon: <CreditCard className="text-violet-600" />,
      category: "Financial",
      subcategory: "Customer Service",
      popular: true
    },
    {
      id: 304,
      title: "Financial Reporting Automation",
      description: "Generate and distribute financial reports on schedule with data from multiple sources.",
      icon: <PieChart className="text-indigo-600" />,
      category: "Financial",
      subcategory: "Reporting",
      popular: false
    }
  ];
  
  // SaaS & Technology templates
  const saasTemplates = [
    {
      id: 401,
      title: "Customer Onboarding",
      description: "Guide new customers through account setup, integration, and initial training.",
      icon: <Users className="text-indigo-600" />,
      category: "SaaS",
      subcategory: "Customer Success",
      popular: true
    },
    {
      id: 402,
      title: "Technical Support Ticket Management",
      description: "Route and prioritize support tickets with SLA tracking and escalation procedures.",
      icon: <Headphones className="text-violet-600" />,
      category: "SaaS",
      subcategory: "Support",
      popular: true
    },
    {
      id: 403,
      title: "Feature Request Workflow",
      description: "Collect, evaluate, and track customer feature requests through the product roadmap process.",
      icon: <Zap className="text-amber-600" />,
      category: "SaaS",
      subcategory: "Product",
      popular: false
    },
    {
      id: 404,
      title: "Usage-based Billing Automation",
      description: "Calculate and process billing based on customer usage metrics with automated invoicing.",
      icon: <DollarSign className="text-green-600" />,
      category: "SaaS",
      subcategory: "Billing",
      popular: false
    }
  ];

  const handleUseTemplate = (templateId: number) => {
    navigate(`/automation/editor?template=${templateId}`);
  };

  // Function to render a template card
  const renderTemplateCard = (template: any) => (
    <Card key={template.id} className="overflow-hidden border border-border hover:border-violet-300 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            {template.icon}
          </div>
          {template.popular && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardContent>
      <CardFooter className="pt-1 flex justify-between">
        <Badge variant="outline">{template.subcategory}</Badge>
        <Button 
          variant="ghost" 
          className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
          onClick={() => handleUseTemplate(template.id)}
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">Industry Solutions</h1>
            <p className="text-muted-foreground mt-1">Pre-built automation templates tailored for your industry</p>
          </div>
          <div className="relative w-[300px]">
            <Input 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted/50 mb-4">
            {industries.map(industry => (
              <TabsTrigger key={industry.id} value={industry.id} className="text-sm">{industry.label}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                  <Heart size={16} />
                </div>
                <h2 className="text-xl font-semibold">Healthcare</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {healthcareTemplates.map(template => renderTemplateCard(template))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                  <ShoppingCart size={16} />
                </div>
                <h2 className="text-xl font-semibold">Retail & E-commerce</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {retailTemplates.map(template => renderTemplateCard(template))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                  <DollarSign size={16} />
                </div>
                <h2 className="text-xl font-semibold">Financial Services</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {financialTemplates.map(template => renderTemplateCard(template))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                  <Zap size={16} />
                </div>
                <h2 className="text-xl font-semibold">SaaS & Technology</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {saasTemplates.map(template => renderTemplateCard(template))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="healthcare">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                <Heart size={16} />
              </div>
              <h2 className="text-xl font-semibold">Healthcare Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {healthcareTemplates.map(template => renderTemplateCard(template))}
            </div>
          </TabsContent>

          <TabsContent value="retail">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                <ShoppingCart size={16} />
              </div>
              <h2 className="text-xl font-semibold">Retail & E-commerce Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {retailTemplates.map(template => renderTemplateCard(template))}
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                <DollarSign size={16} />
              </div>
              <h2 className="text-xl font-semibold">Financial Services Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {financialTemplates.map(template => renderTemplateCard(template))}
            </div>
          </TabsContent>

          <TabsContent value="saas">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                <Zap size={16} />
              </div>
              <h2 className="text-xl font-semibold">SaaS & Technology Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {saasTemplates.map(template => renderTemplateCard(template))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default IndustryTemplates;
