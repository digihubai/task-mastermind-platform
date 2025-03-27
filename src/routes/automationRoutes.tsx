
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Create placeholder components for automation routes
const WorkflowsPage = () => <div>Workflows Page</div>;
const TemplatesPage = () => <div>Templates Page</div>;
const EditorPage = () => <div>Editor Page</div>;
const IndustryTemplatesPage = () => <div>Industry Templates Page</div>;
const APIConnectorPage = () => <div>API Connector Page</div>;

const automationRoutes: RouteObject[] = [
  {
    path: '/automation/workflows',
    element: <WorkflowsPage />,
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
  {
    path: '/automation/api-connector',
    element: <APIConnectorPage />,
  },
];

export default automationRoutes;
