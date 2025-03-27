
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
// User AI tool pages
import AIRewriter from "./user/AIRewriter";
import AISEOWriter from "./user/AISEOWriter";
import AIVision from "./user/AIVision";
import PDFInsight from "./user/PDFInsight";

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
  // User AI tool routes
  {
    path: "/user/ai-rewriter",
    element: <AIRewriter />,
  },
  {
    path: "/user/ai-seo-writer",
    element: <AISEOWriter />,
  },
  {
    path: "/user/ai-vision",
    element: <AIVision />,
  },
  {
    path: "/user/pdf-insight",
    element: <PDFInsight />,
  },
]);

export default router;
