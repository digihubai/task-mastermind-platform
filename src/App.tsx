
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './pages/routes';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
