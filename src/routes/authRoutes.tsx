
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AuthPage from '@/pages/auth/AuthPage';

const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthPage />,
  },
];

export default authRoutes;
