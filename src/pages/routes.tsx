
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from './NotFound';
import DashboardPage from './DashboardPage';
import mainRoutes from '../routes/mainRoutes';
import authRoutes from '../routes/authRoutes';
import aiRoutes from '../routes/aiRoutes';
import marketingRoutes from '../routes/marketingRoutes';
import automationRoutes from '../routes/automationRoutes';
import crmRoutes from '../routes/crmRoutes';

// Create a proper router configuration
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      ...mainRoutes,
      ...authRoutes,
      ...aiRoutes,
      ...marketingRoutes,
      ...automationRoutes,
      ...crmRoutes
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
