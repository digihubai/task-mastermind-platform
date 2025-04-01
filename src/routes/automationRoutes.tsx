
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Workflows from '@/pages/automation/Workflows';
import WorkflowEditor from '@/pages/automation/WorkflowEditor';
import WorkflowTemplatesPage from '@/pages/automation/WorkflowTemplates';
import CallFlowDesignerPage from '@/pages/automation/CallFlowDesigner';

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
    element: <WorkflowTemplatesPage />,
  },
  {
    path: '/automation/settings',
    element: <AutomationSettings />,
  },
  {
    path: '/automation/call-flow',
    element: <CallFlowDesignerPage />,
  },
  {
    path: '/automation/call-flow/:id',
    element: <CallFlowDesignerPage />,
  },
];

export default automationRoutes;
