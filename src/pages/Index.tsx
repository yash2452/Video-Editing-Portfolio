
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
      
      {/* Admin Toggle - Only visible when not in production */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleSettingsClick}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )}

      <AdminLogin 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      {showAdmin && isAuthenticated && isAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
      
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
