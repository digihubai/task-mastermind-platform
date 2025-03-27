
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import TextEditor from "@/components/ai-rewriter/TextEditor";
import RewritingOptions from "@/components/ai-rewriter/RewritingOptions";
import TipsList from "@/components/ai-rewriter/TipsList";
import { useAIRewriter } from "@/hooks/useAIRewriter";

const AIRewriter = () => {
  const {
    originalText,
    setOriginalText,
    rewrittenText,
    tone,
    setTone,
    style,
    setStyle,
    isRewriting,
    handleRewrite,
    handleCopyToClipboard,
    handleReset
  } = useAIRewriter();
  
  const rewriterTips = [
    "Provide clear, well-structured original text",
    "Choose tone and style that match your audience",
    "Review the AI output and make final edits yourself",
    "Use the 'Professional' tone for business content",
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Rewriter</h1>
          <p className="text-muted-foreground mt-1">
            Rewrite and improve your content with different tones and styles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <TextEditor
                originalText={originalText}
                setOriginalText={setOriginalText}
                rewrittenText={rewrittenText}
                handleReset={handleReset}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Rewriting Options</h3>
              <RewritingOptions
                tone={tone}
                setTone={setTone}
                style={style}
                setStyle={setStyle}
                handleRewrite={handleRewrite}
                isRewriting={isRewriting}
                hasOriginalText={!!originalText.trim()}
              />
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Tips for Better Results</h3>
              <TipsList tips={rewriterTips} />
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIRewriter;
