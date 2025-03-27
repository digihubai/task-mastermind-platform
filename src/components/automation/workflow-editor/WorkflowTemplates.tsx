
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, Mail, Phone, Users, Database, FileText, 
  BarChart3, RefreshCw, Calendar, Bell, ArrowDownUp, CheckCircle 
} from "lucide-react";
import { useWorkflowTemplates } from "@/hooks/use-workflow-templates";

const WorkflowTemplates = () => {
  const navigate = useNavigate();
  const { templates, categories, activeCategory, setActiveCategory } = useWorkflowTemplates();

  const handleUseTemplate = (templateId: number) => {
    navigate(`/automation/editor/${templateId}`);
  };

  // Filter templates by active category
  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(category => (
          <Badge 
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1 ${
              activeCategory === category.id 
                ? "bg-violet-600 hover:bg-violet-700" 
                : "hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-900/30"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
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
              <Badge variant="outline">{template.categoryLabel}</Badge>
              <Button 
                variant="ghost" 
                className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                onClick={() => handleUseTemplate(template.id)}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowTemplates;
