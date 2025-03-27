
import { useState } from "react";
import { toast } from "sonner";
import logger from "@/utils/logger";

interface RewriteResult {
  originalText: string;
  setOriginalText: (text: string) => void;
  rewrittenText: string;
  setRewrittenText: (text: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  style: string;
  setStyle: (style: string) => void;
  isRewriting: boolean;
  handleRewrite: () => void;
  handleCopyToClipboard: () => void;
  handleReset: () => void;
}

export const useAIRewriter = (): RewriteResult => {
  const [originalText, setOriginalText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [tone, setTone] = useState("professional");
  const [style, setStyle] = useState("concise");
  const [isRewriting, setIsRewriting] = useState(false);
  
  const handleRewrite = () => {
    if (!originalText.trim()) {
      toast.error("Please enter some text to rewrite");
      return;
    }
    
    setIsRewriting(true);
    logger.info("Starting text rewrite with tone:", tone, "and style:", style);
    
    // Simulate AI rewriting process
    setTimeout(() => {
      const toneAdjustments = {
        professional: "This is a professionally rewritten version with formal language and structure.",
        casual: "Hey there! Here's a more casual take on your content, keeping it friendly.",
        enthusiastic: "WOW! Your content just got an AMAZING upgrade with lots of energy and excitement!",
        serious: "The following represents a more formal, fact-oriented approach to your original text.",
        friendly: "Hi there! I've rewritten this in a warm, approachable way that feels like a friend talking.",
        technical: "The following text has been optimized with precise terminology and technical accuracy.",
        formal: "The content has been restructured with proper formality and professional decorum."
      };
      
      const styleAdjustments = {
        concise: "Shortened while maintaining key points.",
        detailed: "Expanded with additional context and information.",
        persuasive: "Reframed to be more convincing and compelling.",
        simple: "Simplified using clearer and more straightforward language.",
        creative: "Reimagined with colorful language and creative expressions.",
        instructional: "Reformatted as clear step-by-step instructions for better comprehension.",
        conversational: "Rewritten to flow naturally like a conversation between friends."
      };
      
      setRewrittenText(`${originalText}\n\n${toneAdjustments[tone as keyof typeof toneAdjustments]} ${styleAdjustments[style as keyof typeof styleAdjustments]}`);
      setIsRewriting(false);
      
      logger.info("Text rewrite completed");
      toast.success("Text has been rewritten!");
    }, 2000);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(rewrittenText);
    toast.success("Copied to clipboard!");
    logger.info("Copied rewritten text to clipboard");
  };
  
  const handleReset = () => {
    setOriginalText("");
    setRewrittenText("");
    logger.info("Reset all content");
    toast.info("Content has been reset");
  };
  
  return {
    originalText,
    setOriginalText,
    rewrittenText,
    setRewrittenText,
    tone,
    setTone,
    style,
    setStyle,
    isRewriting,
    handleRewrite,
    handleCopyToClipboard,
    handleReset
  };
};
