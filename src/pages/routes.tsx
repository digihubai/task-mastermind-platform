
import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '@/App';

// Import route category files
import mainRoutes from '@/routes/mainRoutes';
import financeRoutes from '@/routes/financeRoutes';
import automationRoutes from '@/routes/automationRoutes';
import marketingRoutes from '@/routes/marketingRoutes';
import aiRoutes from '@/routes/aiRoutes';
import authRoutes from '@/routes/authRoutes';

// Combine all child routes under the App layout
const appRoutes: RouteObject = {
  path: '/',
  element: <App />,
  children: [
    ...mainRoutes,
    ...financeRoutes,
    ...automationRoutes,
    ...marketingRoutes,
    ...aiRoutes,
  ],
};

// Create the router with all routes
const router = createBrowserRouter([
  appRoutes,
  ...authRoutes,
]);

export default router;
