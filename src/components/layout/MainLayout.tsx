
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AIFloatingAssistant from "../ai/AIFloatingAssistant";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <AIFloatingAssistant />
    </>
  );
};

export default MainLayout;
