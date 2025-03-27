
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import PDFInsightPage from '@/pages/ai/PDFInsightPage';
import AICopywriterPage from '@/pages/ai/AICopywriterPage';
import AISEOWriterPage from '@/pages/ai/AISEOWriterPage';
import AIRewriterPage from '@/pages/ai/AIRewriterPage';
import AIVision from '@/pages/user/AIVision';

const aiRoutes: RouteObject[] = [
  {
    path: '/ai-copywriter',
    element: <AICopywriterPage />,
  },
  {
    path: '/ai-seo',
    element: <AISEOWriterPage />,
  },
  {
    path: '/ai-rewriter',
    element: <AIRewriterPage />,
  },
  {
    path: '/ai-vision',
    element: <AIVisionPage />,
  },
  {
    path: '/pdf-insight',
    element: <PDFInsightPage />,
  },
  {
    path: '/vision',
    element: <AIVision />,
  },
];

export default aiRoutes;
