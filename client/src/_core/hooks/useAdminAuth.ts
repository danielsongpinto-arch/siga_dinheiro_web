import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "admin123"; // Senha padrão - pode ser alterada

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há sessão de autenticação no localStorage
    const isLoggedIn = localStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isLoggedIn);
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
}
