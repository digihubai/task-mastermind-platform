
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import TeamChatPage from "./pages/TeamChatPage";
import MessagingPage from "./pages/MessagingPage";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/team-chat" element={<TeamChatPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/chat" element={<MessagingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
