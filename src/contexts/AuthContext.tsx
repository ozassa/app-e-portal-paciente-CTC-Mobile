import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/authService';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import type { User } from '@/types/user';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (cpf: string, password: string) => Promise<{ requiresTwoFactor: boolean }>;
  verifyTwoFactor: (cpf: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  resendOTP: (cpf: string, method: 'sms' | 'whatsapp') => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await storage.getObject<User>(STORAGE_KEYS.USER_DATA);
      const token = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (storedUser && token) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (cpf: string, password: string) => {
    const response = await authService.login({ cpf, password });
    return { requiresTwoFactor: response.requiresTwoFactor };
  }, []);

  const verifyTwoFactor = useCallback(async (cpf: string, code: string) => {
    const response = await authService.verifyTwoFactor({ cpf, code });
    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const resendOTP = useCallback(async (cpf: string, method: 'sms' | 'whatsapp') => {
    await authService.resendOTP(cpf, method);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verifyTwoFactor,
        logout,
        resendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
