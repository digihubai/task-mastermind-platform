
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AIToolsHub from "./ai/AIToolsHub";
import AICopywriterPage from "./ai/AICopywriterPage";
import AISEOPage from "./ai/AISEOPage";
import AIRewriterPage from "./ai/AIRewriterPage";
import AIVisionPage from "./ai/AIVisionPage";
import PDFInsightPage from "./ai/PDFInsightPage";
import AIBots from "./user/AIBots";
import WorkflowEditor from "./automation/WorkflowEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AIToolsHub />,
  },
  {
    path: "/ai-tools",
    element: <AIToolsHub />,
  },
  {
    path: "/ai-copywriter",
    element: <AICopywriterPage />,
  },
  {
    path: "/ai-seo",
    element: <AISEOPage />,
  },
  {
    path: "/ai-rewriter",
    element: <AIRewriterPage />,
  },
  {
    path: "/ai-vision",
    element: <AIVisionPage />,
  },
  {
    path: "/pdf-insight",
    element: <PDFInsightPage />,
  },
  {
    path: "/chatbot",
    element: <AIBots />,
  },
  {
    path: "/automation/editor/:id?",
    element: <WorkflowEditor />,
  },
]);

export default router;
