
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import PDFInsightPage from '@/pages/ai/PDFInsightPage';
import AICopywriterPage from '@/pages/ai/AICopywriterPage';
import AIRewriter from '@/pages/user/AIRewriter';
import AISEOWriter from '@/pages/user/AISEOWriter';
import AIVision from '@/pages/user/AIVision';

const aiRoutes: RouteObject[] = [
  {
    path: '/ai-copywriter',
    element: <AICopywriterPage />,
  },
  {
    path: '/ai-seo',
    element: <AISEOWriter />,
  },
  {
    path: '/ai-rewriter',
    element: <AIRewriter />,
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
