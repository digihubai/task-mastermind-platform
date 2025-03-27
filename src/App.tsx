
import React from 'react';
import './App.css';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      {/* Router has been removed from here since it's already in main.tsx */}
      <Toaster />
    </>
  );
}

export default App;
