
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Workflows from '@/pages/automation/Workflows';
import WorkflowEditor from '@/pages/automation/WorkflowEditor';
import WorkflowTemplates from '@/pages/automation/WorkflowTemplates';

// Create placeholder component for automation settings
const AutomationSettings = () => <div>Automation Settings Page</div>;

const automationRoutes: RouteObject[] = [
  {
    path: '/automation/workflows',
    element: <Workflows />,
  },
  {
    path: '/automation/editor/:id',
    element: <WorkflowEditor />,
  },
  {
    path: '/automation/editor',
    element: <WorkflowEditor />,
  },
  {
    path: '/automation/templates',
    element: <WorkflowTemplates />,
  },
  {
    path: '/automation/settings',
    element: <AutomationSettings />,
  },
];

export default automationRoutes;
