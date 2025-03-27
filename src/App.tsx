
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import TeamChatPage from "./pages/TeamChatPage";
import MessagingPage from "./pages/MessagingPage";
import AISEOPage from "./pages/ai/AISEOPage";
import AIVisionPage from "./pages/ai/AIVisionPage";
import AIRewriterPage from "./pages/ai/AIRewriterPage";
import PDFInsightPage from "./pages/ai/PDFInsightPage";
import AICopywriterPage from "./pages/ai/AICopywriterPage";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/team-chat" element={<TeamChatPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/chat" element={<MessagingPage />} />
        
        {/* AI Tools Routes */}
        <Route path="/ai/seo" element={<AISEOPage />} />
        <Route path="/ai/vision" element={<AIVisionPage />} />
        <Route path="/ai/rewriter" element={<AIRewriterPage />} />
        <Route path="/ai/pdf-insight" element={<PDFInsightPage />} />
        <Route path="/ai/copywriter" element={<AICopywriterPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
