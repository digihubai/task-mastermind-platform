
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CRM from '@/pages/modules/CRM';

const crmRoutes: RouteObject[] = [
  {
    path: '/crm',
    element: <CRM />,
  },
  {
    path: '/crm/contacts',
    element: <CRM />,
  },
  {
    path: '/crm/leads',
    element: <CRM />,
  },
  {
    path: '/crm/deals',
    element: <CRM />,
  },
];

export default crmRoutes;
