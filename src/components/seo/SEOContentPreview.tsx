
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, FileText, Eye, Code } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface SEOContentPreviewProps {
  content: string;
}

const SEOContentPreview: React.FC<SEOContentPreviewProps> = ({ content }) => {
  return (
    <Card className="border border-border/40">
      <div className="border-b border-border/40 p-4 flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Eye size={16} className="text-primary" />
          Content Preview
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe size={14} />
          <span>Preview</span>
        </div>
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye size={14} />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger value="markdown" className="flex items-center gap-1">
              <Code size={14} />
              <span>Markdown</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="preview" className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </TabsContent>
        
        <TabsContent value="markdown" className="p-4">
          <pre className="bg-secondary/50 p-4 rounded-md overflow-auto whitespace-pre-wrap text-sm font-mono">
            {content}
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SEOContentPreview;
