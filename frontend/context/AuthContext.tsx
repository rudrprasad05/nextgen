"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { GetMe, LoginRequest, LogoutRequest } from "@/actions/auth";
import { User } from "@/lib/models";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  refresh(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refresh = useCallback(async () => {
    try {
      console.log("info: refresh fired");
      const res = await GetMe();

      if (!res.success || !res.data) {
        setUser(null);
        return;
      }

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const res = await LoginRequest(email, password);

    if (!res.success || !res.data) {
      toast.error("Login failed", { description: res.message });
      setIsLoading(false);
      return;
    }

    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));

    toast.success("Logged in");
    router.push("/dashboard");
    setIsLoading(false);
  };

  const logout = async () => {
    await LogoutRequest();

    setUser(null);
    localStorage.removeItem("user");

    toast.info("Logged out");
    router.push("/auth/login");
  };

  useEffect(() => {
    // 1️⃣ Load cached user instantly (UX only)
    const cached = localStorage.getItem("user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch {}
    }

    // 2️⃣ Confirm with server
    refresh();
  }, [pathname, refresh]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
