
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AIToolsHub from '@/pages/ai/AIToolsHub';
import AISEOPage from '@/pages/ai/AISEOPage';
import AIRewriterPage from '@/pages/ai/AIRewriterPage';
import AICopywriterPage from '@/pages/ai/AICopywriterPage';
import AISEOWriterPage from '@/pages/ai/AISEOWriterPage';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import PDFInsightPage from '@/pages/ai/PDFInsightPage';
import ChatbotsPage from '@/pages/ai/ChatbotsPage';

const aiRoutes: RouteObject[] = [
  {
    path: '/ai/tools',
    element: <AIToolsHub />,
  },
  {
    path: '/ai/seo',
    element: <AISEOPage />,
  },
  {
    path: '/ai-seo',
    element: <AISEOPage />,
  },
  {
    path: '/ai/rewriter',
    element: <AIRewriterPage />,
  },
  {
    path: '/ai/copywriter',
    element: <AICopywriterPage />,
  },
  {
    path: '/ai/seo-writer',
    element: <AISEOWriterPage />,
  },
  {
    path: '/ai/vision',
    element: <AIVisionPage />,
  },
  {
    path: '/vision',
    element: <AIVisionPage />,
  },
  {
    path: '/ai/pdf-insight',
    element: <PDFInsightPage />,
  },
  {
    path: '/ai/chatbots',
    element: <ChatbotsPage />,
  },
  {
    path: '/chatbots',
    element: <ChatbotsPage />,
  }
];

export default aiRoutes;
