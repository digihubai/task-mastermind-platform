
import React from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface SEOContentPreviewProps {
  content: string;
}

const SEOContentPreview: React.FC<SEOContentPreviewProps> = ({ content }) => {
  return (
    <Card className="border border-border/40 overflow-hidden">
      <div className="p-4 sm:p-6 prose dark:prose-invert max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-li:my-0">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
};

export default SEOContentPreview;
