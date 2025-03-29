
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOContentGenerator from '@/components/seo/SEOContentGenerator';
import { 
  generateKeywordsAI, 
  generateTitlesAI, 
  generateOutlineAI 
} from '@/services/ai';

const AISEOPage = () => {
  return (
    <AppLayout>
      <SEOContentGenerator
        generateKeywords={generateKeywordsAI}
        generateTitles={generateTitlesAI}
        generateOutline={generateOutlineAI}
      />
    </AppLayout>
  );
};

export default AISEOPage;
