
import React, { useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOContentGenerator from '@/components/seo/SEOContentGenerator';
import { 
  generateKeywordsAI, 
  generateTitlesAI, 
  generateOutlineAI,
  generateSEOContentAI 
} from '@/services/ai/contentGenerationAI';
import { useToast } from '@/components/ui/use-toast';
import { getOpenAIApiKey } from '@/services/ai/contentGenerationAI';

const AISEOWriterPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = getOpenAIApiKey();
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your OpenAI API key in Settings > AI Configuration",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <AppLayout>
      <SEOContentGenerator
        generateKeywords={generateKeywordsAI}
        generateTitles={generateTitlesAI}
        generateOutline={generateOutlineAI}
        generateContent={generateSEOContentAI}
      />
    </AppLayout>
  );
};

export default AISEOWriterPage;
