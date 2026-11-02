import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import EligibilityPage from "../pages/EligibilityPage";
import SchemesPage from "../pages/SchemesPage";
import SchemeDetailPage from "../pages/SchemeDetailPage";
import SavedSchemesPage from "../pages/SavedSchemesPage";
import ProfilePage from "../pages/ProfilePage";
import AIAssistantPage from "../pages/AIAssistantPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/eligibility" element={<EligibilityPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
        <Route
          path="/schemes/:id"
          element={<SchemeDetailPage />}
        />
        <Route path="/scheme/" element={<SchemeDetailPage />} />
        <Route path="/saved" element={<SavedSchemesPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* AI Assistant */}
        <Route
          path="/ai-assistant"
          element={<AIAssistantPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;