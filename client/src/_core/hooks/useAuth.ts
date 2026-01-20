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
    // Simular verificação de autenticação
    // Em produção, isso faria uma chamada à API para verificar se o usuário está logado
    const checkAuth = async () => {
      try {
        setLoading(true);
        // Verificar se há um usuário logado (por exemplo, através de um cookie de sessão)
        // Por enquanto, vamos simular um usuário logado
        const mockUser: User = {
          id: "user-123",
          name: "Admin",
          email: "admin@example.com",
        };
        setUser(mockUser);
      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
        setError("Erro ao verificar autenticação");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    // Redirecionar para login
    window.location.href = "/";
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
  };
}
