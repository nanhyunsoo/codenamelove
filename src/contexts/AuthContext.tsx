"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Role = "guest" | "waitlisted" | "member" | "admin";

interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // Mock: moltbook API 시뮬레이션
      await new Promise((r) => setTimeout(r, 800));
      const isAdmin = email.toLowerCase().includes("admin");
      setUser({
        id: "u-1",
        email,
        role: isAdmin ? "admin" : "member",
        name: email.split("@")[0],
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: Role) => {
      if (!user) return role === "guest";
      if (role === "admin") return user.role === "admin";
      if (role === "member") return user.role === "member" || user.role === "admin";
      if (role === "waitlisted") return user.role === "waitlisted" || user.role === "member" || user.role === "admin";
      return true;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
