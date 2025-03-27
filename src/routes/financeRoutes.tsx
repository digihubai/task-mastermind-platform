
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Create placeholder components for finance routes
const FinancePage = () => <div>Finance Page</div>;
const TaxCalculatorPage = () => <div>Tax Calculator Page</div>;
const InvoicesPage = () => <div>Invoices Page</div>;
const ExpensesPage = () => <div>Expenses Page</div>;
const ReportsPage = () => <div>Reports Page</div>;

const financeRoutes: RouteObject[] = [
  {
    path: '/finance',
    element: <FinancePage />,
  },
  {
    path: '/finance/tax-calculator',
    element: <TaxCalculatorPage />,
  },
  {
    path: '/finance/invoices',
    element: <InvoicesPage />,
  },
  {
    path: '/finance/expenses',
    element: <ExpensesPage />,
  },
  {
    path: '/finance/reports',
    element: <ReportsPage />,
  },
];

export default financeRoutes;
