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

import { GetMe } from "@/actions/auth";
import { ApiResponse, User } from "@/lib/models";

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

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
        cache: "no-store",
      });

      const res: ApiResponse<User> = await response.json();

      if (!res.success || !res.data) {
        toast.error("Login failed", { description: res.message });
        setIsLoading(false);
        return;
      }

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Logged in");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      const res: ApiResponse<null> = await response.json();

      // Clear user state regardless of backend response
      setUser(null);
      localStorage.removeItem("user");

      if (res.success) {
        toast.info("Logged out");
      } else {
        toast.info("Logged out", { description: "Session cleared locally" });
      }

      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);

      // Still clear local state even if request fails
      setUser(null);
      localStorage.removeItem("user");

      toast.info("Logged out", { description: "Session cleared locally" });
      router.push("/auth/login");
    }
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
