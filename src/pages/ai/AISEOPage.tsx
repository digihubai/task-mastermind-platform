
import React, { useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOContentGenerator from '@/components/seo/SEOContentGenerator';
import { 
  generateKeywordsAI, 
  generateTitlesAI, 
  generateOutlineAI,
  generateContentAI 
} from '@/services/ai/contentGenerationAI';
import { useToast } from '@/components/ui/use-toast';
import { getOpenAIApiKey } from '@/services/ai/contentGenerationAI';

// Create wrapper functions to match the expected interfaces
const generateKeywords = async (topic: string, count: number = 10): Promise<string[]> => {
  return generateKeywordsAI(topic, count);
};

const generateTitles = async (topic: string, keywords: string[], count: number = 5): Promise<string[]> => {
  return generateTitlesAI(topic, keywords, count);
};

const generateOutline = async (topic: string, keywords: string[], title: string): Promise<any> => {
  return generateOutlineAI(topic, keywords, title);
};

const generateContent = async (title: string, outline: string, keywords: string[]): Promise<string> => {
  return generateContentAI(title, outline, keywords);
};

const AISEOPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = getOpenAIApiKey();
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please ask your admin to set up AI integration in Admin Settings",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <AppLayout>
      <SEOContentGenerator
        generateKeywords={generateKeywords}
        generateTitles={generateTitles}
        generateOutline={generateOutline}
        generateContent={generateContent}
      />
    </AppLayout>
  );
};

export default AISEOPage;
