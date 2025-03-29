
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOContentGenerator from '@/components/seo/SEOContentGenerator';
import { 
  generateKeywordsAI, 
  generateTitlesAI, 
  generateOutlineAI 
} from '@/services/ai/contentGenerationAI';

// Create wrapper functions to match the expected interfaces
const generateKeywords = async (topic: string): Promise<string[]> => {
  return generateKeywordsAI(topic);
};

const generateTitles = async (topic: string, keywords: string[]): Promise<string[]> => {
  return generateTitlesAI(topic, keywords);
};

const generateOutline = async (topic: string, keywords: string[], title: string): Promise<any> => {
  return generateOutlineAI(topic, keywords, title);
};

const AISEOPage = () => {
  return (
    <AppLayout>
      <SEOContentGenerator
        generateKeywords={generateKeywords}
        generateTitles={generateTitles}
        generateOutline={generateOutline}
      />
    </AppLayout>
  );
};

export default AISEOPage;
