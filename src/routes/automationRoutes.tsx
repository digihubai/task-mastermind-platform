
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Workflows from '@/pages/automation/Workflows';

// Create placeholder components for automation routes
const TemplatesPage = () => <div>Templates Page</div>;
const EditorPage = () => <div>Editor Page</div>;
const IndustryTemplatesPage = () => <div>Industry Templates Page</div>;

const automationRoutes: RouteObject[] = [
  {
    path: '/automation/workflows',
    element: <Workflows />,
  },
  {
    path: '/automation/templates',
    element: <TemplatesPage />,
  },
  {
    path: '/automation/editor',
    element: <EditorPage />,
  },
  {
    path: '/automation/industry-templates',
    element: <IndustryTemplatesPage />,
  },
];

export default automationRoutes;
