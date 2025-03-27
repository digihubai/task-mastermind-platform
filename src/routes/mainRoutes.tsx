
import React from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import AIToolsHub from '@/pages/ai/AIToolsHub';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import CRMDashboard from '@/pages/modules/CRM';
import ProjectManagement from '@/pages/modules/ProjectManagement';
import WorkflowPage from '@/pages/modules/Workflow';
import FunnelCreator from '@/pages/modules/FunnelCreator';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
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
  {
    path: '/vision',
    element: <AIVisionPage />,
  },
  {
    path: '/crm',
    element: <CRMDashboard />,
  },
  {
    path: '/project-management',
    element: <ProjectManagement />,
  },
  {
    path: '/workflow',
    element: <WorkflowPage />,
  },
  {
    path: '/funnel-creator',
    element: <FunnelCreator />,
  },
];

export default mainRoutes;
