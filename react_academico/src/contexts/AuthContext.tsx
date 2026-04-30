import React, { createContext, useContext, useState, useEffect } from 'react';
import { http } from '../services/axios/config.axios';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@App:user');
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Erro ao parsear usuário do localStorage", e);
        return null;
      }
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('@App:token');
    if (storedToken && storedToken !== "undefined") {
      return storedToken;
    }
    return null;
  });

  useEffect(() => {
    // This can still be used for verification if needed
  }, []);

  const login = async (email: string, password: string) => {
    const response = await http.post('/rest/auth/login', { email, password });
    const data = response.data.data || response.data;
    const { access_token, user: userData } = data;

    localStorage.setItem('@App:token', access_token);
    localStorage.setItem('@App:user', JSON.stringify(userData));
    
    setToken(access_token);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
