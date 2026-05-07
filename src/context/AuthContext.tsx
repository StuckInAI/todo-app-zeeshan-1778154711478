import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@/types';
import {
  findUserByEmail, findUserById, createUser, verifyPassword,
  generateToken, validateToken, getStoredAuth, setStoredAuth, clearStoredAuth,
} from '@/lib/storage';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      const userId = validateToken(stored.token);
      if (userId) {
        const u = findUserById(userId);
        if (u) setUser(u);
        else clearStoredAuth();
      } else {
        clearStoredAuth();
      }
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<{ error?: string }> {
    const u = findUserByEmail(email);
    if (!u) return { error: 'No account found with that email address.' };
    if (!verifyPassword(u.id, password)) return { error: 'Incorrect password.' };
    const token = generateToken(u.id);
    setStoredAuth({ userId: u.id, token });
    setUser(u);
    return {};
  }

  async function register(email: string, password: string): Promise<{ error?: string }> {
    if (!email || !password) return { error: 'Email and password are required.' };
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
    const existing = findUserByEmail(email);
    if (existing) return { error: 'An account with this email already exists.' };
    const u = createUser(email, password);
    const token = generateToken(u.id);
    setStoredAuth({ userId: u.id, token });
    setUser(u);
    return {};
  }

  function logout() {
    clearStoredAuth();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
