
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import PDFInsightPage from '@/pages/ai/PDFInsightPage';
import AICopywriterPage from '@/pages/ai/AICopywriterPage';
import AIRewriter from '@/pages/user/AIRewriter';
import AISEOPage from '@/pages/ai/AISEOPage';
import ChatbotsPage from '@/pages/ai/ChatbotsPage';

const aiRoutes: RouteObject[] = [
  {
    path: '/ai-copywriter',
    element: <AICopywriterPage />,
  },
  {
    path: '/ai-seo',
    element: <AISEOPage />,
  },
  {
    path: '/ai-rewriter',
    element: <AIRewriter />,
  },
  {
    path: '/vision',
    element: <AIVisionPage />,
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
    path: '/chatbots',
    element: <ChatbotsPage />,
  },
  {
    path: '/ai/chatbots',
    element: <ChatbotsPage />,
  },
];

export default aiRoutes;
