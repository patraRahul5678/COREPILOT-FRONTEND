import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DocumentationPage from "./pages/documentationPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SecurityPage from "./pages/SecurityPage";
import StatusPage from "./pages/StatusPage";
import ContactPage from "./pages/ContactPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  return (
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

  );
}

export default App;