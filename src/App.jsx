import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const DocumentationPage = lazy(() => import("./pages/documentationPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));

function App() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0B0F19'}}/>}>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/doct" element={<DocumentationPage/>} />
        <Route path="/privacy" element={<PrivacyPage/>} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/security" element={<SecurityPage/>} />
        <Route path="/status" element={<StatusPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/onboarding" element={<OnboardingPage/>} />
      </Routes>
    </Suspense>
  );
}

export default App;