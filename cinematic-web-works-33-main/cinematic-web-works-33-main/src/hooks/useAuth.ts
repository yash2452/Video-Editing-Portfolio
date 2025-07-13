import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const ADMIN_PASSWORD = "Yash1889$"; // Updated admin password

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        setAuthState({ isAuthenticated: true, isAdmin: true });
      } else {
        localStorage.removeItem('admin-auth');
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const authData = {
        timestamp: Date.now(),
        isAdmin: true
      };
      localStorage.setItem('admin-auth', JSON.stringify(authData));
      setAuthState({ isAuthenticated: true, isAdmin: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin-auth');
    setAuthState({ isAuthenticated: false, isAdmin: false });
  };

  return {
    ...authState,
    login,
    logout
  };
};
