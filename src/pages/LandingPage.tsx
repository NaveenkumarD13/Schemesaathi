import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import PopularSchemesSection from "../components/sections/PopularSchemesSection";
import FAQSection from "../components/sections/FAQSection";
import MainLayout from "../components/layout/MainLayout";

const LandingPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PopularSchemesSection />
      <FAQSection />
    </MainLayout>
  );
};

export default LandingPage;