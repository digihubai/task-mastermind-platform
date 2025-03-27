
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from './NotFound';
import mainRoutes from '../routes/mainRoutes';
import authRoutes from '../routes/authRoutes';
import aiRoutes from '../routes/aiRoutes';
import marketingRoutes from '../routes/marketingRoutes';
import automationRoutes from '../routes/automationRoutes';
import crmRoutes from '../routes/crmRoutes';
import financeRoutes from '../routes/financeRoutes';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      ...mainRoutes,
      ...authRoutes,
      ...aiRoutes,
      ...marketingRoutes,
      ...automationRoutes,
      ...crmRoutes,
      ...financeRoutes
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
