
import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import DebugConsole from './components/debug/DebugConsole';
import logger from './utils/logger';

// Log that App is being loaded
logger.info("App component is loading");

function App() {
  return (
    <div className="app">
      <Outlet />
      <Toaster />
      {import.meta.env.DEV && <DebugConsole />}
    </div>
  );
}

export default App;
