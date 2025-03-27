
import React from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import AIToolsHub from '@/pages/ai/AIToolsHub';
import AIVisionPage from '@/pages/ai/AIVisionPage';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/ai-tools',
    element: <AIToolsHub />,
  },
  {
    path: '/ai-vision',
    element: <AIVisionPage />,
  },
];

export default mainRoutes;
