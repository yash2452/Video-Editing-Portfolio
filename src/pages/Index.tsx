import { useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  const handleSettingsClick = () => {
    if (isAuthenticated && isAdmin) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowAdmin(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <Hero />
      <Projects />
      <Contact />
      <Button
        onClick={handleSettingsClick}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg"
      >
        <Settings className="h-6 w-6" />
      </Button>
      <AdminLogin
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
      {showAdmin && isAuthenticated && isAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
      <Footer />
    </div>
  );
};

export default Index;
