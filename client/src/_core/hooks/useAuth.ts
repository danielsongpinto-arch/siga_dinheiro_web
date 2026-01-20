import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // Verificar se há um cookie de sessão do Manus
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
        setError("Erro ao verificar autenticação");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const getLoginUrl = () => {
    // Retornar URL de login do Manus
    return "/api/auth/login";
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
    getLoginUrl,
  };
}
