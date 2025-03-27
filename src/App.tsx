
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
import AIToolsHub from "./pages/ai/AIToolsHub";
import WorkflowEditor from "./pages/automation/WorkflowEditor";
import Workflows from "./pages/automation/Workflows";
import OutboundCalls from "./pages/outbound/OutboundCalls";
import AutomationPage from "./pages/AutomationPage";
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
        <Route path="/ai-tools" element={<AIToolsHub />} />
        <Route path="/ai-seo" element={<AISEOPage />} />
        <Route path="/ai-vision" element={<AIVisionPage />} />
        <Route path="/ai-rewriter" element={<AIRewriterPage />} />
        <Route path="/pdf-insight" element={<PDFInsightPage />} />
        <Route path="/ai-copywriter" element={<AICopywriterPage />} />
        
        {/* Automation Routes */}
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/automation/workflows" element={<Workflows />} />
        <Route path="/automation/editor" element={<WorkflowEditor />} />
        <Route path="/automation/editor/:id" element={<WorkflowEditor />} />
        <Route path="/automation/templates" element={<WorkflowEditor />} />
        
        {/* Outbound Calling Routes */}
        <Route path="/outbound/calls" element={<OutboundCalls />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
